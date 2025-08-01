import React from 'react';
import './NotreHistoire.css';

const NotreHistoire = () => {
  return (
    <div className="histoire-page">
      <h1>Notre Histoire</h1>
      
      <div className="histoire-paragraphe">
        <p>
          Dans notre propriété agricole, située sur un terroir d'exception de 4 hectares dans les Corbières,
          notre grenaderaie nous permet de créer des vinaigres d'exception, vieillissant pendant un minimum de 3 ans.
          Après sept années de recherche et de perfectionnement, nous avons élaboré un vinaigre biologique que l'on surnomme souvent "l'élixir" dans notre région.
          Un produit rare et précieux, qui incarne à la fois notre passion et notre savoir-faire unique.
        </p>
      </div>

      <div className="histoire-paragraphe">
        <p>
          Une fois nos vinaigres mûrs et prêts, nous y infusons avec soin des fruits, des épices et du poivre pendant 3 à 8 mois.
          Ce processus de macération lente libère des saveurs exceptionnelles et complexes, offrant à chaque goutte une expérience gustative inédite et envoûtante.
          Vu le cadeau de Mère Nature, il nous a paru évident de partager ce mets. Maintenant à vos papilles!
        </p>
      </div>

      <div className="histoire-image-container">
        <img 
          src="/images/IMG_20240618_210541.jpg" 
          alt="Notre grenaderaie" 
        />
      </div>

      <div className="histoire-paragraphe">
        <p>
          Nous sommes fiers de vous proposer un produit raffiné, destiné aux connaisseurs et aux amateurs de saveurs authentiques.
          En choisissant nos vinaigres, vous devenez un client privilégié, invité à savourer un mets d'exception,
          fruit d'une alchimie parfaite entre tradition et innovation.
          Nous nous considérons comme des créateurs de goûts, passionnés et dévoués à l'art de ravir vos papilles.
        </p>
      </div>

      <div className="histoire-paragraphe">
        <p>
          Comme dans toute belle histoire, c'est en laissant un jus de grenade dans une bouteille que nous avons découvert qu'il se transformait en vinaigre.
          Ce goût inoubliable nous a poussés à poursuivre cette aventure et à participer activement à cette transformation naturelle,
          guidée par Mère Nature elle-même.
        </p>
      </div>
    </div>
  );
};

export default NotreHistoire;