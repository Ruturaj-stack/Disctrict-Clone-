import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, MapPin, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
  const { user, openAuthModal, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Location State
  const [currentLocation, setCurrentLocation] = useState("Mumbai");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cities = ["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Chennai"];

  const navLinks = [
    { name: "For you", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Dining", path: "/dining" },
    { name: "Events", path: "/events" },
    { name: "Activities", path: "/activities" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLocationSelect = (city) => {
    setCurrentLocation(city);
    setIsLocationOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Optional: clear after search
    }
  };

  return (
    <>
      <header className="header">
        <div className="left">
          <img
            src="/district-by-zomato-logo-hd copy.webp"
            alt="District Logo"
            className="logo-img"
            onClick={() => navigate("/")}
          />

          <div className="location-wrapper">
            <div className="location" onClick={() => setIsLocationOpen(!isLocationOpen)}>
              <MapPin size={18} color="#ef4f5f" fill="#ef4f5f" />
              <div className="loc-details">
                <span className="loc-title">{currentLocation}</span>
                <span className="loc-subtitle">Select location...</span>
              </div>
              <ChevronDown size={16} className={`chevron ${isLocationOpen ? "rotate" : ""}`} />
            </div>
            
            {isLocationOpen && (
              <div className="location-dropdown">
                <div className="current-location-detect">
                  <MapPin size={16} color="#ef4f5f" />
                  <span>Detect my location</span>
                </div>
                <div className="cities-list">
                  {cities.map(city => (
                    <div 
                      key={city} 
                      className={`city-item ${currentLocation === city ? "selected" : ""}`}
                      onClick={() => handleLocationSelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={locationPath.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="right">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for movies, events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          
          {user ? (
            <div className="profile-menu">
               <div className="profile-btn" onClick={() => navigate("/my-bookings")}>
                 {user.avatar ? (
                   <img src={user.avatar} alt="avatar" className="avatar-img" />
                 ) : (
                   <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                 )}
                 <span className="username">{user.name.split(" ")[0]}</span>
               </div>
               <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={openAuthModal}>
              Log in
            </button>
          )}

          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
            <div className="mobile-location">
              <MapPin size={18} color="#ef4f5f" fill="#ef4f5f" />
              <div className="loc-details">
                <span className="loc-title">{currentLocation}</span>
                <span className="loc-subtitle">Select location...</span>
              </div>
            </div>

            <div className="mobile-search">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search for movies, events..." />
            </div>

            <div className="mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={locationPath.pathname === link.path ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>

          <div className="mobile-auth">
             {user ? (
              <div className="mobile-profile">
                <div className="profile-info" onClick={() => { navigate("/my-bookings"); closeMobileMenu(); }}>
                   {user.avatar ? (
                     <img src={user.avatar} alt="avatar" className="avatar-img" />
                   ) : (
                     <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                   )}
                   <span className="username">{user.name}</span>
                </div>
                <button className="mobile-logout-btn" onClick={() => { logout(); closeMobileMenu(); }}>Logout</button>
              </div>
            ) : (
              <button className="mobile-login-btn" onClick={() => { openAuthModal(); closeMobileMenu(); }}>
                Log in / Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
