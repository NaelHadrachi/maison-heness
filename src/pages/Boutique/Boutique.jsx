import React, { useMemo, useState, useCallback } from 'react';
import produits from '../../data/produits';
import './Boutique.css';

/**
 * Boutique – version élargie + accessibilité améliorée
 * - Plus de navigation vers la page détail : clic = zoom plein écran
 * - Loupe au survol
 * - Recherche '/', tri, filtres
 */
export default function Boutique() {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  // état zoom
  const [zoomSrc, setZoomSrc] = useState(null);
  const [zoomAlt, setZoomAlt] = useState('');

  // focus sur la recherche via la touche '/' + fermeture ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === '/') {
      const input = document.getElementById('search-products');
      if (input) {
        e.preventDefault();
        input.focus();
      }
    }
    if (e.key === 'Escape') {
      setZoomSrc(null);
      setZoomAlt('');
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const categories = useMemo(() => {
    const set = new Set(produits.map(p => p.categorie));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = produits.filter(p => (activeCat === 'all' ? true : p.categorie === activeCat));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        `${p.nom} ${p.description ?? ''}`.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':  list = [...list].sort((a, b) => a.prix - b.prix); break;
      case 'price-desc': list = [...list].sort((a, b) => b.prix - a.prix); break;
      case 'name':       list = [...list].sort((a, b) => a.nom.localeCompare(b.nom)); break;
      default:           list = [...list]; // featured
    }
    return list;
  }, [activeCat, query, sort]);

  // util pour surligner la recherche dans un texte
  const Highlight = ({ text }) => {
    if (!query.trim()) return <>{text}</>;
    const q = query.trim();
    try {
      const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'gi'));
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === q.toLowerCase() ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
          )}
        </>
      );
    } catch {
      return <>{text}</>;
    }
  };

  const openZoom = (src, alt) => {
    if (!src) return;
    setZoomSrc(src);
    setZoomAlt(alt || '');
  };
  const closeZoom = () => {
    setZoomSrc(null);
    setZoomAlt('');
  };

  return (
    <div className="boutique luxe container">
      {/* HERO */}
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h1>Artisanat Gourmand</h1>
          <p className="subtitle">Vinaigres d'exception, huiles d'olive & épicerie fine</p>
          <div className="hero-stripe" />
        </div>
      </header>

      {/* BARRE D'OUTILS */}
      <section className="toolbar" role="region" aria-label="Filtres boutique">
        <div className="toolbar-row">
          <div className="categories" role="tablist" aria-label="Catégories">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCat === cat}
                className={`pill ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {labelCat(cat)}
              </button>
            ))}
          </div>

          <div className="controls">
            <div className="search" role="search">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm11 3-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
              <input
                id="search-products"
                type="search"
                placeholder="Rechercher un produit… (tapez '/')"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Rechercher des produits par nom ou description"
              />
              {query && (
                <button className="clear" onClick={() => setQuery('')} aria-label="Effacer la recherche">×</button>
              )}
            </div>

            <label className="sort">
              <span>Tri</span>
              <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Trier par">
                <option value="featured">Mis en avant</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="name">Nom</option>
              </select>
            </label>
          </div>
        </div>

        <div className="results-hint">
          {filtered.length} produit{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </div>
      </section>

      {/* GRID */}
      <main className="grid">
        {filtered.map(p => (
          <article key={p.id} className="card" aria-label={p.nom}>
            <div className="media">
              {p.image ? (
                <>
                  {/* fond flouté */}
                  <img src={p.image} alt="" aria-hidden="true" className="bg" loading="lazy" />
                  {/* produit */}
                  <img
                    src={p.image}
                    alt={p.nom}
                    className="fg"
                    loading="lazy"
                    onClick={() => openZoom(p.image, p.nom)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openZoom(p.image, p.nom)}
                    aria-label={`Zoomer ${p.nom}`}
                  />
                  {/* Loupe */}
                  <button
                    className="zoom-btn"
                    aria-label={`Zoomer ${p.nom}`}
                    onClick={(e) => { e.stopPropagation(); openZoom(p.image, p.nom); }}
                  >
                    🔍
                  </button>
                </>
              ) : (
                <div className="fallback" aria-hidden>
                  <span>{extractShortName(p.nom)}</span>
                </div>
              )}
              <span className="price">{Number(p.prix).toFixed(2)} €</span>
              {p.badge && <span className="badge">{p.badge}</span>}
            </div>

            <div className="content">
              <h3 className="name"><Highlight text={p.nom} /></h3>
              {p.description && <p className="desc"><Highlight text={p.description} /></p>}
              <div className="meta">
                <span className="cat">{labelCat(p.categorie)}</span>
                <span className="cta" role="button" onClick={() => openZoom(p.image, p.nom)}>
                  Zoomer →
                </span>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="empty">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}
      </main>

      <footer className="note">
        <p>
          Tous nos produits sont fabriqués en petites séries. Des variations de couleur ou de
          texture peuvent survenir, gage d'un savoir-faire artisanal.
        </p>
      </footer>

      {/* Overlay zoom plein écran */}
      {zoomSrc && (
        <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label={`Zoom ${zoomAlt}`} onClick={closeZoom}>
          <img src={zoomSrc} alt={zoomAlt} onClick={(e) => e.stopPropagation()} />
          <button className="zoom-close" aria-label="Fermer" onClick={closeZoom}>×</button>
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
    'all': 'Tout'
  };
  return map[key] ?? key;
}

function extractShortName(nom) {
  if (!nom) return '';
  const parts = nom.split(' - ');
  return (parts[1] || parts[0] || '').slice(0, 28);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
