import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Fichier CSS séparé recommandé

const Home = () => (
  <main className="home-container">
    {/* Section Hero avec votre photo de magasin */}
    <section className="hero-section">
      <img 
        src="/images/home/magasinhabib.jpeg" 
        alt="Magasin Maison Heness" 
        className="hero-image"
      />
      <div className="hero-content">
        <h1>Bienvenue à la Maison Heness</h1>
        <p className="subtitle">Découvrez nos vinaigres artisanaux d'exception</p>
        <Link to="/boutique" className="cta-button">Explorer la boutique</Link>
      </div>
    </section>

    {/* Section Process avec votre photo de tonneau */}
    <section className="process-section">
      <div className="process-content">
        <h2>Notre Savoir-Faire Artisanal</h2>
        <p>
           Nous produisons nos vinaigres avec passion selon des méthodes artisanales,
      en accordant un soin particulier à la sélection des ingrédients et au processus
      de fabrication. Chaque étape reflète notre engagement envers la qualité.
        </p>
        <Link to="/notre-histoire" className="text-link">Notre histoire →</Link>
      </div>
      <img 
        src="/images/home/tonneauvinaigrerie.jpg" 
        alt="Tonneaux de vieillissement Maison Heness" 
        className="process-image"
      />
    </section>

    {/* Produits phares */}
    <section className="products-section">
      <h2>Nos Créations Signature</h2>
      <div className="products-grid">
        <div className="product-card">
          <div className="product-image-placeholder"></div>
          <h3>Vinaigre de Cidre</h3>
          <p>Pur jus de pommes normandes fermenté</p>
          <span className="price">12,50€</span>
        </div>
        <div className="product-card">
          <div className="product-image-placeholder"></div>
          <h3>Balsamique Blanc</h3>
          <p>Vieilli 3 ans en fût de chêne</p>
          <span className="price">18,90€</span>
        </div>
        <div className="product-card">
          <div className="product-image-placeholder"></div>
          <h3>Vinaigre aux Framboises</h3>
          <p>Fruité et délicat</p>
          <span className="price">15,20€</span>
        </div>
      </div>
      <Link to="/boutique" className="cta-button secondary">Voir tous les produits</Link>
    </section>
  </main>
);

export default Home;