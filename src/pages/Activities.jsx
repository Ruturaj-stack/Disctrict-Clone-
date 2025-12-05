import React from "react";
import { activities } from "../utils/dummyData";
import "./Activities.css";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Activities = () => {
  const navigate = useNavigate();

  return (
    <div className="activities-page container">
      <h1 className="section-title">Fun Activities</h1>
      <div className="activities-grid">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-card"
            onClick={() => navigate(`/activity/${activity.id}`, { state: { ...activity, type: "activity" } })}
          >
            <div className="activity-img-wrapper">
              <img src={activity.image} alt={activity.title} />
              <div className="activity-rating">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {activity.rating} <Star size={10} fill="white" strokeWidth={0} />
                 </div>
              </div>
            </div>
            <div className="activity-info">
              <h3>{activity.title}</h3>
              <p className="location-text">{activity.location}</p>
              <p className="price">{activity.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
