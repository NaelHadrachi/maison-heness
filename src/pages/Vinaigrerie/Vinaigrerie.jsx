import React from 'react';

const Vinaigrerie = () => {
  return (
    <div className="w-full bg-[#f8f1e5]">
      <header className="relative overflow-hidden bg-[#2e1f16]">
        <div className="absolute inset-0 bg-[url('/images/vinaigrerie/MaisonHeness11.jpg')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d120d]/80 to-[#261b15]/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-[0.04em] text-white md:text-6xl">La Vinaigrerie de Lourdes</h1>
          <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-[#d9b577]" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-8 text-center shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <h2 className="font-serif text-3xl font-semibold text-[#2b1f18] md:text-4xl">Un produit vivant, une émotion liquide</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#5c4a3c] md:text-lg">
            Ce que nous vous proposons dépasse le simple goût : c'est une expérience sensorielle et intime, où l'on redécouvre tout ce qu'un vinaigre peut être. Vivant, noble, subtil, il transforme un plat, éveille une mémoire, fait vibrer les émotions les plus fines.
          </p>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Nos Créations Alchimiques',
              text: "Des vinaigres qui racontent des histoires : notre signature, le vinaigre de grenade, symbole de vitalité, accompagné d'infusions de plantes rares, de macérations fruitées et d'épices du monde entier.",
            },
            {
              title: 'Expérience Sensorielle',
              text: "Dégustation unique et personnalisée dans notre écrin chaleureux. Chaque vinaigre est présenté, raconté, goûté, compris. Une révélation pour les papilles et l'âme.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-7 shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
              <h3 className="font-serif text-2xl font-semibold text-[#2d241d]">{card.title}</h3>
              <p className="mt-4 text-base leading-8 text-[#5c4a3c]">{card.text}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-8 text-center shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <p className="text-lg leading-8 text-[#3c2d25] md:text-xl">
            Il y a des lieux que l'on visite. Et puis, il y a ceux que l'on vit.<br />
            Notre vinaigrerie n'est ni un simple commerce, ni un atelier ordinaire. C'est un univers, un sanctuaire des saveurs, niché au cœur de Lourdes — entre pierre et lumière, entre spiritualité et terre nourricière.
          </p>
          <p className="mt-6 text-lg leading-8 text-[#3c2d25] md:text-xl">
            Fermez les yeux. Une goutte sur la langue... et c'est un ailleurs qui s'invite.
          </p>
        </section>

        <div className="mt-10 overflow-hidden rounded-[30px] border border-[#eadcc2] bg-[#fffdf8] p-2 shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <iframe
            title="Localisation de la vinaigrerie"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.732254143712!2d-0.0528579!3d43.7251234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5623e7b1b12aab%3A0x31b5a5c9e5d7f8a0!2s31%20Rue%20de%20la%20Grotte%2C%2065100%20Lourdes!5e0!3m2!1sfr!2sfr!4v${Math.floor(Date.now() / 1000)}`}
            allowFullScreen
            loading="lazy"
            className="h-[360px] w-full rounded-[20px] border-0"
          />
        </div>

        <div className="mt-10 rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] p-7 text-center shadow-[0_18px_40px_rgba(80,55,30,0.07)]">
          <p className="text-lg font-medium text-[#2f221b]">📍 31 rue de la Grotte – 65100 Lourdes</p>
          <p className="mt-3 text-base leading-7 text-[#5c4a3c]">
            Que vous soyez curieux, gourmet, amoureux du goût ou simplement de passage à Lourdes : poussez la porte. Vous repartirez transformé.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Vinaigrerie;