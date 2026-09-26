export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-[#2e1f16]">Vue d’ensemble</h2>
        <p className="mt-1 text-sm text-gray-500">Bienvenue sur le tableau de bord administrateur.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#2e1f16]" />
            <h3 className="text-lg font-semibold text-[#2e1f16]">Statistiques</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Aperçu des statistiques clés.</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#f97316]" />
            <h3 className="text-lg font-semibold text-[#2e1f16]">Activité récente</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Dernières actions sur le site.</p>
        </div>
      </div>
    </div>
  );
}