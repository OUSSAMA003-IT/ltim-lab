import { useState, useEffect } from "react";
import { pb } from "../pocketbase.js";

/* =========================================================
   INITIAL FORM STATE
========================================================= */
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  institution: "",
  role: "",
  project: "",
  startDate: "",
  motivation: "",
};

function ReservationModal({ isOpen, onClose }) {
  /* =========================================================
     LOCAL STATE
  ========================================================= */
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);

  /* Reset form every time modal opens */
  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);

  /* =========================================================
     EARLY RETURN (IMPORTANT)
  ========================================================= */
  if (!isOpen) return null;

  /* =========================================================
     INPUT HANDLER
  ========================================================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SUBMIT HANDLER
  ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await pb.collection("accreditation_requests").create(formData);

      alert("Demande envoyée ✅");
      setFormData(INITIAL_FORM_STATE);
      onClose();

    } catch (err) {
      console.error(err);
      alert(err?.message || "Erreur lors de l'envoi ❌");

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          className="close-modal"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <h2 className="section-title">
          Formulaire d’accréditation du laboratoire
        </h2>

        <form className="reservation-form" onSubmit={handleSubmit}>

          {[
            { name: "name", placeholder: "Nom complet", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "institution", placeholder: "Institution", type: "text" },
            { name: "role", placeholder: "Rôle", type: "text" },
            { name: "project", placeholder: "Projet", type: "text" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          ))}

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <textarea
            name="motivation"
            placeholder="Motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit" className="pdf-btn" disabled={loading}>
            {loading ? "Envoi..." : "Soumettre la demande"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ReservationModal;