import React, { useEffect, useMemo, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQakC4taQ4dv0bn8rzkIeJkwWR1DVCucB9OyckMUMcoGyjNso_bh4vrJcAyuVq60zsMz9pW2CA6gDW3/pub?output=csv";

const norm = (s = "") => s.trim().toLowerCase();
const pick = (obj, keys) => {
  for (const k of keys) {
    if (k in obj && String(obj[k]).trim() !== "") return String(obj[k]).trim();
  }
  return "";
};

/** Parseur CSV robuste (guillemets + retours ligne + FR avec ;) */
function parseCSV(text) {
  // Si la première ligne utilise ";" plutôt que ","
  const first = text.split(/\r?\n/, 1)[0] || "";
  if (first.includes(";") && !first.includes(",")) {
    let out = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (text[i + 1] === '"') { out += '""'; i++; continue; }
        inQ = !inQ; out += ch; continue;
      }
      out += (ch === ";" && !inQ) ? "," : ch;
    }
    text = out;
  }

  const rows = [];
  let row = [], cur = "", i = 0, inQ = false;

  while (i < text.length) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cur += '"'; i += 2; continue; }
        inQ = false; i++; continue;
      }
      cur += ch; i++; continue;
    }
    if (ch === '"') { inQ = true; i++; continue; }
    if (ch === ",") { row.push(cur); cur = ""; i++; continue; }
    if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; i++; continue; }
    if (ch === "\r") { i++; continue; }
    cur += ch; i++;
  }
  row.push(cur); rows.push(row);

  const headers = (rows.shift() || []).map((h) => norm(h));
  const noHeader = headers.length < 1;

  return rows
    .filter((r) => r.some((c) => (c || "").trim() !== ""))
    .map((r) => {
      if (noHeader) {
        return { titre: r[0] || "", ingredients: r[1] || "", preparation: r[2] || "", image: r[3] || "" };
      }
      const o = {};
      headers.forEach((h, idx) => (o[h] = (r[idx] || "").trim()));
      return o;
    });
}

/** Estimation rapide du “temps de lecture” de la recette */
function readingTime(text) {
  const words = (text || "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180)); // 180 wpm
  return `${minutes} min`;
}

/** Découpe “ingredients” en liste propre */
function splitIngredients(txt) {
  return (txt || "")
    .split(/[\n;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Recettes() {
  const [raw, setRaw] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // {src, alt}

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" });
        const text = await res.text();
        const rows = parseCSV(text);

        const mapped = rows.map((r) => {
          const titre = pick(r, ["titre", "title", "nom", "recette"]);
          const ingredients = pick(r, ["ingredients", "ingrédients", "ingrediants"]);
          const preparation = pick(r, ["preparation", "préparation", "etapes", "étapes", "etape", "étape"]);
          const image = pick(r, ["image", "img", "photo", "visuel"]);
          return { titre, ingredients, preparation, image };
        });

        // plus récent en premier
        setRaw(mapped.reverse());
      } catch (e) {
        console.error("CSV error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const list = useMemo(() => {
    if (!q.trim()) return raw;
    const s = q.toLowerCase();
    return raw.filter(
      (r) =>
        r.titre.toLowerCase().includes(s) ||
        r.ingredients.toLowerCase().includes(s) ||
        r.preparation.toLowerCase().includes(s)
    );
  }, [raw, q]);

  return (
    <main className="min-h-screen bg-[#f8f1e5] text-[#2b1f18]">
      {/* Hero élégant, différent de la boutique */}
      <header className="relative overflow-hidden bg-[#2e1f16]">
        <div className="absolute inset-0 bg-[url('/images/home/MaisonHeness14.jpg')] bg-cover bg-center opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d120d]/80 via-[#291d18]/55 to-[#1d120d]/35" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ecd9b6]">Maison Heness</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-6xl">La table Maison Heness</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#f6ebdb] md:text-xl">Des recettes inspirées par nos vinaigres & huiles. Ajoutez, testez, savourez.</p>
        </div>
      </header>

      {/* Barre d’outils */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="region" aria-label="Outils recettes">
        <div className="flex flex-col gap-4 rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-4 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex w-full items-center gap-3 rounded-full border border-[#d9cbb2] bg-[#f9f4ee] px-4 py-3 text-[#5c4a3c] md:max-w-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-[#6a4e23]">
              <path d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm11 3-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher une recette, un ingrédient…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Rechercher dans les recettes"
              className="w-full bg-transparent text-sm text-[#2b1f18] placeholder:text-[#756552] focus:outline-none"
            />
            {q && (
              <button className="text-xl leading-none text-[#5c4a3c]" onClick={() => setQ('')} aria-label="Effacer la recherche">×</button>
            )}
          </div>

          <span className="text-sm font-medium text-[#6d5a4d]">
            {loading ? 'Chargement…' : `${list.length} recette${list.length > 1 ? 's' : ''}`}
          </span>
        </div>
      </section>

      {/* Grille mosaïque */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : list.length === 0
            ? <div className="col-span-full rounded-[28px] border border-dashed border-[#d4c2a2] bg-[#fffdf8] p-10 text-center text-[#5c4a3c]">Aucune recette ne correspond à votre recherche.</div>
            : list.map((r, i) => (
                <article key={i} className="overflow-hidden rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
                  <div className="relative overflow-hidden" onClick={() => r.image && setLightbox({ src: r.image, alt: r.titre })}>
                    {r.image ? (
                      <>
                        <img src={r.image} alt="" aria-hidden="true" className="h-64 w-full object-cover opacity-25 blur-sm" loading="lazy" />
                        <img src={r.image} alt={r.titre} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                        <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/60 text-lg text-[#2b1f18] backdrop-blur-sm">🔍</span>
                      </>
                    ) : (
                      <div className="flex h-64 items-center justify-center bg-[#ebddca] text-2xl font-semibold text-[#4a3529]">{r.titre || 'Recette'}</div>
                    )}
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#1f120d]/85 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[#f3e1bc]">{readingTime(r.preparation + ' ' + r.ingredients)}</span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-3xl font-semibold text-[#2d241d]">{r.titre || 'Sans titre'}</h3>

                    {r.ingredients && (
                      <div className="mt-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">Ingrédients</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-[#5c4a3c]">
                          {splitIngredients(r.ingredients).map((it, idx) => (
                            <li key={idx} className="flex gap-2"><span className="text-[#6a4e23]">•</span><span>{it}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {r.preparation && (
                      <div className="mt-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">Préparation</h4>
                        <p className="mt-3 text-sm leading-7 text-[#5c4a3c]">{r.preparation}</p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
      </section>

      {/* Lightbox image plein écran */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d120d]/80 p-6" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt || ""} className="max-h-[85vh] max-w-[90vw] rounded-[20px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-5 top-5 text-4xl text-white" aria-label="Fermer" onClick={() => setLightbox(null)}>×</button>
        </div>
      )}
    </main>
  );
}

function SkeletonCard() {
  return <article className="h-[420px] animate-pulse rounded-[28px] border border-[#eadcc2] bg-[#f8f1e5]" aria-hidden />;
}
