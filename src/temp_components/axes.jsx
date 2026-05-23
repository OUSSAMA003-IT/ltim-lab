function Axes({ axes = [] }) {
  return (
    <section id="axes" className="axes-section section-padding">
      <div className="container">

        <h2 className="section-title">
          Axes de Recherche
        </h2>

        <div className="axes-list">

          {axes.map((axis) => (
            <div key={axis.id} className="axis-item">
              <h3>{axis.title}</h3>
              <p>{axis.description}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Axes;