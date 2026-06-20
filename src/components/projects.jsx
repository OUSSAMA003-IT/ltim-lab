import { useState, useRef, useEffect } from "react";

function Projects({ projects, setSelectedProject }) {
  /* =========================================================
     FILTER STATES
     Controls UI filtering behavior
  ========================================================= */
  const [selectedCategory, setSelectedCategory] = useState("publication");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedResearcher, setSelectedResearcher] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  /* ---- NEW: researcher searchbar state ---- */
  const [researcherQuery, setResearcherQuery] = useState("");
  const [isResearcherOpen, setIsResearcherOpen] = useState(false);
  const researcherBoxRef = useRef(null);

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

  const uniqueResearchers = Array.from(researcherMap.values()).sort();

  /* ---- NEW: filter researcher list by the searchbar query ---- */
  const filteredResearchers = uniqueResearchers.filter((r) =>
    r.toLowerCase().includes(researcherQuery.toLowerCase().trim())
  );

  /* ---- NEW: close the dropdown when clicking outside of it ---- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        researcherBoxRef.current &&
        !researcherBoxRef.current.contains(e.target)
      ) {
        setIsResearcherOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectResearcher(researcher) {
    setSelectedResearcher(researcher);
    setResearcherQuery(researcher);
    setIsResearcherOpen(false);
  }

  function handleClearResearcher() {
    setSelectedResearcher("all");
    setResearcherQuery("");
    setIsResearcherOpen(false);
  }

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
   
    >
      <div className="container">

        {/* ================= TITLE ================= */}
        <h2 className="section-title">
          Production scientifique
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

          {/* ================= RESEARCHER SEARCHBAR ================= */}
          <div
            className="researcher-search"
            ref={researcherBoxRef}
            style={{ position: "relative", minWidth: "220px" }}
          >
            <input
              type="text"
              placeholder="Rechercher un chercheur..."
              value={researcherQuery}
              onChange={(e) => {
                setResearcherQuery(e.target.value);
                setIsResearcherOpen(true);
                // typing freely clears a previously locked-in exact selection
                if (selectedResearcher !== "all") setSelectedResearcher("all");
              }}
              onFocus={() => setIsResearcherOpen(true)}
              className="year-dropdown"
              style={{ width: "100%", paddingRight: "28px" }}
            />

            {(researcherQuery || selectedResearcher !== "all") && (
              <button
                type="button"
                onClick={handleClearResearcher}
                aria-label="Effacer le filtre chercheur"
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                  fontSize: "14px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}

            {isResearcherOpen && (
              <div
                className="researcher-dropdown"
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  maxHeight: "240px",
                  overflowY: "auto",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                  zIndex: 20,
                }}
              >
                {filteredResearchers.length === 0 && (
                  <div style={{ padding: "10px 12px", color: "#999", fontSize: "14px" }}>
                    Aucun chercheur trouvé
                  </div>
                )}

                {filteredResearchers.map((researcher) => (
                  <div
                    key={researcher}
                    onClick={() => handleSelectResearcher(researcher)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      background:
                        researcher.toLowerCase() === selectedResearcher.toLowerCase()
                          ? "#f0f0f0"
                          : "transparent",
                    }}
                    onMouseDown={(e) => e.preventDefault()} // keep focus, avoid blur-before-click
                  >
                    {researcher}
                  </div>
                ))}
              </div>
            )}
          </div>
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