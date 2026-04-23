function Footer() {
  return (
    <footer className="footer">
      <div className="social-sidebar">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
          <i className="fab fa-facebook"></i>
        </a>

        <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      <div className="container">
        <div className="footer-content">
          <p>© 2026 LTIM Lab. Tous droits réservés.</p>

          <div className="footer-links">
            <span>Faculté des Sciences Ben M'Sick</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;