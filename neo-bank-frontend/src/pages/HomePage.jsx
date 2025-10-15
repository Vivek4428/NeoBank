import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-5 mb-4">Welcome to NeoBank</h1>
      <p className="text-muted text-center w-75">
        A modern digital banking experience built with Spring Boot and React.
      </p>
      <div className="mt-4">
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button className="btn btn-outline-success" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}
