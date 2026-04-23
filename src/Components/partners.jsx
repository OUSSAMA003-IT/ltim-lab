function Partners() {
  return (
    <section id="partners" className="partners-section">
      <div className="container">
        <h2 className="section-title">
          Confiance & Collaborations<span>.</span>
        </h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          <div className="partner-pill">Université de Mons</div>
          <div className="partner-pill">ENSEM Casablanca</div>
          <div className="partner-pill">ESITH</div>
          <div className="partner-pill">FSBM Casablanca</div>
          <div className="partner-pill">Uniforce Informatique</div>
          <div className="partner-pill">CNRST</div>
          <div className="partner-pill">Smart City Network</div>

          {/* duplicate for infinite loop */}
          <div className="partner-pill">Université de Mons</div>
          <div className="partner-pill">ENSEM Casablanca</div>
          <div className="partner-pill">ESITH</div>
          <div className="partner-pill">FSBM Casablanca</div>
          <div className="partner-pill">Uniforce Informatique</div>
          <div className="partner-pill">CNRST</div>
          <div className="partner-pill">Smart City Network</div>
        </div>
      </div>
    </section>
  );
}

export default Partners;