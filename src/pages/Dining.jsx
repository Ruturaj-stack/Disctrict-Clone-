import React, { useState } from "react";
import { dining } from "../utils/dummyData";
import "./Dining.css";
import { useNavigate } from "react-router-dom";
import { Star, Search } from "lucide-react";

const Dining = () => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const cuisines = ["All", "North Indian", "Chinese", "Continental", "Seafood", "Italian", "Modern Indian"];

  const filteredDining = (selectedCuisine === "All" ? dining : dining.filter(d => d.cuisine.includes(selectedCuisine)))
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;
    const matches = dining.filter(
      (d) => d.name.toLowerCase().includes(term) || d.cuisine.toLowerCase().includes(term)
    );
    if (matches.length === 1) {
      navigate("/booking", { state: { ...matches[0], type: "dining" } });
    }
  };

  const navigateOffer = (title, image) => {
    const offerItem = {
      id: "offer",
      name: title,
      image,
      location: "Upper Worli, Mumbai",
      cuisine: "Buffet",
      price: "₹1,200 for two",
    };
    navigate("/booking", { state: { ...offerItem, type: "dining" } });
  };

  return (
    <div className="dining-page">
      <div className="dine-hero container">
        <div className="dine-hero-box">
          <h1 className="dine-hero-title">Discover restaurants, explore menus, book tables - all in one place</h1>
          <div className="dine-search">
            <Search size={18} className="dine-search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              placeholder="Search for a restaurant name"
            />
            <button className="dine-search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dine-subtitle-wrap">
          <h2 className="dine-subtitle">Enjoy iconic District specials</h2>
          <span className="dine-underline"></span>
        </div>

        <div className="specials-grid">
          <div className="special-item">
            <h3>Signature packages</h3>
            <p>Curated menus & selections across the best spots in town</p>
          </div>
          <div className="special-item">
            <h3>Peak hour booking</h3>
            <p>Skip the queue - priority entry at top restaurants</p>
          </div>
          <div className="special-item">
            <h3>On-the-house</h3>
            <p>Complimentary delights along with your favourite meals</p>
          </div>
        </div>

        <div className="polaroid-trio">
          <div className="polaroid-card tilt-left" onClick={() => navigateOffer("Signature packages", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60")}> 
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60" alt="Signature packages" />
            <div className="polaroid-caption">Signature packages</div>
          </div>
          <div className="polaroid-card" onClick={() => navigateOffer("Peak hour booking", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60")}> 
            <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60" alt="Peak hour booking" />
            <div className="polaroid-caption">Peak hour booking</div>
          </div>
          <div className="polaroid-card tilt-right" onClick={() => navigateOffer("On-the-house", "https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D")}> 
            <img src="https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" alt="On-the-house" />
            <div className="polaroid-caption">On-the-house</div>
          </div>
        </div>

        <div className="dine-subtitle-wrap deals">
          <h2 className="dine-subtitle">Grab great deals and unlock extra savings</h2>
          <span className="dine-underline"></span>
        </div>

        <div className="polaroid-duo">
          <div className="polaroid-card tilt-left" onClick={() => navigateOffer("Up to 50% OFF", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60")}> 
            <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60" alt="Up to 50% OFF" />
            <div className="polaroid-caption">Up to 50% OFF</div>
          </div>
          <div className="polaroid-card tilt-right" onClick={() => navigateOffer("Buffets", "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D")}> 
            <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" alt="Buffets" />
            <div className="polaroid-caption">Buffets</div>
          </div>
        </div>
      </div>

      <div className="container">
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
    </div>
  );
};

export default Dining;
