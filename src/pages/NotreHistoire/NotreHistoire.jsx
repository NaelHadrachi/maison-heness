import React from 'react';

export default function NotreHistoire() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-[#2e1f16]"
        style={{ backgroundImage: "url('/images/notreshistoire/MaisonHeness17.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-label="Propriété Maison Heness"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d120d]/80 to-[#261b15]/45" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-[0.04em] text-white md:text-6xl">Notre Histoire</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#f6ebdb] md:text-xl">Une passion transmise à travers les saveurs</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <section className="rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-7 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="text-[#3b2a21]">
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">L’Origine</h2>
                <p className="mt-5 text-base leading-8 text-[#5c4a3c] md:text-lg">
                  Dans notre propriété agricole, située sur un terroir d’exception de 4 hectares dans les Corbières, en Occitanie, notre grenaderaie nous permet de créer des vinaigres d’exception, vieillissant pendant un minimum de 3 ans.
                  Après sept années de recherche et de perfectionnement, nous avons élaboré un vinaigre de grenade biologique que les connaisseurs surnomment « l’élixir » dans notre région. Un produit rare et précieux, qui incarne à la fois notre passion et notre savoir-faire unique.
                </p>
              </div>
              <div className="overflow-hidden rounded-[24px]">
                <img src="/images/notreshistoire/NotrePhilo.jpg" alt="Notre propriété agricole dans les Corbières" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-7 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2 md:[&>*:first-child]:order-2">
              <div className="text-[#3b2a21]">
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">Le processus de fabrication</h2>
                <p className="mt-5 text-base leading-8 text-[#5c4a3c] md:text-lg">
                  Une fois nos vinaigres mûrs et prêts, nous y infusons avec soin des fruits, des épices et du poivre pendant 3 à 8 mois. Cette macération lente libère des saveurs exceptionnelles et complexes, offrant à chaque goutte une expérience gustative inédite. Vu le cadeau de Mère Nature, il nous a paru évident de partager ces saveurs d’exception. Maintenant à vos papilles !
                </p>
              </div>
              <div className="overflow-hidden rounded-[24px]">
                <img src="/images/notreshistoire/MaisonHeness15.jpg" alt="Processus de fabrication artisanale" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-7 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="text-[#3b2a21]">
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">Notre Philosophie</h2>
                <p className="mt-5 text-base leading-8 text-[#5c4a3c] md:text-lg">
                  Nous sommes fiers de vous proposer un produit raffiné, destiné aux connaisseurs et aux amateurs de saveurs authentiques. En choisissant nos vinaigres, vous devenez un client privilégié, invité à savourer un mets original, fruit d’une alchimie parfaite entre tradition et innovation. Nous sommes avant tout des créateurs de goûts, passionnés et dévoués à l’art de ravir vos papilles.
                  <br />
                  Ici, la star est le vinaigre !
                </p>
              </div>
              <div className="overflow-hidden rounded-[24px]">
                <img src="/images/notreshistoire/Origine.jpg" alt="Notre magasin Maison Heness" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-7 shadow-[0_18px_40px_rgba(80,55,30,0.07)] md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2 md:[&>*:first-child]:order-2">
              <div className="overflow-hidden rounded-[24px]">
                <img src="/images/notreshistoire/MaisonHeness7.jpg" alt="Découverte du vinaigre de grenade" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
              <div className="text-[#3b2a21]">
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">Notre Découverte</h2>
                <p className="mt-5 text-base leading-8 text-[#5c4a3c] md:text-lg">
                  Comme dans toute belle histoire, c’est en laissant un jus de grenade dans une bouteille que nous avons découvert qu’il se transformait en vinaigre. Ce goût inoubliable nous a poussés à poursuivre cette aventure et à participer activement à cette transformation naturelle, guidée par Mère Nature elle-même.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-[#e2cfa8] bg-[#f7ecd8] px-8 py-14 text-center shadow-[0_18px_40px_rgba(80,55,30,0.1)] md:px-16 md:py-16">
          {/* guillemet ouvrant décoratif */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-2 select-none font-serif text-[120px] leading-none text-[#c9a15f]/25 md:left-10 md:text-[160px]"
          >
            “
          </span>

          <div className="relative">
            <p className="font-serif text-lg italic tracking-wide text-[#8a6a35] md:text-xl">
              Savez-vous quel fût le dernier breuvage de Jésus avant sa mort&nbsp;?
            </p>

            <div className="mx-auto my-6 h-px w-16 bg-[#c9a15f]" />

            <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-[#2f221b] md:text-3xl">
              Du vinaigre, symbole de purification de l’amertume du monde, signe de
              l’accomplissement d’une promesse divine.
            </p>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a35]">
              Tradition biblique
            </p>
          </div>

          {/* guillemet fermant décoratif */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-6 select-none font-serif text-[120px] leading-none text-[#c9a15f]/25 md:right-10 md:text-[160px]"
          >
            ”
          </span>
        </div>
      </section>
    </>
  );
}
