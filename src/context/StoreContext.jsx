import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  createAddress as apiCreateAddress,
  fetchAddresses as apiFetchAddresses,
  postCart as apiPostCart,
} from '../services/api';

const StoreContext = createContext(null);
const CART_STORAGE_KEY = 'maison_heness_cart_v1';
const USER_STORAGE_KEY = 'maison_heness_user_v1';

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [user, setUser] = useState(() => readStorage(USER_STORAGE_KEY, null));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addresses, setAddresses] = useState(() => readStorage('maison_heness_addresses_v1', []));
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('maison_heness_addresses_v1', JSON.stringify(addresses || []));
  }, [addresses]);

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity <= 0) return;

    const item = {
      id: String(product.id),
      nom: product.nom || product.name || 'Produit Maison Heness',
      prix: Number(product.prix ?? product.price ?? 0),
      image: product.image || '/images/Boutique/vinaigredegrenadeoriginal.PNG',
      categorie: product.categorie || product.category || 'epicerie',
      quantity: Number(quantity),
    };

    setCart((current) => {
      const existingIndex = current.findIndex((entry) => String(entry.id) === String(item.id));

      if (existingIndex >= 0) {
        const nextCart = [...current];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + item.quantity,
        };
        return nextCart;
      }

      return [...current, item];
    });

    setIsCartOpen(true);
  };

  // --- API-integrated actions ---
  const login = async (credentials) => {
    setLoadingUser(true);
    try {
      const payload = await loginUser(credentials);
      const token = payload?.token || payload?.accessToken || payload?.access_token || payload?.jwt || payload?.data?.token;
      const userData = payload?.user || payload?.data?.user || payload?.data || payload;

      const nextUser = { ...(userData || {}), token };
      setUser(nextUser);
      return nextUser;
    } finally {
      setLoadingUser(false);
    }
  };

  const register = async (data) => {
    setLoadingUser(true);
    try {
      const payload = await registerUser(data);
      const token = payload?.token || payload?.accessToken || payload?.access_token || payload?.jwt || payload?.data?.token;
      const userData = payload?.user || payload?.data?.user || payload?.data || payload;
      const nextUser = { ...(userData || {}), token };
      setUser(nextUser);
      return nextUser;
    } finally {
      setLoadingUser(false);
    }
  };

  const refreshUser = async () => {
    if (!user?.token) return null;
    setLoadingUser(true);
    try {
      const payload = await fetchCurrentUser(user.token);
      const nextUser = { ...(payload || {}), token: user.token };
      setUser(nextUser);
      return nextUser;
    } catch (err) {
      // If token invalid, clear user
      setUser(null);
      return null;
    } finally {
      setLoadingUser(false);
    }
  };

  const createAddress = async (address) => {
    if (!user?.token) throw new Error('Authentification requise');
    const payload = await apiCreateAddress(user.token, address).catch((e) => { throw e; });
    // try to refresh addresses list
    try {
      await loadAddresses();
    } catch {}
    return payload;
  };

  const loadAddresses = async () => {
    if (!user?.token) return [];
    const list = await apiFetchAddresses(user.token);
    setAddresses(Array.isArray(list) ? list : (list?.data || list?.addresses || []));
    return addresses;
  };

  const postCart = async (cartPayload) => {
    return apiPostCart(cartPayload);
  };

  const updateQuantity = (productId, quantity) => {
    setCart((current) => {
      const nextCart = current
        .map((entry) => {
          if (String(entry.id) !== String(productId)) {
            return entry;
          }

          return { ...entry, quantity: Math.max(0, Number(quantity) || 0) };
        })
        .filter((entry) => entry.quantity > 0);

      return nextCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((entry) => String(entry.id) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.prix || 0) * Number(item.quantity || 0), 0),
    [cart]
  );

  const value = useMemo(() => ({
    cart,
    user,
    setUser,
    loadingUser,
    login,
    register,
    refreshUser,
    addresses,
    loadAddresses,
    createAddress,
    postCart,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    logout: () => setUser(null),
  }), [cart, user, isCartOpen, cartCount, cartTotal]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}
