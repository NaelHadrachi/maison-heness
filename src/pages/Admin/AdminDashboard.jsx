import {
  Link,
  useNavigate
} from 'react-router-dom';

import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const email =
    localStorage.getItem(
      'maison_heness_admin_email'
    ) ||
    'Administrateur';


  const handleLogout = () => {
    localStorage.removeItem(
      'maison_heness_admin_token'
    );

    localStorage.removeItem(
      'maison_heness_admin_session'
    );

    localStorage.removeItem(
      'maison_heness_admin_profile'
    );

    localStorage.removeItem(
      'maison_heness_admin_email'
    );

    navigate('/admin/login');
  };


  return (
    <main className="admin-dashboard">

      <aside className="admin-sidebar">

        <div>
          <span className="admin-sidebar-small">
            Administration
          </span>

          <h2>
            Maison
            <br />
            Heness
          </h2>
        </div>


        <nav className="admin-sidebar-menu">

          <Link
            to="/admin"
            className="admin-sidebar-link active"
          >
            Tableau de bord
          </Link>

          <button
            className="admin-sidebar-link"
            type="button"
            disabled
          >
            Pages
            <span>Bientôt</span>
          </button>

          <button
            className="admin-sidebar-link"
            type="button"
            disabled
          >
            Médias
            <span>Bientôt</span>
          </button>

        </nav>


        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>

      </aside>


      <section className="admin-dashboard-content">

        <header className="admin-dashboard-header">

          <div>
            <span>
              Tableau de bord
            </span>

            <h1>
              Bonjour.
            </h1>

            <p>
              {email}
            </p>
          </div>

          <Link
            to="/"
            className="admin-view-site"
          >
            Voir le site ↗
          </Link>

        </header>


        <section className="admin-welcome-card">

          <div>

            <span className="admin-card-number">
              01
            </span>

            <h2>
              Votre espace
              <br />
              d'administration.
            </h2>

          </div>


          <div className="admin-welcome-text">

            <p>
              Cet espace permettra de créer,
              modifier et gérer les pages
              du site Maison Heness.
            </p>

            <p>
              Nous allons maintenant construire
              progressivement le système de gestion
              des pages.
            </p>

          </div>

        </section>


        <section className="admin-dashboard-cards">

          <article>
            <span>Pages</span>

            <h3>
              Gérer les pages
            </h3>

            <p>
              Ajouter, modifier, publier
              ou supprimer une page.
            </p>

            <span className="admin-soon">
              Prochaine étape
            </span>
          </article>


          <article>
            <span>Contenu</span>

            <h3>
              Modifier le contenu
            </h3>

            <p>
              Textes, images, sections,
              couleurs et mise en page.
            </p>
          </article>


          <article>
            <span>Design</span>

            <h3>
              Personnaliser
            </h3>

            <p>
              Le gérant pourra modifier
              directement le style des pages.
            </p>
          </article>

        </section>

      </section>

    </main>
  );
}