import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const [showDD, setShowDD] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDD(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDD(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="header-grid">
        <Link to="/login" className="tf-button style-1 f12-bold">
          Sign In
        </Link>
        <Link to="/register" className="tf-button style-default f12-bold">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="popup-wrap user type-header" ref={dropdownRef}>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          onClick={() => setShowDD((pre) => !pre)}
          type="button"
        >
          <span className="header-user wg-user">
            <span className="image">
              <img
                alt=""
                src="/images/avatar/user-1.png"
                width={256}
                height={256}
              />
            </span>
            <span className="content flex flex-column">
              <span className="label-02 text-Black name">
                {user?.name || "User"}
              </span>
              <span className="f14-regular text-Gray">
                {user?.email || ""}
              </span>
            </span>
          </span>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end has-content ${
            showDD ? "show" : ""
          } `}
          style={{ position: "absolute", right: "0px" }}
          aria-labelledby="dropdownMenuButton3"
        >
          <li>
            <Link to={`/account`} className="user-item">
              <div className="body-title-2">Account</div>
            </Link>
          </li>
          <li>
            <a href="#" className="user-item">
              <div className="body-title-2">Inbox</div>
              <div className="number">27</div>
            </a>
          </li>
          <li>
            <Link to={`/transaction`} className="user-item">
              <div className="body-title-2">Transaction</div>
            </Link>
          </li>
          <li>
            <Link to={`/settings`} className="user-item">
              <div className="body-title-2">Setting</div>
            </Link>
          </li>
          <li>
            <Link to={`/crypto`} className="user-item">
              <div className="body-title-2">Crypto</div>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="user-item"
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div className="body-title-2">Log out</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
