import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { cart, cartCount, cartTotal, isCartOpen, closeCart, removeFromCart, updateQuantity } = useStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-[110] bg-stone-950/45 transition-opacity duration-200 ${isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-[120] flex h-full w-full max-w-md flex-col bg-[#fffdf9] shadow-[-18px_0_40px_rgba(16,12,9,0.2)] transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Mon panier</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">{cartCount} article{cartCount > 1 ? 's' : ''}</h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-700 transition hover:bg-stone-200"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-stone-600">
            <p className="text-lg font-medium">Votre panier est vide.</p>
            <Link to="/boutique" onClick={closeCart} className="rounded-full bg-[#5c3a21] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#744d2d]">
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                  <img src={item.image} alt={item.nom} className="h-[88px] w-[88px] rounded-xl object-cover" />

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-sm font-semibold text-stone-800">{item.nom}</h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] font-medium text-stone-500 hover:text-stone-700"
                      >
                        Supprimer
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-[#6a4e23]">{Number(item.prix).toFixed(2)} €</p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-base text-stone-700 transition hover:bg-stone-200"
                        aria-label={`Retirer 1 ${item.nom}`}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-stone-800">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-base text-stone-700 transition hover:bg-stone-200"
                        aria-label={`Ajouter 1 ${item.nom}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 bg-[#fffaf1] px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-stone-800">
                <span className="text-sm font-medium">Total</span>
                <strong className="text-2xl font-bold text-[#2d241d]">{Number(cartTotal).toFixed(2)} €</strong>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6a4e23] to-[#90704b] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_20px_rgba(90,61,36,0.25)] transition hover:brightness-110"
              >
                Commander
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
