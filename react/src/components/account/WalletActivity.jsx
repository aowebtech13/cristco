import { useState } from "react";
import WalletActivityChart from "../charts/WalletActivityChart";

export default function WalletActivity() {
  const timeOptions = ["Week", "Month", "Year"];
  const [activeOption, setActiveOption] = useState("Week");

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
                <div className="f14-regular text-Gray mb-12">Today</div>
                <ul className="list-wallet-activity">
                  <li>
                    <div className="wallet-activity-item">
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
                            ATM Cash withdrawal
                          </a>
                        </div>
                        <div className="f12-medium text-Gray">06:24:45 AM</div>
                      </div>
                      <div className="price f14-bold">- $201.50</div>
                      <div className="status f12-bold text-Salmon">
                        Completed
                      </div>
                    </div>
                  </li>
                  <li>
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
                            ATM Cash withdrawal
                          </a>
                        </div>
                        <div className="f12-medium text-Gray">06:24:45 AM</div>
                      </div>
                      <div className="price f14-bold">- $201.50</div>
                      <div className="status f12-bold text-YellowGreen">
                        Completed
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="f14-regular text-Gray mb-12">24 August</div>
                <ul className="list-wallet-activity mb-27">
                  <li>
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
                        <a href="" className="f14-bold mb-2">
                          ATM Cash withdrawal
                        </a>
                        <div className="f12-medium text-Gray">06:24:45 AM</div>
                      </div>
                      <div className="price f14-bold">- $201.50</div>
                      <div className="status f12-bold text-Salmon">
                        Completed
                      </div>
                    </div>
                  </li>
                </ul>
                <a href="#" className="tf-button f12-bold w-100">
                  View All
                  <i className="icon icon-send" />
                </a>
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
