import { useState } from "react";

function Projects({ PROJECTS_DATA, setSelectedProject }) {
  /* STATES */
  const [selectedCategory, setSelectedCategory] = useState("publication");
  const [selectedYear, setSelectedYear] = useState("all");

  /* CATEGORY LABELS */
  const CATEGORY_LABELS = {
    publication: "Publication",
    book: "Livre",
    conference: "Conférence"
  };

  /* EXTRACT UNIQUE YEARS (as strings for consistency) */
  const uniqueYears = ["all", ...new Set(PROJECTS_DATA.map(p => String(p.year)))]
    .sort((a, b) => b.localeCompare(a));

  /* FILTER LOGIC */
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const categoryMatch = p.category === selectedCategory;

    const yearMatch =
      selectedYear === "all" || String(p.year) === selectedYear;

    return categoryMatch && yearMatch;
  });

  const visibleProjects = filteredProjects.slice(0, 30);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="container">
        <h2 className="section-title">
          Projets de Recherche<span>.</span>
        </h2>

        {/* FILTERS */}
        <div className="filter-container">

          <button
            onClick={() => setSelectedCategory("publication")}
            className={selectedCategory === "publication" ? "active" : ""}
          >
            Publications
          </button>

          <button
            onClick={() => setSelectedCategory("book")}
            className={selectedCategory === "book" ? "active" : ""}
          >
            Livres & Chapitres
          </button>

          <button
            onClick={() => setSelectedCategory("conference")}
            className={selectedCategory === "conference" ? "active" : ""}
          >
            Conférences
          </button>

          {/* YEAR DROPDOWN */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="year-dropdown"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year === "all" ? "Toutes les années" : year}
              </option>
            ))}
          </select>
        </div>

        {/* SLIDER */}
        <div className="projects-wrapper">
          <button
            className="scroll-btn"
            onClick={() =>
              document
                .querySelector(".projects-grid")
                .scrollBy({ left: -320, behavior: "smooth" })
            }
          >
            ←
          </button>

          <div className="projects-grid">
            {visibleProjects.map((proj) => (
              <div
                key={proj.id}
                className="project-card"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="proj-tag">
                  {CATEGORY_LABELS[proj.category]} • {proj.year}
                </div>

                <h3>{proj.title}</h3>

                <div className="proj-link-visual">
                  Voir les détails →
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn"
            onClick={() =>
              document
                .querySelector(".projects-grid")
                .scrollBy({ left: 320, behavior: "smooth" })
            }
          >
            →
          </button>
        </div>

        {/* EMPTY STATE */}
        {visibleProjects.length === 0 && (
          <p style={{ marginTop: "20px", textAlign: "center", color: "#aaa" }}>
            Aucun projet pour cette sélection.
          </p>
        )}
      </div>

    </section>
  );
}

export default Projects;