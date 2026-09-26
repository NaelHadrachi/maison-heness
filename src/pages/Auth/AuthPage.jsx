import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AuthPage() {
  const { user, login, register, loadingUser } = useStore();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState(null);

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/settings', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        await register(formData);
      } else {
        await login({ email: formData.email, password: formData.password });
      }
      navigate('/settings');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l’authentification.');
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 font-serif text-3xl font-bold text-[#5c3a21]">
        {isRegistering ? 'Créer un compte' : 'Connexion'}
      </h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isRegistering && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loadingUser}
          className="mt-2 rounded-md bg-[#5c3a21] px-4 py-2 font-semibold text-[#f5e7d9] transition hover:bg-[#4b2d1c]"
        >
          {loadingUser ? 'Chargement...' : isRegistering ? 'S’inscrire' : 'Se connecter'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-sm text-[#5c3a21] underline"
      >
        {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S’inscrire'}
      </button>
    </div>
  );
}