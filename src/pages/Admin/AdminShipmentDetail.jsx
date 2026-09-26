import { Link, useParams } from 'react-router-dom';

export default function AdminShipmentDetail() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">Expéditions</p>
        <h1 className="mt-3 text-3xl font-bold text-[#2e1f16]">Détails de l’expédition</h1>
        <p className="mt-4 text-sm text-gray-600">ID : {id}</p>
        <p className="mt-2 text-sm text-gray-500">Cette vue est prête pour afficher le détail complet du colis et son suivi.</p>
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
