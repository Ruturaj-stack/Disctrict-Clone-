import React from "react";
import { events } from "../utils/dummyData";
import "./Events.css";
import { useNavigate } from "react-router-dom";

const eventCategories = [
  { title: "Music", image: "https://b.zmtcdn.com/data/edition_assets/17502677829482.png" },
  { title: "Nightlife", image: "https://b.zmtcdn.com/data/edition_assets/17502613570366.png" },
  { title: "Comedy", image: "https://b.zmtcdn.com/data/edition_assets/175026159863512.png" },
  { title: "Sports", image: "https://b.zmtcdn.com/data/edition_assets/17504284493104.png" },
  { title: "Performances", image: "https://b.zmtcdn.com/data/edition_assets/175041675814556.png" },
  { title: "Food & Drinks", image: "https://b.zmtcdn.com/data/edition_assets/17504277005144.png" },
  { title: "Fests & Fairs", image: "https://b.zmtcdn.com/data/edition_assets/17506116681693.png" },
  { title: "Social Mixers", image: "https://b.zmtcdn.com/data/edition_assets/17504273947131.png" },
  { title: "Screenings", image: "https://b.zmtcdn.com/data/edition_assets/17504228735923.png" },
  { title: "Fitness", image: "https://b.zmtcdn.com/data/edition_assets/17506676451057.png" },
  { title: "Pets", image: "https://b.zmtcdn.com/data/edition_assets/17506698409015.png" },
  { title: "Conferences", image: "https://b.zmtcdn.com/data/edition_assets/17504309382703.png" },
  { title: "Expos", image: "https://b.zmtcdn.com/data/edition_assets/17504257345534.png" },
  { title: "Open Mics", image: "https://b.zmtcdn.com/data/edition_assets/17628595267833.png" },
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <div className="events-page">
      <h2 className="events-title">Explore Events</h2>

      {/* Category icons */}
      <div className="category-grid">
        {eventCategories.map((cat, index) => (
          <div className="category-card" key={index}>
            <img src={cat.image} alt={cat.title} className="category-icon" />
            <p>{cat.title}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <h2 className="events-title" style={{ marginTop: "60px" }}>Popular Events</h2>

      {/* Event Cards */}
      <div className="events-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => navigate(`/event/${event.id}`, { state: event })}

          >
            <div className="event-img-wrapper">
              <img src={event.image} alt={event.title} />
              <div className="event-date">{event.date}</div>
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="category">{event.category}</p>
              <p className="location-text">{event.location}</p>
              <p className="price">{event.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
