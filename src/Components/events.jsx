import { useState } from "react";

function Events({ EVENTS_DATA }) {
  const [showAllEvents, setShowAllEvents] = useState(false);

  const visibleEvents = showAllEvents
    ? EVENTS_DATA
    : EVENTS_DATA.slice(0, 2);

  return (
    <section id="events" className="section-padding">
      <div className="container">
        <h2 className="section-title">Événements Prochains</h2>

        <div className="events-timeline">
          {visibleEvents.map((event) => (
            <div className="event-card-modern" key={event.id}>
              <div className="event-date-col">
                <span className="ev-day">{event.day}</span>
                <span className="ev-month">{event.month}</span>
              </div>

              <div className="event-content-col">
                <span className="ev-venue">{event.venue}</span>

                <div className="ev-header">
                  <h3>{event.title}</h3>
                </div>

                <p className="ev-description">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="toggle-container">
          <button
            className="see-more-btn"
            onClick={() => setShowAllEvents(!showAllEvents)}
          >
            {showAllEvents ? "Voir moins" : "Voir tous les événements"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Events;