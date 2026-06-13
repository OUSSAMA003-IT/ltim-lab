import { useState } from "react";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

function Contact({ contact, faqs = [] }) {
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

        {/* CONTACT CARDS */}
        <div className="contact-triple-grid">
          <div className="contact-info-card">
            <div className="card-icon">📍</div>
            <h3>Adresse</h3>
            <p>{contact.address}</p>
          </div>

          <div className="contact-info-card highlighted">
            <div className="card-icon">✉️</div>
            <h3>Email</h3>
            <a href={`mailto:${contact.email}`} className="contact-link">
              {contact.email}
            </a>
            <p className="card-note">{contact.note_email}</p>
          </div>

          <div className="contact-info-card">
            <div className="card-icon">📞</div>
            <h3>Téléphone</h3>
            <p>{contact.phone}</p>
            <p className="card-note">{contact.note_phone}</p>
          </div>
        </div>

        {/* FAQ SECTION */}
        {faqs.length > 0 && (
          <div className="faq-section">
            <h3 className="faq-title">Questions fréquentes</h3>
            <div className="faq-list">
              {faqs.map((faq) => (
                <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;