function TeamModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-modal" onClick={onClose}>
          ×
        </button>

        <div className="proj-tag">{team.acronym}</div>

        <p>
          <strong>Responsable:</strong> {team.leader}
        </p>

        <ul>
          {team.members?.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default TeamModal;