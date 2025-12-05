import React, { useState } from "react";
import { events } from "../utils/dummyData";
import "./Events.css";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Comedy", "Festival", "Workshop", "Kids"];

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="events-page container">
      <h1 className="section-title">Popular Events</h1>
      
      <div className="filters-container">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-chips">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => navigate("/booking", { state: { ...event, type: "event" } })}
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
