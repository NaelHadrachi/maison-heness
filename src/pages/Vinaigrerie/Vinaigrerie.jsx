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
        </div>
      </header>

      {/* Image principale en pleine largeur */}
      <div className="vg-hero-image">
        <img 
          src="/images/vinaigrerie/MaisonHeness11.jpg" 
          alt="La Vinaigrerie de Lourdes - Sanctuaire des saveurs" 
          loading="lazy"
        />
      </div>

      {/* Contenu principal */}
      <main className="vg-main">
        {/* Section d'introduction */}
        <section className="vg-intro">
          <h2>Un produit vivant, une émotion liquide</h2>
          <p>
            Ce que nous vous proposons dépasse le simple goût : c'est une expérience sensorielle 
            et intime, où l'on redécouvre tout ce qu'un vinaigre peut être. Vivant, noble, subtil, 
            il transforme un plat, éveille une mémoire, fait vibrer les émotions les plus fines.
          </p>
        </section>

        {/* Grille de services */}
        <div className="vg-services-grid">
          <div className="vg-service-card">
            <h3>Nos Créations Alchimiques</h3>
            <p>
              Des vinaigres qui racontent des histoires : notre signature, le vinaigre de grenade, 
              symbole de vitalité, accompagné d'infusions de plantes rares, de macérations fruitées 
              et d'épices du monde entier.
            </p>
          </div>

          <div className="vg-service-card">
            <h3>Expérience Sensorielle</h3>
            <p>
              Dégustation unique et personnalisée dans notre écrin chaleureux. Chaque vinaigre est 
              présenté, raconté, goûté, compris. Une révélation pour les papilles et l'âme.
            </p>
          </div>
        </div>

        {/* Section poétique */}
        <section className="vg-poetic">
          <p>
            Il y a des lieux que l'on visite. Et puis, il y a ceux que l'on vit.<br />
            Notre vinaigrerie n'est ni un simple commerce, ni un atelier ordinaire. C'est un univers, 
            un sanctuaire des saveurs, niché au cœur de Lourdes — entre pierre et lumière, entre 
            spiritualité et terre nourricière.
          </p>
          <p>
            Fermez les yeux. Une goutte sur la langue... et c'est un ailleurs qui s'invite. Une 
            souvenance, une réminiscence d'enfance, une promesse de cuisine sincère et généreuse.
          </p>
        </section>

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
          <p>📍 31 rue de la Grotte – 65100 Lourdes</p>
          <p>
            Que vous soyez curieux, gourmet, amoureux du goût ou simplement de passage à Lourdes : 
            poussez la porte. Vous repartirez transformé.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Vinaigrerie;