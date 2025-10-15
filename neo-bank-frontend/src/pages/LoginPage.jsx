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
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #007bff, #6610f2)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "380px", borderRadius: "20px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>
        <p className="text-center text-muted mb-3">
          Sign in to access your NeoBank account
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
          >
            Login
          </button>
          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <span
              className="text-primary fw-semibold"
              role="button"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
