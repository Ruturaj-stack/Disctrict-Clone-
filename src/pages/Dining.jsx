import React, { useState } from "react";
import { dining } from "../utils/dummyData";
import "./Dining.css";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Dining = () => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisines = ["All", "North Indian", "Chinese", "Continental", "Seafood", "Italian", "Modern Indian"];

  const filteredDining = selectedCuisine === "All"
    ? dining
    : dining.filter(d => d.cuisine.includes(selectedCuisine));

  return (
    <div className="dining-page container">
      <h1 className="section-title">Trending Restaurants</h1>
      
      <div className="filters-container">
        <div className="filter-group">
          <span className="filter-label">Cuisine:</span>
          <div className="filter-chips">
            {cuisines.map(cuisine => (
              <button 
                key={cuisine} 
                className={`filter-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dining-grid">
        {filteredDining.map((restaurant) => (
          <div
            key={restaurant.id}
            className="dining-card"
            onClick={() => navigate("/booking", { state: { ...restaurant, type: "dining" } })}
          >
            <div className="dining-img-wrapper">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="dining-rating">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {restaurant.rating} <Star size={10} fill="white" strokeWidth={0} />
                 </div>
              </div>
            </div>
            <div className="dining-info">
              <h3>{restaurant.name}</h3>
              <p className="cuisine">{restaurant.cuisine}</p>
              <p className="location-text">{restaurant.location}</p>
              <p className="price">{restaurant.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dining;
