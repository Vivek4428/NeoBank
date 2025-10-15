import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9 col-12">
          <div className="p-3">
            <h3 className="fw-bold mb-3">
              Welcome, <span className="text-primary">{user?.username || "User"}</span> 👋
            </h3>

            <div className="row g-4">
              <div className="col-md-4">
                <h5>Account Balance</h5>
                <h3 className="fw-bold text-primary mt-2">$12,540.00</h3>
              </div>

              <div className="col-md-4">
                <h5>Last Transaction</h5>
                <p className="mb-1 mt-2">Apple Store - $299.00</p>
                <small className="text-muted">2 hours ago</small>
              </div>

              <div className="col-md-4">
                <h5>Active Cards</h5>
                <h3 className="fw-bold mt-2">3</h3>
              </div>
            </div>

            <div className="mt-5">
              <h5 className="fw-bold mb-3">Recent Transactions</h5>
              <div className="table-responsive shadow rounded-3 bg-white">
                <table className="table mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>14 Oct 2025</td>
                      <td>Amazon Purchase</td>
                      <td className="text-danger">- $59.99</td>
                      <td>
                        <span className="badge bg-danger">Debited</span>
                      </td>
                    </tr>
                    <tr>
                      <td>13 Oct 2025</td>
                      <td>Salary Credit</td>
                      <td className="text-success">+ $2000.00</td>
                      <td>
                        <span className="badge bg-success">Credited</span>
                      </td>
                    </tr>
                    <tr>
                      <td>12 Oct 2025</td>
                      <td>Netflix Subscription</td>
                      <td className="text-danger">- $15.00</td>
                      <td>
                        <span className="badge bg-danger">Debited</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;