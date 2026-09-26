import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchCurrentUser,
  fetchAddresses,
  createAddress,
  fetchShippingPickupPoints,
} from '../../services/api';
import { useStore } from '../../context/StoreContext';

export default function SettingsPage() {
  const { user: storeUser } = useStore();
  const token = storeUser?.token || null;
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // États pour la recherche de Points Relais
  const [searchPostalCode, setSearchPostalCode] = useState('');
  const [searchCountry, setSearchCountry] = useState('FR');
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  // Charger les infos de l'utilisateur et ses adresses
  const loadUserData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [userData, addressData] = await Promise.all([
        fetchCurrentUser(token),
        fetchAddresses(token),
      ]);
      setUser(userData?.user || userData);
      setAddresses(Array.isArray(addressData) ? addressData : addressData?.addresses || []);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Rechercher des points relais
  const handleSearchPickupPoints = async (e) => {
    e.preventDefault();
    if (!searchPostalCode) {
      setError('Veuillez entrer un code postal.');
      return;
    }
    setLoadingPoints(true);
    setError(null);
    setSelectedPoint(null);
    try {
      const data = await fetchShippingPickupPoints(
        { postalCode: searchPostalCode, country: searchCountry },
        token
      );
      const list = Array.isArray(data) ? data : data?.points || [];
      setPickupPoints(list);
      if (list.length === 0) {
        setError('Aucun point relais trouvé pour ce code postal.');
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la recherche du point relais.');
    } finally {
      setLoadingPoints(false);
    }
  };

  // Enregistrer l'adresse avec le Point Relais sélectionné
  const handleCreateAddress = async (e) => {
    e.preventDefault();
    if (!selectedPoint) {
      setError('Veuillez obligatoirement sélectionner un point relais dans la liste.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    // Formatage strict selon DTO CreateAddressDto
    const addressPayload = {
      line1: `[Point Relais #${selectedPoint.id || selectedPoint.Num}] ${selectedPoint.name || selectedPoint.LgAdr1}`,
      city: selectedPoint.city || selectedPoint.Ville,
      postalCode: selectedPoint.postalCode || selectedPoint.CP || searchPostalCode,
      country: selectedPoint.country || selectedPoint.Pays || searchCountry,
      isDefault: Boolean(isDefault),
    };

    try {
      await createAddress(token, addressPayload);
      setMessage('Adresse Point Relais ajoutée avec succès !');
      // Réinitialisation du formulaire
      setSelectedPoint(null);
      setPickupPoints([]);
      setSearchPostalCode('');
      setIsDefault(false);
      await loadUserData();
    } catch (err) {
      setError(err.message || 'Erreur lors de la création de l’adresse.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-600 font-semibold">
          Vous devez être connecté pour accéder à vos paramètres.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2e1f16]">Paramètres du compte</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez vos informations et vos adresses de livraison.</p>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500">Chargement de vos informations...</div>
      ) : (
        <>
          {/* Section 1: Informations Profil */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-xl font-semibold text-[#2e1f16]">Profil Utilisateur</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Nom complet</span>
                <span className="font-medium text-gray-800">{user?.name || user?.fullName || 'Non renseigné'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Adresse Email</span>
                <span className="font-medium text-gray-800">{user?.email || 'Non renseigné'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Rôle</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 uppercase">
                  {user?.role || 'CLIENT'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 2: Adresses Enregistrées */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-xl font-semibold text-[#2e1f16]">Mes Adresses</h2>
            {addresses.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Aucune adresse enregistrée pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id || addr._id} className="p-4 border rounded-lg bg-gray-50 relative space-y-1 text-sm">
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Par défaut
                      </span>
                    )}
                    <p className="font-semibold text-gray-800">{addr.line1}</p>
                    <p className="text-gray-600">{addr.postalCode} {addr.city}</p>
                    <p className="text-gray-500 text-xs uppercase">{addr.country}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 3: Ajouter une adresse (Point Relais Obligatoire) */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#2e1f16]">Ajouter un Point Relais</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Toutes les adresses de livraison enregistrées doivent correspondre à un point relais Mondial Relay.
              </p>
            </div>

            {/* Étape A : Rechercher un relais */}
            <form onSubmit={handleSearchPickupPoints} className="space-y-4 bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm font-semibold text-gray-700">1. Rechercher un point relais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Code postal (ex: 75002)"
                  value={searchPostalCode}
                  onChange={(e) => setSearchPostalCode(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2e1f16]"
                />
                <select
                  value={searchCountry}
                  onChange={(e) => setSearchCountry(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2e1f16]"
                >
                  <option value="FR">France (FR)</option>
                  <option value="BE">Belgique (BE)</option>
                  <option value="LU">Luxembourg (LU)</option>
                  <option value="ES">Espagne (ES)</option>
                </select>
                <button
                  type="submit"
                  disabled={loadingPoints}
                  className="px-4 py-2 bg-[#2e1f16] text-white font-medium rounded-lg text-sm hover:bg-[#1a120d] disabled:opacity-50 transition-colors"
                >
                  {loadingPoints ? 'Recherche...' : 'Chercher les relais'}
                </button>
              </div>
            </form>

            {/* Étape B : Choisir le relais dans la liste */}
            {pickupPoints.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">2. Sélectionner votre point relais</h3>
                <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-2 bg-gray-50">
                  {pickupPoints.map((pt) => {
                    const id = pt.id || pt.Num;
                    const isSelected = selectedPoint?.id === id || selectedPoint?.Num === id;
                    return (
                      <div
                        key={id}
                        onClick={() => setSelectedPoint(pt)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-sm ${
                          isSelected
                            ? 'border-green-600 bg-green-50 ring-2 ring-green-500'
                            : 'border-gray-200 bg-white hover:bg-gray-100'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{pt.name || pt.LgAdr1}</p>
                          <p className="text-xs text-gray-600">{pt.address || pt.LgAdr3}, {pt.postalCode || pt.CP}, {pt.city || pt.Ville}</p>
                        </div>
                        <span className="text-xs font-mono font-semibold bg-gray-200 px-2 py-1 rounded">
                          #{id}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Étape C : Valider et enregistrer */}
            {selectedPoint && (
              <form onSubmit={handleCreateAddress} className="space-y-4 border-t pt-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-900">
                  <p className="font-semibold">Relais sélectionné :</p>
                  <p>{selectedPoint.name || selectedPoint.LgAdr1} - {selectedPoint.city || selectedPoint.Ville} ({selectedPoint.postalCode || selectedPoint.CP})</p>
                </div>

                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="rounded border-gray-300 text-[#2e1f16] focus:ring-[#2e1f16]"
                  />
                  <span>Définir comme adresse par défaut</span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Enregistrement...' : 'Valider et enregistrer cette adresse'}
                </button>
              </form>
            )}
          </section>
        </>
      )}
    </div>
  );
}