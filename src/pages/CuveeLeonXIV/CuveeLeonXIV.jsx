import React from 'react';

export default function CuveeLeonXIVPage() {
  return (
    <div className="bg-[#120d0a] text-[#f7e5c5] min-h-screen font-serif relative overflow-hidden">
      {/* Halo de lumière sacrée */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 15%, #d2b48c 0%, transparent 65%)`,
        }}
      />

      {/* En-tête / Hero Section avec l'image du pape en arrière-plan global */}
      <section className="relative z-10 pt-12 pb-12 text-center px-4 max-w-5xl mx-auto rounded-2xl overflow-hidden my-4">
        {/* Image de fond pour toute la section hero */}
        <img
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Leo_XIV_%2813_October_2025%29.jpg/500px-Leo_XIV_%2813_October_2025%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail"
          alt="Pape Léon XIV"
          className="absolute inset-0 w-full h-full object-cover object-[55%_15%] opacity-50 mix-blend-luminosity filter contrast-125 pointer-events-none"
        />
        
        {/* Dégradés pour adoucir le fond et garantir la lisibilité du contenu */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120d0a]/80 via-[#120d0a]/40 to-[#120d0a] pointer-events-none" />

        {/* Contenu de la section (superposé au premier plan) */}
        <div className="relative z-10">
          <div className="inline-block border-b-2 border-[#d2b48c]/40 pb-2 mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d9b577] font-sans">
              Maison Heness · Édition Spéciale — Lourdes
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide text-white uppercase drop-shadow-md my-4">
            Cuvée Léon XIV
          </h1>
          
          <p className="mt-3 text-xl sm:text-2xl italic text-[#e3c596] tracking-wide">
            La douceur entre deux mondes
          </p>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[#f5e7d9]/90 font-sans leading-relaxed">
            Une création d’exception imaginée à l’occasion de la venue annoncée du pape Léon XIV à Lourdes.
          </p>

          {/* Liens d'action */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-sans text-xs uppercase tracking-wider">
            <a 
              href="#histoire" 
              className="px-6 py-3 bg-[#d9b577] text-[#2a1d12] font-bold rounded-full hover:bg-[#f7e5c5] transition-all shadow-lg"
            >
              Découvrir la cuvée
            </a>
            <a 
              href="https://www.nrpyrenees.fr/2026/08/16/on-espere-pouvoir-lui-offrir-cette-vinaigrerie-artisanale-de-lourdes-a-concu-specialement-un-vinaigre-de-grenade-pour-la-venue-du-pape-leon-xiv-13503454.php" 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3 border border-[#d2b48c]/40 text-[#d9b577] rounded-full hover:border-[#d9b577] hover:text-white transition-all"
            >
              Lire l’article de presse ↗
            </a>
          </div>

          {/* Séparateur ornemental sacré */}
          <div className="flex items-center justify-center mt-8 gap-3">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d2b48c]/60" />
            <span className="text-[#d9b577] text-base">✟</span>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d2b48c]/60" />
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        
        {/* Section 1 : L'Histoire & Le Récit Pastoral */}
        <section id="histoire" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 bg-[#1a130f] p-6 rounded-xl border border-[#d2b48c]/30 shadow-2xl flex flex-col justify-between">
            <div className="relative border border-[#d2b48c]/20 p-2 overflow-hidden bg-[#241a14] rounded-lg">
              <img
                src="/images/cuvee-leon-xiv/Vinaigrepp.png"
                alt="Cuvée Léon XIV - Maison Heness"
                className="w-full h-72 object-contain contrast-110 opacity-95 rounded hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#120d0a]/90 border border-[#d2b48c]/50 px-3 py-1 rounded-full text-center">
                <span className="text-[10px] text-[#d9b577] uppercase font-sans tracking-widest block">Affinage</span>
                <span className="text-xs font-bold text-white">6 Ans Minimum</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-sans text-[#d2b48c]/70 uppercase tracking-widest">
                Fermentation Acétique Naturelle — Lourdes
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#18110c]/80 p-6 sm:p-8 rounded-xl border border-[#d2b48c]/20 shadow-lg flex flex-col justify-center space-y-4 text-sm leading-relaxed text-[#f5e7d9]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-[#d9b577]">01</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d2b48c] font-sans">L'Histoire</span>
            </div>
            
            <h2 className="text-2xl font-bold text-[#e3c596]">Une création pensée pour une occasion exceptionnelle.</h2>
            
            <p>
              En <strong className="text-[#d9b577]">avril 2026</strong>, le pape Léon XIV est retourné en Algérie, à Hippone, sur la terre de saint Augustin, son « père spirituel ». Dans la basilique Saint-Augustin, il a célébré la messe sur cette terre où Augustin vécut et où résonne encore son appel au dialogue, à la paix et à la réconciliation.
            </p>
            
            <p className="italic border-l-2 border-[#d9b577] pl-4 py-1 text-[#e3c596] bg-[#241a14]/50 rounded-r">
              Maison Heness a voulu raconter cette rencontre dans un vinaigre d'exception qui lui est dédié, créé spécialement à l'occasion de sa venue annoncée à Lourdes.
            </p>
            
            <p>
              Une grenade venue d’Orient, un miel et un fenouil sauvage nés de notre terre d’Occitanie, sublimés par la touche marine du Sel de Gruissan. La grenade apporte sa profondeur et sa légère amertume, le miel vient l’adoucir, tandis que le fenouil et le sel déposent les senteurs du soleil, de la terre et de la Méditerranée.
            </p>
          </div>
        </section>

        {/* Section 2 : La Composition / La Recette Singulière */}
        <section className="bg-[#18110c]/80 p-6 sm:p-8 rounded-xl border border-[#d2b48c]/20 shadow-lg">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-bold text-[#d9b577]">02</span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d2b48c] font-sans">La Composition</span>
              <h2 className="text-2xl font-bold text-[#e3c596]">Une recette singulière aux 4 piliers</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Ingrédient 1 */}
            <article className="bg-[#241a14] p-5 rounded-lg border border-[#d2b48c]/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#d9b577] font-sans">01 / ORIENT</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Grenade</h3>
                <p className="text-xs leading-relaxed text-[#f5e7d9]/90">
                  La base emblématique de cette création. Elle apporte sa profondeur, sa fraîcheur fruité et sa délicate amertume.
                </p>
              </div>
            </article>

            {/* Ingrédient 2 */}
            <article className="bg-[#241a14] p-5 rounded-lg border border-[#d2b48c]/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#d9b577] font-sans">02 / OCCITANIE</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Fenouil Sauvage</h3>
                <p className="text-xs leading-relaxed text-[#f5e7d9]/90">
                  Une note végétale et aromatique cueillie sur nos terres, offrant le parfum chaleureux du soleil et de la garrigue.
                </p>
              </div>
            </article>

            {/* Ingrédient 3 */}
            <article className="bg-[#241a14] p-5 rounded-lg border border-[#d2b48c]/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#d9b577] font-sans">03 / DOUCEUR</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Miel</h3>
                <p className="text-xs leading-relaxed text-[#f5e7d9]/90">
                  Une touche suave et dorée d'Occitanie qui vient équilibrer l’acidité de la grenade et harmoniser la cuvée.
                </p>
              </div>
            </article>

            {/* Ingrédient 4 */}
            <article className="bg-[#241a14] p-5 rounded-lg border border-[#d2b48c]/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#d9b577] font-sans">04 / MÉDITERRANÉE</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Sel de Gruissan</h3>
                <p className="text-xs leading-relaxed text-[#f5e7d9]/90">
                  Une signature minérale issue de notre collaboration exclusive avec les sauniers du Salin de l'Île Saint-Martin.
                </p>
              </div>
            </article>

          </div>
        </section>

        {/* Section 3 : La Collaboration Maison Heness × Sels de Gruissan */}
        <section className="bg-[#18110c]/80 p-6 sm:p-8 rounded-xl border border-[#d2b48c]/20 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-[#d9b577]">03</span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d2b48c] font-sans">La Collaboration</span>
              <h2 className="text-2xl font-bold text-[#e3c596]">Maison Heness × Sels de Gruissan</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-sm leading-relaxed text-[#f5e7d9]">
              <p>
                Pour la Cuvée Léon XIV, Maison Heness s’associe aux <strong>Sels de Gruissan</strong> afin d’intégrer à cette création un sel d'exception issu du terroir méditerranéen.
              </p>
              <p>
                Produit au Salin de l’Île Saint-Martin, le Sel de Gruissan s’inscrit dans un savoir-faire d'excellence transmis de génération en génération par des sauniers passionnés.
              </p>
              <p>
                Cette alliance entre deux rives symbolise le lien indissociable entre la terre d'Occitanie et la mer Méditerranée, venant parfaire l'équilibre entre la grenade, le fenouil et le miel.
              </p>
              <div className="pt-2">
                <a 
                  href="https://www.seldegruissan.fr/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-[#d9b577] underline underline-offset-4 hover:text-white transition-colors text-xs font-sans uppercase tracking-wider"
                >
                  Découvrir les Sels de Gruissan ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#241a14] p-6 rounded-xl border border-[#d2b48c]/30 flex items-center justify-center">
              <img 
                src="/images/cuvee-leon-xiv/logo-sel-de-gruissan.png" 
                alt="Logo Sels de Gruissan" 
                className="max-h-28 object-contain filter brightness-110"
              />
            </div>
          </div>
        </section>

        {/* Section Spirituelle & Bilan */}
        <section className="bg-[#1a130f] p-8 rounded-xl border border-[#d2b48c]/30 text-center space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-[#f5e7d9] max-w-4xl mx-auto italic">
            « Le christianisme est né en Orient avant de traverser les siècles jusqu’en Occident. Entre ces deux rives, il y a la Méditerranée, et entre ces deux mondes, il y eut Augustin. À travers Léon XIV, ce vinaigre rend hommage à cette union : l’Orient rencontre l’Occident dans une même bouteille, et deux terres deviennent une seule histoire. »
          </p>
        </section>

        {/* Conclusion & CTA */}
        <section className="bg-gradient-to-b from-[#1a130f] to-[#241a14] rounded-2xl p-8 border border-[#d2b48c]/40 text-center shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#e3c596] tracking-wide">
            Maison Heness — Quand l’essentiel est déjà là
          </h2>
          
          <p className="text-[#f5e7d9] text-base leading-relaxed max-w-2xl mx-auto">
            Commandez le flacon d'exception <strong>Léon XIV</strong> : Vinaigre de Grenade, Miel, Fenouil Sauvage & Sel de Gruissan.
          </p>

          <div className="pt-2 flex justify-center">
            <a
              href="/boutique"
              className="px-8 py-3 bg-[#d9b577] text-[#2a1d12] font-bold rounded-full text-sm uppercase tracking-wider hover:bg-[#f7e5c5] transition-all transform hover:-translate-y-0.5 shadow-lg font-sans"
            >
              Commander en Boutique
            </a>
          </div>
        </section>
      </main>

      {/* Footer Sacré */}
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