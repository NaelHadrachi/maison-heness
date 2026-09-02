import './CuveeLeonXIV.css';

export default function CuveeLeonXIV() {
  return (
    <main className="cuvee-page">

      {/* HERO */}
      <section className="cuvee-hero">
        <div className="cuvee-hero-text">
          <span className="cuvee-overline">
            Maison Heness · Édition spéciale
          </span>

          <h1>
            Cuvée
            <span>Léon XIV</span>
          </h1>

          <p className="cuvee-intro">
            Une création de vinaigre de grenade imaginée
            à l’occasion de la venue annoncée du pape Léon XIV
            à Lourdes.
          </p>

          <div className="cuvee-actions">
            <a
              href="#histoire"
              className="cuvee-btn"
            >
              Découvrir la cuvée
            </a>

            <a
              href="https://www.nrpyrenees.fr/2026/08/16/on-espere-pouvoir-lui-offrir-cette-vinaigrerie-artisanale-de-lourdes-a-concu-specialement-un-vinaigre-de-grenade-pour-la-venue-du-pape-leon-xiv-13503454.php"
              target="_blank"
              rel="noreferrer"
              className="cuvee-article-link"
            >
              Lire l’article ↗
            </a>
          </div>
        </div>

        <div className="cuvee-hero-media">
          <img
            src="/images/cuvee-leon-xiv/Vinaigrepp.png"
            alt="Cuvée Léon XIV - Maison Heness"
            className="cuvee-product-image"
          />
        </div>
      </section>

      {/* HISTOIRE */}
      <section
        id="histoire"
        className="cuvee-story"
      >
        <div className="cuvee-section-heading">
          <span className="cuvee-number">
            01
          </span>

          <div>
            <p className="cuvee-label">
              L’histoire
            </p>

            <h2>
              Une création pensée
              <br />
              pour une occasion
              <br />
              exceptionnelle.
            </h2>
          </div>
        </div>

        <div className="cuvee-story-text">
          <p>
            Maison Heness a imaginé une cuvée spéciale
            de vinaigre de grenade à l’occasion de la venue
            annoncée du pape Léon XIV à Lourdes.
          </p>

          <p>
            Cette création associe notamment le fenouil sauvage,
            le miel et le Sel de Gruissan.
          </p>
        </div>
      </section>

      {/* COMPOSITION */}
      <section className="cuvee-composition">
        <div className="cuvee-composition-heading">
          <span className="cuvee-number">
            02
          </span>

          <div>
            <p className="cuvee-label">
              La composition
            </p>

            <h2>
              Une recette
              <br />
              singulière.
            </h2>
          </div>
        </div>

        <div className="cuvee-ingredients">

          <article className="cuvee-ingredient">
            <span>01</span>

            <div>
              <h3>Grenade</h3>

              <p>
                La base emblématique de cette création
                Maison Heness.
              </p>
            </div>
          </article>

          <article className="cuvee-ingredient">
            <span>02</span>

            <div>
              <h3>Fenouil sauvage</h3>

              <p>
                Une note végétale et aromatique qui apporte
                de la personnalité à la cuvée.
              </p>
            </div>
          </article>

          <article className="cuvee-ingredient">
            <span>03</span>

            <div>
              <h3>Miel</h3>

              <p>
                Une touche douce qui vient équilibrer
                l’ensemble.
              </p>
            </div>
          </article>

          <article className="cuvee-ingredient">
            <span>04</span>

            <div>
              <h3>Sel de Gruissan</h3>

              <p>
                Une signature méditerranéenne issue de la
                collaboration entre Maison Heness et
                les Sels de Gruissan.
              </p>
            </div>
          </article>

        </div>
      </section>

      {/* COLLABORATION */}
      <section className="cuvee-collab">
        <div className="cuvee-collab-heading">
          <span className="cuvee-number">
            03
          </span>

          <div>
            <p className="cuvee-label">
              La collaboration
            </p>

            <h2>
              Maison Heness
              <br />
              × Sels de Gruissan
            </h2>
          </div>
        </div>

        <div className="cuvee-collab-layout">

          <div className="cuvee-collab-content">
            <p>
              Pour la Cuvée Léon XIV, Maison Heness s’associe
              aux Sels de Gruissan afin d’intégrer à cette
              création un sel issu du terroir méditerranéen.
            </p>

            <p>
              Produit au Salin de l’Île Saint-Martin,
              le Sel de Gruissan s’inscrit dans un savoir-faire
              de sauniers transmis de génération en génération.
            </p>

            <p>
              Cette collaboration vient compléter la recette
              de la cuvée aux côtés de la grenade,
              du fenouil sauvage et du miel.
            </p>

            <a
              href="https://www.seldegruissan.fr/"
              target="_blank"
              rel="noreferrer"
              className="cuvee-collab-link"
            >
              Découvrir les Sels de Gruissan ↗
            </a>
          </div>

          <div className="cuvee-collab-logo-wrap">
            <img
              src="/images/cuvee-leon-xiv/logo-sel-de-gruissan.png"
              alt="Sels de Gruissan"
              className="cuvee-collab-logo"
            />
          </div>

        </div>
      </section>

    </main>
  );
}