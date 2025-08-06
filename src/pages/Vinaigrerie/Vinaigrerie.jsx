import React from 'react';
import './Vinaigrerie.css';

const Vinaigrerie = () => {
  return (
    <div className="vg-container">
      {/* En-tête minimaliste */}
      <header className="vg-header">
        <div className="vg-header-content">
          <h1 className="vg-title">La Vinaigrerie de Lourdes</h1>
          <div className="vg-header-line"></div>
          <p className="vg-subtitle">Artisanat vinaigrier depuis 1987</p>
        </div>
      </header>

      {/* Image principale en pleine largeur */}
      <div className="vg-hero-image">
        <img 
          src="/images/vinaigrerie/MaisonHeness11.jpg" 
          alt="La Maison Heness - Vinaigrerie artisanale" 
          loading="lazy"
        />
      </div>

      {/* Contenu principal */}
      <main className="vg-main">
        {/* Section d'introduction */}
        <section className="vg-intro">
          <h2>L'excellence du vinaigre artisanal</h2>
          <p>
            Nichée au cœur de Lourdes, notre vinaigrerie perpétue un savoir-faire ancestral 
            pour créer des vinaigres d'exception aux arômes uniques.
          </p>
        </section>

        {/* Grille de services */}
        <div className="vg-services-grid">
          <div className="vg-service-card">
            <h3>Nos Créations</h3>
            <p>
              Vinaigres vieillis en fûts de chêne, assemblages fruités et compositions 
              gastronomiques pour sublimer vos plats.
            </p>
          </div>

          <div className="vg-service-card">
            <h3>Ateliers Découverte</h3>
            <p>
              Initiation à l'art vinaigrier et dégustations commentées dans notre 
              atelier historique.
            </p>
          </div>
        </div>

        {/* Carte de localisation */}
        <div className="vg-map-wrapper">
          <iframe
            title="Localisation de la vinaigrerie"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.732254143712!2d-0.0528579!3d43.7251234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5623e7b1b12aab%3A0x31b5a5c9e5d7f8a0!2s31%20Rue%20de%20la%20Grotte%2C%2065100%20Lourdes!5e0!3m2!1sfr!2sfr!4v${Math.floor(Date.now()/1000)}`}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Coordonnées */}
        <div className="vg-contact">
          <p>31 rue de la Grotte • 65100 Lourdes</p>
          <p>Ouvert du mardi au samedi, 10h-12h30 / 14h-18h</p>
        </div>
      </main>
    </div>
  );
};

export default Vinaigrerie;