import React from 'react';
import { useParams, Link } from 'react-router-dom';
import produits from '../../data/produits';
import styles from './ProductDetail.module.css';

/**
 * Page Produit — redirection vers boutique externe (deep-link)
 * - Aucune quantité, aucun panier local
 * - Un seul CTA : "Commander sur la boutique" (nouvel onglet)
 * - Zoom image + carrousel associés conservés
 * - Pas d'ID/mot de passe en front (voir notes plus bas)
 */
export default function ProductDetail() {
  const { id } = useParams();
  const product = produits.find(p => p.id === id) || null;

  const [lightbox, setLightbox] = React.useState(false);

  React.useEffect(() => {
    if (!product) return;
    const prev = document.title;
    document.title = `${product.nom} – Maison Heness`;
    return () => { document.title = prev; };
  }, [product]);

  // Raccourci clavier : Esc pour fermer le zoom
  React.useEffect(() => {
    const onKey = (e) => { if (lightbox && e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.sheet}>
          <div className={styles.errorBox}>
            <h2>Produit introuvable</h2>
            <p>Le produit demandé n'existe pas / plus.</p>
            <Link className={styles.backBtn} to="/boutique">← Retour à la boutique</Link>
          </div>
        </div>
      </div>
    );
  }

  // 1) priorise le lien du produit (p.lien / p.url)
  // 2) sinon utilise la variable .env VITE_SHOP_URL
  const externalUrl = product.lien || product.url || import.meta.env.VITE_SHOP_URL || null;

  const related = produits
    .filter(p => p.categorie === product.categorie && p.id !== product.id)
    .slice(0, 10);

  return (
    <div className={styles.page}>
      {/* Fil d’Ariane */}
      <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link><span>›</span>
        <Link to="/boutique">Boutique</Link><span>›</span>
        <Link to={`/boutique#${product.categorie}`}>{labelCat(product.categorie)}</Link><span>›</span>
        <span aria-current="page">{product.nom}</span>
      </nav>

      <article className={styles.sheet}>
        {/* Media */}
        <div className={styles.mediaCol}>
          <button className={styles.media} onClick={() => setLightbox(true)} aria-label="Agrandir l’image">
            {product.image ? (
              <img src={product.image} alt={product.nom} loading="lazy" />
            ) : (
              <div className={styles.fallback}><span>{short(product.nom)}</span></div>
            )}
            <span className={styles.zoomHint}>Cliquer pour zoomer</span>
          </button>
        </div>

        {/* Infos */}
        <div className={styles.infoCol}>
          <h1 className={styles.title}>{product.nom}</h1>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.ctaRow}>
            <div className={styles.price}>{Number(product.prix).toFixed(2)} €</div>
            {externalUrl && (
              <a
                className={styles.externalBtn}
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander sur la boutique"
              >
                Commander sur la boutique →
              </a>
            )}
          </div>

          <div className={styles.metaRow}>
            <span className={styles.badgeCat}>{labelCat(product.categorie)}</span>
            {product.badge && <span className={styles.badge}>{product.badge}</span>}
          </div>
        </div>
      </article>

      {/* Produits associés — carrousel */}
      {related.length > 0 && (
        <section className={styles.related}>
          <h2>Vous aimerez aussi</h2>
          <div className={styles.carousel} tabIndex={0} aria-label="Produits associés">
            {related.map(p => (
              <Link key={p.id} to={`/produit/${p.id}`} className={styles.relCard}>
                <div className={styles.relMedia}>
                  {p.image ? <img src={p.image} alt={p.nom} loading="lazy" /> : (
                    <div className={styles.relFallback}><span>{short(p.nom)}</span></div>
                  )}
                </div>
                <div className={styles.relInfo}>
                  <h3>{p.nom}</h3>
                  <span className={styles.relPrice}>{Number(p.prix).toFixed(2)} €</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox plein écran */}
      {lightbox && product.image && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setLightbox(false)}>
          <img
            src={product.image}
            alt={product.nom}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.closeLb} onClick={() => setLightbox(false)} aria-label="Fermer">×</button>
        </div>
      )}
    </div>
  );
}

function labelCat(key) {
  const map = {
    'vinaigre-grenade': 'Vinaigres de Grenade',
    'vinaigre-balsamique': 'Vinaigres Balsamiques',
    'huile-olive': "Huiles d'olive",
    'epicerie': 'Épicerie fine',
  };
  return map[key] ?? key;
}
function short(nom) {
  const parts = nom.split(' - ');
  return (parts[1] || parts[0] || '').slice(0, 28);
}
