function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-modal" onClick={onClose}>
          ×
        </button>

        <div className="modal-body">
          <div className="meta-grid">

            <div className="meta-item">
              <span className="meta-label">Source</span>
              <span className="meta-value">{project.journal || "—"}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Auteur(s)</span>
              <span className="meta-value">{project.authors || "—"}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Année</span>
              <span className="meta-value">{project.year || "—"}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Volume (Issue)</span>
              <span className="meta-value">
                {project.volume || "—"}
                {project.issue ? ` (${project.issue})` : ""}
              </span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Pages</span>
              <span className="meta-value">{project.pages || "—"}</span>
            </div>

            <div className="meta-item full">
              <span className="meta-label">Indexing</span>
              <span className="meta-value">{project.indexing || "—"}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;