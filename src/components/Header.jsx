import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left">
        <img
  src="/district-by-zomato-logo-hd copy.webp"
  alt="District Logo"
  className="logo-img"
  onClick={() => navigate("/")}
/>


        <div className="location">
          <span className="loc-title">Upper Worli</span>
          <span className="loc-city">Worli, Mumbai ▾</span>
        </div>
      </div>

      <nav className="nav">
        <Link to="/" className="active">For you</Link>
        <Link to="/dining">Dining</Link>
        <Link to="/events">Events</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/stores">Stores</Link>
      </nav>

      <div className="right">
        <span className="search-icon">🔍</span>
        <div className="profile">R</div>
      </div>
    </header>
  );
};

export default Header;
