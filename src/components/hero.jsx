function Hero({ setShowReservationForm }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Laboratoire des Technologies de l'Information et Modélisation
        </h1>

        <p className="hero-intro">
          Un centre de recherche de la Faculté des Sciences Ben M’sik dédié aux systèmes intelligents, au Big Data et aux technologies numériques avancées.
        </p>

        <div className="hero-cta-group">
          <button
            className="cta-btn"
            onClick={() => setShowReservationForm(true)}
          >
            Demander Une Accréditation
          </button>

          <div className="social-sidebar">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;