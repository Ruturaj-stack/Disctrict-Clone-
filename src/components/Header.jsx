import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();

  const [isLocOpen, setIsLocOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState("Gurugram");
  const cities = ["Gurugram", "Delhi NCR", "Noida", "Faridabad", "Ghaziabad", "Jaipur"];

  const navLinks = [
    { name: "For you", path: "/" },
    { name: "Dining", path: "/dining" },
    { name: "Events", path: "/events" },
    { name: "Movies", path: "/movies" },
    { name: "Activities", path: "/activities" },
    { name: "Play", path: "/play" },
    { name: "Stores", path: "/stores" },
  ];

  const handleCitySelect = (city) => {
    setCurrentCity(city);
    setIsLocOpen(false);
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setCurrentCity("Detecting..."),
      () => alert("Unable to detect location. Please enable permission.")
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src="/district-by-zomato-logo-hd copy.webp"
          alt="logo"
          className="logo bigger"
          onClick={() => navigate("/")}
        />

        <div className="loc-wrapper">
          <div className="loc-box" onClick={() => setIsLocOpen(!isLocOpen)}>
            <MapPin size={18} color="#7b40ff" />
            <div className="loc-text">
              <span className="location-main">{currentCity}</span>
              <span className="location-sub">Haryana</span>
            </div>
            <ChevronDown
              size={18}
              className={`chevron ${isLocOpen ? "rotate" : ""}`}
            />
          </div>

          {isLocOpen && (
            <div className="location-dropdown">
              <div className="detect-row" onClick={detectLocation}>
                <MapPin size={18} color="#ef4f5f" />
                <span>Detect my location</span>
              </div>

              <div className="cities-list">
                {cities.map((city) => (
                  <div
                    key={city}
                    className={`city-item ${currentCity === city ? "selected" : ""}`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="navbar-links">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`nav-item ${
              locationPath.pathname === link.path ? "active" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="navbar-right">
        <Search size={20} className="search-icon" />
        <button className="profile-btn">👤</button>
      </div>
    </header>
  );
};

export default Header;
