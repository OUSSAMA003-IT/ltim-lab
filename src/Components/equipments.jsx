function Equipments({ EQUIPMENTS_DATA }) {
  return (
    <div id="equipements" className="container" style={{ marginTop: "80px" }}>
      <h2 className="section-title">Équipements</h2>

      <div className="equipments-grid">
        {EQUIPMENTS_DATA.map((eq) => (
          <div key={eq.id} className="equipment-card">
            <h3 className="equipment-title">{eq.name}</h3>
            <p className="equipment-text">{eq.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Equipments;