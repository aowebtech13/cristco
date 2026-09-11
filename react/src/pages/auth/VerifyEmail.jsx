import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Verify Email || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email_verified_at) {
      navigate("/dashboard-boxed", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setCode(numericValue);
    if (errors.code) {
      setErrors((prev) => ({ ...prev, code: "" }));
    }
    setServerError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!code) {
      newErrors.code = "Verification code is required";
    } else if (code.length !== 6) {
      newErrors.code = "Code must be 6 digits";
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
      const response = await api.post("/verify-email-code", {
        email,
        code,
      });

      setSuccessMessage("Email verified successfully! Redirecting...");
      updateUser(response.user);

      setTimeout(() => {
        navigate("/dashboard-boxed", { replace: true });
      }, 1500);
    } catch (error) {
      setServerError(error.message || "Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setServerError("");
    setSuccessMessage("");

    try {
      await api.post("/resend-verification-code", { email });
      setSuccessMessage("Verification code resent! Please check your email.");
      setResendCooldown(60);
    } catch (error) {
      setServerError(error.message || "Failed to resend code. Please try again.");
    }
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <Link to="/" className="auth-logo">
                <img
                  src="/images/logo/logo.svg"
                  alt="Critso"
                  width={120}
                  height={36}
                />
              </Link>
              <h2 className="auth-title">Verify Your Email</h2>
              <p className="auth-subtitle">
                Enter the 6-digit code sent to your email address
              </p>
            </div>

            {serverError && (
              <div className="auth-alert auth-alert-error">
                <i className="icon-error" />
                {serverError}
              </div>
            )}

            {successMessage && (
              <div className="auth-alert auth-alert-success">
                <i className="icon-check" />
                {successMessage}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                    setServerError("");
                  }}
                />
                {errors.email && (
                  <div className="form-error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="code" className="form-label">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className={`form-control auth-code-input ${errors.code ? "is-invalid" : ""}`}
                  placeholder="000000"
                  value={code}
                  onChange={handleChange}
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
                {errors.code && (
                  <div className="form-error">{errors.code}</div>
                )}
                <p className="form-hint">
                  Check your email for the 6-digit verification code
                </p>
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend Code"}
                </button>
              </p>
              <p className="mt-2">
                <Link to="/login">Back to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
