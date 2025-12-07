// src/components/LoginModal.jsx
import { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, onSuccess }) => {
  const [mobile, setMobile] = useState("");

  const handleContinue = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter valid 10 digit number");
      return;
    }

    // Generate random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP:", otp);

    onSuccess(mobile, otp);
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="login-close" onClick={onClose}>×</button>

        <div className="login-header-box">
          <img
            src="https://b.zmtcdn.com/data/edition_assets/17356403299094.png"
            alt="district"
            className="login-logo-img"
          />
          <p className="login-header-text">
            Experience the best in Dining, Movies, and Events.
          </p>
        </div>

        <div className="login-body">
          <h2 className="login-title">Enter your mobile number</h2>
          <p className="login-sub">
            If you don’t have an account yet, we’ll create one for you
          </p>

          <div className="login-number-row">
            <div className="login-cc-box">🇮🇳 +91</div>

            <input
              type="text"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="login-input"
            />
          </div>

          <button className="login-continue-btn" onClick={handleContinue}>
            Continue
          </button>

          <p className="login-tnc">
            By continuing, you agree to our{" "}
            <span>Terms of Service</span> & <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
