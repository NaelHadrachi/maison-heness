import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  downloadShipmentLabel, 
  createShipment, 
  fetchShippingPickupPoints, 
  trackShipment 
} from '../../../services/api';
import { statusClasses } from '../../../utils/adminHelpers';

export default function ShippingSection({ 
  shipments = [], 
  token, 
  setNotice = () => {}, 
  setError = () => {} 
}) {
  const safeSetError = (msg) => typeof setError === 'function' && setError(msg);
  const safeSetNotice = (msg) => typeof setNotice === 'function' && setNotice(msg);

  // État pour la création d'expédition
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loadingPoints, setLoadingPoints] = useState(false);

  // État pour le modal de suivi
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const [formData, setFormData] = useState({
    shipperName: 'Maison Heness',
    shipperAddress: '12 Rue de la Paix',
    shipperCity: 'Paris',
    shipperPostalCode: '75002',
    shipperCountry: 'FR',
    shipperPhone: '+33612345678',
    shipperEmail: 'contact@maison-heness.fr',
    
    recipientName: '',
    recipientAddress: '',
    recipientCity: '',
    recipientPostalCode: '',
    recipientCountry: 'FR',
    recipientPhone: '',
    recipientEmail: '',

    pickupPointId: '',
    pickupPointCountry: 'FR',
    weight: 1000,
    reference: '',
    value: 2000,
  });

  // Recherche de points relais par code postal recipient
  const handleSearchPickupPoints = async () => {
    if (!formData.recipientPostalCode) {
      safeSetError('Saisissez au moins un code postal destinataire.');
      return;
    }
    try {
      setLoadingPoints(true);
      safeSetError(null);
      const res = await fetchShippingPickupPoints({
        postalCode: formData.recipientPostalCode,
        country: formData.recipientCountry,
      }, token);
      setPickupPoints(Array.isArray(res) ? res : res?.points || []);
    } catch (err) {
      safeSetError(err.message || 'Impossible de récupérer les points relais.');
    } finally {
      setLoadingPoints(false);
    }
  };

  // Soumission de la création
  const handleCreateShipment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      safeSetError(null);

      const payload = {
        shipper: {
          name: formData.shipperName,
          address: formData.shipperAddress,
          city: formData.shipperCity,
          postalCode: formData.shipperPostalCode,
          country: formData.shipperCountry,
          phone: formData.shipperPhone,
          email: formData.shipperEmail,
        },
        recipient: {
          name: formData.recipientName,
          address: formData.recipientAddress,
          city: formData.recipientCity,
          postalCode: formData.recipientPostalCode,
          country: formData.recipientCountry,
          phone: formData.recipientPhone,
          email: formData.recipientEmail,
        },
        pickupPointId: formData.pickupPointId,
        pickupPointCountry: formData.pickupPointCountry,
        weight: Number(formData.weight),
        reference: formData.reference,
        value: Number(formData.value),
      };

      await createShipment(payload, token);
      safeSetNotice('Expédition créée avec succès.');
      setShowCreateModal(false);
    } catch (err) {
      safeSetError(err.message || 'Erreur lors de la création de l’expédition.');
    } finally {
      setLoading(false);
    }
  };

  // Suivi de colis
  const handleTrack = async (shipmentNumber) => {
    try {
      setTrackingLoading(true);
      safeSetError(null);
      const data = await trackShipment(shipmentNumber);
      setTrackingData(data);
    } catch (err) {
      safeSetError(err.message || 'Impossible de suivre cette expédition.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2e1f16]">Expéditions</h2>
          <p className="mt-1 text-sm text-gray-500">Suivez les colis en cours et téléchargez les étiquettes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-[#2e1f16] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15]"
          >
            + Nouvelle expédition
          </button>
          <span className="rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-semibold text-[#4a5568]">
            {`${shipments.length} expédition${shipments.length > 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Liste des expéditions */}
      {shipments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">Aucune expédition trouvée.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
          <div className="divide-y divide-gray-100">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="flex flex-col gap-4 p-5 transition-colors hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-[#2e1f16]">{`Expédition #${shipment.id}`}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClasses[shipment.status] || 'bg-gray-100 text-gray-800'}`}>
                      {shipment.status}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>{`Référence: ${shipment.reference || 'N/A'}`}</span>
                    <span>{`Poids: ${shipment.weight}g`}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:shrink-0">
                  <button
                    onClick={() => handleTrack(shipment.shipmentNumber || shipment.id)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:flex-none"
                  >
                    Suivi
                  </button>
                  <Link
                    to={`/admin/expeditions/${shipment.id}`}
                    className="flex-1 rounded-lg bg-[#2e1f16] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2c1f15] sm:flex-none"
                  >
                    Voir
                  </Link>
                  <button
                    onClick={async () => {
                      if (!token) return;
                      try {
                        await downloadShipmentLabel(shipment.id, token);
                        safeSetNotice('L’étiquette d’expédition a été téléchargée.');
                      } catch (err) {
                        safeSetError(err.message || 'Erreur lors du téléchargement.');
                      }
                    }}
                    className="flex-1 rounded-lg bg-[#f97316] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d65e10] sm:flex-none"
                  >
                    Étiquette
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal / Section Création d'expédition */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#2e1f16]">Créer une nouvelle expédition (Mondial Relay)</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleCreateShipment} className="space-y-4">
              {/* Destinataire */}
              <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Destinataire</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <input
                    type="text"
                    required
                    placeholder="Nom complet"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Adresse"
                    value={formData.recipientAddress}
                    onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Ville"
                    value={formData.recipientCity}
                    onChange={(e) => setFormData({ ...formData, recipientCity: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Code Postal"
                    value={formData.recipientPostalCode}
                    onChange={(e) => setFormData({ ...formData, recipientPostalCode: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Téléphone"
                    value={formData.recipientPhone}
                    onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                    className="rounded border p-2 bg-white"
                  />
                </div>
              </div>

              {/* Point Relais */}
              <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-gray-700">Point Relais</h4>
                  <button
                    type="button"
                    onClick={handleSearchPickupPoints}
                    disabled={loadingPoints}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {loadingPoints ? 'Recherche...' : 'Rechercher relais'}
                  </button>
                </div>

                {pickupPoints.length > 0 ? (
                  <select
                    required
                    value={formData.pickupPointId}
                    onChange={(e) => setFormData({ ...formData, pickupPointId: e.target.value })}
                    className="w-full rounded border p-2 bg-white text-sm"
                  >
                    <option value="">-- Sélectionner un point relais --</option>
                    {pickupPoints.map((pt) => (
                      <option key={pt.id || pt.Num} value={pt.id || pt.Num}>
                        {pt.nom || pt.LgAdr1} - {pt.ville || pt.Ville} ({pt.cp || pt.CP})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="ID Point Relais (ex: 08882)"
                    value={formData.pickupPointId}
                    onChange={(e) => setFormData({ ...formData, pickupPointId: e.target.value })}
                    className="w-full rounded border p-2 bg-white text-sm"
                  />
                )}
              </div>

              {/* Colis / Référence */}
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Poids (g)</label>
                  <input
                    type="number"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Référence CMD</label>
                  <input
                    type="text"
                    required
                    placeholder="CMD-12345"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Valeur (€ centimes)</label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full rounded border p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded bg-[#2e1f16] text-white hover:bg-[#2c1f15]"
                >
                  {loading ? 'Création...' : 'Valider l’expédition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Résultat de Suivi */}
      {trackingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#2e1f16]">Suivi du Colis</h3>
              <button onClick={() => setTrackingData(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 text-sm">
              <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(trackingData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}