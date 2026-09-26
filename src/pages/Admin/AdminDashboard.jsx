import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import OverviewSection from './sections/OverviewSection';
import OrdersSection from './sections/OrdersSection';
import ShippingSection from './sections/ShippingSection';
import ProductsSection from './sections/ProductsSection';
import PagesSection from './sections/PagesSection';
import PageBuilderSection from './sections/PageBuilderSection';
import UsersSection from './sections/UsersSection';
import MediaSection from './sections/MediaSection';

import {
  fetchAdminOrders,
  fetchAdminProducts,
  fetchAdminUsers,
  fetchAdminPages,
  fetchShippingPickupPoints,
  createAdminPage,
  updateAdminPage,
} from '../../services/api';

import {
  ADMIN_TOKEN_KEY,
  ADMIN_PROFILE_KEY,
  normalizeCollection,
  createBuilderPage,
  createSection,
  toSlug,
  toNumber,
} from '../../utils/adminHelpers';

const updateSectionInArray = (sections, sectionId, updater) =>
  sections.map((section) => (section.id === sectionId ? updater(section) : section));

const updateBuilderContent = (section, field, value) => ({
  ...section,
  content: {
    ...(section.content || {}),
    [field]: value,
  },
});

const buildShipmentsFromOrders = (ordersList = []) => {
  const normalizedOrders = normalizeCollection(ordersList);

  return normalizedOrders
    .filter((order) =>
      order?.shipmentNumber ||
      order?.trackingNumber ||
      order?.reference ||
      order?.shippingStatus ||
      order?.deliveryStatus ||
      order?.shipping ||
      order?.status ||
      order?.state
    )
    .map((order, index) => {
      const status = String(
        order?.shippingStatus || order?.deliveryStatus || order?.status || order?.state || 'PENDING'
      ).toUpperCase();

      return {
        id: order?.shipmentId || order?.id || `shipment-${index + 1}`,
        reference:
          order?.reference ||
          order?.shipmentNumber ||
          order?.trackingNumber ||
          `CMD-${String(order?.id || index + 1).slice(-6)}`,
        weight: Number(order?.weight ?? order?.totalWeight ?? order?.shippingWeight ?? 0) || 0,
        status,
      };
    });
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [builderPage, setBuilderPage] = useState(() => createBuilderPage());

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    const rawProfile = localStorage.getItem(ADMIN_PROFILE_KEY);

    let isAdmin = false;
    let parsedProfile = null;

    try {
      parsedProfile = JSON.parse(rawProfile || '{}');
      if (storedToken && parsedProfile?.role === 'ADMIN') {
        isAdmin = true;
      }
    } catch {
      isAdmin = false;
    }

    if (!storedToken || !isAdmin) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_PROFILE_KEY);
      navigate('/admin/login');
      return;
    }

    setToken(storedToken);
    setCurrentUser(parsedProfile);
    fetchData(storedToken);
  }, [navigate]);

  const fetchData = async (authToken = token) => {
    try {
      const [ordersData, productsData, usersData, pagesData, pickupPointsData] = await Promise.all([
        fetchAdminOrders(authToken),
        fetchAdminProducts(authToken),
        fetchAdminUsers(authToken),
        fetchAdminPages(authToken),
        fetchShippingPickupPoints({}, authToken).catch(() => []),
      ]);

      const normalizedOrders = normalizeCollection(ordersData);
      const normalizedProducts = normalizeCollection(productsData);
      const normalizedUsers = normalizeCollection(usersData);
      const normalizedPages = normalizeCollection(pagesData);
      const normalizedPickupPoints = normalizeCollection(pickupPointsData);

      setOrders(normalizedOrders);
      setProducts(normalizedProducts);
      setUsers(normalizedUsers);
      setPages(normalizedPages);
      setPickupPoints(normalizedPickupPoints);
      setShipments(buildShipmentsFromOrders(normalizedOrders));
    } catch (fetchError) {
      setError(fetchError.message || 'Erreur lors du chargement des données.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_PROFILE_KEY);
    setToken(null);
    setCurrentUser(null);
    navigate('/admin/login');
  };

  const handleBuilderPageSubmit = async (event) => {
    event.preventDefault();
    if (!token) return;

    const title = builderPage.title.trim();
    if (!title) {
      setError('Le titre de la page est obligatoire.');
      return;
    }

    try {
      setError('');
      const payload = {
        title,
        slug: (builderPage.slug || toSlug(title)).trim(),
        published: Boolean(builderPage.published),
        showInNavbar: Boolean(builderPage.showInNavbar),
        navbarLabel: builderPage.navbarLabel || title,
        navbarOrder: toNumber(builderPage.navbarOrder || 1),
        seoTitle: builderPage.seoTitle || title,
        seoDescription: builderPage.seoDescription || '',
        sections: (builderPage.sections || []).map((section) => ({
          id: section.id,
          type: section.type,
          content: section.content || {},
        })),
      };

      if (builderPage.id) {
        await updateAdminPage(builderPage.id, token, payload);
        setNotice('La page a bien été mise à jour.');
      } else {
        await createAdminPage(token, payload);
        setNotice('La page a bien été créée.');
      }

      await fetchData(token);
      setBuilderPage(createBuilderPage({
        title: '',
        slug: '',
        published: true,
        showInNavbar: true,
        navbarLabel: '',
        navbarOrder: 1,
        seoTitle: '',
        seoDescription: '',
        sections: [createSection('hero', { heading: 'Nouvelle page', subheading: 'Commencez votre contenu ici.' })],
      }));
    } catch (submitError) {
      setError(submitError.message || 'La sauvegarde de la page a échoué.');
    }
  };

  const handleAddBuilderSection = (type) => {
    setBuilderPage((current) => ({
      ...current,
      sections: [...(current.sections || []), createSection(type)],
    }));
  };

  const handleRemoveBuilderSection = (sectionId) => {
    setBuilderPage((current) => ({
      ...current,
      sections: (current.sections || []).filter((section) => section.id !== sectionId),
    }));
  };

  const handleMoveBuilderSection = (fromId, toId) => {
    if (!fromId || !toId || fromId === toId) return;

    setBuilderPage((current) => {
      const nextSections = [...(current.sections || [])];
      const fromIndex = nextSections.findIndex((section) => section.id === fromId);
      const toIndex = nextSections.findIndex((section) => section.id === toId);

      if (fromIndex < 0 || toIndex < 0) return current;

      const [moved] = nextSections.splice(fromIndex, 1);
      nextSections.splice(toIndex, 0, moved);
      return { ...current, sections: nextSections };
    });
  };

  const handleBuilderFieldChange = (sectionId, field, value) => {
    setBuilderPage((current) => ({
      ...current,
      sections: updateSectionInArray(current.sections || [], sectionId, (section) =>
        updateBuilderContent(section, field, value)
      ),
    }));
  };

  return (
    <div className="flex h-screen flex-col bg-[#F5F5F4]">
      {/* AdminHeader reçoit les données utilisateur exactes */}
      <AdminHeader onLogout={handleLogout} user={currentUser} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixe à gauche sans déformation de largeur */}
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Zone de contenu défilante */}
        <main className="flex-1 overflow-y-auto p-6 text-[#f5e7d9]">
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-950/40 p-4 text-sm text-red-200 backdrop-blur-sm">
              <span>{error}</span>
              <button onClick={() => setError('')} className="font-bold text-red-400 hover:text-red-200">✕</button>
            </div>
          )}
          
          {notice && (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-4 text-sm text-emerald-200 backdrop-blur-sm">
              <span>{notice}</span>
              <button onClick={() => setNotice('')} className="font-bold text-emerald-400 hover:text-emerald-200">✕</button>
            </div>
          )}

          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'orders' && <OrdersSection orders={orders} token={token} />}
          {activeSection === 'shipping' && (
            <ShippingSection shipments={shipments} token={token} setNotice={setNotice} setError={setError} />
          )}
          {activeSection === 'products' && <ProductsSection products={products} token={token} />}
          {activeSection === 'pages' && <PagesSection pages={pages} token={token} />}
          {activeSection === 'builder' && (
            <PageBuilderSection
              builderPage={builderPage}
              setBuilderPage={setBuilderPage}
              handleBuilderPageSubmit={handleBuilderPageSubmit}
              handleAddBuilderSection={handleAddBuilderSection}
              handleRemoveBuilderSection={handleRemoveBuilderSection}
              handleMoveBuilderSection={handleMoveBuilderSection}
              handleBuilderFieldChange={handleBuilderFieldChange}
              setActiveSection={setActiveSection}
            />
          )}
          {activeSection === 'users' && (
            <UsersSection
              users={users}
              token={token}
              setNotice={setNotice}
              setError={setError}
              loadDashboard={fetchData}
            />
          )}
          {activeSection === 'media' && <MediaSection token={token} setNotice={setNotice} setError={setError} />}
        </main>
      </div>
    </div>
  );
}