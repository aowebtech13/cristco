import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div className="spinner" style={{ margin: "0 auto" }} />
            <p style={{ marginTop: 16, color: "var(--Gray)" }}>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, replace: true }}
      />
    );
  }

  // A newly registered user must complete OTP/email verification before they
  // are allowed to reach the dashboard. Redirect them to the verify page.
  if (!user?.email_verified_at) {
    return (
      <Navigate
        to="/verify-email"
        replace
        state={{ from: location, replace: true }}
      />
    );
  }

  return children;
}
