import produits from '../data/produits';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://maisonheness.com';
export const API_URL = `${API_BASE_URL}/api`;

const readFirstValue = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const toNumber = (value) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeProduct = (product) => {
  const payload = product ?? {};
  const imageValue = readFirstValue(
    payload.image,
    payload.images?.[0]?.url,
    payload.thumbnail,
    payload.picture,
    payload.media?.[0]?.url,
    payload.cover,
    payload.imageUrl,
    '/images/Boutique/vinaigredegrenadeoriginal.PNG'
  );

  const priceValue = readFirstValue(
    payload.price,
    payload.amount,
    payload.unitPrice,
    payload.prix,
    payload.price_cents !== undefined ? payload.price_cents / 100 : undefined
  );

  return {
    ...payload,
    id: String(readFirstValue(payload.id, payload._id, payload.slug, payload.uuid, payload.productId, payload.code) ?? 'product'),
    nom: readFirstValue(payload.nom, payload.name, payload.title, payload.productName, 'Produit Maison Heness') || 'Produit Maison Heness',
    description: readFirstValue(
      payload.description,
      payload.summary,
      payload.shortDescription,
      'Produit artisanat Maison Heness.'
    ) || 'Produit artisanat Maison Heness.',
    categorie: readFirstValue(payload.categorie, payload.category, payload.categoryName, 'epicerie') || 'epicerie',
    prix: toNumber(priceValue),
    weightInKg: toNumber(readFirstValue(payload.weightInKg, payload.weight, 0.5)), // <--- Conserver le poids du produit
    image: imageValue,
    url: readFirstValue(payload.url, payload.link, payload.shopUrl, payload.externalUrl) || null,
    badge: readFirstValue(payload.badge, payload.label, payload.isFeatured ? 'Nouveauté' : undefined, null),
  };
};

const parseApiResult = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, token, headers = {} } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await parseApiResult(response);

  if (!response.ok) {
    const detail = payload?.message || payload?.error || payload?.details || 'Une erreur de communication avec l’API est survenue.';
    throw new Error(detail);
  }

  return payload ?? {};
}

const unwrapProductCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
};

const unwrapCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.orders)) return payload.orders;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.pages)) return payload.pages;
  return [];
};

export async function fetchProducts() {
  try {
    const payload = await apiRequest('/products');
    const list = unwrapProductCollection(payload);

    if (list.length > 0) {
      return list.map(normalizeProduct);
    }

    return produits;
  } catch {
    return produits;
  }
}

export async function fetchProductById(productId) {
  try {
    const payload = await apiRequest(`/products/${productId}`);
    return normalizeProduct(payload);
  } catch {
    const match = produits.find((product) => String(product.id) === String(productId));
    return match ?? null;
  }
}

export async function createCheckoutSession(payload) {
  return apiRequest('/checkout/session', {
    method: 'POST',
    body: payload,
  });
}

export async function loginUser(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export async function registerUser(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export async function fetchCurrentUser(token) {
  return apiRequest('/auth/me', { token });
}


export { normalizeProduct };

// --- Additional API helpers ---

async function fetchBinary(endpoint, options = {}) {
  const { method = 'GET', body, token, headers = {} } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let detail = 'Une erreur réseau';
    try {
      const payload = await response.json();
      detail = payload?.message || payload?.error || detail;
    } catch {}
    throw new Error(detail);
  }

  return response.blob();
}

export async function createAddress(token, address) {
  return apiRequest('/users/address', { method: 'POST', body: address, token });
}

export async function fetchAddresses(token) {
  return apiRequest('/users/addresses', { token });
}

export async function postCart(cartPayload) {
  return apiRequest('/cart', { method: 'POST', body: cartPayload });
}


export async function createShipmentTest(payload, token) {
  return apiRequest('/shipping/shipments/test', { method: 'POST', body: payload, token });
}

export async function downloadShipmentLabel(shipmentNumber, token) {
  const blob = await fetchBinary(`/shipping/shipments/${encodeURIComponent(shipmentNumber)}/label`, { token });
  return blob;
}


// Admin: pages
export async function adminCreatePage(token, payload) {
  return apiRequest('/pages', { method: 'POST', body: payload, token });
}

export async function adminPublishPage(id, token) {
  return apiRequest(`/pages/${encodeURIComponent(id)}/publish`, { method: 'POST', token });
}

export async function adminUnpublishPage(id, token) {
  return apiRequest(`/pages/${encodeURIComponent(id)}/unpublish`, { method: 'POST', token });
}

export async function fetchAdminOrders(token, params = {}) {
  const query = new URLSearchParams();

  if (params.status) query.set('status', params.status);
  if (params.limit) query.set('limit', String(params.limit));

  const suffix = query.toString() ? `?${query.toString()}` : '';
  const payload = await apiRequest(`/orders${suffix}`, { token });
  return unwrapCollection(payload);
}

export async function fetchAdminOrderById(id, token) {
  return apiRequest(`/orders/${encodeURIComponent(id)}`, { token });
}

export async function updateAdminOrderStatus(id, status, token) {
  return apiRequest(`/orders/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { status },
    token,
  });
}

export async function fetchAdminUsers(token) {
  const payload = await apiRequest('/auth/me', { token });

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.user) return [payload.user];

  return [payload].filter(Boolean);
}

export async function fetchAdminProducts(token) {
  const payload = await apiRequest('/products', { token });
  return unwrapCollection(payload);
}

export async function fetchAdminPages(token) {
  const payload = await apiRequest('/pages', { token });
  return unwrapCollection(payload);
}

export async function createAdminProduct(token, payload) {
  return apiRequest('/products', {
    method: 'POST',
    body: payload,
    token,
  });
}

export async function updateAdminProduct(id, token, payload) {
  return apiRequest(`/products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: payload,
    token,
  });
}

export async function deleteAdminProduct(id, token) {
  return apiRequest(`/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  });
}

export async function createAdminPage(token, payload) {
  return apiRequest('/pages', {
    method: 'POST',
    body: payload,
    token,
  });
}

export async function updateAdminPage(id, token, payload) {
  return apiRequest(`/pages/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: payload,
    token,
  });
}

export async function deleteAdminPage(id, token) {
  return apiRequest(`/pages/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  });
}

export async function publishAdminPage(id, token) {
  return apiRequest(`/pages/${encodeURIComponent(id)}/publish`, {
    method: 'POST',
    token,
  });
}

export async function unpublishAdminPage(id, token) {
  return apiRequest(`/pages/${encodeURIComponent(id)}/unpublish`, {
    method: 'POST',
    token,
  });
}

export async function presignUpload(token, payload) {
  return apiRequest('/uploads/presign', {
    method: 'POST',
    body: payload,
    token,
  });
}

/**
 * Récupère la liste des fichiers/images stockés sur MinIO (GET /api/uploads/files)
 */
export async function fetchMinioFiles(token, bucketName) {
  const query = bucketName ? `?bucketName=${encodeURIComponent(bucketName)}` : '';
  return apiRequest(`/uploads/files${query}`, { token });
}

/**
 * Upload direct d'une image produit vers le bucket 'maison-heness-products' (POST /api/uploads/product-image)
 */
export async function uploadProductImage(token, file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/uploads/product-image`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Ne PAS définir 'Content-Type', fetch ajoute automatiquement la limite (boundary) multipart/form-data
    },
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Erreur lors de l’upload de l’image.');
  }

  return payload;
}


/**
 * Rechercher des points relais Mondial Relay
 * GET /api/shipping/pickup-points
 * Query params: postalCode (obligatoire), country (obligatoire)
 */
export async function fetchShippingPickupPoints(params = {}, token = null) {
  const { postalCode, country = 'FR', ...otherParams } = params;

  if (!postalCode) {
    throw new Error('Le code postal (postalCode) est obligatoire pour rechercher un point relais.');
  }

  const query = new URLSearchParams({
    postalCode: String(postalCode).trim(),
    country: String(country).toUpperCase().trim(),
  });

  // Paramètres optionnels supplémentaires
  Object.entries(otherParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });

  return apiRequest(`/shipping/pickup-points?${query.toString()}`, { token });
}

/**
 * Créer une expédition de colis
 * POST /api/shipping/shipments
 * Body: { shipper, recipient, pickupPointId, pickupPointCountry, weight, reference, value }
 */
export async function createShipment(payload, token = null) {
  return apiRequest('/shipping/shipments', {
    method: 'POST',
    body: payload,
    token,
  });
}

/**
 * Suivre le statut d’une expédition
 * GET /api/shipping/track
 * Query params: shipmentNumber (obligatoire)
 */
export async function trackShipment(shipmentNumber) {
  if (!shipmentNumber) {
    throw new Error('Le numéro d’expédition (shipmentNumber) est obligatoire.');
  }

  const query = new URLSearchParams({
    shipmentNumber: String(shipmentNumber).trim(),
  });

  return apiRequest(`/shipping/track?${query.toString()}`);
}


export async function fetchPages() {
  return apiRequest('/pages');
}

export async function fetchPageById(id) {
  return apiRequest(`/pages/${encodeURIComponent(id)}`);
}

export async function fetchPageBySlug(slug) {
  return apiRequest(`/pages/slug/${encodeURIComponent(slug)}`);
}

export async function updateAdminUser(id, token, payload) {
  return apiRequest(`/users/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: payload,
    token,
  });
}
