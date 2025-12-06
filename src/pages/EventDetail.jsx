import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetail.css";

const EventDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="event-detail-outer">

      <div className="event-detail-layout">
        {/* LEFT IMAGE SECTION */}
        <div className="event-detail-image">
          <img src={state.image} alt={state.title} />
        </div>

        {/* RIGHT DETAILS CARD */}
        <div className="event-detail-card">
          <h1 className="event-detail-title">{state.title}</h1>

          <div className="event-detail-line">
            <span>🏷</span> Theme Parks, Food & Drinks
          </div>

          <div className="event-detail-line">
            <span>🕒</span> Daily, 6:00 PM onwards
          </div>

          <div className="event-detail-line">
            <span>📍</span> {state.location}
          </div>

          <div className="event-detail-price-block">
            <p className="label">Starts from</p>
            <p className="price">{state.price}</p>
          </div>

          <button
            className="event-detail-book-btn"
            onClick={() => navigate("/booking", { state: { ...state, type: "event" } })}
          >
            BOOK TICKETS
          </button>
        </div>
      </div>

      <section className="event-detail-about">
        <h2>About the Event</h2>
        <p>
          Experience the vibrant charm of Rajasthan at Chokhi Dhani Sonipat – just an hour from Delhi!
          Enjoy captivating folk performances, camel, horse, tractor & bullock cart rides, mehendi wali,
          live bajre ki roti, adventure zones and much more.
        </p>
      </section>
    </div>
  );
};

export default EventDetail;
