import React from 'react';
import './Vinaigrerie.css';

const Vinaigrerie = () => {
  return (
    <div className="vinaigrerie-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>La Vinaigrerie de Lourdes</h1>
          <p className="hero-subtitle">Une invitation aux sens, à la découverte, à l'émotion</p>
          <div className="hero-decoration"></div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            title="Emplacement de la Vinaigrerie Maison Heness"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.732254143712!2d-0.0528579!3d43.7251234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5623e7b1b12aab%3A0x31b5a5c9e5d7f8a0!2s31%20Rue%20de%20la%20Grotte%2C%2065100%20Lourdes!5e0!3m2!1sfr!2sfr!4v${Math.floor(Date.now()/1000)}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="location-info">
            <h2 className="section-title">📍 Notre Atelier</h2>
            <address>
              31 rue de la Grotte<br />
              65100 Lourdes
            </address>
            
            <div className="opening-hours">
              <h3>Horaires</h3>
              <ul>
                <li><span>Lun-Ven:</span> 9h30 - 18h30</li>
                <li><span>Sam:</span> 10h - 19h</li>
                <li><span>Dim:</span> 11h - 17h</li>
              </ul>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir//31+Rue+de+la+Grotte,+65100+Lourdes/" 
              className="direction-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Obtenir l'itinéraire</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section">
        <div className="content-block">
          <h2 className="section-title">Il y a des lieux que l'on visite. Et puis, il y a ceux que l'on vit.</h2>
          <p className="content-text">
            Notre vinaigrerie n'est ni un simple commerce, ni un atelier ordinaire. 
            C'est un univers, un sanctuaire des saveurs, niché au cœur de Lourdes — 
            entre pierre et lumière, entre spiritualité et terre nourricière.
          </p>
        </div>

        <div className="content-block highlighted-block">
          <h2 className="section-title">Un produit vivant, une émotion liquide</h2>
          <p className="content-text">
            Ce que nous vous proposons dépasse le simple goût : c'est une expérience 
            sensorielle et intime, où l'on redécouvre tout ce qu'un vinaigre peut être. 
            Vivant, noble, subtil, il transforme un plat, éveille une mémoire, 
            fait vibrer les émotions les plus fines.
          </p>
        </div>

        {/* Additional content blocks... */}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Plus qu'une visite, une révélation</h2>
          <p className="cta-text">
            Que vous soyez curieux, gourmet, amoureux du goût ou simplement de passage à Lourdes : 
            poussez la porte. Vous repartirez transformé.
          </p>
          <button className="cta-button">
            Planifier votre visite
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12H16M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Vinaigrerie;