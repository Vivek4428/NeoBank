import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CompleteRegistrationPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: user?.username || "",
    accountType: "Savings",
    initialDeposit: "",
    chequebookRequired: false,
    emailAlerts: true,
    smsAlerts: false,
    dob: "",
    gender: "",
    phone: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    panNumber: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails({
      ...details,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/update-details", details);
      alert("Registration completed successfully!");
      navigate("/login");
    } catch (err) {
      alert("Failed to complete registration. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #20c997, #6610f2)",
        overflowY: "auto",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "700px",
          borderRadius: "20px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Complete Your Registration
        </h3>
        <p className="text-center text-muted mb-4">
          Please provide additional details to open your NeoBank account.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Account Details */}
          <h5 className="fw-semibold text-secondary">Account Details</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Account Type</label>
              <select
                className="form-select rounded-pill"
                name="accountType"
                value={details.accountType}
                onChange={handleChange}
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Initial Deposit (₹)</label>
              <input
                type="number"
                className="form-control rounded-pill"
                name="initialDeposit"
                value={details.initialDeposit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="chequebookRequired"
              checked={details.chequebookRequired}
              onChange={handleChange}
            />
            <label className="form-check-label">Chequebook Required</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="emailAlerts"
              checked={details.emailAlerts}
              onChange={handleChange}
            />
            <label className="form-check-label">Email Alerts</label>
          </div>
          <div className="form-check form-check-inline mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="smsAlerts"
              checked={details.smsAlerts}
              onChange={handleChange}
            />
            <label className="form-check-label">SMS Alerts</label>
          </div>

          {/* Personal Details */}
          <h5 className="fw-semibold text-secondary mt-4">Personal Details</h5>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control rounded-pill"
                name="dob"
                value={details.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <select
                className="form-select rounded-pill"
                name="gender"
                value={details.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="phone"
                value={details.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <h5 className="fw-semibold text-secondary mt-4">Address Details</h5>
          <div className="mb-3">
            <label className="form-label">Current Address</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="currentAddress"
              value={details.currentAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Permanent Address</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="permanentAddress"
              value={details.permanentAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="city"
                value={details.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="state"
                value={details.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="pincode"
                value={details.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Document Section */}
          <h5 className="fw-semibold text-secondary mt-4">Document Details</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Aadhaar Number</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="aadhaarNumber"
                value={details.aadhaarNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">PAN Number</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="panNumber"
                value={details.panNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Security */}
          <h5 className="fw-semibold text-secondary mt-4">Security Question</h5>
          <div className="mb-3">
            <label className="form-label">Choose a Question</label>
            <select
              className="form-select rounded-pill"
              name="securityQuestion"
              value={details.securityQuestion}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>What is your first pet’s name?</option>
              <option>What is your mother’s maiden name?</option>
              <option>What was your first school?</option>
              <option>What is your favorite color?</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Your Answer</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="securityAnswer"
              value={details.securityAnswer}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 fw-semibold mt-3"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}
