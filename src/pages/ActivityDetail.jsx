import { useLocation, useNavigate } from "react-router-dom";
import "./ActivityDetail.css";

const ActivityDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="activity-detail-page">
      <div className="left-image-block">
        <img src={state.image} alt={state.title} className="activity-banner" />
      </div>

      <div className="right-info-block">
        <h1 className="activity-title">{state.title}</h1>
        <h2 className="subtitle">{state.subtitle}</h2>

        <div className="meta-item">📅 {state.meta}</div>
        <div className="meta-item">📍 {state.location}</div>

        <div className="price-block">
          <span className="price-label">Starts from</span>
          <h2 className="price">{state.price}</h2>
        </div>

        <button
          className="book-btn"
          onClick={() => navigate("/booking", { state })}
        >
          BOOK TICKETS
        </button>

        <div className="offer-strip">
          🎉 Get 20% off up to ₹125 | Limited Offer
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
