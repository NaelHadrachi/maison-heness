import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/maison.heness@yahoo.fr", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <main className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="contact-title">Contactez-nous</h1>
          <p className="contact-subtitle">Une question ? Une réservation ?</p>
          
          <div className="info-card">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>31 rue de la Grotte, Lourdes</span>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <span>06 89 42 64 38</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>maison.heness@yahoo.fr</span>
            </div>
          </div>

          <div className="contact-decoration">
            <div className="decoration-item"></div>
            <div className="decoration-item"></div>
            <div className="decoration-item"></div>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group floating">
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className="form-input"
                placeholder=" "
              />
              <label htmlFor="name" className="form-label">Nom </label>
              <div className="form-underline"></div>
            </div>
            
            <div className="form-group floating">
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                className="form-input"
                placeholder=" "
              />
              <label htmlFor="email" className="form-label">Email</label>
              <div className="form-underline"></div>
            </div>
            
            <div className="form-group floating">
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder=" "
              />
              <label htmlFor="phone" className="form-label">Téléphone</label>
              <div className="form-underline"></div>
            </div>
            
            <div className="form-group floating">
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required 
                className="form-input textarea"
                placeholder=" "
              ></textarea>
              <label htmlFor="message" className="form-label">Votre message</label>
              <div className="form-underline"></div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Envoi en cours...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Envoyer le message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="alert success">
                <i className="fas fa-check-circle"></i> Message envoyé avec succès!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert error">
                <i className="fas fa-exclamation-circle"></i> Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;