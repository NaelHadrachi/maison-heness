import { Link } from 'react-router-dom';
import { trackShipment } from '../../../services/api';
import { statusClasses, getOrderStatus, formatCurrency } from '../../../utils/adminHelpers';

export default function OrdersSection({ orders, token, setNotice, setError, loadDashboard }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2e1f16]">Commandes</h2>
          <p className="mt-1 text-sm text-gray-500">Suivez et gérez les commandes de la boutique.</p>
        </div>
        <span className="rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-semibold text-[#4a5568]">
          {`${orders.length} commande${orders.length > 1 ? 's' : ''}`}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">Aucune commande trouvée.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-4 p-5 transition-colors hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-[#2e1f16]">{`Commande #${order.id}`}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClasses[getOrderStatus(order)]}`}>
                      {getOrderStatus(order)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>{`Montant total: ${formatCurrency(order.total || 0)}`}</span>
                    <span>{`Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`}</span>
                  </div>
                </div>

                <div className="flex gap-2 sm:shrink-0">
                  <Link
                    to={`/admin/commandes/${order.id}`}
                    className="flex-1 rounded-lg bg-[#2e1f16] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15] sm:flex-none"
                  >
                    Voir la commande
                  </Link>
                  <button
                    onClick={async () => {
                      if (!token) return;
                      try {
                        await trackShipment(order.id, token);
                        setNotice('Le suivi de l’expédition a été mis à jour.');
                        await loadDashboard();
                      } catch (err) {
                        setError(err.message || 'Erreur lors de la mise à jour du suivi.');
                      }
                    }}
                    className="flex-1 rounded-lg bg-[#f97316] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d65e10] sm:flex-none"
                  >
                    {order.trackingNumber ? 'Mettre à jour le suivi' : 'Suivre l’expédition'}
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