function Teams({ TEAMS_DATA, setSelectedTeam }) {
  return (
    <div id="teams" className="container" style={{ marginTop: "80px" }}>
      <h2 className="section-title">Nos Équipes de Recherche</h2>

      <div className="teams-wrapper">
        <button
          className="scroll-btn"
          onClick={() =>
            document.querySelector(".teams-grid")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
        >
          ←
        </button>

        <div className="teams-grid">
          {TEAMS_DATA.map((team) => (
            <div key={team.acronym} className="team-card">

              <div className="team-header">
                <span className="team-acronym">{team.acronym}</span>
                <h3>{team.name}</h3>
              </div>

              <div className="leader-info">
                <span className="label">Chef d'équipe</span>
                <p className="leader-name">{team.leader}</p>
              </div>

              <div className="members-list">
                <span className="label">Chercheurs</span>
                <ul>
                  {team.members.slice(0, 2).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                  {team.members.length > 2 && (
                    <li className="more-count">
                      +{team.members.length - 2} autres...
                    </li>
                  )}
                </ul>
              </div>

              <button
                className="view-members-btn"
                onClick={() => setSelectedTeam(team)}
              >
                VOIR TOUS LES MEMBRES
              </button>

            </div>
          ))}
        </div>

        <button
          className="scroll-btn"
          onClick={() =>
            document.querySelector(".teams-grid")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Teams;