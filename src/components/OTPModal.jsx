import "./OTPModal.css";
import { useState } from "react";

const OTPModal = ({ onClose, onVerify, phone }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 4) {
      alert("Enter valid 4-digit OTP");
      return;
    }
    onVerify();
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <button className="otp-close" onClick={onClose}>×</button>

        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-sub">Enter the 4-digit code sent to <strong>+91 {phone}</strong></p>

        <input
          className="otp-input"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="____"
        />

        <button className="otp-verify-btn" onClick={handleVerify}>
          Verify & Continue
        </button>

        <p className="otp-resend">Didn’t receive code? <span>Resend</span></p>
      </div>
    </div>
  );
};

export default OTPModal;
