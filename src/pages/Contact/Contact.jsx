import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <main className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">
          Retrouvez toutes nos coordonnées ci-dessous
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Adresse</h3>
          <p>31 rue de la Grotte<br />65100 Lourdes</p>
        </div>

        <div className="contact-card">
          <i className="fas fa-phone"></i>
          <h3>Téléphone</h3>
          <a href="tel:+33689426438"> Élodie : 07 70 71 23 62</a>
        </div>

        <div className="contact-card">
          <i className="fas fa-envelope"></i>
          <h3>Email</h3>
          <a href="mailto:maison.heness@gmail.com">maison.heness@gmail.com</a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
