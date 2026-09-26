import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { createCheckoutSession, fetchShippingPickupPoints } from '../../services/api';
import { calculateShippingFee, calculateInsuranceFee } from '../../utils/shipping';

const steps = ['Panier', 'Point Relais', 'Paiement'];

const normalizeRelayPoint = (item, index) => {
  const address = item?.address || item?.street || item?.addressLine || item?.streetName || '';
  const city = item?.city || item?.locality || item?.town || '';
  const postalCode = item?.postalCode || item?.zipCode || item?.codePostal || '';
  const country = item?.country || 'FR';

  return {
    id: item?.id || item?.pickupPointId || item?.code || `relay-${index}`,
    name: item?.name || item?.label || item?.relayName || `Point relais ${index + 1}`,
    address,
    city,
    postalCode,
    country,
    distanceKm: item?.distanceKm ?? null,
  };
};

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, user } = useStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [search, setSearch] = useState({ postalCode: '', city: '', country: 'FR' });
  const [relayResults, setRelayResults] = useState([]);
  const [selectedRelay, setSelectedRelay] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orderDone, setOrderDone] = useState(false);

  console.log('CheckoutPage rendered. Cart:', cart, 'Cart Total:', cartTotal, 'Selected Relay:', selectedRelay, 'Email:', email, 'Step Index:', stepIndex, 'userId:', user?.id);
  // --- CALCULS DU POIDS, LIVRAISON ET ASSURANCE ---
  const totalWeight = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.weightInKg) || 0.5) * Number(item.quantity), 0);
  }, [cart]);

  const subtotal = Number(cartTotal);
  const shippingCost = useMemo(() => calculateShippingFee(totalWeight), [totalWeight]);
  const insuranceCost = useMemo(() => calculateInsuranceFee(subtotal), [subtotal]);
  const totalWithShipping = subtotal + shippingCost + insuranceCost;

  const stepReady = useMemo(() => {
    if (stepIndex === 0) return cart.length > 0;
    if (stepIndex === 1) return Boolean(selectedRelay);
    return Boolean(email.trim());
  }, [cart.length, email, selectedRelay, stepIndex]);

  const handleRelaySearch = async () => {
    if (!search.postalCode.trim()) {
      setMessage('Renseignez un code postal pour trouver un point relais.');
      return;
    }

    setSearchLoading(true);
    setMessage('');

    try {
      const response = await fetchShippingPickupPoints({
        postalCode: search.postalCode,
        country: search.country,
        city: search.city,
        maxResults: 6,
      });

      const rawPoints = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.points)
            ? response.points
            : [];

      const nextRelayPoints = rawPoints.map(normalizeRelayPoint);
      setRelayResults(nextRelayPoints);

      if (nextRelayPoints.length === 0) {
        setMessage('Aucun point relais trouvé pour cette recherche.');
      }
    } catch (error) {
      setMessage(error.message || 'La recherche de relais a échoué.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNext = () => {
    if (!cart.length) {
      setMessage('Votre panier est vide.');
      return;
    }

    if (stepIndex === 0) {
      setStepIndex(1);
      return;
    }

    if (stepIndex === 1) {
      if (!selectedRelay) {
        setMessage('Choisissez un point relais pour continuer.');
        return;
      }
      setStepIndex(2);
      return;
    }

    if (!email) {
      setMessage('Merci de renseigner votre adresse email.');
      return;
    }

    handlePayment();
  };

  const handlePayment = async () => {
    if (!cart.length) {
      setMessage('Votre panier est vide.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Conforme au CreateCheckoutSessionDto exact
      const payload = {
        email: user?.email || email,
        userId: user?.id || null,
        items: cart.map((item) => ({
          productId: String(item.id || item._id),
          quantity: Number(item.quantity),
        })),
        shippingMode: 'relay',
        relayId: selectedRelay?.id || '',
        relayName: selectedRelay?.name || 'Point relais',
        shippingCost: shippingCost,   // <--- Transmettre le montant calculé
        insuranceCost: insuranceCost,  // <--- Transmettre le montant calculé
      };

      const response = await createCheckoutSession(payload);
      const redirectUrl = response?.url || response?.checkoutUrl || response?.data?.url || response?.session?.url || response?.checkout_url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      setOrderDone(true);
      setStepIndex(3);
      clearCart();
      setMessage('Commande créée avec succès.');
    } catch (error) {
      setMessage(error.message || 'Le paiement n’a pas pu être finalisé pour le moment.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length && !orderDone) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-[28px] border border-stone-200 bg-[#fffdf9] p-10 shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Panier</p>
          <h1 className="text-4xl font-semibold text-stone-900">Votre panier est vide</h1>
          <p className="mt-4 text-stone-600">Ajoutez quelques produits pour lancer votre commande Maison Heness.</p>
          <Link to="/boutique" className="mt-6 inline-flex rounded-full bg-[#5c3a21] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#744d2d]">
            Retourner à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[28px] border border-stone-200 bg-[#fffdf9] p-4 shadow-[0_18px_40px_rgba(80,55,30,0.07)] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Commande</p>
            <h1 className="mt-1 text-3xl font-semibold text-stone-900">Finaliser ma commande</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${index <= stepIndex ? 'bg-[#5c3a21] text-white' : 'bg-stone-200 text-stone-600'}`}>
                  {index + 1}
                </span>
                <span className={`text-sm font-medium ${index <= stepIndex ? 'text-stone-900' : 'text-stone-500'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-stone-200 bg-[#fffdf9] p-5 shadow-[0_18px_40px_rgba(80,55,30,0.07)] sm:p-6">
          {stepIndex === 0 && (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Étape 1</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">Vérifiez votre panier</h2>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-stone-200 bg-[#fff] p-3 shadow-sm">
                    <img src={item.image} alt={item.nom} className="h-[84px] w-[84px] rounded-xl object-cover" />
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-stone-900">{item.nom}</h3>
                        <p className="mt-1 text-sm text-stone-600">Qté {item.quantity} — {((Number(item.weightInKg) || 0.5) * item.quantity).toFixed(2)} kg</p>
                      </div>
                      <strong className="text-lg font-semibold text-[#6a4e23]">{(Number(item.prix) * Number(item.quantity)).toFixed(2)} €</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Étape 2</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">Sélectionnez votre Point Relais Mondial Relay</h2>
              </div>

              <div className="space-y-4 rounded-2xl border border-stone-200 bg-[#fff] p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block text-sm font-medium text-stone-700">
                    <span className="mb-1 block">Code postal</span>
                    <input
                      type="text"
                      value={search.postalCode}
                      onChange={(event) => setSearch((current) => ({ ...current, postalCode: event.target.value }))}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 outline-none transition focus:border-[#6a4e23]"
                      placeholder="75001"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    <span className="mb-1 block">Ville</span>
                    <input
                      type="text"
                      value={search.city}
                      onChange={(event) => setSearch((current) => ({ ...current, city: event.target.value }))}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 outline-none transition focus:border-[#6a4e23]"
                      placeholder="Paris"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    <span className="mb-1 block">Pays</span>
                    <select
                      value={search.country}
                      onChange={(event) => setSearch((current) => ({ ...current, country: event.target.value }))}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 outline-none transition focus:border-[#6a4e23]"
                    >
                      <option value="FR">FR</option>
                      <option value="BE">BE</option>
                      <option value="ES">ES</option>
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleRelaySearch}
                  disabled={searchLoading}
                  className="rounded-full bg-[#5c3a21] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#744d2d] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {searchLoading ? 'Recherche...' : 'Rechercher un point relais'}
                </button>

                {relayResults.length > 0 && (
                  <div className="space-y-3">
                    {relayResults.map((relay) => (
                      <button
                        key={relay.id}
                        type="button"
                        onClick={() => setSelectedRelay(relay)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${selectedRelay?.id === relay.id ? 'border-[#6a4e23] bg-[#f9f2e8]' : 'border-stone-200 bg-white hover:border-stone-300'}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-base font-semibold text-stone-900">{relay.name}</p>
                            <p className="mt-1 text-sm text-stone-600">{relay.address || 'Adresse non disponible'}</p>
                            <p className="text-sm text-stone-600">{relay.postalCode} {relay.city}</p>
                          </div>
                          {relay.distanceKm && <span className="text-xs font-medium text-stone-500">{relay.distanceKm} km</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedRelay && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                    Point relais sélectionné : <strong>{selectedRelay.name}</strong> — {selectedRelay.postalCode} {selectedRelay.city}
                  </div>
                )}
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Étape 3</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">Paiement sécurisé</h2>
              </div>

              <label className="block text-sm font-medium text-stone-700">
                <span className="mb-1 block">Adresse email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage('');
                  }}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 outline-none transition focus:border-[#6a4e23]"
                  placeholder="bonjour@maison-heness.fr"
                />
              </label>

              <div className="rounded-2xl border border-stone-200 bg-[#fffaf1] p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Mode de livraison</span>
                  <span className="font-semibold text-stone-900">Point Relais Mondial Relay</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Poids du colis</span>
                  <span className="font-semibold text-stone-900">{totalWeight.toFixed(2)} kg</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Frais de livraison</span>
                  <span className="font-semibold text-stone-900">{shippingCost.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Assurance Colis</span>
                  <span className="font-semibold text-stone-900">{insuranceCost === 0 ? 'Offerte' : `${insuranceCost.toFixed(2)} €`}</span>
                </div>
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Commande validée</p>
              <h2 className="mt-3 text-3xl font-semibold text-emerald-900">Merci pour votre commande !</h2>
              <p className="mt-3 text-emerald-800">Nous avons bien reçu votre demande. Vous allez être redirigé vers l'espace de paiement sécurisé.</p>
              <Link to="/boutique" className="mt-6 inline-flex rounded-full bg-[#5c3a21] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#744d2d]">
                Continuer mes achats
              </Link>
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {message}
            </div>
          )}

          {stepIndex < 3 && (
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone-200 pt-5">
              <button
                type="button"
                onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
                disabled={stepIndex === 0}
                className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Retour
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!stepReady || loading}
                className="rounded-full bg-[#5c3a21] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#744d2d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Traitement...' : stepIndex === 2 ? 'Payer maintenant' : 'Continuer'}
              </button>
            </div>
          )}
        </div>

        <aside className="rounded-[28px] border border-stone-200 bg-[#fffdf9] p-5 shadow-[0_18px_40px_rgba(80,55,30,0.07)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Résumé</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">Ma commande</h2>

          <div className="mt-5 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm text-stone-700">
                <span>{item.nom} × {item.quantity}</span>
                <span>{(Number(item.prix) * Number(item.quantity)).toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-stone-200 pt-4 text-sm text-stone-700">
            <div className="flex items-center justify-between">
              <span>Sous-total produits</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Livraison Point Relais ({totalWeight.toFixed(2)} kg)</span>
              <span>{shippingCost.toFixed(2)} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Assurance Colis</span>
              <span>{insuranceCost === 0 ? 'Offerte' : `${insuranceCost.toFixed(2)} €`}</span>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
              <span>Total TTC</span>
              <span className="text-xl text-[#6a4e23]">{totalWithShipping.toFixed(2)} €</span>
            </div>
          </div>

          {selectedRelay && (
            <div className="mt-5 rounded-2xl border border-stone-200 bg-[#fff] p-3 text-sm text-stone-700">
              <p className="font-semibold text-stone-900">Point relais sélectionné</p>
              <p className="mt-1">{selectedRelay.name}</p>
              <p>{selectedRelay.address || selectedRelay.city}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}