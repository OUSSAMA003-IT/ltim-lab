import { useState } from "react";

function Projects({ projects, setSelectedProject }) {
  /* =========================================================
     FILTER STATES
     Controls UI filtering behavior
  ========================================================= */
  const [selectedCategory, setSelectedCategory] = useState("publication");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedResearcher, setSelectedResearcher] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================================================
     CATEGORY LABELS (UI DISPLAY ONLY)
  ========================================================= */
  const CATEGORY_LABELS = {
    publication: "Publication",
    book: "Livre",
    conference: "Conférence",
  };

  /* =========================================================
     SAFE DATA FALLBACK
  ========================================================= */
  const safeProjects = projects || [];

  /* =========================================================
     YEARS FILTER OPTIONS
  ========================================================= */
  const uniqueYears = [
    "all",
    ...new Set(safeProjects.map((p) => String(p.year || ""))),
  ].sort((a, b) => (a === "all" ? -1 : b.localeCompare(a)));

  /* =========================================================
     RESEARCHERS (FIXED VERSION)
     - removes duplicates
     - ignores case differences
     - keeps nice display name
  ========================================================= */
  const researcherMap = new Map();

  safeProjects.forEach((p) => {
    if (!p.authors) return;

    p.authors.split(",").forEach((a) => {
      const clean = a.trim();
      if (!clean) return;

      const key = clean.toLowerCase();

      if (!researcherMap.has(key)) {
        researcherMap.set(key, clean);
      }
    });
  });

  const uniqueResearchers = [
    "all",
    ...Array.from(researcherMap.values()).sort(),
  ];

  /* =========================================================
     SEARCH NORMALIZATION
  ========================================================= */
  const search = searchTerm.toLowerCase().trim();

  /* =========================================================
     FILTER LOGIC
  ========================================================= */
  const filteredProjects = safeProjects.filter((p) => {
    /* CATEGORY */
    const categoryMatch = p.category === selectedCategory;

    /* YEAR */
    const yearMatch =
      selectedYear === "all" || String(p.year) === selectedYear;

    /* RESEARCHER (FIXED: case-safe + consistent matching) */
    const researcherMatch =
      selectedResearcher === "all" ||
      (p.authors &&
        p.authors
          .split(",")
          .map((a) => a.trim().toLowerCase())
          .includes(selectedResearcher.toLowerCase()));

    /* SEARCH */
    const searchMatch =
      search === "" ||
      (p.title && p.title.toLowerCase().includes(search)) ||
      (p.authors && p.authors.toLowerCase().includes(search));

    return categoryMatch && yearMatch && researcherMatch && searchMatch;
  });

  /* LIMIT RESULTS (performance + UX) */
  const visibleProjects = filteredProjects.slice(0, 30);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="container">

        {/* ================= TITLE ================= */}
        <h2 className="section-title">
          Projets de Recherche
        </h2>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="category-container">
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
        </div>

        {/* ================= SUB FILTERS ================= */}
        <div className="subfilter-container">

          {/* YEAR */}
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

          {/* RESEARCHER */}
          <select
            value={selectedResearcher}
            onChange={(e) => setSelectedResearcher(e.target.value)}
            className="year-dropdown"
          >
            <option value="all">Tous les chercheurs</option>

            {uniqueResearchers
              .filter((r) => r !== "all")
              .map((researcher, i) => (
                <option key={i} value={researcher}>
                  {researcher}
                </option>
              ))}
          </select>
        </div>

        {/* ================= PROJECT LIST ================= */}
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

        {/* ================= EMPTY STATE ================= */}
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