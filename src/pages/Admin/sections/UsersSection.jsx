import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminUsers, updateAdminUser } from '../../../services/api';
import { normalizeCollection, statusClasses } from '../../../utils/adminHelpers';

export default function UsersSection({ users: initialUsers = [], token, setNotice, setError, loadDashboard }) {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    if (!token) return;

    fetchAdminUsers(token)
      .then((payload) => {
        setUsers(normalizeCollection(payload));
      })
      .catch((err) => {
        setError?.(err.message || 'Erreur lors du chargement des utilisateurs.');
      });
  }, [token, setError]);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2e1f16]">Utilisateurs</h2>
          <p className="mt-1 text-sm text-gray-500">Gérez les comptes et les droits d’accès.</p>
        </div>
        <span className="rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-semibold text-[#4a5568]">
          {`${users.length} utilisateur${users.length > 1 ? 's' : ''}`}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">Aucun utilisateur trouvé.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col gap-4 p-5 transition-colors hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-[#2e1f16]">{user.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClasses[user.role]}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>{`name: ${user.firstName} ${user.lastName}`}</span>
                    <span>{`Email: ${user.email}`}</span>
                    <span>{`Téléphone: ${user.phone || 'Non renseigné'}`}</span>
                    <span>{`Rôle: ${user.role}`}</span>
                  </div>
                </div>

                <div className="flex gap-2 sm:shrink-0">
                  <Link
                    to={`/admin/utilisateurs/${user.id}`}
                    className="flex-1 rounded-lg bg-[#2e1f16] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15] sm:flex-none"
                  >
                    Voir l’utilisateur
                  </Link>
                  <button
                    onClick={async () => {
                      if (!token) return;
                      try {
                        await updateAdminUser(user.id, token, { role: user.role === 'ADMIN' ? 'USER' : 'ADMIN' });
                        setNotice?.('Le rôle de l’utilisateur a été mis à jour.');
                        await loadDashboard?.();
                      } catch (err) {
                        setError?.(err.message || 'Erreur lors de la mise à jour de l’utilisateur.');
                      }
                    }}
                    className="flex-1 rounded-lg bg-[#f97316] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d65e10] sm:flex-none"
                  >
                    {user.role === 'ADMIN' ? 'Retirer les droits d\'admin' : 'Donner les droits d\'admin'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}