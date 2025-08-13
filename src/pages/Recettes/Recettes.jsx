import React, { useEffect, useMemo, useState } from "react";
import "./Recettes.css";

/** Lien CSV Google Sheets publié en lecture seule */
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQakC4taQ4dv0bn8rzkIeJkwWR1DVCucB9OyckMUMcoGyjNso_bh4vrJcAyuVq60zsMz9pW2CA6gDW3/pub?output=csv";

/* ---------- utils robustes ---------- */
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
    <main className="rx container">
      {/* Hero élégant, différent de la boutique */}
      <header className="rx-hero">
        <div className="rx-veil" />
        <div className="rx-inner">
          <h1>La Table Maison Heness</h1>
          <p>Des recettes inspirées par nos vinaigres & huiles. Ajoutez, testez, savourez.</p>
        </div>
      </header>

      {/* Barre d’outils */}
      <section className="rx-toolbar" role="region" aria-label="Outils recettes">
        <div className="rx-search" role="search">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M10 18a8 8 0 1 1 5.293-14.293A8 8 0 0 1 10 18Zm11 3-6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Rechercher une recette, un ingrédient…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Rechercher dans les recettes"
          />
          {q && (
            <button className="clear" onClick={() => setQ("")} aria-label="Effacer la recherche">
              ×
            </button>
          )}
        </div>

        <span className="rx-count">
          {loading ? "Chargement…" : `${list.length} recette${list.length > 1 ? "s" : ""}`}
        </span>
      </section>

      {/* Grille mosaïque */}
      <section className="rx-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : list.length === 0
          ? <div className="rx-empty">Aucune recette ne correspond à votre recherche.</div>
          : list.map((r, i) => (
              <article key={i} className="rc">
                <div className="rc-media" onClick={() => r.image && setLightbox({ src: r.image, alt: r.titre })}>
                  {r.image ? (
                    <>
                      <img src={r.image} alt="" aria-hidden="true" className="bg" loading="lazy" />
                      <img src={r.image} alt={r.titre} className="fg" loading="lazy" />
                      <span className="zoom">🔍</span>
                    </>
                  ) : (
                    <div className="rc-fallback">
                      <span>{r.titre || "Recette"}</span>
                    </div>
                  )}
                  <span className="rt">{readingTime(r.preparation + " " + r.ingredients)}</span>
                </div>

                <div className="rc-body">
                  <h3 className="rc-title">{r.titre || "Sans titre"}</h3>

                  {r.ingredients && (
                    <div className="rc-block">
                      <h4>Ingrédients</h4>
                      <ul className="rc-ing">
                        {splitIngredients(r.ingredients).map((it, idx) => (
                          <li key={idx}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {r.preparation && (
                    <div className="rc-block">
                      <h4>Préparation</h4>
                      <p className="rc-prep">{r.preparation}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
      </section>

      {/* Lightbox image plein écran */}
      {lightbox && (
        <div className="rx-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt || ""} onClick={(e) => e.stopPropagation()} />
          <button className="rx-close" aria-label="Fermer" onClick={() => setLightbox(null)}>×</button>
        </div>
      )}
    </main>
  );
}

function SkeletonCard() {
  return <article className="rc skeleton" aria-hidden />;
}
