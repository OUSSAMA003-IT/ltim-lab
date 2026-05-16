import { useState } from "react";

function News({ news, setSelectedNews }) {
  const [expanded, setExpanded] = useState(false);

  const safeNews = news || [];
  const visibleNews = expanded ? safeNews : safeNews.slice(0, 3);

  return (
    <section id="news" className="section-padding">
      <div className="container">

        <h2 className="section-title">
          Actualités
        </h2>

        <div className="news-list">
          {visibleNews.map((item) => (
            <div key={item.id} className="news-card">

              {/* PIN BADGE */}
  {item.pinned && (
    <span className="news-badge">
      Épinglé
    </span>
  )}

              {/* DATE */}
              <div className="news-date">
                {item.date
                  ? new Date(item.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </div>

              {/* TITLE */}
              <h3 className="news-title">{item.title}</h3>

              {/* EXCERPT */}
              <p className="news-excerpt">
                {item.excerpt || "Aucune description disponible."}
              </p>

              {/* READ MORE */}
              <span
  className="news-readmore"
  onClick={() => setSelectedNews(item)}
>
  Lire plus →
</span>

            </div>
          ))}
        </div>

        {/* TOGGLE */}
        {safeNews.length > 2 && (
          <div className="news-toggle">
            <button
              className="toggle-btn"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default News;