import { useState } from "react";
import BiographyModal from "./BiographyModal";

function TeamModal({ team, onClose }) {
  const [bioName, setBioName] = useState(null);

  if (!team) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-modal" onClick={onClose}>×</button>

        <div className="proj-tag">{team.acronym}</div>

        

        <ul>
          {team.members?.map((m, i) => (
            <li key={i}>
              <span onClick={() => setBioName(m)} style={{ color: "var(--accent)", cursor: "pointer", borderBottom: "1px solid var(--accent-dim)" }}>
                {m}
              </span>
            </li>
          ))}
        </ul>

        {bioName && <BiographyModal name={bioName} onClose={() => setBioName(null)} />}

      </div>
    </div>
  );
}

export default TeamModal;