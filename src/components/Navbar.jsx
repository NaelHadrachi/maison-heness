import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdminActive = () => {
    return location.pathname.startsWith('/admin');
  };

  const adminConnected =
    localStorage.getItem('maison_heness_admin_session') === 'true' ||
    Boolean(localStorage.getItem('maison_heness_admin_token'));

  return (
    <>
      <header
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">

          <h1 className="logo">
            <Link to="/">
              Maison Heness
            </Link>
          </h1>

          <button
            className={`menu-toggle ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav
            className={`nav-menu ${isOpen ? 'open' : ''}`}
          >
            <ul className="nav-links">

              <li>
                <Link
                  to="/"
                  className={isActive('/') ? 'active' : ''}
                >
                  Accueil
                </Link>
              </li>

              <li>
                <Link
                  to="/notre-histoire"
                  className={
                    isActive('/notre-histoire')
                      ? 'active'
                      : ''
                  }
                >
                  Notre Histoire
                </Link>
              </li>

              <li>
                <Link
                  to="/vinaigrerie"
                  className={
                    isActive('/vinaigrerie')
                      ? 'active'
                      : ''
                  }
                >
                  Vinaigrerie
                </Link>
              </li>

              <li>
                <Link
                  to="/boutique"
                  className={
                    isActive('/boutique')
                      ? 'active'
                      : ''
                  }
                >
                  Boutique
                </Link>
              </li>

              <li>
                <Link
                  to="/cuvee-leon-xiv"
                  className={`cuvee-nav-link ${
                    isActive('/cuvee-leon-xiv')
                      ? 'active'
                      : ''
                  }`}
                >
                  Cuvée Léon XIV
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={
                    isActive('/contact')
                      ? 'active'
                      : ''
                  }
                >
                  Contact
                </Link>
              </li>

              <li className="admin-nav-item">
                <Link
                  to={
                    adminConnected
                      ? '/admin'
                      : '/admin/login'
                  }
                  className={`admin-nav-link ${
                    isAdminActive()
                      ? 'active'
                      : ''
                  }`}
                >
                  <span
                    className="admin-nav-icon"
                    aria-hidden="true"
                  >
                    ◇
                  </span>

                  {adminConnected
                    ? 'Administration'
                    : 'Admin'}
                </Link>
              </li>

            </ul>
          </nav>

        </div>
      </header>

      <div className="navbar-placeholder"></div>
    </>
  );
};

export default Navbar;