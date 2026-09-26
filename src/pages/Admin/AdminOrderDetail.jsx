import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAdminOrderById, updateAdminOrderStatus } from '../../services/api';

export const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem('la_providence_admin_token') || localStorage.getItem('maison_heness_admin_token');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminOrderById(id, token);
        setOrder(data);
      } catch (err) {
        console.error('Erreur lors du chargement de la commande :', err);
        setError(err.message || 'Impossible de charger la commande');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOrder();
    }
  }, [id, token]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const updatedOrder = await updateAdminOrderStatus(id, newStatus, token);
      setOrder(updatedOrder || { ...order, status: newStatus });
    } catch (err) {
      alert(`Erreur lors de la mise à jour : ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement de la commande...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {error || 'Commande introuvable.'}
        </div>
        <Link to="/admin" className="text-sm text-gray-600 hover:underline">
          ← Retour à l'administration
        </Link>
      </div>
    );
  }

  const items = order.items || order.orderItems || [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <Link to="/admin" className="text-sm text-gray-500 hover:text-black mb-1 inline-block">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Commande <span className="text-gray-500 font-mono text-lg">#{order.id}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Statut :</label>
          <select
            value={order.status || 'PENDING'}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-black outline-none"
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-gray-900 border-b pb-2">Informations</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p><span className="font-medium text-gray-900">Date :</span> {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
            <p><span className="font-medium text-gray-900">Total :</span> {order.totalAmount ?? order.total ?? 0} €</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-gray-900 border-b pb-2">Client</h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p className="font-medium text-gray-900">{order.user?.name || order.customerName || 'Client'}</p>
            <p>{order.user?.email || order.customerEmail || 'Pas d\'email'}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <h2 className="font-semibold text-gray-900 border-b pb-2">Livraison</h2>
          <div className="text-sm space-y-1 text-gray-600">
            {order.shippingAddress ? (
              <>
                <p>{order.shippingAddress.street || order.shippingAddress.address}</p>
                <p>{order.shippingAddress.zipCode} {order.shippingAddress.city}</p>
              </>
            ) : (
              <p className="italic text-gray-400">Aucune adresse renseignée</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-900">Articles ({items.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.product?.name || item.name || 'Produit'}</p>
                <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
              </div>
              <div className="font-medium text-gray-900">
                {((item.price || item.unitPrice || 0) * (item.quantity || 1)).toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;