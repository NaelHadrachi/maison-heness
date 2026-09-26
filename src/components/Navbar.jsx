import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { fetchPages } from '../services/api';
import './Navbar.css';

const navLinkBase = 'relative inline-flex items-center px-2 py-2 text-sm font-medium transition-colors duration-200';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dynamicPages, setDynamicPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCuveesOpen, setIsCuveesOpen] = useState(false);

  const navRef = useRef(null);
  const { cartCount, openCart, user, logout } = useStore();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsCuveesOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsCuveesOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const pages = await fetchPages();
        const visiblePages = Array.isArray(pages)
          ? pages.filter((page) => page.published && page.showInNavbar)
          : [];
        visiblePages.sort((a, b) => (a.navbarOrder || 0) - (b.navbarOrder || 0));
        setDynamicPages(visiblePages);
      } catch (err) {
        console.error('Erreur lors du chargement des pages:', err);
      } finally {
        setLoadingPages(false);
      }
    };

    loadPages();
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsCuveesOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;
  const isActiveDynamicPage = (slug) => location.pathname === `/page/${slug}`;
  const isAdminActive = () => location.pathname.startsWith('/admin');
  const adminConnected =
    localStorage.getItem('la_providence_admin_session') === 'true' ||
    Boolean(localStorage.getItem('la_providence_admin_token')) ||
    localStorage.getItem('maison_heness_admin_session') === 'true' ||
    Boolean(localStorage.getItem('maison_heness_admin_token'));

  // Liens de base
  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/notre-histoire', label: 'Notre Histoire' },
    { to: '/vinaigrerie', label: 'Vinaigrerie' },
    { to: '/boutique', label: 'Boutique' },
  ];

  const cuveesLinks = [
    { to: '/cuvee-leon-xiv', label: 'Léon XIV' },
    { to: '/4voleurs', label: '4 Voleurs' },
    { to: '/cuvee-bernadouce', label: 'Bernadouces' },
  ];

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    setIsCuveesOpen(false);
  };

  const handleLinkClick = () => {
    handleDropdownClose();
    setIsOpen(false);
  };

  const isCuveeActive = cuveesLinks.some((link) => isActive(link.to));

  return (
    <header className={`sticky top-0 z-50 border-b border-[#d2b48c]/30 bg-[#5c3a21]/95 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'shadow-[0_8px_22px_rgba(44,29,18,0.18)]' : 'shadow-sm'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8" ref={navRef}>
        
        {/* Titre de marque mis à jour */}
        <Link to="/" className="whitespace-nowrap font-serif text-2xl font-bold tracking-[0.02em] text-[#e3c596] transition hover:text-[#f7e5c5]">
          La Providence
        </Link>

        {/* Bouton Hamburger Mobile */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d2b48c]/35 bg-white/5 text-[#f7e5c5] lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>

        {/* Backdrop Mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Navigation principale */}
        <nav className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-y-0 right-0 top-0 z-40 flex w-full max-w-sm flex-col justify-center gap-6 bg-[#4b2d1c] p-6 shadow-2xl transition-transform duration-300 lg:static lg:w-auto lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          <ul className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-center lg:gap-5">
            
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={handleLinkClick}
                  className={`${navLinkBase} ${isActive(to) ? 'text-[#f3d9a0]' : 'text-[#f5e7d9] hover:text-[#f3d9a0]'}`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Menu Nos Cuvées */}
            <li className="dropdown-container w-full lg:w-auto lg:relative">
              <button
                type="button"
                onClick={() => {
                  setIsCuveesOpen(!isCuveesOpen);
                  setIsDropdownOpen(false);
                }}
                className={`${navLinkBase} inline-flex items-center gap-1 ${
                  isCuveesOpen || isCuveeActive ? 'text-[#f3d9a0]' : 'text-[#f5e7d9] hover:text-[#f3d9a0]'
                }`}
                aria-expanded={isCuveesOpen}
              >
                Nos Cuvées
                <span className={`text-[10px] transition-transform ${isCuveesOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isCuveesOpen && (
                <div className="dropdown-menu mt-2 flex w-full flex-col rounded-lg bg-[#3d2416] py-2 shadow-lg lg:absolute lg:left-0 lg:right-auto lg:w-48 lg:border lg:border-[#d2b48c]/30 lg:bg-[#4b2d1c]">
                  {cuveesLinks.map((cuvee) => (
                    <Link
                      key={cuvee.to}
                      to={cuvee.to}
                      onClick={handleLinkClick}
                      className={`px-4 py-2 text-sm transition-colors ${
                        isActive(cuvee.to)
                          ? 'bg-[#5c3a21] text-[#f3d9a0]'
                          : 'text-[#f5e7d9] hover:bg-[#5c3a21] hover:text-[#f3d9a0]'
                      }`}
                    >
                      {cuvee.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Pages Dynamiques */}
            {!loadingPages && dynamicPages.length > 0 && (
              <li className="dropdown-container w-full lg:w-auto lg:relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsCuveesOpen(false);
                  }}
                  className={`${navLinkBase} inline-flex items-center gap-1 ${
                    isDropdownOpen || dynamicPages.some((p) => isActiveDynamicPage(p.slug))
                      ? 'text-[#f3d9a0]'
                      : 'text-[#f5e7d9] hover:text-[#f3d9a0]'
                  }`}
                  aria-expanded={isDropdownOpen}
                >
                  Plus
                  <span className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu mt-2 flex w-full flex-col rounded-lg bg-[#3d2416] py-2 shadow-lg lg:absolute lg:right-0 lg:w-48 lg:border lg:border-[#d2b48c]/30 lg:bg-[#4b2d1c]">
                    {dynamicPages.map((page) => (
                      <Link
                        key={page.id}
                        to={`/page/${page.slug}`}
                        onClick={handleLinkClick}
                        className={`px-4 py-2 text-sm transition-colors ${
                          isActiveDynamicPage(page.slug)
                            ? 'bg-[#5c3a21] text-[#f3d9a0]'
                            : 'text-[#f5e7d9] hover:bg-[#5c3a21] hover:text-[#f3d9a0]'
                        }`}
                      >
                        {page.navbarLabel || page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            )}

            <li>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className={`${navLinkBase} ${isActive('/contact') ? 'text-[#f3d9a0]' : 'text-[#f5e7d9] hover:text-[#f3d9a0]'}`}
              >
                Contact
              </Link>
            </li>

            {/* Gestion Utilisateur Dynamique */}
            {user ? (
              <li>
                <Link
                  to="/settings"
                  onClick={handleLinkClick}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive('/settings')
                      ? 'border-[#f3d9a0] bg-white/10 text-[#f3d9a0]'
                      : 'border-[#d2b48c]/40 bg-white/5 text-[#f5e7d9] hover:border-[#f3d9a0] hover:text-[#f3d9a0]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span>{user.firstName || user.email || 'Mon Compte'}</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/connexion"
                  onClick={handleLinkClick}
                  className={`${navLinkBase} ${isActive('/connexion') ? 'text-[#f3d9a0]' : 'text-[#f5e7d9] hover:text-[#f3d9a0]'}`}
                >
                  Connexion
                </Link>
              </li>
            )}

            {/* Bouton Panier */}
            <li>
              <button
                type="button"
                onClick={() => {
                  openCart();
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#d2b48c]/40 bg-white/5 px-4 py-2 text-sm font-semibold text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
              >
                Panier
                {cartCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9b577] px-1 text-xs font-bold text-[#2a1d12]">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

            {/* Déconnexion */}
            {user && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center rounded-full border border-[#d2b48c]/40 bg-white/5 px-4 py-2 text-sm font-semibold text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
                >
                  Déconnexion
                </button>
              </li>
            )}

            {/* Accès Admin */}
            {adminConnected && (
              <li>
                <Link
                  to="/admin"
                  onClick={handleLinkClick}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isAdminActive()
                      ? 'border-[#f3d9a0] bg-white/10 text-white'
                      : 'border-[#d2b48c]/40 bg-white/5 text-[#f5e7d9] hover:border-[#f3d9a0] hover:text-[#f3d9a0]'
                  }`}
                >
                  <span aria-hidden="true" className="text-[10px]">◇</span>
                  Administration
                </Link>
              </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
}