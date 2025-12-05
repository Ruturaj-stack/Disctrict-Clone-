import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";
import toast from "react-hot-toast";

const AuthModal = () => {
  const { isModalOpen, closeAuthModal, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!isLogin && !name) {
      toast.error("Please enter your name");
      return;
    }

    // Mock login/signup
    const userData = {
      name: isLogin ? "Ruturaj" : name,
      email: email,
      avatar: "https://i.pravatar.cc/150?u=" + email
    };

    login(userData);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    closeAuthModal();
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeAuthModal}>×</button>
        <h2>{isLogin ? "Log in" : "Sign up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Log in" : "Create account"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "New to District? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
