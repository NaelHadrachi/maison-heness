import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import produits from '../../data/produits';
import { fetchProducts } from '../../services/api';
import { useStore } from '../../context/StoreContext';

export default function Boutique() {
  const { addToCart } = useStore();
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [catalog, setCatalog] = useState(produits);
  const [loading, setLoading] = useState(true);
  const [zoomSrc, setZoomSrc] = useState(null);
  const [zoomAlt, setZoomAlt] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        const list = await fetchProducts();
        if (!ignore) setCatalog(list);
      } catch {
        setCatalog(produits);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProducts();
    return () => { ignore = true; };
  }, []);

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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const categories = useMemo(() => {
    const set = new Set(catalog.map((p) => p.categorie));
    return ['all', ...Array.from(set)];
  }, [catalog]);

  const filtered = useMemo(() => {
    let list = catalog.filter((p) => (activeCat === 'all' ? true : p.categorie === activeCat));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => `${p.nom} ${p.description ?? ''}`.toLowerCase().includes(q));
    }

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => Number(a.prix) - Number(b.prix));
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => Number(b.prix) - Number(a.prix));
        break;
      case 'name':
        list = [...list].sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      default:
        break;
    }
    return list;
  }, [activeCat, query, sort, catalog]);

  const Highlight = ({ text }) => {
    if (!query.trim()) return <>{text}</>;
    const q = query.trim();
    try {
      const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'gi'));
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === q.toLowerCase() ? <mark key={i} className="bg-[#efe0c3] px-0.5 text-[#2b1f18]">{part}</mark> : <span key={i}>{part}</span>
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
    <div className="min-h-screen bg-[#f8f1e5] text-[#2b1f18]">
      <header className="relative overflow-hidden bg-[#2e1f16]">
        <div className="absolute inset-0 bg-[url('/images/home/MaisonHeness20.jpg')] bg-cover bg-center opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d120d]/80 via-[#291d18]/55 to-[#1d120d]/35" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ecd9b6]">Maison Heness</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-6xl">Artisanat gourmand</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#f6ebdb] md:text-xl">Vinaigres d’exception, huiles d’olive & épicerie fine sélectionnés avec soin.</p>
          <div className="mt-6 h-1 w-28 rounded-full bg-[#d9b577] mx-auto" />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="region" aria-label="Filtres boutique">
        <div className="flex flex-col gap-5 rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-4 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Catégories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCat === cat}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCat === cat ? 'border-[#5a3d2a] bg-[#5a3d2a] text-white' : 'border-[#d9cbb2] bg-[#f9f4ee] text-[#4a3529] hover:border-[#b98f5b] hover:text-[#2f221b]'}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {labelCat(cat)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex items-center gap-2 rounded-full border border-[#d9cbb2] bg-[#f9f4ee] px-3 py-2 text-[#5c4a3c] md:min-w-[320px]" role="search">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-[#6a4e23]">
                  <path d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm11 3-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                <input
                  id="search-products"
                  type="search"
                  placeholder="Rechercher un produit… (tapez '/')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Rechercher des produits par nom ou description"
                  className="w-full bg-transparent text-sm text-[#2b1f18] placeholder:text-[#756552] focus:outline-none"
                />
                {query && (
                  <button className="text-lg text-[#5c4a3c]" onClick={() => setQuery('')} aria-label="Effacer la recherche">×</button>
                )}
              </div>

              <label className="flex items-center gap-2 rounded-full border border-[#d9cbb2] bg-[#f9f4ee] px-3 py-2 text-sm text-[#4a3529]">
                <span className="font-medium">Tri</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Trier par" className="bg-transparent text-[#2b1f18] focus:outline-none">
                  <option value="featured">Mis en avant</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="name">Nom</option>
                </select>
              </label>
            </div>
          </div>

          <div className="text-sm text-[#6d5a4d]">
            {loading ? 'Chargement...' : `${filtered.length} produit${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`}
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        {filtered.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] shadow-[0_18px_40px_rgba(80,55,30,0.07)]" aria-label={p.nom}>
            <div className="relative">
              {p.image ? (
                <>
                  <img src={p.image} alt="" aria-hidden="true" className="h-64 w-full object-cover opacity-25 blur-sm" loading="lazy" />
                  <img
                    src={p.image}
                    alt={p.nom}
                    className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                    loading="lazy"
                    onClick={() => openZoom(p.image, p.nom)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openZoom(p.image, p.nom)}
                    aria-label={`Zoomer ${p.nom}`}
                  />
                  <button
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/60 text-lg text-[#2b1f18] backdrop-blur-sm"
                    aria-label={`Zoomer ${p.nom}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openZoom(p.image, p.nom);
                    }}
                  >
                    🔍
                  </button>
                </>
              ) : (
                <div className="flex h-64 items-center justify-center bg-[#ebddca] text-3xl font-semibold text-[#4a3529]" aria-hidden>
                  {extractShortName(p.nom)}
                </div>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-[#1f120d]/85 px-3 py-1 text-sm font-semibold text-[#f3e1bc]">{Number(p.prix).toFixed(2)} €</span>
              {p.badge && <span className="absolute right-3 top-12 rounded-full bg-[#e8d4a5] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#3f2d22]">{p.badge}</span>}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#2d241d]">
                <Highlight text={p.nom} />
              </h3>
              {p.description && <p className="mt-3 text-sm leading-7 text-[#5c4a3c]"><Highlight text={p.description} /></p>}
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#f3e8d4] px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[#5d4638]">{labelCat(p.categorie)}</span>
                <div className="flex gap-2">
                  <button type="button" className="rounded-full bg-[#2c1f19] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4d3629]" onClick={() => addToCart(p, 1)}>
                    Ajouter
                  </button>
                  <Link to={`/produit/${p.id}`} className="rounded-full border border-[#d9cbb2] px-4 py-2 text-sm font-medium text-[#4a3529] transition hover:border-[#b98f5b] hover:text-[#2f221b]">
                    Voir →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-[28px] border border-dashed border-[#d4c2a2] bg-[#fffdf8] p-10 text-center text-[#5c4a3c]">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <p className="rounded-[24px] border border-[#eadcc2] bg-[#fffdf8] px-6 py-4 text-center text-sm leading-7 text-[#5c4a3c] shadow-[0_18px_40px_rgba(80,55,30,0.04)]">
          Tous nos produits sont fabriqués en petites séries. Des variations de couleur ou de texture peuvent survenir, gage d’un savoir-faire artisanal.
        </p>
      </footer>

      {zoomSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d120d]/80 p-6" role="dialog" aria-modal="true" aria-label={`Zoom ${zoomAlt}`} onClick={closeZoom}>
          <img src={zoomSrc} alt={zoomAlt} className="max-h-[85vh] max-w-[90vw] rounded-[20px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-5 top-5 text-4xl text-white" aria-label="Fermer" onClick={closeZoom}>×</button>
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
    all: 'Tout',
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
