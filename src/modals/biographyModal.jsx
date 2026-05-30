import { useState, useEffect } from "react";
import { pb } from "../pocketbase.js";
 

function BiographyModal({ name, onClose }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pb.collection("members")
      .getFirstListItem(`name="${name}"`)
      .then(record => { setPerson(record); setLoading(false); })
      .catch(() => setLoading(false));
  }, [name]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>

        {loading && <p className="modal-status">Chargement...</p>}
        {!loading && !person && <p className="modal-status">Aucune biographie disponible.</p>}

        {!loading && person && (
          <>
            <h2 className="modal-title">
              {person.name}
            </h2>

            <div className="modal-divider" />

            <div
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: person.bio }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default BiographyModal;