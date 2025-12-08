import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dz-footer">

            <div className="dz-footer-container">
        <img
          src="https://b.zmtcdn.com/data/edition_assets/17466982242413.svg"
          className="dz-logo"
          alt="district logo"
        />

        <div className="dz-nav-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <a href="mailto:support@district.local">Contact Us</a>
          <button type="button" className="dz-link-btn">List your events</button>
        </div>

        <div className="dz-qr-block">
          <img
            src="https://b.zmtcdn.com/data/edition_assets/17628835501492.svg"
            className="dz-qr"
            alt="QR Download"
          />
          <p>Scan to download the app</p>

          {/* Social icons directly below QR */}
          <div className="dz-social-qr">
            <img src="https://cdn-icons-png.flaticon.com/128/733/733585.png" alt="Whatsapp" />
            <img src="https://cdn-icons-png.flaticon.com/128/1384/1384015.png" alt="Facebook" />
            <img src="https://cdn-icons-png.flaticon.com/128/733/733614.png" alt="Instagram" />
            <img src="https://cdn-icons-png.flaticon.com/128/3938/3938037.png" alt="Twitter" />
            <img src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png" alt="YouTube" />
          </div>
        </div>
      </div>

      <div className="dz-divider"></div>

      <p className="dz-tnc-text">
        By accessing this page, you confirm that you have read, understood, and agreed to our
        <span> Terms of Service</span>, <span>Cookie Policy</span>, <span>Privacy Policy</span>,
        and <span>Content Guidelines</span>. All rights reserved.
      </p>

    </footer>

  );
};

export default Footer;
