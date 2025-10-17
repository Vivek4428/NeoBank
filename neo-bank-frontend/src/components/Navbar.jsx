import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, darkMode, toggleMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navbarClass = darkMode
    ? "navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm"
    : "navbar navbar-expand-lg navbar-light bg-white shadow-sm";

  const gradientStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #1f1f1f, #2b2b2b)"
      : "linear-gradient(135deg, #ffffff, #f8f9fa)",
    transition: "all 0.4s ease",
  };

  return (
    <>
      <nav className={navbarClass} style={gradientStyle}>
        <div className="container-fluid px-3 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            <i className="bi bi-list fs-5"></i>
          </button>

          <span
            className={`navbar-brand fw-bold ${
              darkMode ? "text-info" : "text-primary"
            }`}
            style={{ fontSize: "1.4rem", letterSpacing: "0.5px" }}
          >
            NeoBank
          </span>

          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } rounded-circle d-flex align-items-center justify-content-center`}
              style={{ width: "40px", height: "40px" }}
              onClick={toggleMode}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-sun-fill text-warning" : "bi-moon-stars-fill"
                }`}
                style={{ fontSize: "1.1rem" }}
              ></i>
            </button>

            <button
              className="btn btn-outline-danger rounded-pill px-3"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`offcanvas offcanvas-start ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5
            className={`offcanvas-title fw-bold ${
              darkMode ? "text-info" : "text-primary"
            }`}
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
            {[
              { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
              { to: "/transactions", icon: "bi-credit-card", label: "Transactions" },
              { to: "/accounts", icon: "bi-wallet2", label: "Accounts" },
              { to: "/settings", icon: "bi-gear", label: "Settings" },
            ].map(({ to, icon, label }) => (
              <li className="nav-item mb-2" key={to}>
                <Link
                  to={to}
                  className={`nav-link rounded-pill py-2 px-3 ${
                    location.pathname === to
                      ? darkMode
                        ? "bg-info text-dark fw-semibold"
                        : "bg-primary text-white fw-semibold"
                      : "text-reset"
                  }`}
                >
                  <i className={`bi ${icon} me-2`}></i>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
