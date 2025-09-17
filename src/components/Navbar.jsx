import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Empêche le défilement de la page lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <h1 className="logo">
            <Link to="/">Maison Heness</Link>
          </h1>
          
          <div 
            className={`menu-toggle ${isOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li>
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/notre-histoire" 
                  className={location.pathname === '/notre-histoire' ? 'active' : ''}
                >
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link 
                  to="/vinaigrerie" 
                  className={location.pathname === '/vinaigrerie' ? 'active' : ''}
                >
                  Vinaigrerie
                </Link>
              </li>
              <li>
                <Link 
                  to="/boutique" 
                  className={location.pathname === '/boutique' ? 'active' : ''}
                >
                  Boutique
                </Link>
              </li>
             
              <li>
                <Link 
                  to="/contact" 
                  className={location.pathname === '/contact' ? 'active' : ''}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Espace réservé pour éviter que le contenu soit caché par la navbar */}
      <div className="navbar-placeholder"></div>
    </>
  );
};

export default Navbar;