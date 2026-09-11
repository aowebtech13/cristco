import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

export default function Profile() {
  const [showDD, setShowDD] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDD(false); // Run your close logic
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
              <span className="label-02 text-Black name">Jonathan</span>
              <span className="f14-regular text-Gray">Admin</span>
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
            <Link to={`/sign-in`} className="user-item">
              <div className="body-title-2">Log out</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
