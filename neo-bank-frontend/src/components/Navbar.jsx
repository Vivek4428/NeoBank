import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMode = () => setDarkMode(!darkMode);

  const navbarClass = darkMode
    ? "navbar-dark bg-secondary"
    : "navbar-light bg-white shadow-sm";

  return (
    <div
      className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ transition: "all 0.3s ease" }}
    >
      {/* Top Navbar */}
      <nav className={`navbar navbar-expand-lg ${navbarClass}`}>
        <div className="container-fluid px-3">
          {/* Mobile Sidebar Toggle */}
          <button
            className="btn btn-outline-primary me-3 d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            <i className="bi bi-list"></i>
          </button>

          <span className="navbar-brand fw-bold text-primary">NeoBank</span>

          <div className="d-flex align-items-center ms-auto gap-2">
            <button
              className={`btn ${
                darkMode ? "btn-light" : "btn-dark"
              } rounded-pill`}
              onClick={toggleMode}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-sun-fill" : "bi-moon-stars-fill"
                }`}
              ></i>{" "}
              {darkMode ? "Light" : "Dark"}
            </button>

            <button
              className="btn btn-outline-danger rounded-pill"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Offcanvas for mobile */}
      <div
        className={`offcanvas offcanvas-start ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title fw-bold text-primary"
            id="sidebarLabel"
          >
            NeoBank
          </h5>
          <button
            type="button"
            className={`btn-close ${darkMode ? "btn-close-white" : ""}`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-3">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item mb-2">
              <Link
                to="/dashboard"
                className={`nav-link rounded-pill ${
                  location.pathname === "/dashboard" ? "active" : "text-reset"
                }`}
              >
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/transactions"
                className={`nav-link rounded-pill ${
                  location.pathname === "/transactions"
                    ? "active"
                    : "text-reset"
                }`}
              >
                <i className="bi bi-credit-card me-2"></i> Transactions
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/accounts"
                className={`nav-link rounded-pill ${
                  location.pathname === "/accounts" ? "active" : "text-reset"
                }`}
              >
                <i className="bi bi-wallet2 me-2"></i> Accounts
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to="/settings"
                className={`nav-link rounded-pill ${
                  location.pathname === "/settings" ? "active" : "text-reset"
                }`}
              >
                <i className="bi bi-gear me-2"></i> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
