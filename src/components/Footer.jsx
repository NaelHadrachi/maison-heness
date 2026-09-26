import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-[#d9cbb2] bg-[#4a311f] text-[#f5e7d9]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#f0d5a2]">Maison Heness</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#ecdcc5]">
              Une maison de produits d'exception d'Occitanie, chaleureuse au cœur de Lourdes, alliant confort moderne et charme traditionnel.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#f0d5a2]">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#ecdcc5]">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#f0d5a2]" />
                <span>31 rue de la Grotte, Lourdes</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#f0d5a2]" />
                <span>07 70 71 23 62</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#f0d5a2]" />
                <span>maison.heness@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#f0d5a2]">Réseaux sociaux</h4>
            <div className="mt-4 flex gap-3">
              <a 
                href="https://www.instagram.com/maison_heness/" 
                aria-label="Instagram" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2b48c]/50 bg-white/5 text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61577980330263" 
                aria-label="Facebook" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2b48c]/50 bg-white/5 text-[#f5e7d9] transition hover:border-[#f3d9a0] hover:text-[#f3d9a0]"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#d2b48c]/25 pt-6 text-sm text-[#ecdcc5]">
          <p>
            Powered by <strong className="text-[#f0d5a2]">NaexiumTech</strong> — for any website request, contact us at:{' '}
            <a 
              href="mailto:naexiumtech@gmail.com" 
              className="text-[#f0d5a2] underline underline-offset-2 hover:text-[#f7e5c5]"
            >
              naexiumtech@gmail.com
            </a>
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Maison Heness. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
