import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-light transition-all"
      : "bg-light text-dark transition-all";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("fullName");
    const role = localStorage.getItem("role");

    if (token && username) {
      setUser({ username, role });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("role", userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, toggleMode }}>
      {children}
    </AuthContext.Provider>
  );
};
