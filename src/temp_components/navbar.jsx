import { useState } from "react";

function Navbar({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`navbar ${isScrolled ? "solid" : ""}`}>
      <div className="nav-container">
        <div className="logo">LTIM<span>.</span></div>

        {/* Hamburger */}
        <div 
          className={`hamburger ${isOpen ? "active" : ""}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Accueil</a>

          <div className="dropdown">
            <button className="dropbtn">À propos</button>
            <div className="dropdown-content">
              <a href="#direction">Direction</a>
              <a href="#teams">Équipes de Recherche</a>
              <a href="#equipements">Équipements</a>
            </div>
          </div>

          <a href="#news" onClick={() => setIsOpen(false)}>Actualités</a>

          <div className="dropdown">
            <button className="dropbtn" type="button">Recherche</button>
            <div className="dropdown-content">
              <a href="#axes">Axes Stratégiques</a>
              <a href="#projects">Production scientifique</a>
              <a href="#partners">Partenaires</a>
            </div>
          </div>

          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;


