import { useState } from "react";

const defaultFaqs = [
  {
    question: "Quels sont vos horaires d'ouverture ?",
    answer:
      "Nous sommes disponibles du lundi au vendredi, de 9h à 18h. En dehors de ces horaires, vous pouvez nous laisser un message et nous vous répondrons dans les plus brefs délais.",
  },
  {
    question: "Quel est le délai de réponse moyen ?",
    answer:
      "Nous nous engageons à répondre à toutes les demandes dans un délai de 24 à 48 heures ouvrables. Pour les urgences, privilégiez le contact téléphonique.",
  },
  {
    question: "Proposez-vous des consultations à distance ?",
    answer:
      "Oui, nous proposons des consultations en visioconférence via Zoom ou Google Meet. Contactez-nous par email pour planifier un créneau.",
  },
  {
    question: "Comment puis-je suivre ma demande ?",
    answer:
      "Après chaque échange, vous recevez un récapitulatif par email. N'hésitez pas à y répondre directement pour garder le fil de la conversation.",
  },
];

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

function Contact({ contact, faqs = defaultFaqs }) {
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
        <div className="faq-section">
          <div className="faq-header">
            <h3 className="faq-title">Questions fréquentes</h3>
            <p className="faq-subtitle">
              Vous ne trouvez pas ce que vous cherchez ?{" "}
              <a href={`mailto:${contact.email}`} className="faq-contact-link">
                Écrivez-nous.
              </a>
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          margin-top: 3.5rem;
          padding-top: 3rem;
          border-top: 1px solid #e5e7eb;
        }

        .faq-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .faq-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .faq-subtitle {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0;
        }

        .faq-contact-link {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .faq-contact-link:hover {
          color: #111827;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
        }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1.1rem 1.4rem;
          background: #fff;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          color: #111827;
          text-align: left;
          gap: 1rem;
          transition: background 0.15s ease;
        }

        .faq-question:hover {
          background: #f9fafb;
        }

        .faq-item--open .faq-question {
          background: #f9fafb;
        }

        .faq-icon {
          font-size: 1.2rem;
          color: #6b7280;
          flex-shrink: 0;
          line-height: 1;
        }

        .faq-answer {
          padding: 0 1.4rem 1.2rem;
          font-size: 0.9rem;
          color: #4b5563;
          line-height: 1.65;
          background: #f9fafb;
        }
      `}</style>
    </section>
  );
}

export default Contact;
