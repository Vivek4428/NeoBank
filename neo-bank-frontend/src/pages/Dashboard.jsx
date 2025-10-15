import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-center">Welcome to NeoBank Dashboard</h3>
        <p className="text-center">
          Hello, <strong>{user?.username}</strong> 👋
        </p>
        <p className="text-center text-muted">Role: {user?.role}</p>
        <div className="text-center mt-4">
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
