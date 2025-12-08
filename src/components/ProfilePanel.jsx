// src/components/ProfilePanel.jsx
import "./ProfilePanel.css";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProfilePanel = ({ open, onClose }) => {
  const { userPhone, userName, logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const initial = (userName || "U").charAt(0).toUpperCase();
  const formattedPhone = userPhone ? `+91 ${userPhone}` : "";

  const handleViewBookings = () => {
    navigate("/my-bookings");
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <aside
        className="profile-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="profile-header-row">
          <button className="profile-back-btn" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <span className="profile-header-title">Profile</span>
        </div>

        {/* User card */}
        <div className="profile-user-card">
          <div className="profile-avatar-circle">{initial}</div>
          <div className="profile-user-text">
            <div className="profile-user-name">
              {userName || "Guest User"}
            </div>
            {formattedPhone && (
              <div className="profile-user-phone">{formattedPhone}</div>
            )}
          </div>
        </div>

        {/* Bookings section */}
        <div className="profile-section">
          <div className="profile-section-title">Bookings</div>
          <button
            className="profile-row"
            onClick={handleViewBookings}
          >
            <div className="profile-row-left">
              <span className="profile-row-icon">📋</span>
              <span className="profile-row-label">View all bookings</span>
            </div>
            <ChevronRight size={18} className="profile-row-arrow" />
          </button>
        </div>

        {/* Support section */}
        <div className="profile-section">
          <div className="profile-section-title">Support</div>
          <button className="profile-row">
            <div className="profile-row-left">
              <span className="profile-row-icon">💬</span>
              <span className="profile-row-label">Chat with us</span>
            </div>
            <ChevronRight size={18} className="profile-row-arrow" />
          </button>
        </div>

        {/* More section */}
        <div className="profile-section">
          <div className="profile-section-title">More</div>

          <button className="profile-row">
            <div className="profile-row-left">
              <span className="profile-row-icon">📜</span>
              <span className="profile-row-label">Terms & Conditions</span>
            </div>
            <ChevronRight size={18} className="profile-row-arrow" />
          </button>

          <button className="profile-row">
            <div className="profile-row-left">
              <span className="profile-row-icon">🔒</span>
              <span className="profile-row-label">Privacy Policy</span>
            </div>
            <ChevronRight size={18} className="profile-row-arrow" />
          </button>
        </div>

        {/* Logout */}
        <button className="profile-logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </aside>
    </div>
  );
};

export default ProfilePanel;
