import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, darkMode } = useContext(AuthContext);

  const data = {
    balance: "$42,580",
    income: "$8,430",
    expense: "$6,120",
    accounts: 3,
  };

  const transactions = [
    {
      date: "Oct 14, 2025",
      desc: "Grocery Store",
      category: "Food",
      amount: "-$120.50",
      type: "debit",
    },
    {
      date: "Oct 12, 2025",
      desc: "Salary Deposit",
      category: "Income",
      amount: "+$5,000.00",
      type: "credit",
    },
    {
      date: "Oct 10, 2025",
      desc: "Netflix Subscription",
      category: "Entertainment",
      amount: "-$15.99",
      type: "debit",
    },
  ];

  return (
    <main
      className="flex-grow-1 p-4"
      style={{
        backgroundColor: darkMode ? "#121212" : "#f8f9fa",
        color: darkMode ? "#f8f9fa" : "#212529",
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div className="container-fluid">
        <h2 className="fw-bold mb-4">
          Welcome back 👋,{" "}
          <span className="text-primary">{user?.username || "User"}</span>
        </h2>

        <div className="row g-4">
          {[{
            title: "Total Balance",
            value: data.balance,
            icon: "bi-currency-dollar text-primary",
          },
          {
            title: "Monthly Income",
            value: data.income,
            icon: "bi-graph-up text-success",
          },
          {
            title: "Monthly Expense",
            value: data.expense,
            icon: "bi-graph-down text-danger",
          },
          {
            title: "Active Accounts",
            value: data.accounts,
            icon: "bi-wallet2 text-info",
          }].map((item, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div
                className="p-4 rounded-4 shadow-sm h-100"
                style={{
                  backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                  boxShadow: darkMode
                    ? "0 2px 8px rgba(255,255,255,0.05)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                <h6 className="text-uppercase fw-semibold small mb-2">
                  {item.title}
                </h6>
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="fw-bold mb-0">{item.value}</h4>
                  <i className={`bi ${item.icon} fs-3`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h4 className="fw-bold mb-3">Recent Transactions</h4>
          <div
            className="table-responsive rounded-4 shadow-sm"
            style={{
              backgroundColor: darkMode ? "#1c1c1c" : "#ffffff",
              boxShadow: darkMode
                ? "0 2px 8px rgba(255,255,255,0.05)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              color: darkMode ? "#f8f9fa" : "#212529",
              transition: "all 0.3s ease",
            }}
          >
            <table
              className={`table align-middle mb-0 ${
                darkMode ? "table-dark" : "table-light"
              }`}
            >
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
                    <td
                      className={
                        t.type === "credit" ? "text-success" : "text-danger"
                      }
                    >
                      {t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
