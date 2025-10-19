import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Accounts = () => {
  const { darkMode } = useContext(AuthContext);

  const accounts = [
    { type: "Savings Account", number: "**** 1234", balance: "$12,580" },
    { type: "Checking Account", number: "**** 5678", balance: "$7,320" },
    { type: "Credit Card", number: "**** 9012", balance: "$2,400 Due" },
  ];

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
        <h2 className="fw-bold mb-4">Your Accounts</h2>

        <div className="row g-4">
          {accounts.map((acc, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div
                className="p-4 rounded-4 shadow-sm h-100"
                style={{
                  backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                  boxShadow: darkMode
                    ? "0 2px 8px rgba(255,255,255,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                <h5 className="fw-semibold mb-1">{acc.type}</h5>
                <p className="text-muted mb-2">{acc.number}</p>
                <h4 className="fw-bold">{acc.balance}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Accounts;
