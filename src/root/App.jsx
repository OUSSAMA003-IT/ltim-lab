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
import Navbar from "../components/navbar.jsx";
import Hero from "../components/hero.jsx";
import Stats from "../components/stats.jsx";
import Leadership from "../components/leadership.jsx";
import Teams from "../components/teams.jsx";
import Equipments from "../components/equipments.jsx";
import News from "../components/news.jsx";
import Axes from "../components/axes.jsx";
import Projects from "../components/projects.jsx";
import Partners from "../components/partners.jsx";
import Contact from "../components/contact.jsx";
import Footer from "../components/footer.jsx";

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
          
            <Leadership LAB_LEADERSHIP={leadership} />
          
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

      {/* ================= Scientific Production ================= */}
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