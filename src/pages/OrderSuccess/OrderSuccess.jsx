import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Ajuste l'import selon ton router (ex: next/navigation pour Next.js)

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Optionnel : Vider le panier local ou valider la session côté NestJS
      // fetch(`/api/orders/confirm?session_id=${sessionId}`)
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Validation de votre commande...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl shadow-sm text-center border border-gray-100">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Merci pour votre commande !</h1>
      <p className="text-gray-600 mb-6">
        Votre paiement a bien été validé. Nous préparons votre colis avec soin.
      </p>

      {sessionId && (
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 font-mono mb-8 break-all">
          Référence session : {sessionId}
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};