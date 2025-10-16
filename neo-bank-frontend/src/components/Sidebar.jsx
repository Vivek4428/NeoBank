import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ darkMode }) => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { to: "/transactions", label: "Transactions", icon: "bi-credit-card" },
    { to: "/accounts", label: "Accounts", icon: "bi-wallet2" },
    { to: "/settings", label: "Settings", icon: "bi-gear" },
  ];

  return (
    <div
      className={`d-none d-lg-flex flex-column p-3 shadow-sm vh-100 position-fixed ${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      }`}
      style={{
        width: "250px",
        borderRight: darkMode ? "1px solid #2c2c2c" : "1px solid #dee2e6",
        transition: "all 0.4s ease",
      }}
    >
      <div className="d-flex align-items-center mb-4">
        <i
          className={`bi bi-bank2 fs-3 me-2 ${
            darkMode ? "text-info" : "text-primary"
          }`}
        ></i>
        <span className="fs-4 fw-bold">NeoBank</span>
      </div>

      <ul className="nav flex-column gap-1">
        {navItems.map(({ to, label, icon }) => (
          <li key={to} className="nav-item">
            <Link
              to={to}
              className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${
                location.pathname === to
                  ? darkMode
                    ? "bg-info text-dark fw-semibold"
                    : "bg-primary text-white fw-semibold"
                  : darkMode
                  ? "text-light"
                  : "text-dark"
              }`}
              style={{
                transition: "all 0.3s ease",
              }}
            >
              <i className={`bi ${icon} me-2`}></i>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3 border-top small text-center opacity-75">
        <span>© 2025 NeoBank</span>
      </div>
    </div>
  );
};

export default Sidebar;
