function Contact() {
  return (
    <section id="contact" className="section-padding alt-bg">
      <div className="container">
        <h2 className="section-title">Contact</h2>

        <div className="contact-triple-grid">
          <div className="contact-info-card">
            <div className="card-icon">📍</div>
            <h3>Adresse</h3>
            <p>
              Faculté des Sciences Ben M'Sick <br />
              Avenue Cdt Driss El Harti, Casablanca
            </p>
          </div>

          <div className="contact-info-card highlighted">
            <div className="card-icon">✉️</div>
            <h3>Email</h3>
            <a href="mailto:contact@ltim.ma" className="contact-link">
              contact@ltim.ma
            </a>
            <p className="card-note">Réponse sous 24/48h</p>
          </div>

          <div className="contact-info-card">
            <div className="card-icon">📞</div>
            <h3>Téléphone</h3>
            <p>+212 5 22 70 46 71</p>
            <p className="card-note">Lun - Ven (09h - 17h)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;