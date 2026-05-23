function Leadership({ LAB_LEADERSHIP }) {
  if (!LAB_LEADERSHIP) return null;

  return (
    <div id="direction" className="container">
      <h2 className="section-title">Direction du laboratoire</h2>

      <div className="leadership-row">
        <div className="leader-card main">
          <span className="label">Directeur</span>
          <h3>{LAB_LEADERSHIP.director}</h3>
        </div>

        <div className="leader-card">
          <span className="label">Directeur adjoint</span>
          <h3>{LAB_LEADERSHIP.viceDirector}</h3>
        </div>
      </div>
    </div>
  );
}

export default Leadership;