import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Forgot Password || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};

const OTP_LENGTH = 7;
const RESEND_COOLDOWN = 60;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Step management: 1 = email, 2 = otp, 3 = new password
  const [step, setStep] = useState(1);

  // Step 1: Email
  const [email, setEmail] = useState("");

  // Step 2: OTP
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentEmail, setOtpSentEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Step 3: New password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Shared state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const otpInputRef = useRef(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (user?.email_verified_at) {
      navigate("/dashboard-boxed", { replace: true });
    }
  }, [user, navigate]);

  // Focus OTP input on step 2
  useEffect(() => {
    if (step === 2 && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const clearErrors = () => setErrors({});
  const clearServerError = () => setServerError("");

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    return "";
  };

  const validateOtp = (value) => {
    if (!value) return "OTP is required";
    if (value.length !== OTP_LENGTH) return `OTP must be ${OTP_LENGTH} digits`;
    if (!/^\d+$/.test(value)) return "OTP must contain only numbers";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
    clearServerError();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(value);
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
    clearServerError();
    setSuccessMessage("");
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
    clearServerError();
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    clearServerError();
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearErrors();
    clearServerError();

    const emailError = validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/forgot-password-otp", { email });
      setOtpSent(true);
      setOtpSentEmail(email);
      setStep(2);
      setSuccessMessage(response.data.message || "Verification code sent to your email.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        error.message ||
        "Failed to send verification code. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearErrors();
    clearServerError();

    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors((prev) => ({ ...prev, otp: otpError }));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/verify-otp", {
        email,
        otp,
      });
      setStep(3);
      setSuccessMessage(response.data.message || "OTP verified! Set your new password.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.otp?.[0] ||
        error.message ||
        "Invalid OTP. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearErrors();
    clearServerError();

    const newPassError = validatePassword(newPassword);
    const confirmPassError =
      newPassword !== confirmPassword ? "Passwords do not match" : "";

    const newErrors = {};
    if (newPassError) newErrors.newPassword = newPassError;
    if (confirmPassError) newErrors.confirmPassword = confirmPassError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/reset-password-with-otp", {
        email,
        otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setSuccessMessage(response.data.message || "Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.otp?.[0] ||
        error.message ||
        "Failed to reset password. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setServerError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/forgot-password-otp", { email });
      setSuccessMessage(response.data.message || "Verification code resent! Please check your email.");
      setResendCooldown(RESEND_COOLDOWN);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend code. Please try again.";
      setServerError(message);
    }
  };

  // Go back from step 2 to step 1
  const handleBackToEmail = () => {
    setStep(1);
    setOtp("");
    setOtpSent(false);
    setOtpSentEmail("");
    setServerError("");
    setSuccessMessage("");
    clearErrors();
  };

  // Render step indicator
  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((s, index) => (
        <React.Fragment key={s}>
          <div
            className={`step-dot ${step === s ? "active" : ""} ${step > s ? "completed" : ""}`}
          >
            {s}
          </div>
          {index < 2 && (
            <div
              className={`step-line ${step > s ? "completed" : ""}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

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
              <h2 className="auth-title">
                {step === 1 && "Forgot Password?"}
                {step === 2 && "Verify Your Identity"}
                {step === 3 && "Set New Password"}
              </h2>
              <p className="auth-subtitle">
                {step === 1 && "Enter your email to receive a reset code"}
                {step === 2 && `Enter the ${OTP_LENGTH}-digit code sent to ${otpSentEmail}`}
                {step === 3 && "Create a strong new password"}
              </p>
            </div>

            {renderStepIndicator()}

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

            {/* Step 1: Email */}
            {step === 1 && (
              <form className="auth-form" onSubmit={handleSendOtp}>
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
                    onChange={handleEmailChange}
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="form-error">{errors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Sending Code...
                    </>
                  ) : (
                    "Send Verification Code"
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <form className="auth-form" onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label htmlFor="otp" className="form-label">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    ref={otpInputRef}
                    className={`form-control auth-code-input ${errors.otp ? "is-invalid" : ""}`}
                    placeholder={`${OTP_LENGTH}-digit code`}
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={OTP_LENGTH}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    disabled={isSubmitting}
                  />
                  {errors.otp && (
                    <div className="form-error">{errors.otp}</div>
                  )}
                  <p className="form-hint">
                    Check your email for the {OTP_LENGTH}-digit verification code
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
                    "Verify Code"
                  )}
                </button>

                <div className="auth-footer" style={{ borderTop: "none", paddingTop: 16, marginTop: 16 }}>
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
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form className="auth-form" onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label htmlFor="new_password" className="form-label">
                    New Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="new_password"
                      name="new_password"
                      className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`icon-${showPassword ? "view" : "hide"}`} />
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="form-error">{errors.newPassword}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm New Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`icon-${showConfirmPassword ? "view" : "hide"}`} />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="form-error">{errors.confirmPassword}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <div className="auth-footer" style={{ borderTop: "none", paddingTop: 16, marginTop: 16 }}>
                  <p>
                    <Link to="/login">Back to Login</Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Step indicator styles */}
      <style>{`
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .step-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: var(--Gray);
          background: var(--Gainsboro);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .step-dot.active {
          background: var(--Primary);
          color: var(--White);
          box-shadow: 0 4px 12px rgba(22, 19, 38, 0.2);
        }
        .step-dot.completed {
          background: #276749;
          color: var(--White);
        }
        .step-line {
          width: 48px;
          height: 3px;
          background: var(--Gainsboro);
          border-radius: 2px;
          transition: background 0.3s ease;
        }
        .step-line.completed {
          background: #276749;
        }
      `}</style>
    </>
  );
}
