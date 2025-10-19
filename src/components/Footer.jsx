import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Maison Heness</h3>
            <p className="footer-text">
              Une maison de produits d'exception d'Occitanie, chaleureuse au cœur de Lourdes, alliant confort moderne et charme traditionnel.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <FaMapMarkerAlt className="footer-icon" />
                <span>31 rue de la Grotte, Lourdes</span>
              </li>
              <li>
                <FaPhone className="footer-icon" />
                <span>06 89 42 64 38</span>
              </li>
              <li>
                <FaEnvelope className="footer-icon" />
                <span>maison.heness@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Réseaux sociaux</h4>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/maison_heness/" 
                aria-label="Instagram" 
                className="social-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61577980330263" 
                aria-label="Facebook" 
                className="social-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="made-by">
            Site réalisé par <strong>NaexiumTech</strong> — pour toute demande de site, contactez-nous à :{" "}
            <a
              href="mailto:naexiumtech@gmail.com"
              className="footer-link"
            >
              naexiumtech@gmail.com
            </a>
          </p>
          <p className="copyright">
            &copy; {new Date().getFullYear()} Maison Heness. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
