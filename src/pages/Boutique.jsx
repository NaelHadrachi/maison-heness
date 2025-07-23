import React from 'react';
import { Link } from 'react-router-dom';
import produits from '../data/produits';

const Boutique = () => (
  <main style={{ padding: '2rem' }}>
    <h2 style={{ textAlign: 'center' }}>Nos Vinaigres</h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}
    >
      {produits.map((p) => (
        <Link
          to={`/produit/${p.id}`}
          key={p.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '10px',
              background: '#fff8f0'
            }}
          >
            <img
              src={p.image}
              alt={p.nom}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{p.nom}</h3>
            <p>{p.prix.toFixed(2)} €</p>
          </div>
        </Link>
      ))}
    </div>
  </main>
);

export default Boutique;
