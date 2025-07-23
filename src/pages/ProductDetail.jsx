import React from 'react';
import { useParams } from 'react-router-dom';
import produits from '../data/produits';

const ProductDetail = () => {
  const { id } = useParams();
  const produit = produits.find((p) => p.id === id);

  if (!produit) {
    return <p style={{ textAlign: 'center' }}>Produit introuvable</p>;
  }

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{produit.nom}</h2>
      <img
        src={produit.image}
        alt={produit.nom}
        style={{ width: '300px', borderRadius: '10px', marginBottom: '1rem' }}
      />
      <p style={{ maxWidth: '600px', margin: 'auto' }}>{produit.description}</p>
      <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>{produit.prix.toFixed(2)} €</p>
    </main>
  );
};

export default ProductDetail;
