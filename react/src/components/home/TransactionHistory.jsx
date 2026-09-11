import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions");
        setTransactions(response.data.transactions?.data || []);
        setStats(response.data.stats || null);
      } catch (err) {
        setError("Failed to load transactions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(absAmount);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return "icon-arrow-down";
      case "investment":
        return "icon-arrow-up";
      case "referral_bonus":
        return "icon-gift";
      case "withdrawal":
        return "icon-arrow-up";
      case "cancellation_refund":
        return "icon-refresh";
      default:
        return "icon-transaction";
    }
  };

  const getTransactionColor = (type, amount) => {
    if (amount > 0) return "text-Green";
    if (amount < 0) return "text-Salmon";
    return "text-Gray";
  };

  if (!isAuthenticated) {
    return (
      <div className="wg-box gap16 bg-YellowGreen">
        <div className="title mb-12">
          <div className="label-01">Transaction History</div>
        </div>
        <div className="text-center py-4">
          <p className="f12-medium text-Gray">
            Please login to view your transaction history
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wg-box gap16 bg-YellowGreen">
        <div className="title mb-12">
          <div className="label-01">Transaction History</div>
        </div>
        <div className="text-center py-4">
          <div className="spinner" style={{ margin: "0 auto" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wg-box gap16 bg-YellowGreen">
        <div className="title mb-12">
          <div className="label-01">Transaction History</div>
        </div>
        <div className="auth-alert auth-alert-error">
          <i className="icon-error" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="wg-box gap16 bg-YellowGreen">
      <div>
        <div className="title mb-12">
          <div className="label-01">Transaction History</div>
          <div className="dropdown default">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="icon-more" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a href="#">This Week</a>
              </li>
              <li>
                <a href="#">This Day</a>
              </li>
            </ul>
          </div>
        </div>

        {stats && (
          <div className="flex gap16 mb-16">
            <div className="wg-card style-1 bg-White p-16">
              <div className="f12-medium text-Gray">Inflows</div>
              <div className="f14-bold text-Green">
                {formatAmount(stats.total_inflows)}
              </div>
            </div>
            <div className="wg-card style-1 bg-White p-16">
              <div className="f12-medium text-Gray">Outflows</div>
              <div className="f14-bold text-Salmon">
                {formatAmount(stats.total_outflows)}
              </div>
            </div>
            <div className="wg-card style-1 bg-White p-16">
              <div className="f12-medium text-Gray">Net Flow</div>
              <div
                className={`f14-bold ${
                  stats.net_flow >= 0 ? "text-Green" : "text-Salmon"
                }`}
              >
                {formatAmount(stats.net_flow)}
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="tab-sell-order">
            <thead>
              <tr>
                <th className="f14-regular">Type</th>
                <th className="f14-regular">Description</th>
                <th className="f14-regular">Date</th>
                <th className="f14-regular text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <span className="f12-medium text-Gray">
                      No transactions found
                    </span>
                  </td>
                </tr>
              ) : (
                transactions.slice(0, 5).map((tx) => (
                  <tr key={tx.id}>
                    <td className="f14-regular">
                      <div className="flex items-center gap8">
                        <i className={getTransactionIcon(tx.type)} />
                        <span className="text-capitalize">
                          {tx.type.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="f14-regular">
                      {tx.description || "-"}
                    </td>
                    <td className="f14-regular text-Gray">
                      {formatDate(tx.created_at)}
                    </td>
                    <td
                      className={`f14-regular text-end ${getTransactionColor(
                        tx.type,
                        tx.amount
                      )}`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {formatAmount(tx.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <a href="/transaction" className="tf-button f12-bold w-100">
        View All
        <i className="icon icon-send" />
      </a>
    </div>
  );
}
