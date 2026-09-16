import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import { italianBanks } from "@/data/italianBanks";

const formatNumber = (num) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);

export default function Withdraw() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    amount: "",
    bank_name: "",
    bank_account_holder: "",
    bank_account_number: "",
    account_type: "checking",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);

  const balance = user?.balance ?? 0;

  useEffect(() => {
    // Pre-fill bank details from the user's saved profile
    if (user) {
      setFormData((prev) => ({
        ...prev,
        bank_name: user.bank_name || "",
        bank_account_holder: user.bank_account_holder || "",
        bank_account_number: user.bank_account_number || "",
        account_type: user.account_type || "checking",
      }));
    }

    // Fetch existing withdrawals
    api
      .get("/withdrawals")
      .then(({ data }) => {
        setWithdrawals(data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch withdrawals:", error);
      })
      .finally(() => {
        setLoadingWithdrawals(false);
      });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) < 5) {
      newErrors.amount = "Minimum withdrawal amount is $5";
    }

    if (parseFloat(formData.amount) > balance) {
      newErrors.amount = "Amount exceeds available balance";
    }

    if (!formData.bank_name) {
      newErrors.bank_name = "Please select a bank";
    }

    if (!formData.bank_account_holder.trim()) {
      newErrors.bank_account_holder = "Account holder name is required";
    }

    if (!formData.bank_account_number.trim()) {
      newErrors.bank_account_number = "Account number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/withdraw", {
        amount: parseFloat(formData.amount),
        method: formData.bank_name,
        bank_name: formData.bank_name,
        bank_account_holder: formData.bank_account_holder,
        bank_account_number: formData.bank_account_number,
        account_type: formData.account_type,
      });

      setSuccessMessage(response.data.message || "Withdrawal request submitted successfully!");
      updateUser(response.data.user);

      // Reset form
      setFormData({
        amount: "",
        bank_name: "",
        bank_account_holder: "",
        bank_account_number: "",
        account_type: "checking",
      });

      // Refresh withdrawals list
      api
        .get("/withdrawals")
        .then(({ data }) => {
          setWithdrawals(data || []);
        })
        .catch((error) => {
          console.error("Failed to fetch withdrawals:", error);
        });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit withdrawal request. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-YellowGreen";
      case "rejected":
        return "bg-red";
      case "pending":
      default:
        return "bg-LightGray";
    }
  };

  return (
    <div className="main-content-wrap withdraw-page">
      <div className="tf-container">
        <div className="flex justify-between items-center mb-24 mt-24">
          <h6>Withdraw Funds</h6>
          <Link to="/transaction" className="tf-button style-2 f12-bold">
            <i className="icon icon-arrow-left" />
            Back to Transactions
          </Link>
        </div>

        {/* Balance Card */}
        <div className="wg-card style-1 bg-blue-1 bg-6 mb-24">
          <div className="flex items-center gap8">
            <i className="icon-wallet1 text-White" style={{ fontSize: "24px" }} />
            <div className="f12-bold text-White">Available Balance</div>
          </div>
          <div className="content">
            <h4 className="mb-0 text-White">{formatNumber(balance)}</h4>
          </div>
        </div>

        {/* Alerts */}
        {serverError && (
          <div className="auth-alert auth-alert-error" style={{ marginBottom: 24 }}>
            <i className="icon-error" />
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success" style={{ marginBottom: 24 }}>
            <i className="icon-check" />
            {successMessage}
          </div>
        )}

        <div className="row">
          {/* Withdrawal Form */}
          <div className="col-lg-6">
            <div className="wg-card">
              <h6 className="mb-16">Withdrawal Request</h6>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-24">
                  <label className="form-label">Amount (USD)</label>
                  <input
                    type="number"
                    name="amount"
                    className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="5"
                    step="0.01"
                  />
                  {errors.amount && (
                    <div className="form-error">{errors.amount}</div>
                  )}
                  <p className="f12-medium text-Gray mt-2">
                    Minimum withdrawal: $5.00 | Available: {formatNumber(balance)}
                  </p>
                </div>

                <div className="form-group mb-24">
                  <label className="form-label">Select Bank (Italy)</label>
                  <select
                    name="bank_name"
                    className={`form-control ${errors.bank_name ? "is-invalid" : ""}`}
                    value={formData.bank_name}
                    onChange={handleChange}
                  >
                    <option value="">-- Select a bank --</option>
                    {italianBanks.map((bank) => (
                      <option key={bank.id} value={bank.name}>
                        {bank.name} {bank.bic ? `(${bank.bic})` : ""}
                      </option>
                    ))}
                  </select>
                  {errors.bank_name && (
                    <div className="form-error">{errors.bank_name}</div>
                  )}
                </div>

                <div className="form-group mb-24">
                  <label className="form-label">Account Holder Name</label>
                  <input
                    type="text"
                    name="bank_account_holder"
                    className={`form-control ${errors.bank_account_holder ? "is-invalid" : ""}`}
                    placeholder="Enter account holder name"
                    value={formData.bank_account_holder}
                    onChange={handleChange}
                  />
                  {errors.bank_account_holder && (
                    <div className="form-error">{errors.bank_account_holder}</div>
                  )}
                </div>

                <div className="form-group mb-24">
                  <label className="form-label">Account Number / IBAN</label>
                  <input
                    type="text"
                    name="bank_account_number"
                    className={`form-control ${errors.bank_account_number ? "is-invalid" : ""}`}
                    placeholder="Enter account number or IBAN"
                    value={formData.bank_account_number}
                    onChange={handleChange}
                  />
                  {errors.bank_account_number && (
                    <div className="form-error">{errors.bank_account_number}</div>
                  )}
                </div>

                <div className="form-group mb-24">
                  <label className="form-label">Account Type</label>
                  <select
                    name="account_type"
                    className="form-control"
                    value={formData.account_type}
                    onChange={handleChange}
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div className="flex gap16">
                  <button
                    type="submit"
                    className="tf-button style-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Submit Withdrawal"}
                  </button>
                  <Link to="/account" className="tf-button style-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div className="col-lg-6">
            <div className="wg-card">
              <h6 className="mb-16">Recent Withdrawals</h6>
              {loadingWithdrawals ? (
                <div className="text-center py-4">
                  <div className="spinner" style={{ margin: "0 auto" }} />
                </div>
              ) : withdrawals.length === 0 ? (
                <p className="f12-medium text-Gray">No withdrawal requests yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Bank</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.slice(0, 10).map((w) => (
                        <tr key={w.id}>
                          <td>{w.id}</td>
                          <td>{formatNumber(w.amount)}</td>
                          <td>{w.bank_name || w.method}</td>
                          <td>
                            <span
                              className={`box-status ${getStatusClass(w.status)}`}
                            >
                              {w.status?.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {new Date(w.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
