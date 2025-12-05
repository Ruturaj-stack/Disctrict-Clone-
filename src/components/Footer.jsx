import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">District</h2>
        <p className="footer-text">Experience movies, dining, activities and events like never before.</p>

        <div className="social-icons">
          <span>📘</span>
          <span>📸</span>
          <span>🐦</span>
          <span>▶️</span>
        </div>
      </div>

      <div className="footer-links">
        <Link to="/movies">Movies</Link>
        <Link to="/events">Events</Link>
        <Link to="/dining">Dining</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} District Clone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
