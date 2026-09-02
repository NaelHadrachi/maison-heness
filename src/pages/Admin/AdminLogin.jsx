import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://88.185.44.213:17777';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError(
        'Veuillez renseigner votre adresse email et votre mot de passe.'
      );
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            'Adresse email ou mot de passe incorrect.'
          );
        }

        throw new Error(
          'Impossible de se connecter pour le moment.'
        );
      }

      /*
        La documentation actuelle ne décrit pas
        encore précisément le JSON retourné.

        On essaie donc plusieurs formats.
      */

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      const authHeader =
        response.headers.get('authorization');

      const tokenFromHeader =
        authHeader?.startsWith('Bearer ')
          ? authHeader.replace('Bearer ', '')
          : null;

      const token =
        data.access_token ||
        data.accessToken ||
        data.token ||
        data.jwt ||
        tokenFromHeader ||
        null;

      /*
        Si le backend retourne déjà un JWT,
        on l'enregistre.
      */

      if (token) {
        localStorage.setItem(
          'maison_heness_admin_token',
          token
        );

        /*
          On essaie également de récupérer
          le profil utilisateur.
        */

        try {
          const profileResponse = await fetch(
            `${API_URL}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (profileResponse.ok) {
            const profile =
              await profileResponse.json();

            localStorage.setItem(
              'maison_heness_admin_profile',
              JSON.stringify(profile)
            );

            /*
              PLUS TARD :

              if (profile.role !== 'ADMIN') {
                throw new Error(
                  "Vous n'avez pas les droits administrateur."
                );
              }
            */
          }
        } catch (profileError) {
          console.warn(
            'Impossible de récupérer le profil :',
            profileError
          );
        }
      }

      /*
        TEMPORAIRE

        Tant que ton collègue n'a pas terminé
        le rôle ADMIN / retour JWT,
        un login réussi donne accès à /admin.

        À supprimer quand l'API admin sera prête.
      */

      localStorage.setItem(
        'maison_heness_admin_session',
        'true'
      );

      localStorage.setItem(
        'maison_heness_admin_email',
        form.email
      );

      navigate('/admin');
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          'Une erreur est survenue.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <section className="admin-login-brand">
        <span className="admin-brand-name">
          Maison Heness
        </span>

        <div className="admin-brand-bottom">
          <p className="admin-brand-label">
            Administration
          </p>

          <h1>
            Gérez votre
            <br />
            univers.
          </h1>

          <p className="admin-brand-description">
            Un espace dédié à la gestion du contenu
            et des pages du site Maison Heness.
          </p>
        </div>
      </section>


      <section className="admin-login-content">

        <div className="admin-login-box">

          <span className="admin-login-label">
            Espace privé
          </span>

          <h2>Connexion</h2>

          <p className="admin-login-description">
            Entrez vos identifiants pour accéder
            à l'administration Maison Heness.
          </p>


          <form
            onSubmit={handleSubmit}
            className="admin-login-form"
          >

            <div className="admin-field">
              <label htmlFor="email">
                Adresse email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                autoComplete="email"
              />
            </div>


            <div className="admin-field">
              <label htmlFor="password">
                Mot de passe
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>


            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              {loading
                ? 'Connexion...'
                : 'Se connecter'}
            </button>

          </form>


          <p className="admin-login-note">
            Espace réservé à l'administration
            Maison Heness.
          </p>

        </div>

      </section>

    </main>
  );
}