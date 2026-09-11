import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

export default function Messages() {
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
    <div className="popup-wrap message type-header" ref={dropdownRef}>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => setShowDD((pre) => !pre)}
        >
          <span className="header-item">
            <i className="icon-sms" />
          </span>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end has-content ${
            showDD ? "show" : ""
          } `}
          style={{ position: "absolute", right: "0px" }}
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <h6>Message</h6>
          </li>
          <li>
            <div className="message-item w-full wg-user active">
              <div className="image">
                <img
                  alt=""
                  src="/images/avatar/user-1.png"
                  width={256}
                  height={256}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <a href="#" className="body-title name">
                    Cameron Williamson
                  </a>
                  <div className="time">10:13 PM</div>
                </div>
                <div className="text-tiny desc">Hello?</div>
              </div>
            </div>
          </li>
          <li>
            <div className="message-item w-full wg-user active">
              <div className="image">
                <img
                  alt=""
                  src="/images/avatar/user-2.png"
                  width={194}
                  height={193}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <a href="#" className="body-title name">
                    Ralph Edwards
                  </a>
                  <div className="time">10:13 PM</div>
                </div>
                <div className="text-tiny desc">
                  Are you there? interested i this...
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="message-item w-full wg-user active">
              <div className="image">
                <img
                  alt=""
                  src="/images/avatar/user-3.png"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <a href="#" className="body-title name">
                    Eleanor Pena
                  </a>
                  <div className="time">10:13 PM</div>
                </div>
                <div className="text-tiny desc">Interested in this loads?</div>
              </div>
            </div>
          </li>
          <li>
            <div className="message-item w-full wg-user active">
              <div className="image">
                <img
                  alt=""
                  src="/images/avatar/user-4.png"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <a href="#" className="body-title name">
                    Jane Cooper
                  </a>
                  <div className="time">10:13 PM</div>
                </div>
                <div className="text-tiny desc">Okay...Do we have a deal?</div>
              </div>
            </div>
          </li>
          <li>
            <Link to={`/message`} className="tf-button style-1 f12-bold w-100">
              View All
              <i className="icon icon-send" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
