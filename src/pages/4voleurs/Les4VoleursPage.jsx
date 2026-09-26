import React from 'react';
import { Link } from 'react-router-dom';

export default function Les4VoleursPage() {
  return (
    <div className="bg-[#120d0a] text-[#f7e5c5] min-h-screen font-serif relative overflow-hidden">
      {/* Texture & Ambiance de fond Moyen Âge / Parchemin sombre */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, #d2b48c 0%, transparent 60%)`,
        }}
      />

      {/* Header / Hero Section */}
      <section className="relative z-10 pt-12 pb-8 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block border-b-2 border-[#d2b48c]/40 pb-2 mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d9b577] font-sans">
            La Légende Maison Heness
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide text-white uppercase drop-shadow-md">
          Les 4 Voleurs
        </h1>
        
        <p className="mt-3 text-xl sm:text-2xl italic text-[#e3c596] tracking-wide">
          Le vinaigre qui traversa la peste
        </p>

        {/* Séparateur ornemental */}
        <div className="flex items-center justify-center my-6 gap-3">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d2b48c]/60" />
          <span className="text-[#d9b577] text-sm">◆</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d2b48c]/60" />
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche : Gravure Historique du Médecin de la Peste */}
          <div className="lg:col-span-4 bg-[#1a130f] p-4 rounded-xl border border-[#d2b48c]/30 shadow-2xl">
            <div className="relative border border-[#d2b48c]/20 p-2 overflow-hidden bg-[#241a14]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28coloured_version%29.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20200224155353"
                alt="Doctor Bill from Rome - Médecin de la peste"
                className="w-full h-auto grayscale contrast-125 sepia opacity-90 rounded hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-center text-xs text-[#d2b48c]/70 italic mt-3 font-sans">
              « Doctor Bill from Rome » — Gravure représentant les médecins protégés pendant la peste.
            </p>
          </div>

          {/* Colonne Centrale & Droite : Textes Historiques et Icônes */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bloc 1 : L'Épidémie */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Bateau / Marseille */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  En <span className="font-bold text-[#d9b577]">1720</span>, la peste arrive à Marseille. La ville est frappée par une terrible épidémie et la peur gagne les habitants.
                </p>
              </div>
            </div>

            {/* Bloc 2 : La Mémoire Populaire */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Laurier / Mémoire */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  La recette entra alors dans la mémoire populaire sous le nom de <strong className="text-[#d9b577]">« Vinaigre des Quatre Voleurs »</strong>. Qu’elle soit entièrement vraie ou qu’elle ait été embellie par le temps, cette histoire est devenue l’une des grandes légendes du vinaigre.
                </p>
              </div>
            </div>

            {/* Bloc 3 : Les Voleurs */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Silhouette / Transgression */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Une histoire raconte qu’à Toulouse et à Marseille, quatre hommes profitaient de la désolation pour entrer dans les maisons abandonnées par les malades et y prendre ce qu’ils pouvaient. Ils auraient parfois dépouillé les pestiférés pour agrandir leur butin.
                </p>
              </div>
            </div>

            {/* Bloc 4 : Le Secret Traversant le Temps */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Plantes */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m0-18C8 3 4 7 4 12s4 9 8 9m0-18c4 0 8 4 8 9s-4 9-8 9" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Un simple vinaigre, quelques plantes, et quatre hommes dont le secret traversa les siècles.
                </p>
              </div>
            </div>

            {/* Bloc 5 : La Révélation du Secret */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Flacon / Vinaigre */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 3H9L8 4z" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Lorsqu’ils furent finalement arrêtés, on leur aurait promis la vie sauve s’ils révélaient leur secret : ils se protégeaient grâce à un <strong className="text-[#d9b577]">vinaigre aromatisé de plantes et d’épices</strong>, dont ils s’enduisaient le corps, respiraient les vapeurs et qu’ils auraient également consommé.
                </p>
              </div>
            </div>

            {/* Bloc 6 : L'Interprétation Maison Heness */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Étoile / 5 Plantes */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  À <span className="font-bold text-[#d9b577]">Lourdes</span>, Maison Heness en garde la mémoire et en propose aujourd’hui sa propre interprétation : <strong className="text-[#d9b577]">curcuma, gingembre, ail des ours, cannelle et feuille d’absinthe</strong>. Cinq plantes réunies dans un vinaigre d’aujourd’hui, comme un écho aux secrets de la nature d’autrefois.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section Produit & Call To Action */}
        <section className="mt-16 bg-gradient-to-b from-[#1a130f] to-[#241a14] rounded-2xl p-8 border border-[#d2b48c]/40 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#e3c596] tracking-wide">
              Les 4 voleurs : Une histoire au-delà de la transgression.
            </h2>
            
            <p className="text-[#f5e7d9] text-base leading-relaxed">
              Retrouvez la cuvée spéciale Maison Heness élaborée à Lourdes. Un vinaigre aromatisé aux 5 plantes d'exception.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/boutique"
                className="px-8 py-3 bg-[#d9b577] text-[#2a1d12] font-bold rounded-full text-sm uppercase tracking-wider hover:bg-[#f7e5c5] transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Découvrir la bouteille en Boutique
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Décoratif Subtil */}
      <footer className="border-t border-[#d2b48c]/20 py-6 text-center text-xs text-[#d2b48c]/70 font-sans tracking-widest uppercase">
        <div className="flex justify-center gap-6">
          <span>📍 Lourdes</span>
          <span>•</span>
          <span>maisonheness.com</span>
          <span>•</span>
          <span>@maison_heness</span>
        </div>
      </footer>
    </div>
  );
}