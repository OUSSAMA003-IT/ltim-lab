function Partners({ partners }) {
  const looped = [...partners, ...partners]; // for infinite scroll

  return (
    <section id="partners" className="partners-section">
      <div className="container">
        <h2 className="section-title">
          Confiance & Collaborations
        </h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {looped.map((p, i) => (
            <div key={i} className="partner-pill">
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;