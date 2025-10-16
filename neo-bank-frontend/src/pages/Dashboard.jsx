import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12">
          <div className="p-4 rounded shadow-sm bg-body-tertiary">
            <h3 className="fw-bold mb-4">
              Welcome, <span className="text-primary">{user?.username || "User"}</span> 👋
            </h3>

            <div className="row g-4 mb-5">
              {[
                { title: "Account Balance", value: "$12,540.00", color: "text-primary" },
                { title: "Last Transaction", value: "Apple Store - $299.00", time: "2h ago" },
                { title: "Active Cards", value: "3", color: "text-success" },
              ].map((item, i) => (
                <div className="col-md-4" key={i}>
                  <h5>{item.title}</h5>
                  <h4 className={`fw-bold mt-2 ${item.color || ""}`}>{item.value}</h4>
                  {item.time && <small className="text-muted">{item.time}</small>}
                </div>
              ))}
            </div>

            <h5 className="fw-bold mb-3">Recent Transactions</h5>
            <div className="table-responsive shadow-sm rounded bg-white">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "14 Oct 2025",
                      desc: "Amazon Purchase",
                      amount: "- $59.99",
                      status: "Debited",
                      badge: "danger",
                    },
                    {
                      date: "13 Oct 2025",
                      desc: "Salary Credit",
                      amount: "+ $2000.00",
                      status: "Credited",
                      badge: "success",
                    },
                    {
                      date: "12 Oct 2025",
                      desc: "Netflix Subscription",
                      amount: "- $15.00",
                      status: "Debited",
                      badge: "danger",
                    },
                  ].map((tx, i) => (
                    <tr key={i}>
                      <td>{tx.date}</td>
                      <td>{tx.desc}</td>
                      <td className={`fw-semibold text-${tx.badge}`}>{tx.amount}</td>
                      <td>
                        <span className={`badge bg-${tx.badge}`}>{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
