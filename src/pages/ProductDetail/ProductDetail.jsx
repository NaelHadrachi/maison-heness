import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import produits from '../../data/produits';
import { fetchProductById } from '../../services/api';
import { useStore } from '../../context/StoreContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      try {
        const item = await fetchProductById(id);
        if (!ignore) {
          setProduct(item || produits.find((p) => String(p.id) === String(id)) || null);
        }
      } catch {
        if (!ignore) {
          setProduct(produits.find((p) => String(p.id) === String(id)) || null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProduct();
    return () => { ignore = true; };
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const prev = document.title;
    document.title = `${product.nom} – Maison Heness`;
    return () => { document.title = prev; };
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox && e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-12 text-center shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <h2 className="font-serif text-3xl text-[#2d241d]">Chargement du produit...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-12 text-center shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <h2 className="font-serif text-3xl text-[#2d241d]">Produit introuvable</h2>
          <p className="mt-3 text-[#5c4a3c]">Le produit demandé n’existe pas / plus.</p>
          <Link className="mt-5 inline-flex rounded-full bg-[#2c1f19] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4d3629]" to="/boutique">← Retour à la boutique</Link>
        </div>
      </div>
    );
  }

  const externalUrl = product.lien || product.url || import.meta.env.VITE_SHOP_URL || null;
  const related = produits.filter((p) => p.categorie === product.categorie && p.id !== product.id).slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6d5a4d]" aria-label="Fil d’Ariane">
        <Link to="/" className="hover:text-[#2f221b]">Accueil</Link>
        <span>›</span>
        <Link to="/boutique" className="hover:text-[#2f221b]">Boutique</Link>
        <span>›</span>
        <Link to={`/boutique#${product.categorie}`} className="hover:text-[#2f221b]">{labelCat(product.categorie)}</Link>
        <span>›</span>
        <span aria-current="page" className="text-[#2f221b]">{product.nom}</span>
      </nav>

      <article className="grid gap-8 rounded-[32px] border border-[#eadcc2] bg-[#fffdf8] p-5 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-[24px] bg-[#f4ead8]">
          <button className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f4ead8] p-4 text-left" onClick={() => setLightbox(true)} aria-label="Agrandir l’image">
            {product.image ? (
              <img src={product.image} alt={product.nom} loading="lazy" className="max-h-[540px] w-full rounded-[18px] object-cover" />
            ) : (
              <div className="flex h-[440px] w-full items-center justify-center rounded-[18px] bg-[#e9dcc0] text-4xl font-semibold text-[#4a3529]">
                <span>{short(product.nom)}</span>
              </div>
            )}
            <span className="absolute bottom-5 left-5 rounded-full bg-[#1d120d]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#f3e1bc]">Cliquer pour zoomer</span>
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-serif text-4xl font-bold text-[#2d241d] md:text-5xl">{product.nom}</h1>
          <p className="mt-5 text-base leading-8 text-[#5c4a3c]">{product.description}</p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="text-3xl font-bold text-[#2d241d]">{Number(product.prix).toFixed(2)} €</div>
            <button type="button" className="rounded-full bg-[#2c1f19] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4d3629]" onClick={() => addToCart(product, 1)}>
              Ajouter au panier
            </button>
            {externalUrl && (
              <a className="rounded-full border border-[#d9cbb2] px-6 py-3 text-sm font-semibold text-[#4a3529] transition hover:border-[#b98f5b] hover:text-[#2f221b]" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label="Commander sur la boutique">
                Commander sur la boutique →
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#f3e8d4] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[#5d4638]">{labelCat(product.categorie)}</span>
            {product.badge && <span className="rounded-full bg-[#e8d4a5] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[#3f2d22]">{product.badge}</span>}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 font-serif text-3xl font-bold text-[#2d241d]">Vous aimerez aussi</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" tabIndex={0} aria-label="Produits associés">
            {related.map((p) => (
              <Link key={p.id} to={`/produit/${p.id}`} className="overflow-hidden rounded-[24px] border border-[#eadcc2] bg-[#fffdf8] shadow-[0_18px_40px_rgba(80,55,30,0.05)] transition hover:-translate-y-1">
                <div className="h-52 overflow-hidden bg-[#f4ead8]">
                  {p.image ? <img src={p.image} alt={p.nom} loading="lazy" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center bg-[#e9dcc0] text-2xl font-semibold text-[#4a3529]">{short(p.nom)}</div>}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-2xl text-[#2d241d]">{p.nom}</h3>
                  <span className="mt-2 block text-sm font-semibold text-[#5c4a3c]">{Number(p.prix).toFixed(2)} €</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {lightbox && product.image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d120d]/80 p-6" role="dialog" aria-modal="true" onClick={() => setLightbox(false)}>
          <img src={product.image} alt={product.nom} className="max-h-[85vh] max-w-[90vw] rounded-[20px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-5 top-5 text-4xl text-white" onClick={() => setLightbox(false)} aria-label="Fermer">×</button>
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
