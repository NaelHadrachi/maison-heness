import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/images/home/MaisonHeness2.jpg",
      title: "Maison Heness",
      subtitle: "Vinaigrerie artisanale d'exception"
    },
    {
      image: "/images/home/MaisonHeness20.jpg",
      title: "Un savoir-faire ancestral",
      subtitle: ""
    },
    {
      image: "/images/home/MaisonHeness4.jpg",
      title: "Élevage en fûts de chêne",
      subtitle: "Pour des arômes complexes et subtils"
    },
    {
      image: "/images/home/MaisonHeness14.jpg",
      title: "Fabrication artisanale",
      subtitle: "Respect des méthodes traditionnelles"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-fullpage">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="featured-content">
          <h2>Bienvenue à la Maison Heness</h2>
          <p className="featured-subtitle">Découvrez nos vinaigres artisanaux d'exception</p>
          <div className="featured-grid">
            <div className="featured-card">
              <div className="card-image" style={{ backgroundImage: 'url(/images/home/magasinhabib.jpeg)' }}></div>
              <h3>Notre Magasin</h3>
              <p>Venez découvrir notre espace dédié aux amateurs de vinaigres fins</p>
              <Link to="/vinaigrerie" className="card-link">Visiter →</Link>
            </div>
            <div className="featured-card">
              <div className="card-image" style={{ backgroundImage: 'url(/images/home/tonneauvinaigrerie.jpg)' }}></div>
              <h3>Notre Savoir-Faire</h3>
              <p>Un processus artisanal respectueux de la tradition</p>
              <Link to="/notre-histoire" className="card-link">Découvrir →</Link>
            </div>
            <div className="featured-card">
              <div className="card-image" style={{ backgroundImage: 'url(/images/home/MaisonHeness4.jpg)' }}></div>
              <h3>Nos Produits</h3>
              <p>Des créations uniques aux saveurs remarquables</p>
              <Link to="/boutique" className="card-link">Acheter →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;