import React, { useState, useEffect } from "react";
import "../styles/App.css";

/* =========================================================
   HOOKS 
========================================================= */
import { useStats } from "../hooks/useStats.js";
import { useLeadership } from "../hooks/useLeadership.js";
import { useTeams } from "../hooks/useTeams.js";
import { useEquipments } from "../hooks/useEquipments.js";
import { useNews } from "../hooks/useNews.js";
import { useAxes } from "../hooks/useAxes.js";
import { useProjects } from "../hooks/useProjects.js";
import { usePartners } from "../hooks/usePartners.js";
import { useContact } from "../hooks/useContact.js";

/* =========================================================
   COMPONENTS
========================================================= */
import Navbar from "../Components/navbar.jsx";
import Hero from "../Components/hero.jsx";
import Stats from "../Components/stats.jsx";
import Leadership from "../Components/leadership.jsx";
import Teams from "../Components/teams.jsx";
import Equipments from "../Components/equipments.jsx";
import News from "../Components/news.jsx";
import Axes from "../Components/axes.jsx";
import Projects from "../Components/projects.jsx";
import Partners from "../Components/partners.jsx";
import Contact from "../Components/contact.jsx";
import Footer from "../Components/footer.jsx";

/* ================= MODALS ================= */
import ProjectModal from "../modals/ProjectModal.jsx";
import TeamModal from "../modals/TeamModal.jsx";
import ReservationModal from "../modals/ReservationModal.jsx";
import NewsModal from "../modals/NewsModal.jsx";

function App() {
  /* =========================================================
     UI STATE
  ========================================================= */
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);

  /* =========================================================
     MODAL STATE
  ========================================================= */
  const [selectedProject, setSelectedProject] = useState(null);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const [selectedNews, setSelectedNews] = useState(null);

  /* =========================================================
     DATA (PocketBase CMS)
  ========================================================= */


const { stats, loading: statsLoading } = useStats();
const { leadership, loading: leadershipLoading } = useLeadership();
const { teams, loading: teamsLoading } = useTeams();
const { equipments, loading: equipmentsLoading } = useEquipments();
const { news, loading: newsLoading } = useNews();
const { axes, loading: axesLoading } = useAxes();
const { projects, loading: projectsLoading } = useProjects();
const { partners, loading: partnersLoading } = usePartners();
const { contact, loading: contactLoading } = useContact();

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     SAFETY: normalize leadership structure
  ========================================================= */
  const normalizedLeadership = Array.isArray(leadership)
    ? leadership[0]
    : leadership;

  /* =========================================================
     MODAL CONTROLS
  ========================================================= */
  const closeProject = () => setSelectedProject(null);
  const closeTeam = () => setSelectedTeam(null);
  const closeReservation = () => setShowReservationForm(false);

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <div className="spa-wrapper">

      {/* ================= NAVBAR ================= */}
      <Navbar isScrolled={isScrolled} />

      {/* ================= HERO ================= */}
      <Hero setShowReservationForm={setShowReservationForm} />

      {/* ================= RESERVATION MODAL ================= */}
      <ReservationModal
        isOpen={showReservationForm}
        onClose={closeReservation}
      />

      {/* ================= PROJECT MODAL ================= */}
      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
      />

      {/* ================= TEAM MODAL ================= */}
      <TeamModal
        team={selectedTeam}
        onClose={closeTeam}
      />

      {/* ================= STATS ================= */}
      {statsLoading ? (
        <p style={{ textAlign: "center" }}>Loading stats...</p>
      ) : (
        <Stats STATS_DATA={stats} />
      )}

      <section className="section-padding">

        {/* ================= LEADERSHIP ================= */}
        {leadershipLoading ? (
          <p style={{ textAlign: "center" }}>Loading leadership...</p>
        ) : (
          normalizedLeadership && (
            <Leadership LAB_LEADERSHIP={normalizedLeadership} />
          )
        )}

        {/* ================= TEAMS ================= */}
        {teamsLoading ? (
          <p style={{ textAlign: "center" }}>Loading teams...</p>
        ) : (
          <Teams
            TEAMS_DATA={teams}
            setSelectedTeam={setSelectedTeam}
          />
        )}

        {/* ================= EQUIPMENTS ================= */}
        {equipmentsLoading ? (
          <p style={{ textAlign: "center" }}>Loading equipments...</p>
        ) : (
          <Equipments EQUIPMENTS_DATA={equipments} />
        )}

      </section>

      <section className="section-padding">

      {/* ================= NEWS ================= */}
      {newsLoading ? (
      <p style={{ textAlign: "center" }}>Loading news...</p>
      ) : (
      <News news={news} setSelectedNews={setSelectedNews} />
      )}

<NewsModal
  news={selectedNews}
  onClose={() => setSelectedNews(null)}
/>
     </section>

      {/* ================= AXES ================= */}
      {axesLoading ? (
        <p style={{ textAlign: "center" }}>Loading axes...</p>
      ) : (
        <Axes axes={axes} />
      )}

      {/* ================= PROJECTS ================= */}
      <Projects
        projects={projects}
        setSelectedProject={setSelectedProject}
      />

      {/* ================= PARTNERS ================= */}
      {partnersLoading ? (
        <p style={{ textAlign: "center" }}>Loading partners...</p>
      ) : (
        <Partners partners={partners} />
      )}

      {/* ================= CONTACT ================= */}
      {contactLoading ? (
        <p style={{ textAlign: "center" }}>Loading contact...</p>
      ) : (
        <Contact contact={contact} />
      )}

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default App;