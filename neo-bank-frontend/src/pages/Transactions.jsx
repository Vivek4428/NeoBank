import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Transactions = () => {
  const { darkMode } = useContext(AuthContext);

  const transactions = [
    { date: "Oct 18, 2025", desc: "Amazon Purchase", category: "Shopping", amount: "-$89.99", type: "debit" },
    { date: "Oct 15, 2025", desc: "Freelance Payment", category: "Income", amount: "+$750.00", type: "credit" },
    { date: "Oct 12, 2025", desc: "Electric Bill", category: "Utilities", amount: "-$120.00", type: "debit" },
    { date: "Oct 10, 2025", desc: "Restaurant", category: "Food", amount: "-$45.50", type: "debit" },
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
        <h2 className="fw-bold mb-4">Transactions</h2>

        <div
          className="table-responsive rounded-4 shadow-sm"
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            boxShadow: darkMode
              ? "0 2px 8px rgba(255,255,255,0.1)"
              : "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.desc}</td>
                  <td>{t.category}</td>
                  <td className={t.type === "credit" ? "text-success" : "text-danger"}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
