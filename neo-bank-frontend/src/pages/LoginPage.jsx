import { useState, useContext } from "react";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #007bff 0%, #6610f2 50%, #6f42c1 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 8s ease infinite",
      }}
    >
      <div
        className="card border-0 p-5 shadow-lg text-center"
        style={{
          width: "400px",
          borderRadius: "25px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.12)",
          color: "#fff",
        }}
      >
        <h2 className="fw-bold mb-3 text-white">Welcome Back 👋</h2>
        <p className="text-light mb-4">
          Sign in to your <span className="fw-semibold">NeoBank</span> account
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="fw-semibold text-light mb-2">Username</label>
            <input
              type="text"
              className="form-control rounded-pill border-light bg-transparent text-light px-3 py-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                transition: "0.3s",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(255,255,255,0.4)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div className="mb-4 text-start">
            <label className="fw-semibold text-light mb-2">Password</label>
            <input
              type="password"
              className="form-control rounded-pill border-light bg-transparent text-light px-3 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(255,255,255,0.4)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <button
            type="submit"
            className="btn btn-light text-primary w-100 rounded-pill fw-semibold py-2 shadow-sm"
          >
            Login
          </button>
        </form>

        <p className="mt-4 mb-0 text-light">
          Don’t have an account?{" "}
          <span
            className="fw-semibold text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
