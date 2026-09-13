import React, { useState, useEffect, useMemo } from "react";
import WalletActivityChart from "../charts/WalletActivityChart";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";

export default function WalletActivity() {
  const timeOptions = ["Week", "Month", "Year"];
  const [activeOption, setActiveOption] = useState("Week");
  const [transactions, setTransactions] = useState([]);
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
      } catch (err) {
        setError("Failed to load wallet activity");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAuthenticated]);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let days = 365;
    if (activeOption === "Week") days = 7;
    else if (activeOption === "Month") days = 30;

    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return transactions.filter((tx) => new Date(tx.created_at) >= cutoff);
  }, [transactions, activeOption]);

  const groupedTransactions = useMemo(() => {
    const groups = {};
    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.created_at);
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const key = isToday ? "Today" : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const getTransactionLabel = (type) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "investment":
        return "Investment";
      case "referral_bonus":
        return "Referral Bonus";
      case "withdrawal_request":
        return "Withdrawal";
      case "cancellation_refund":
        return "Cancellation Refund";
      default:
        return type.replace("_", " ");
    }
  };

  const getTransactionStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-Salmon";
      case "pending":
        return "text-YellowGreen";
      default:
        return "text-Gray";
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (amount) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(absAmount);
    return amount < 0 ? `- ${formatted}` : `+ ${formatted}`;
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="wg-box type-1 bg-Gainsboro widget-tabs style-1 shadow-none mb-32">
          <div className="title">
            <h6>Wallet Activity</h6>
            <ul className="widget-menu-tab mb-0">
              {timeOptions.map((option) => (
                <li
                  key={option}
                  className={`item-title f12-medium ${
                    activeOption === option ? "active" : ""
                  }`}
                  onClick={() => setActiveOption(option)}
                >
                  <span className="inner">{option}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner" style={{ margin: "0 auto" }} />
                  </div>
                ) : error ? (
                  <div className="text-center py-4">
                    <p className="f12-medium text-Gray">{error}</p>
                  </div>
                ) : (
                  Object.entries(groupedTransactions).map(([dateLabel, txs]) => (
                    <div key={dateLabel}>
                      <div className="f14-regular text-Gray mb-12">{dateLabel}</div>
                      <ul className="list-wallet-activity">
                        {txs.map((tx) => (
                          <li key={tx.id}>
                            <div className="wallet-activity-item pb-0">
                              <div className="icon">
                                <img
                                  alt=""
                                  src="/images/item/cash.png"
                                  width={32}
                                  height={33}
                                />
                              </div>
                              <div className="content">
                                <div className="mb-2">
                                  <a href="#" className="f14-bold">
                                    {getTransactionLabel(tx.type)}
                                  </a>
                                </div>
                                <div className="f12-medium text-Gray">
                                  {formatTime(tx.created_at)}
                                </div>
                              </div>
                              <div className="price f14-bold">
                                {formatPrice(tx.amount)}
                              </div>
                              <div
                                className={`status f12-bold ${getTransactionStatusColor(
                                  tx.status
                                )}`}
                              >
                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
                {transactions.length > 0 && (
                  <a href="#" className="tf-button f12-bold w-100">
                    View All
                    <i className="icon icon-send" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="wg-box shadow-none pt-32 pr-32">
          <div className="title">
            <h6>Current Graph</h6>
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

          <WalletActivityChart />
        </div>
      </div>
    </div>
  );
}
