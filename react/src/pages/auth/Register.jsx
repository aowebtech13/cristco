import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Register || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    referral_code: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      navigate("/dashboard-boxed", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, hyphens, and underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/register", formData);
      login(response.user, response.access_token);
      navigate("/verify-email", { replace: true });
    } catch (error) {
      if (error.errors) {
        const fieldErrors = {};
        Object.entries(error.errors).forEach(([field, messages]) => {
          fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(fieldErrors);
      }
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Sign up to get started with Critso</p>
            </div>

            {serverError && (
              <div className="auth-alert auth-alert-error">
                <i className="icon-error" />
                {serverError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullname" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  {errors.fullname && (
                    <div className="form-error">{errors.fullname}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="form-error">{errors.username}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="form-error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="form-error">{errors.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="referral_code" className="form-label">
                  Referral Code <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="referral_code"
                  name="referral_code"
                  className="form-control"
                  placeholder="Enter referral code if you have one"
                  value={formData.referral_code}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
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
                  {errors.password && (
                    <div className="form-error">{errors.password}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirmation" className="form-label">
                    Confirm Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="password_confirmation"
                      name="password_confirmation"
                      className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                      placeholder="Repeat password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
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
                  {errors.password_confirmation && (
                    <div className="form-error">{errors.password_confirmation}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
