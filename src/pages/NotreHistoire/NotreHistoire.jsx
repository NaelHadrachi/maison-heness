import React from 'react';
import './NotreHistoire.css';

export default function NotreHistoire() {
  return (
    <>
      {/* HERO — placé hors du container pour garantir le full-bleed */}
      <section
        className="nh-hero-section"
        style={{ backgroundImage: "url('/images/notreshistoire/MaisonHeness17.jpg')" }}
        aria-label="Propriété Maison Heness"
      >
        <div className="nh-hero-overlay" />
        <div className="nh-hero-content">
          <h1 className="nh-main-title">Notre Histoire</h1>
          <p className="nh-hero-subtitle">Une passion transmise à travers les saveurs</p>
        </div>
      </section>

      {/* CONTENU – dans un container centré classique */}
      <div className="nh-page-container">
        <div className="nh-story-container">
          {/* Block 1 - Origines */}
          <section className="nh-story-block">
            <div className="nh-story-content nh-grid-layout">
              <div className="nh-story-text">
                <h2 className="nh-section-title">L' Origine</h2>
                <p>
                  Dans notre propriété agricole, située sur un terroir d'exception de 4 hectares dans les Corbières, en Occitanie, 
                  notre grenaderaie nous permet de créer des vinaigres d'exception, vieillissant pendant un minimum de 3 ans.
                  Après sept années de recherche et de perfectionnement, nous avons élaboré un vinaigre de grenade biologique que les connaisseurs 
                  surnomment « l'élixir » dans notre région. Un produit rare et précieux, qui incarne à la fois notre
                  passion et notre savoir-faire unique.
                </p>
              </div>
              <div className="nh-story-image">
                <img
                  src="/images/notreshistoire/NotrePhilo.jpg"
                  alt="Notre propriété agricole dans les Corbières"
                  className="nh-image"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Block 2 - Processus */}
          <section className="nh-story-block">
            <div className="nh-story-content nh-grid-layout nh-reverse">
              <div className="nh-story-text">
                <h2 className="nh-section-title">Le processus de fabrication</h2>
                <p>
                  Une fois nos vinaigres mûrs et prêts, nous y infusons avec soin des fruits, des épices et du poivre
                  pendant 3 à 8 mois. Cette macération lente libère des saveurs exceptionnelles et complexes, offrant à
                  chaque goutte une expérience gustative inédite. Vu le cadeau de Mère Nature, il nous a paru évident de
                  partager ces saveurs d'exception. Maintenant à vos papilles !
                </p>
              </div>
              <div className="nh-story-image">
                <img
                  src="/images/notreshistoire/MaisonHeness15.jpg"
                  alt="Processus de fabrication artisanale"
                  className="nh-image"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Block 3 - Philosophie */}
          <section className="nh-story-block">
            <div className="nh-story-content nh-grid-layout">
              <div className="nh-story-text">
                <h2 className="nh-section-title">Notre Philosophie</h2>
                <p>
                  Nous sommes fiers de vous proposer un produit raffiné, destiné aux connaisseurs et aux amateurs de
                  saveurs authentiques. En choisissant nos vinaigres, vous devenez un client privilégié, invité à savourer
                  un mets original, fruit d'une alchimie parfaite entre tradition et innovation. Nous sommes avant tout 
                  des créateurs de goûts, passionnés et dévoués à l'art de ravir vos papilles. 
                  <br></br>
                  Ici, la star est le vinaigre &nbsp;!
                </p>
              </div>
              <div className="nh-story-image">
                <img
                  src="/images/notreshistoire/Origine.jpg"
                  alt="Notre magasin Maison Heness"
                  className="nh-image"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Block 4 - Découverte */}
          <section className="nh-story-block nh-discovery">
            <div className="nh-story-content nh-grid-layout">
              <div className="nh-story-image">
                <img
                  src="/images/notreshistoire/MaisonHeness7.jpg"
                  alt="Découverte du vinaigre de grenade"
                  className="nh-image"
                  loading="lazy"
                />
              </div>
              <div className="nh-story-text">
                <h2 className="nh-section-title">Notre Découverte</h2>
                <p className="nh-large-text">
                  Comme dans toute belle histoire, c'est en laissant un jus de grenade dans une bouteille que nous avons
                  découvert qu'il se transformait en vinaigre. Ce goût inoubliable nous a poussés à poursuivre cette
                  aventure et à participer activement à cette transformation naturelle, guidée par Mère Nature elle-même.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Phrase finale */}
<section className="nh-story-block nh-conclusion">
  <div className="nh-story-content">
    <p className="nh-conclusion-text">
      <strong>Savez-vous quel fût le dernier breuvage de Jésus avant sa mort&nbsp;?</strong>
      <br />
      Du vinaigre, symbole de purification de l’amertume du monde, signe de l’accomplissement d’une promesse divine.
    </p>
  </div>
</section>

    </>
  );
}
