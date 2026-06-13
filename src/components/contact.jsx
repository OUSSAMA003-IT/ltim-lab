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
          <h3 className="faq-title">Questions fréquentes</h3>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          margin-top: 64px;
          padding-top: 56px;
          
        }

        .faq-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 6px;
          color: var(--accent);
          text-align: center;
          opacity: 0.9;
          margin: 0 0 28px 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          backdrop-filter: blur(10px);
        }

        .faq-item {
          border-bottom: 1px solid var(--border);
          transition: var(--transition);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-item--open {
          border-color: rgba(56, 189, 248, 0.2);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1.1rem 1.4rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
          text-align: left;
          gap: 1rem;
          font-family: inherit;
          transition: background var(--transition), color var(--transition);
        }

        .faq-question:hover {
          background: var(--bg-card-hover);
          color: #fff;
        }

        .faq-item--open .faq-question {
          background: var(--bg-card-hover);
          color: var(--accent);
        }

        .faq-icon {
          font-size: 1.1rem;
          color: var(--accent);
          flex-shrink: 0;
          line-height: 1;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.35));
        }

        .faq-answer {
          padding: 0 1.4rem 1.2rem;
          font-size: 0.88rem;
          color: var(--text-dim);
          line-height: 1.7;
          background: var(--bg-card-hover);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .faq-section {
            margin-top: 40px;
            padding-top: 36px;
          }
          .faq-question {
            font-size: 0.85rem;
            padding: 1rem 1.1rem;
          }
          .faq-answer {
            padding: 0 1.1rem 1rem;
            font-size: 0.84rem;
          }
          .faq-list {
            border-radius: var(--radius-md);
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;