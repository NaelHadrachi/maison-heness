export const ADMIN_TOKEN_KEY = 'maison_heness_admin_token';
export const ADMIN_PROFILE_KEY = 'maison_heness_admin_profile';

export const statusClasses = {
  PENDING: 'bg-[#fff1d8] text-[#7d5c2b]',
  PAID: 'bg-[#e7f7ee] text-[#1d6b4d]',
  SHIPPED: 'bg-[#e8f0ff] text-[#365db1]',
  DELIVERED: 'bg-[#e9ebf7] text-[#3e4b8f]',
  CANCELLED: 'bg-[#fde8e8] text-[#9a3f3f]',
  ACTIVE: 'bg-[#e8f7ec] text-[#1d6b4d]',
  DRAFT: 'bg-[#f5eedc] text-[#7a5a2c]',
  PUBLISHED: 'bg-[#eaf5ec] text-[#2d6a3d]',
  CUSTOMER: 'bg-[#f5efe9] text-[#5c4a3c]',
  ADMIN: 'bg-[#eae1d1] text-[#3c2b21]',
  DEFAULT: 'bg-[#f5efe9] text-[#5c4a3c]',
};

export const normalizeCollection = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.orders)) return value.orders;
  if (Array.isArray(value?.users)) return value.users;
  if (Array.isArray(value?.products)) return value.products;
  if (Array.isArray(value?.pages)) return value.pages;
  return [];
};

export const toNumber = (value) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const toSlug = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'nouvelle-page';

export const formatCurrency = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(toNumber(value));

export const getOrderStatus = (order) => String(order?.status || order?.state || 'PENDING').toUpperCase();
export const getPageStatus = (page) => (page?.published === true || page?.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT');

export const makeId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const createSection = (type = 'hero', content = {}) => ({
  id: makeId(),
  type,
  content: { ...getSectionDefaultContent(type), ...content },
});

export const getSectionDefaultContent = (type) => {
  switch (type) {
    case 'hero': return { heading: 'Nouveau titre', subheading: 'Sous-titre' };
    case 'heading': return { text: 'Nouveau sous-titre' };
    case 'text': return { text: 'Rédigez votre contenu ici...' };
    case 'richText': return { html: '<p>Votre contenu HTML.</p>' };
    case 'cta': return { heading: 'Une question ?', description: 'Cliquez ici', buttonText: 'Découvrir', buttonUrl: '/boutique' };
    case 'features': return { title: 'Nos engagements', items: [{ title: 'Qualité Premium', description: 'Description' }] };
    case 'image': return { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', alt: 'Image', caption: 'Légende' };
    case 'gallery': return { title: 'Galerie', images: [] };
    default: return {};
  }
};

export const createBuilderPage = (source = {}) => ({
  id: source.id || null,
  title: source.title || '',
  slug: source.slug || '',
  published: source.published ?? true,
  showInNavbar: source.showInNavbar ?? true,
  navbarLabel: source.navbarLabel || source.title || '',
  navbarOrder: source.navbarOrder ?? 1,
  seoTitle: source.seoTitle || source.title || '',
  seoDescription: source.seoDescription || '',
  sections: Array.isArray(source.sections) && source.sections.length > 0
    ? source.sections.map((section) => ({ ...section, id: section.id || makeId(), content: section.content || {} }))
    : [createSection('hero', { heading: 'Titre principal', subheading: 'Sous-titre' })],
});