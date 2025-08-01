import React from 'react';
import './NotreHistoire.css';

const NotreHistoire = () => {
  return (
    <div className="nh-page-container">
      {/* Hero Section */}
      <section className="nh-hero-section">
        <div className="nh-hero-image-container">
          <img 
            src="/images/notreshistoire/notrehistoire.jpg" 
            alt="Notre vinaigrerie artisanale" 
            className="nh-hero-image"
          />
          <div className="nh-hero-overlay"></div>
        </div>
        
        <div className="nh-hero-content">
          <h1 className="nh-main-title">Notre Histoire</h1>
          <p className="nh-hero-subtitle">Une passion transmise à travers les saveurs</p>
        </div>
      </section>

      {/* Story Sections */}
      <div className="nh-story-container">
        {/* Block 1 */}
        <section className="nh-story-block">
          <div className="nh-story-content">
            <div className="nh-story-text">
              <p>
                Dans notre propriété agricole, située sur un terroir d'exception de 4 hectares dans les Corbières,
                notre grenaderaie nous permet de créer des vinaigres d'exception, vieillissant pendant un minimum de 3 ans.
                Après sept années de recherche et de perfectionnement, nous avons élaboré un vinaigre biologique que l'on surnomme souvent "l'élixir" dans notre région.
                Un produit rare et précieux, qui incarne à la fois notre passion et notre savoir-faire unique.
              </p>
            </div>
          </div>
        </section>

        {/* Block 2 */}
        <section className="nh-story-block nh-alt-block">
          <div className="nh-story-content">
            <div className="nh-story-text">
              <p>
                Une fois nos vinaigres mûrs et prêts, nous y infusons avec soin des fruits, des épices et du poivre pendant 3 à 8 mois.
                Ce processus de macération lente libère des saveurs exceptionnelles et complexes, offrant à chaque goutte une expérience gustative inédite et envoûtante.
                Vu le cadeau de Mère Nature, il nous a paru évident de partager ce mets. Maintenant à vos papilles!
              </p>
            </div>
          </div>
        </section>

        {/* Block 3 */}
        <section className="nh-story-block">
          <div className="nh-story-content">
            <div className="nh-story-text">
              <p>
                Nous sommes fiers de vous proposer un produit raffiné, destiné aux connaisseurs et aux amateurs de saveurs authentiques.
                En choisissant nos vinaigres, vous devenez un client privilégié, invité à savourer un mets d'exception,
                fruit d'une alchimie parfaite entre tradition et innovation.
                Nous nous considérons comme des créateurs de goûts, passionnés et dévoués à l'art de ravir vos papilles.
              </p>
            </div>
          </div>
        </section>

        {/* Block 4 */}
        <section className="nh-story-block nh-alt-block">
          <div className="nh-story-content">
            <div className="nh-story-text">
              <p>
                Comme dans toute belle histoire, c'est en laissant un jus de grenade dans une bouteille que nous avons découvert qu'il se transformait en vinaigre.
                Ce goût inoubliable nous a poussés à poursuivre cette aventure et à participer activement à cette transformation naturelle,
                guidée par Mère Nature elle-même.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotreHistoire;