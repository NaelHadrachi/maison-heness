import React from 'react';
import { Link } from 'react-router-dom';
import produits from '../../data/produits';
import './Boutique.css';

const Boutique = () => {
  const categories = [
    {
      id: 'vinaigre-grenade',
      nom: 'Vinaigres de Grenade (100ml)',
      produits: produits.filter(p => p.categorie === 'vinaigre-grenade')
    },
    {
      id: 'vinaigre-balsamique',
      nom: 'Vinaigres Balsamiques',
      produits: produits.filter(p => p.categorie === 'vinaigre-balsamique')
    },
    {
      id: 'huile-olive',
      nom: "Huiles d'olive (250ml)",
      produits: produits.filter(p => p.categorie === 'huile-olive')
    },
    {
      id: 'epicerie',
      nom: 'Épicerie fine',
      produits: produits.filter(p => p.categorie === 'epicerie')
    }
  ];

  return (
    <div className="boutique-luxe">
      <header className="boutique-header">
        <div className="header-content">
          <h1>Artisanat Gourmand</h1>
          <p className="sous-titre">Des saveurs raffinées, une qualité d'exception</p>
        </div>
      </header>

      <main className="boutique-main">
        {categories.map(categorie => (
          <section key={categorie.id} className="category-section">
            <div className="category-header">
              <h2 className="category-title">{categorie.nom}</h2>
              <div className="title-decoration"></div>
            </div>
            <div className="products-grid">
              {categorie.produits.map(produit => (
                <ProductCard key={produit.id} produit={produit} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

const ProductCard = ({ produit }) => (
  <Link to={`/produit/${produit.id}`} className="product-card-luxe">
    <div className="product-visual">
      <div className="product-badge">{produit.prix.toFixed(2)} €</div>
      <div className="image-placeholder-luxe">
        <span>{produit.nom.split(' - ')[1] || produit.nom}</span>
      </div>
    </div>
    <div className="product-info-luxe">
      <h3>{produit.nom}</h3>
      <p className="product-description">{produit.description}</p>
    </div>
  </Link>
);

export default Boutique;