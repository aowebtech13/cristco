import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Edit Profile || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "",
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Avatar must be less than 2MB",
        }));
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.username && !/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, hyphens, and underscores";
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
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone || "");
      if (formData.username) {
        submitData.append("username", formData.username);
      }
      if (avatarFile) {
        submitData.append("avatar", avatarFile);
      }

      const response = await api.post("/profile", submitData);

      setSuccessMessage("Profile updated successfully!");
      updateUser(response.data.user);

      setTimeout(() => {
        navigate("/account");
      }, 1500);
    } catch (error) {
      const axiosErrors = error.response?.data?.errors;
      if (axiosErrors) {
        const fieldErrors = {};
        Object.entries(axiosErrors).forEach(([field, messages]) => {
          fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(fieldErrors);
      }
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile. Please try again.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="main-content-wrap">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="wg-profile">
                <div className="dropdown default">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon-more text-White" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                   
                    <li>
                      <Link to={`/settings`}>Setting</Link>
                    </li>
                  </ul>
                </div>
                <div className="image-bg">
                  <img
                    alt=""
                    src="/images/item/bg-profile.png"
                    width={521}
                    height={180}
                  />
                </div>
                <div className="content">
                  <div className="avatar">
                    <img
                      alt=""
                      src={avatarPreview || "/images/avatar/user-2.png"}
                      width={194}
                      height={193}
                    />
                  </div>
                  <h6 className="name mb-2">
                    <a href="#">{user?.name || "User"}</a>
                  </h6>
                  <div className="join-time f12-medium text-Gray">
                    @{user?.username || "username"}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="flex justify-between items-center mb-24 mt-24">
                <h6>Edit Profile</h6>
              </div>

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

              <div className="wg-card">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-24">
                    <label className="form-label">Profile Picture</label>
                    <div className="flex items-center gap24">
                      <div className="avatar-preview">
                        <img
                          src={avatarPreview || "/images/avatar/user-2.png"}
                          alt="Avatar"
                          width={80}
                          height={80}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          className="tf-button style-1"
                          onClick={() => document.getElementById("avatar").click()}
                        >
                          <i className="icon-upload" />
                          Upload New
                        </button>
                        <p className="f12-medium text-Gray mt-2">
                          JPG, PNG or GIF. Max size 2MB
                        </p>
                        {errors.avatar && (
                          <div className="form-error">{errors.avatar}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group mb-24">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="form-error">{errors.name}</div>
                      )}
                    </div>

                    <div className="form-group mb-24">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <div className="form-error">{errors.username}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group mb-24">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="f12-medium text-Gray mt-2">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="form-group mb-24">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="form-error">{errors.phone}</div>
                    )}
                  </div>

                  <div className="flex gap16">
                    <button
                      type="submit"
                      className="tf-button style-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    <Link to="/account" className="tf-button style-3">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
