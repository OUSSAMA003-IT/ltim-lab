function Contact({ contact }) {
  // If data is not loaded yet, avoid crashing UI
  if (!contact) {
    return (
      <section id="contact" className="section-padding">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <p>Loading contact info...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <h2 className="section-title">Contact</h2>

        <div className="contact-triple-grid">

          {/* ADDRESS */}
          <div className="contact-info-card">
            <div className="card-icon">📍</div>
            <h3>Adresse</h3>
            <p>{contact.address}</p>
          </div>

          {/* EMAIL */}
          <div className="contact-info-card highlighted">
            <div className="card-icon">✉️</div>
            <h3>Email</h3>

            <a
              href={`mailto:${contact.email}`}
              className="contact-link"
            >
              {contact.email}
            </a>

            <p className="card-note">{contact.note_email}</p>
          </div>

          {/* PHONE */}
          <div className="contact-info-card">
            <div className="card-icon">📞</div>
            <h3>Téléphone</h3>

            <p>{contact.phone}</p>
            <p className="card-note">{contact.note_phone}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;