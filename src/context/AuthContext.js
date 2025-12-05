import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("district_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("district_user", JSON.stringify(userData));
    setIsModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("district_user");
  };

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, login, logout, isModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};
