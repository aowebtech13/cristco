import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Notifications() {
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
    <div ref={dropdownRef} className="popup-wrap noti type-header">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => setShowDD((pre) => !pre)}
        >
          <span className="header-item">
            <i className="icon-notification1" />
          </span>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end has-content ${
            showDD ? "show" : ""
          } `}
          style={{ position: "absolute", right: "0px" }}
          aria-labelledby="dropdownMenuButton2"
        >
          <li>
            <h6>Notifications</h6>
          </li>
          <li>
            <div className="notifications-item item-1">
              <div className="image">
                <i className="icon-setting-5" />
              </div>
              <div>
                <div className="body-title-2">Discount available</div>
                <div className="text-tiny">
                  Morbi sapien massa, ultricies at rhoncus at, ullamcorper nec
                  diam
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notifications-item item-2">
              <div className="image">
                <i className="icon-person" />
              </div>
              <div>
                <div className="body-title-2">Account has been verified</div>
                <div className="text-tiny">
                  Mauris libero ex, iaculis vitae rhoncus et
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notifications-item item-3">
              <div className="image">
                <i className="icon-message-text1" />
              </div>
              <div>
                <div className="body-title-2">Order shipped successfully</div>
                <div className="text-tiny">
                  Integer aliquam eros nec sollicitudin sollicitudin
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="notifications-item item-4">
              <div className="image">
                <i className="icon-sms-tracking" />
              </div>
              <div>
                <div className="body-title-2">
                  Order pending: <span>ID 305830</span>
                </div>
                <div className="text-tiny">
                  Ultricies at rhoncus at ullamcorper
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link
              to={`/notifications`}
              className="tf-button style-1 f12-bold w-100"
            >
              View All
              <i className="icon icon-send" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
