import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from "./supabaseClient";


/* IMPORT DATA FROM ./data */
import STATS_DATA from "./data/stats.json";
import LAB_LEADERSHIP from "./data/leadership.json";
import TEAMS_DATA from "./data/teams.json";
import EQUIPMENTS_DATA from "./data/equipments.json";
import EVENTS_DATA from "./data/events.json";
import PROJECTS_DATA from "./data/projects.json";

/* IMPORT COMPONENTS FROM ./components*/
import Navbar from "./components/navbar.jsx";
import Hero from "./components/hero.jsx";
import Stats from "./components/stats.jsx";
import Leadership from "./components/leadership.jsx";
import Teams from "./components/teams.jsx";
import Equipments from "./components/equipments.jsx"
import Events from "./components/events";
import Axes from "./components/axes.jsx";
import Projects from "./components/projects.jsx";
import Partners from "./components/partners.jsx";
import Contact from "./components/contact.jsx";
import Footer from "./components/footer.jsx";

/* ----------------------------------------------------------------------------------------- */
/* STATES */
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [formData, setFormData] = useState({
      name: "",
        email: "",
        institution: "",
        role: "",
        project:"",
        startDate:"",
        motivation:"",
  });

/* ----------------------------------------------------------------------------------------- */
/* EFFECTS*/
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

/* ----------------------------------------------------------------------------------------- */
/* HANDLERS */

/* Handle input changes in reservation form */
const handleChange = (e) => {
  setFormData(prev => ({
  ...prev,
  [e.target.name]: e.target.value
}));
};

/* Handle form submission to Supabase */
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Sending:", formData);

  const { data, error } = await supabase
    .from("accreditation_requests")
    .insert([formData]);

  console.log("Supabase response:", { data, error });

  if (error) {
    alert(error.message); // 👈 IMPORTANT
  } else {
    alert("Demande envoyée ✅");
  }
};

return (
  <div className="spa-wrapper">

  {/* form modal */}
{showReservationForm && (
  <div className="modal-overlay" onClick={() => setShowReservationForm(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      
      <span className="close-modal" onClick={() => setShowReservationForm(false)}>
        &times;
      </span>

      <h2 className="section-title">Formulaire d’accréditation du laboratoire</h2>

      <form className="reservation-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email universitaire"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="institution"
          placeholder="Établissement / Université"
          value={formData.institution}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Statut (Doctorant, Enseignant, Chercheur...)"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="project"
          placeholder="Projet de recherche / Sujet"
          value={formData.project}
          onChange={handleChange}
          required
        />


        <label className="form-label">Date de début souhaitée</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="motivation"
          placeholder="Motivation / Description de la demande"
          value={formData.motivation}
          onChange={handleChange}
          rows="4"
          required
        />

        <button type="submit" className="pdf-btn">
          Soumettre la demande
        </button>

      </form>
    </div>
  </div>
)}


     {/* TEAM MODAL */}
     {selectedTeam && (
     <div className="modal-overlay" onClick={() => setSelectedTeam(null)}>
     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
     <span className="close-modal" onClick={() => setSelectedTeam(null)}> &times; </span>
     <div className="proj-tag">{selectedTeam.acronym}</div>
     <div>
         <p><strong>Responsable:</strong> {selectedTeam.leader}</p>
         <ul>
            {selectedTeam.members.map((m, i) => (
            <li key={i}>{m}</li>
            ))}
         </ul>
     </div>
     </div>
     </div>
)}
       
       {/* PROJECTS MODAL */}
       {selectedProject && (
       <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       <span className="close-modal" onClick={() => setSelectedProject(null)}> &times; </span>

        {/* META SECTION */}
        <div className="modal-body">
        <div className="meta-grid">
        <div className="meta-item">
           <span className="meta-label">Journal /Livre /Conférence</span>
           <span className="meta-value">{selectedProject.journal}</span>
        </div>
        <div className="meta-item">
           <span className="meta-label">Autheur</span>
           <span className="meta-value">{selectedProject.authors}</span>
        </div>

        <div className="meta-item">
           <span className="meta-label">Année</span>
           <span className="meta-value">{selectedProject.year}</span>
        </div>

        <div className="meta-item">
           <span className="meta-label">Volume (Issue)</span>
           <span className="meta-value">
               {selectedProject.volume} ({selectedProject.issue})
           </span>
        </div>

        <div className="meta-item">
           <span className="meta-label">Pages</span>
           <span className="meta-value">{selectedProject.pages}</span>
        </div>

        <div className="meta-item full">
           <span className="meta-label">Indexing</span>
           <span className="meta-value">{selectedProject.indexing}</span>
        </div>
        </div>
        </div>
        </div>
        </div>
)}


      {/* NAVBAR */}
      <Navbar isScrolled={isScrolled} />

      {/* HERO SECTION */}
      <Hero setShowReservationForm={setShowReservationForm} />

      {/* STATS SECTION */}
      <Stats STATS_DATA={STATS_DATA} />
      
{/* ---------------------------------------------------------------------------------------------- */}
      {/* ABOUT US SECTION */}
      <section className="section-padding">
  
      {/* LEADERSHIP / DIRECTION */}
      <Leadership LAB_LEADERSHIP={LAB_LEADERSHIP} />

      {/* TEAMS */}
      <Teams 
          TEAMS_DATA={TEAMS_DATA}
          setSelectedTeam={setSelectedTeam}
      />

      {/* 🔹 EQUIPEMENTS */}
      <Equipments EQUIPMENTS_DATA={EQUIPMENTS_DATA} />
      </section>
{/* ------------------------------------------------------------------------------------------------ */}
      {/* 6. EVENTS SECTION */}
      <Events EVENTS_DATA={EVENTS_DATA} />

{/* ------------------------------------------------------------------------------------------------ */}
      {/* 6. RESEARCH FIELDS */}
      <Axes />

      {/* SCIENTIFIC PRODUCTION */}
      <Projects 
          PROJECTS_DATA={PROJECTS_DATA}
          setSelectedProject={setSelectedProject}
      />
      {/* PARTNERS */}
      <Partners />

{/* ----------------------------------------------------------------------------------------------- */}
      {/* 8. CONTACT SECTION */}
      <Contact />

{/* ----------------------------------------------------------------------------------------------- */}
      {/* 9. FOOTER */}
      <Footer/>
    </div>
  );
}

export default App;


















