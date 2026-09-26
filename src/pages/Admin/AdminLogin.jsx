import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            `${API_URL}/api/auth/me`,
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
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f8f1e5] px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#eadcc2] bg-[#fffdf8] shadow-[0_18px_40px_rgba(80,55,30,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-[#2e1f16] p-8 text-white md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(221,185,126,0.24),_transparent_30%)]" />
          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ecd9b6]">
              Maison Heness
            </span>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#ecd9b6]">
                Administration
              </p>

              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
                Gérez votre
                <br />
                univers.
              </h1>

              <p className="mt-5 max-w-sm text-base leading-7 text-[#f0e7dd]">
                Un espace dédié à la gestion du contenu
                et des pages du site Maison Heness.
              </p>
            </div>
          </div>
        </div>


        <div className="p-6 md:p-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a6e52]">
              Espace privé
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#2f221b]">
              Connexion
            </h2>

            <p className="mt-3 text-base text-[#5c4a3c]">
              Entrez vos identifiants pour accéder
              à l’administration Maison Heness.
            </p>
          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-[#4a3529]"
              >
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
                className="w-full rounded-2xl border border-[#d9cbb2] bg-[#f9f4ee] px-4 py-3 text-[#2b1f18] placeholder:text-[#7a685c] focus:border-[#a57d4d] focus:outline-none"
              />
            </div>


            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-[#4a3529]"
              >
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
                className="w-full rounded-2xl border border-[#d9cbb2] bg-[#f9f4ee] px-4 py-3 text-[#2b1f18] placeholder:text-[#7a685c] focus:border-[#a57d4d] focus:outline-none"
              />
            </div>


            {error && (
              <div className="rounded-2xl border border-[#f1c7c7] bg-[#fff5f5] px-4 py-3 text-sm text-[#8b2f2f]">
                {error}
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#2c1f19] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4d3629] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Connexion...'
                : 'Se connecter'}
            </button>
          </form>


          <p className="mt-6 text-sm text-[#5c4a3c]">
            Espace réservé à l’administration Maison Heness.
          </p>
        </div>
      </section>
    </main>
  );
}