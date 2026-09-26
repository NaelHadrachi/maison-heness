import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/home/MaisonHeness2.jpg',
      title: 'Maison Heness',
      subtitle: "Vinaigrerie artisanale d'exception",
    },
    {
      image: '/images/home/MaisonHeness20.jpg',
      title: 'Un savoir-faire ancestral',
      subtitle: '',
    },
    {
      image: '/images/home/MaisonHeness4.jpg',
      title: 'Élevage en fûts de chêne',
      subtitle: 'Pour des arômes complexes et subtils',
    },
    {
      image: '/images/home/MaisonHeness14.jpg',
      title: 'Fabrication artisanale',
      subtitle: 'Respect des méthodes traditionnelles',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full bg-[#f8f1e5]">
      <section className="relative h-[72vh] min-h-[460px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'} `}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1d120d]/75 via-[#271d18]/40 to-[#1d120d]/20" />
            <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white md:justify-start md:px-16 lg:px-24">
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#f0d5a2]">Maison Heness</p>
                <h1 className="font-serif text-4xl font-bold tracking-wide md:text-6xl">{slide.title}</h1>
                {slide.subtitle && <p className="mt-4 text-base text-[#f5ebdc] md:text-xl">{slide.subtitle}</p>}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Voir le slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition ${index === currentSlide ? 'bg-[#f3d9a0]' : 'bg-white/70'}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a6e52]">Bienvenue</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#2f221b]">Bienvenue à la Maison Heness</h2>
          <p className="mt-3 text-lg text-[#5c4a3c]">Découvrez nos vinaigres artisanaux d'exception</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              image: '/images/home/magasinhabib.jpeg',
              title: 'Notre Magasin',
              text: 'Venez découvrir notre espace dédié aux amateurs de vinaigres fins',
              to: '/vinaigrerie',
              link: 'Visiter →',
            },
            {
              image: '/images/home/tonneauvinaigrerie.jpg',
              title: 'Notre Savoir-Faire',
              text: 'Un processus artisanal respectueux de la tradition',
              to: '/notre-histoire',
              link: 'Découvrir →',
            },
            {
              image: '/images/home/MaisonHeness4.jpg',
              title: 'Nos Produits',
              text: 'Des créations uniques aux saveurs remarquables',
              to: '/boutique',
              link: 'Acheter →',
            },
          ].map((card) => (
            <div key={card.title} className="overflow-hidden rounded-[28px] border border-[#eadcc2] bg-[#fffdf8] shadow-[0_18px_40px_rgba(80,55,30,0.08)]">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
              <div className="p-6 text-left">
                <h3 className="font-serif text-2xl font-semibold text-[#2d241d]">{card.title}</h3>
                <p className="mt-3 text-[#5c4a3c]">{card.text}</p>
                <Link to={card.to} className="mt-5 inline-flex items-center text-sm font-semibold text-[#6a4e23] transition hover:text-[#4f3824]">
                  {card.link}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;