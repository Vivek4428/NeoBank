import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Registration successful! Continue to complete your profile.");
      navigate("/complete-registration");
    } catch (error) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #20c997 0%, #6610f2 50%, #17a2b8 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 10s ease infinite",
      }}
    >
      <div
        className="card border-0 p-5 shadow-lg text-center"
        style={{
          width: "450px",
          borderRadius: "25px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.12)",
          color: "#fff",
        }}
      >
        <h2 className="fw-bold mb-3 text-white">
          Create Account <span>✨</span>
        </h2>
        <p className="text-light mb-4">
          Join <span className="fw-semibold">NeoBank</span> and start your smart
          banking journey
        </p>

        <form onSubmit={handleSubmit}>
          {[
            { name: "fullName", label: "Full Name", placeholder: "John Doe" },
            { name: "username", label: "Username", placeholder: "johndoe123" },
            {
              name: "email",
              label: "Email",
              placeholder: "example@email.com",
              type: "email",
            },
            {
              name: "password",
              label: "Password",
              placeholder: "Enter password",
              type: "password",
            },
          ].map(({ name, label, placeholder, type = "text" }) => (
            <div className="mb-3 text-start" key={name}>
              <label className="fw-semibold text-light mb-2">{label}</label>
              <input
                type={type}
                className="form-control rounded-pill border-light bg-transparent text-light px-3 py-2"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 10px rgba(255,255,255,0.4)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          ))}

          <button
            className="btn btn-light text-primary w-100 rounded-pill fw-semibold py-2 shadow-sm"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="mt-4 mb-0 text-light">
          Already have an account?{" "}
          <span
            className="fw-semibold text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
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
};

export default RegisterPage;
