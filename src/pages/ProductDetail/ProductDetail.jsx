import React from 'react';
import { useParams } from 'react-router-dom';
import produits from '../../data/produits';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const produit = produits.find(p => p.id === id);

  if (!produit) {
    return (
      <div className={styles.errorContainer}>
        <h2>Produit non trouvé</h2>
        <p>Le produit que vous recherchez n'existe pas dans notre catalogue.</p>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.infoContainer}>
        <h1 className={styles.productTitle}>{produit.nom}</h1>
        <p className={styles.productDescription}>{produit.description}</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{produit.prix.toFixed(2)}€</span>
          <button className={styles.addToCart}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;