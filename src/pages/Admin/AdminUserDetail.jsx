import { Link, useParams } from 'react-router-dom';

export default function AdminUserDetail() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">Utilisateurs</p>
        <h1 className="mt-3 text-3xl font-bold text-[#2e1f16]">Détails utilisateur</h1>
        <p className="mt-4 text-sm text-gray-600">ID : {id}</p>
        <p className="mt-2 text-sm text-gray-500">Cette vue est prête pour l’affichage complet du profil administrateur.</p>
        <Link
          to="/admin"
          className="mt-6 inline-flex rounded-lg bg-[#2e1f16] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15]"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
