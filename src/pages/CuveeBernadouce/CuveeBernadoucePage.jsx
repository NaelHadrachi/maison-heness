import React from 'react';
import { Link } from 'react-router-dom';

export default function CuveeBernadoucePage() {
  return (
    <div className="bg-[#120d0a] text-[#f7e5c5] min-h-screen font-serif relative overflow-hidden">
      {/* Halo de lumière doré en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, #d2b48c 0%, transparent 60%)`,
        }}
      />

      {/* Hero Section / En-tête */}
      <section className="relative z-10 pt-12 pb-8 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block border-b-2 border-[#d2b48c]/40 pb-2 mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d9b577] font-sans">
            Maison Heness — Lourdes
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide text-white uppercase drop-shadow-md">
          Le Vinaigre Bernadouce
        </h1>
        
        <p className="mt-3 text-xl sm:text-2xl italic text-[#e3c596] tracking-wide">
          L’herbe de la source
        </p>

        {/* Séparateur ornemental */}
        <div className="flex items-center justify-center my-6 gap-3">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d2b48c]/60" />
          <span className="text-[#d9b577] text-sm">◆</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d2b48c]/60" />
        </div>
      </section>

      {/* Contenu principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche : Portrait de Sainte Bernadette */}
          <div className="lg:col-span-4 bg-[#1a130f] p-4 rounded-xl border border-[#d2b48c]/30 shadow-2xl">
            <div className="relative border border-[#d2b48c]/20 p-2 overflow-hidden bg-[#241a14]">
              <img
                src="https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Bernadette_Soubirous_en_1863_photo_Billard-Perrin_4.jpg/960px-Bernadette_Soubirous_en_1863_photo_Billard-Perrin_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20120429085658"
                alt="Bernadette Soubirous"
                className="w-full h-auto grayscale contrast-110 sepia-[0.3] opacity-90 rounded hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-center text-xs text-[#d2b48c]/70 italic mt-3 font-sans">
              Bernadette Soubirous (1844 - 1879)
            </p>
          </div>

          {/* Colonne Droite : Grille des Récits Historiques & Botaniques */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bloc 1 : L'Apparition */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Vitrail / Vierge */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m-6-9h12M8 6h8M8 18h8" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Le <span className="font-bold text-[#d9b577]">25 février 1858</span>, lors de la neuvième apparition, la Vierge Marie demande à Bernadette d’aller boire à la source, de s’y laver et de manger l’herbe qui pousse près de la fontaine.
                </p>
              </div>
            </div>

            {/* Bloc 2 : Le Geste de Bernadette */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Feuille / Botanique */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Bernadette gratte alors la terre, découvre une eau d’abord boueuse, la boit et mange quelques feuilles. Devant les personnes présentes, elle explique simplement : <strong className="text-[#d9b577]">« C’est pour les pécheurs. »</strong>
                </p>
              </div>
            </div>

            {/* Bloc 3 : La Dorine / Cresson Doré */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Plante des sources */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18m0-18C8 3 4 7 4 12s4 9 8 9m0-18c4 0 8 4 8 9s-4 9-8 9" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Cette humble plante est traditionnellement identifiée à la <strong className="text-[#d9b577]">dorine</strong>, une petite plante des sources et des endroits humides, parfois appelée <strong className="text-[#d9b577]">cresson doré</strong>.
                </p>
              </div>
            </div>

            {/* Bloc 4 : L'Assemblage Maison Heness */}
            <div className="bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Fruit / Grenade / Mûre */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 3" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Maison Heness a voulu faire revivre cette mémoire dans <strong className="text-[#d9b577]">Bernadouce</strong>, en associant <strong className="text-[#d9b577]">le cresson et la mûre</strong> : le cresson en écho à la plante de la source, la mûre comme une expression d’un fruit rouge doux et de cette nature généreuse qui entoure Lourdes.
                </p>
              </div>
            </div>

            {/* Bloc 5 : La Philosophie du Flacon */}
            <div className="md:col-span-2 bg-[#18110c]/80 p-5 rounded-lg border border-[#d2b48c]/20 flex gap-4 items-start shadow-lg">
              <div className="shrink-0 p-3 bg-[#281c14] border border-[#d2b48c]/30 rounded-lg text-[#d9b577]">
                {/* Icône Goutte d'eau / Source */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[#f5e7d9]">
                  Un vinaigre inspiré par un geste tout simple de Bernadette : <strong className="text-[#d9b577]">boire à la source, manger ce que la terre lui offre et croire.</strong>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Call To Action & Conclusion */}
        <section className="mt-16 bg-gradient-to-b from-[#1a130f] to-[#241a14] rounded-2xl p-8 border border-[#d2b48c]/40 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#e3c596] tracking-wide">
              Bernadouce : quand la nature devient mémoire, pour une révélation qui change le destin.
            </h2>
            
            <p className="text-[#f5e7d9] text-base leading-relaxed">
              Découvrez la cuvée <strong>Bernadouce</strong>, alliance harmonieuse du vinaigre de cresson et de la douceur de la mûre sauvage.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/boutique"
                className="px-8 py-3 bg-[#d9b577] text-[#2a1d12] font-bold rounded-full text-sm uppercase tracking-wider hover:bg-[#f7e5c5] transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Découvrir la cuvée en Boutique
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Décoratif */}
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