import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, darkMode, toggleMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbarPaths = ["/", "/login", "/register"];
  if (hideNavbarPaths.includes(location.pathname)) return null;

  const navbarClass = darkMode
    ? "navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm"
    : "navbar navbar-expand-lg navbar-light bg-white shadow-sm";

  const gradientStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #1f1f1f, #2b2b2b)"
      : "linear-gradient(135deg, #ffffff, #f8f9fa)",
    transition: "all 0.4s ease",
  };

  const navLinks = [
    { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/transactions", icon: "bi-credit-card", label: "Transactions" },
    { to: "/accounts", icon: "bi-wallet2", label: "Accounts" },
    { to: "/settings", icon: "bi-gear", label: "Settings" },
  ];

  return (
    <nav className={navbarClass} style={gradientStyle}>
      <div className="container-fluid px-3 py-2">
        {/* Brand */}
        <Link
          to="/dashboard"
          className={`navbar-brand fw-bold ${
            darkMode ? "text-info" : "text-primary"
          }`}
          style={{ fontSize: "1.4rem", letterSpacing: "0.5px" }}
        >
          NeoBank
        </Link>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i
            className={`bi bi-list ${
              darkMode ? "text-light" : "text-dark"
            } fs-4`}
          ></i>
        </button>

        {/* Collapsible Nav */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map(({ to, icon, label }) => (
              <li className="nav-item mx-1" key={to}>
                <Link
                  to={to}
                  className={`nav-link rounded-pill px-3 py-1 ${
                    location.pathname === to
                      ? darkMode
                        ? "bg-info text-dark fw-semibold"
                        : "bg-primary text-white fw-semibold"
                      : darkMode
                      ? "text-light"
                      : "text-dark"
                  }`}
                  style={{ fontSize: "0.95rem", transition: "all 0.3s ease" }}
                >
                  <i className={`bi ${icon} me-2`}></i>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side buttons */}
          <div className="d-flex align-items-center gap-3 ms-lg-auto">
            {/* Dark Mode Toggle */}
            <button
              className={`btn ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } rounded-circle d-flex align-items-center justify-content-center`}
              style={{ width: "34px", height: "34px", transition: "0.3s" }}
              onClick={toggleMode}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-sun-fill text-warning" : "bi-moon-stars-fill"
                }`}
                style={{ fontSize: "1rem" }}
              ></i>
            </button>

            {/* Logout Button */}
            <button
              className="btn btn-outline-danger rounded-pill px-2 py-1 d-flex align-items-center"
              style={{
                fontSize: "1rem",
                gap: "4px",
                transition: "all 0.3s ease",
              }}
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
