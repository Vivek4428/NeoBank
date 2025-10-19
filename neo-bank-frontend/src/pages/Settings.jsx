import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const { darkMode, toggleMode } = useContext(AuthContext);

  return (
    <main
      className="flex-grow-1 p-4"
      style={{
        backgroundColor: darkMode ? "#121212" : "#f8f9fa",
        color: darkMode ? "#f1f1f1" : "#212529",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container-fluid">
        <h2 className="fw-bold mb-4">Settings</h2>

        <div
          className="p-4 rounded-4 shadow-sm"
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            boxShadow: darkMode
              ? "0 2px 8px rgba(255,255,255,0.1)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "600px",
          }}
        >
          <h5 className="fw-semibold mb-3">Appearance</h5>
          <div className="d-flex align-items-center justify-content-between">
            <span>Dark Mode</span>
            <button
              className={`btn ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } rounded-circle d-flex align-items-center justify-content-center`}
              style={{ width: "45px", height: "45px" }}
              onClick={toggleMode}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-sun-fill text-warning" : "bi-moon-stars-fill"
                }`}
                style={{ fontSize: "1.2rem" }}
              ></i>
            </button>
          </div>

          <hr className="my-4" />

          <h5 className="fw-semibold mb-3">Account Preferences</h5>
          <div>
            <p className="mb-1">Email Notifications: Enabled</p>
            <p className="mb-1">Two-Factor Authentication: Active</p>
            <p className="mb-1">Language: English (US)</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
