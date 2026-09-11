import React, { useState } from "react";
import { Link } from "react-router-dom";

import DropdownSelect from "../common/DropdownSelect";
import TabWidget1 from "./TabWidget1";
import TabWidget2 from "./TabWidget2";
export default function Component() {
  const [activeShowPass1, setActiveShowPass1] = useState(false);
  const [activeShowPass2, setActiveShowPass2] = useState(false);
  return (
    <div className="main-content-wrap">
      <div className="tf-container">
        <div className="mb-40">
          <h4 className="mb-24">Iconography</h4>
          <div className="flex flex-wrap row-gap-16 gap36 items-center f-20">
            <span className="icon-send1" />
            <span className="icon-sms" />
            <span className="icon-check" />
            <span className="icon-back" />
            <span className="icon-next" />
            <span className="icon-view" />
            <span className="icon-menu" />
            <span className="icon-swap-horizontal" />
            <span className="icon-bitcoin-btc" />
            <span className="icon-calling" />
            <span className="icon-category" />
            <span className="icon-close-square" />
            <span className="icon-dash" />
            <span className="icon-ethereum" />
            <span className="icon-facebook" />
            <span className="icon-litecoinltc" />
            <span className="icon-message-text" />
            <span className="icon-notification" />
            <span className="icon-search-normal" />
            <span className="icon-setting" />
            <span className="icon-tick-square" />
            <span className="icon-wallet" />
            <span className="icon-arrow-down" />
            <span className="icon-arrow-left" />
            <span className="icon-arrow-right" />
            <span className="icon-arrow-swap" />
            <span className="icon-arrow-up" />
            <span className="icon-category1" />
            <span className="icon-dash1" />
            <span className="icon-document" />
            <span className="icon-edit" />
            <span className="icon-hide" />
            <span className="icon-google" />
            <span className="icon-gps" />
            <span className="icon-login" />
            <span className="icon-message-text1" />
            <span className="icon-minus" />
            <span className="icon-more" />
            <span className="icon-mouse-square" />
            <span className="icon-notification1" />
            <span className="icon-paper" />
            <span className="icon-person" />
            <span className="icon-receive-square" />
            <span className="icon-search-normal1" />
            <span className="icon-send" />
            <span className="icon-setting1" />
            <span className="icon-setting-5" />
            <span className="icon-sms-tracking" />
            <span className="icon-sort" />
            <span className="icon-wallet1" />
            <span className="icon-add" />
            <span className="icon-two-arrow" />
            <span className="icon-mastercard" />
          </div>
        </div>
        <div className="mb-40">
          <h4 className="mb-24">Component</h4>
          <div className="grid-3-col">
            <form className="form-search">
              <fieldset className="name">
                <input
                  type="text"
                  placeholder="Type to search …"
                  className="show-search style-1"
                  name="name"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="button-submit">
                <button className="" type="submit">
                  <i className="icon-search-normal1" />
                </button>
              </div>
            </form>
            <div className="flex gap24 justify-center">
              <div className="popup-wrap message type-header">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="header-item f14-regular text-Black">
                      <i className="icon-sms" />
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end has-content"
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
                          <div className="text-tiny desc">
                            Interested in this loads?
                          </div>
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
                          <div className="text-tiny desc">
                            Okay...Do we have a deal?
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link
                        to={`/message`}
                        className="tf-button style-1 f12-bold w-100"
                      >
                        View All
                        <i className="icon icon-send" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="popup-wrap noti type-header">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="header-item f14-regular text-Black">
                      <i className="icon-notification1" />
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end has-content"
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
                            Morbi sapien massa, ultricies at rhoncus at,
                            ullamcorper nec diam
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
                          <div className="body-title-2">
                            Account has been verified
                          </div>
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
                          <div className="body-title-2">
                            Order shipped successfully
                          </div>
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
            </div>
            <div>
              <div className="popup-wrap user type-header justify-content-start">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
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
                          Jonathan
                        </span>
                        <span className="f14-regular text-Gray">Admin</span>
                      </span>
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end has-content"
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
            </div>
            <div className="dropdown default text-end">
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

            <DropdownSelect parentClass="image-select center w-100" />
            <div className="tf-select">
              <select className="w-100">
                <option>Weekly (2023)</option>
                <option>Bit Coin</option>
              </select>
            </div>
            <TabWidget1 />
            <TabWidget2 />

            <div>
              <a href="#" className="tf-button f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div>
              <a href="#" className="tf-button style-1 f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div>
              <a href="#" className="tf-button style-default f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div>
              <a href="#" className="tf-button style-2 f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div>
              <a href="#" className="tf-button style-3 f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div>
              <a href="#" className="tf-button style-4 f12-bold w-100">
                View All
                <i className="icon icon-send" />
              </a>
            </div>
            <div className="tf-cart-checkbox">
              <div className="tf-checkbox-wrapp">
                <input
                  className="checkbox-item"
                  type="checkbox"
                  name="transaction_checkbox"
                />
                <div>
                  <i className="icon-check" />
                </div>
              </div>
              <div className="f12-medium text-break" data-title="Rank : ">
                #1
              </div>
            </div>
            <div className="tf-cart-checkbox">
              <div className="tf-checkbox-wrapp">
                <input
                  className="checkbox-item"
                  type="checkbox"
                  name="transaction_checkbox"
                  defaultChecked=""
                />
                <div>
                  <i className="icon-check" />
                </div>
              </div>
              <div className="f12-medium text-break" data-title="Rank : ">
                #1
              </div>
            </div>
            <div className="flex items-center gap8">
              <svg
                width={11}
                height={8}
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.49424 1.17906L1.39781 6.53594C1.14622 6.86495 1.38082 7.33967 1.795 7.33967L9.98785 7.33967C10.402 7.33967 10.6366 6.86495 10.385 6.53594L6.2886 1.17906C6.08848 0.917356 5.69437 0.917356 5.49424 1.17906Z"
                  fill="#2BC155"
                />
              </svg>
              <svg
                width={10}
                height={8}
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.28896 6.82094L9.38539 1.46406C9.63698 1.13505 9.40239 0.660332 8.98821 0.660332L0.795353 0.660334C0.381175 0.660334 0.146582 1.13505 0.398173 1.46406L4.4946 6.82094C4.69473 7.08264 5.08884 7.08264 5.28896 6.82094Z"
                  fill="#FD7972"
                />
              </svg>
            </div>
            <div className="flex items-center gap8">
              <input
                className="tf-check flex-shrink-0"
                type="checkbox"
                defaultChecked=""
              />
              <input className="tf-check flex-shrink-0" type="checkbox" />
            </div>
            <div className="flex items-center gap8">
              <div className="box-status bg-YellowGreen">
                <i className="icon icon-check" />
                <span className="font-poppins">COMPLETED</span>
              </div>
              <div className="box-status bg-LightGray">
                <span className="font-poppins">PENDING</span>
              </div>
              <div className="box-status bg-LightGray type-red">
                <span className="font-poppins">CANCELED</span>
              </div>
            </div>
            <div className="flex gap6 items-center">
              <svg
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM12.8003 12.4165C13.042 12.6582 13.042 13.0582 12.8003 13.2998C12.6753 13.4248 12.517 13.4832 12.3587 13.4832C12.2003 13.4832 12.042 13.4248 11.917 13.2998L10.0003 11.3832L8.08366 13.2998C7.95866 13.4248 7.80033 13.4832 7.64199 13.4832C7.48366 13.4832 7.32533 13.4248 7.20033 13.2998C6.95866 13.0582 6.95866 12.6582 7.20033 12.4165L9.11699 10.4998L7.20033 8.58317C6.95866 8.3415 6.95866 7.9415 7.20033 7.69984C7.44199 7.45817 7.84199 7.45817 8.08366 7.69984L10.0003 9.6165L11.917 7.69984C12.1587 7.45817 12.5587 7.45817 12.8003 7.69984C13.042 7.9415 13.042 8.3415 12.8003 8.58317L10.8837 10.4998L12.8003 12.4165Z"
                  fill="#FD7972"
                />
              </svg>
              <div className="f14-regular">Identify Verification</div>
            </div>
            <div className="flex gap6 items-center">
              <svg
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM13.9837 8.58317L9.25866 13.3082C9.14199 13.4248 8.98366 13.4915 8.81699 13.4915C8.65033 13.4915 8.49199 13.4248 8.37533 13.3082L6.01699 10.9498C5.77533 10.7082 5.77533 10.3082 6.01699 10.0665C6.25866 9.82484 6.65866 9.82484 6.90033 10.0665L8.81699 11.9832L13.1003 7.69984C13.342 7.45817 13.742 7.45817 13.9837 7.69984C14.2253 7.9415 14.2253 8.33317 13.9837 8.58317Z"
                  fill="#2BC155"
                />
              </svg>
              <div className="f14-regular">Enable Anti-phising Code</div>
            </div>
            <div>
              <input
                className="flex-grow bg-Gainsboro"
                type="text"
                placeholder="Enter your name"
                name="name"
                tabIndex={0}
                defaultValue=""
                aria-required="true"
                required
              />
            </div>
            <div>
              <input
                className="flex-grow bg-Gainsboro"
                type="text"
                placeholder="Enter your name"
                name="name"
                tabIndex={0}
                defaultValue="Jonatham Smith"
                aria-required="true"
                required
              />
            </div>
            <div>
              <input
                className="flex-grow bg-Gainsboro"
                type="email"
                placeholder="Enter your email address"
                name="email"
                tabIndex={0}
                defaultValue=""
                aria-required="true"
                required
              />
            </div>
            <div>
              <input
                className="flex-grow bg-Gainsboro"
                type="email"
                placeholder="Enter your email address"
                name="email"
                tabIndex={0}
                defaultValue="keplamdusa@gmail.com"
                aria-required="true"
                required
              />
            </div>
            <fieldset className="password">
              <input
                className="password-input bg-Gainsboro"
                type={activeShowPass1 ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                tabIndex={0}
                defaultValue=""
                aria-required="true"
                required
              />
              <span
                className={`show-pass ${activeShowPass1 && "active"}`}
                onClick={() => setActiveShowPass1((pre) => !pre)}
              >
                <i className="icon-view view" />
                <i className="icon-hide hide" />
              </span>
            </fieldset>
            <fieldset className="password">
              <input
                className="password-input bg-Gainsboro"
                type={activeShowPass2 ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                tabIndex={0}
                defaultValue={12345}
                aria-required="true"
                required
              />
              <span
                className={`show-pass ${activeShowPass2 && "active"}`}
                onClick={() => setActiveShowPass2((pre) => !pre)}
              >
                <i className="icon-view view" />
                <i className="icon-hide hide" />
              </span>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
