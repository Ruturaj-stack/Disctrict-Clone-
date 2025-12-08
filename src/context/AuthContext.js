// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const PHONE_KEY = "district_phone";
  const NAME_KEY = "district_name";

  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // Login Popup

  // Restore login state
  useEffect(() => {
    const storedPhone = localStorage.getItem(PHONE_KEY);
    const storedName = localStorage.getItem(NAME_KEY);

    if (storedPhone) {
      setUserPhone(storedPhone);
      setIsLoggedIn(true);
    }

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Called after OTP success
  const login = (phone) => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    localStorage.setItem(PHONE_KEY, phone);

    let name = localStorage.getItem(NAME_KEY);
    if (!name) {
      name = window.prompt("Enter your name");
      if (name && name.trim()) {
        name = name.trim();
        setUserName(name);
        localStorage.setItem(NAME_KEY, name);
      }
    } else {
      setUserName(name);
    }

    setIsModalOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserPhone("");
    setUserName("");
    localStorage.removeItem(PHONE_KEY);
    localStorage.removeItem(NAME_KEY);
  };

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userPhone,
        userName,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
        isModalOpen,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
