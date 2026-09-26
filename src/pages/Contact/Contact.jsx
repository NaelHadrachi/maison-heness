import React, { useState } from "react";

// Remplace par l'URL d'exécution de ton déploiement Google Apps Script Web App
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmxHFFNwo44SAotUXuAmIHkxr3tdwP7C7StAeOiqa7xHhYJi4PWK0S_tS7j9hnlZfs/exec";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Utilisation de Content-Type text/plain pour éviter les blocages CORS pré-flight d'Apps Script
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === "success") {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Une erreur s'est produite lors de l'envoi.");
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: "Impossible d'envoyer votre message pour le moment. Veuillez réessayer.",
      });
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a6e52]">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#2f221b] sm:text-5xl">
          Contactez-nous
        </h1>
        <p className="mt-4 text-lg text-[#5c4a3c]">
          Une question sur nos produits artisanaux ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Colonne Coordonnées */}
        <div className="space-y-6 lg:col-span-5">
          {[
            {
              title: "Adresse",
              content: "31 rue de la Grotte\n65100 Lourdes",
              icon: "📍",
            },
            {
              title: "Téléphone",
              content: "Élodie : 07 70 71 23 62",
              href: "tel:+33770712362",
              icon: "📞",
            },
            {
              title: "Email",
              content: "maison.heness@gmail.com",
              href: "mailto:maison.heness@gmail.com",
              icon: "✉️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-5 rounded-[24px] border border-[#eadcc2] bg-[#fffdf8] p-6 shadow-[0_10px_25px_rgba(80,55,30,0.05)] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4ebd0] text-2xl">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#2d241d]">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-base text-[#5c4a3c] transition-colors hover:text-[#8a6e52]"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="mt-1 whitespace-pre-line text-base text-[#5c4a3c]">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Colonne Formulaire */}
        <div className="rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-8 shadow-[0_18px_40px_rgba(80,55,30,0.07)] sm:p-10 lg:col-span-7">
          <h2 className="font-serif text-2xl font-bold text-[#2f221b] mb-6">
            Envoyez-nous un message
          </h2>

          {status.success && (
            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              ✓ Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
            </div>
          )}

          {status.error && (
            <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
              ⚠️ {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#2d241d] mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="w-full rounded-xl border border-[#eadcc2] bg-white px-4 py-3 text-[#2d241d] placeholder-[#a3907c] focus:border-[#8a6e52] focus:outline-none focus:ring-2 focus:ring-[#8a6e52]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d241d] mb-1.5">
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.fr"
                  className="w-full rounded-xl border border-[#eadcc2] bg-white px-4 py-3 text-[#2d241d] placeholder-[#a3907c] focus:border-[#8a6e52] focus:outline-none focus:ring-2 focus:ring-[#8a6e52]/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d241d] mb-1.5">
                Sujet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Renseignement sur une commande..."
                className="w-full rounded-xl border border-[#eadcc2] bg-white px-4 py-3 text-[#2d241d] placeholder-[#a3907c] focus:border-[#8a6e52] focus:outline-none focus:ring-2 focus:ring-[#8a6e52]/20 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d241d] mb-1.5">
                Votre message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Bonjour, je souhaite savoir..."
                className="w-full rounded-xl border border-[#eadcc2] bg-white px-4 py-3 text-[#2d241d] placeholder-[#a3907c] focus:border-[#8a6e52] focus:outline-none focus:ring-2 focus:ring-[#8a6e52]/20 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full rounded-xl bg-[#2f221b] px-6 py-3.5 text-base font-semibold text-[#fffdf8] shadow-md transition-all hover:bg-[#8a6e52] disabled:opacity-60"
            >
              {status.loading ? "⏳ Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;