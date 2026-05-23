function Stats({ STATS_DATA = [] }) {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">

          {STATS_DATA.map((stat, index) => (
            <div key={stat.id || index} className="stat-item">

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-info">
                <h2 className="stat-count">
                  {stat.count}
                </h2>

                <p className="stat-label">
                  {stat.label}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;