import { tableData } from "@/data/crypto";
import React, { useState, useEffect } from "react";
import CryptoChart from "../charts/CryptoChart";

import DropdownSelect from "../common/DropdownSelect";

export default function Crypto() {
  const [selected, setSelected] = useState([]);
  const [sorted, setSorted] = useState(tableData);
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "asc",
  });

  useEffect(() => {
    sortCryptoData();
  }, [sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig((prev) => ({
      key,
      direction: direction
        ? direction
        : prev.key === key && prev.direction === "asc"
        ? "desc"
        : "asc",
    }));
  };

  const sortCryptoData = () => {
    const sortedData = [...tableData].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setSorted(sortedData);
  };

  return (
    <div className="main-content-wrap">
      <div className="tf-container">
        <div className="topbar-search">
          <form className="form-search flex-grow">
            <fieldset className="name">
              <input
                type="text"
                placeholder="Search"
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
          <div className="right">
            <a href="#" className="tf-button style-2 f12-bold d-md-flex d-none">
              <i className="icon icon-receive-square" />
              Get Report
            </a>
            <div className="dropdown default style-fill">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="icon icon-setting-5" />
                Filter
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li onClick={() => handleSort("name", "asc")}>
                  <a href="#">A - Z</a>
                </li>
                <li onClick={() => handleSort("name", "desc")}>
                  <a href="#">Z - A</a>
                </li>
              </ul>
            </div>

            <DropdownSelect
              options={[{ label: "Newest" }, { label: "Lasted" }]}
              parentClass="image-select center d-md-flex d-none"
            />
            <div>
              <div className="dropdown default">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2918 15.8333C12.2918 17.1 11.2668 18.125 10.0002 18.125C8.7335 18.125 7.7085 17.1 7.7085 15.8333C7.7085 14.5667 8.7335 13.5417 10.0002 13.5417C11.2668 13.5417 12.2918 14.5667 12.2918 15.8333ZM8.9585 15.8333C8.9585 16.4083 9.42516 16.875 10.0002 16.875C10.5752 16.875 11.0418 16.4083 11.0418 15.8333C11.0418 15.2583 10.5752 14.7917 10.0002 14.7917C9.42516 14.7917 8.9585 15.2583 8.9585 15.8333Z"
                        fill="#161326"
                      />
                      <path
                        d="M12.2918 4.16683C12.2918 5.4335 11.2668 6.4585 10.0002 6.4585C8.7335 6.4585 7.7085 5.4335 7.7085 4.16683C7.7085 2.90016 8.7335 1.87516 10.0002 1.87516C11.2668 1.87516 12.2918 2.90016 12.2918 4.16683ZM8.9585 4.16683C8.9585 4.74183 9.42516 5.2085 10.0002 5.2085C10.5752 5.2085 11.0418 4.74183 11.0418 4.16683C11.0418 3.59183 10.5752 3.12516 10.0002 3.12516C9.42516 3.12516 8.9585 3.59183 8.9585 4.16683Z"
                        fill="#161326"
                      />
                      <path
                        d="M12.2918 9.99984C12.2918 11.2665 11.2668 12.2915 10.0002 12.2915C8.7335 12.2915 7.7085 11.2665 7.7085 9.99984C7.7085 8.73317 8.7335 7.70817 10.0002 7.70817C11.2668 7.70817 12.2918 8.73317 12.2918 9.99984ZM8.9585 9.99984C8.9585 10.5748 9.42516 11.0415 10.0002 11.0415C10.5752 11.0415 11.0418 10.5748 11.0418 9.99984C11.0418 9.42484 10.5752 8.95817 10.0002 8.95817C9.42516 8.95817 8.9585 9.42484 8.9585 9.99984Z"
                        fill="#161326"
                      />
                    </svg>
                  </span>
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
          </div>
        </div>

        <div className="table-list-crypto wrap-checkbox">
          <div className="list-crypto-head title-sort">
            <div className="btn-key-sort" onClick={() => handleSort("rank")}>
              {/* Checkbox */}
              <div className="tf-cart-checkbox style-2">
                <div
                  className="tf-checkbox-wrapp"
                  onClick={() =>
                    setSelected((pre) =>
                      pre.length === sorted.length ? [] : sorted
                    )
                  }
                >
                  <input
                    className="total-checkbox"
                    checked={selected.length === sorted.length}
                    type="checkbox"
                    readOnly
                  />
                  <div>
                    <i className="icon-check" />
                  </div>
                </div>
              </div>
              <div className="f12-bold text-White">Rank</div>
              <svg
                width={15}
                height={14}
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.1618 3.9199C7.1618 4.03073 7.12095 4.14158 7.03345 4.22908C6.86428 4.39825 6.58429 4.39825 6.41512 4.22908L4.55428 2.36825L2.69345 4.22908C2.52428 4.39825 2.24428 4.39825 2.07512 4.22908C1.90595 4.05992 1.90595 3.77992 2.07512 3.61075L4.24514 1.44073C4.3268 1.35906 4.43762 1.31242 4.55428 1.31242C4.67095 1.31242 4.7818 1.35906 4.86347 1.44073L7.03345 3.61075C7.11512 3.69825 7.1618 3.80906 7.1618 3.9199Z"
                  fill="white"
                />
                <path
                  d="M4.9917 1.75L4.9917 12.25C4.9917 12.4892 4.79337 12.6875 4.5542 12.6875C4.31503 12.6875 4.1167 12.4892 4.1167 12.25L4.1167 1.75C4.1167 1.51083 4.31503 1.3125 4.5542 1.3125C4.79337 1.3125 4.9917 1.51083 4.9917 1.75Z"
                  fill="white"
                />
                <path
                  d="M13.3161 10.08C13.3161 10.1909 13.2752 10.3017 13.1877 10.3892L11.0177 12.5592C10.9361 12.6409 10.8252 12.6875 10.7086 12.6875C10.5919 12.6875 10.4811 12.6409 10.3994 12.5592L8.22941 10.3892C8.06025 10.22 8.06025 9.94 8.22941 9.77083C8.39858 9.60167 8.67858 9.60167 8.84775 9.77083L10.7086 11.6317L12.5694 9.77083C12.7385 9.60167 13.0186 9.60167 13.1877 9.77083C13.2752 9.8525 13.3161 9.96335 13.3161 10.08Z"
                  fill="white"
                />
                <path
                  d="M11.1401 1.75L11.1401 12.25C11.1401 12.4892 10.9418 12.6875 10.7026 12.6875C10.4635 12.6875 10.2651 12.4892 10.2651 12.25L10.2651 1.75C10.2651 1.51083 10.4635 1.3125 10.7026 1.3125C10.9418 1.3125 11.1401 1.51083 11.1401 1.75Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="btn-key-sort" onClick={() => handleSort("name")}>
              <div className="f12-bold text-White">Coin</div>
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.24038 5.32045L8.57191 0.963819C8.82351 0.634814 8.58891 0.160095 8.17473 0.160095L1.51167 0.160095C1.09749 0.160095 0.862898 0.634814 1.11449 0.96382L4.44602 5.32045C4.64614 5.58215 5.04026 5.58215 5.24038 5.32045Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="btn-key-sort" onClick={() => handleSort("price")}>
              <div className="f12-bold text-White">Last Price</div>
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.24038 5.32045L8.57191 0.963819C8.82351 0.634814 8.58891 0.160095 8.17473 0.160095L1.51167 0.160095C1.09749 0.160095 0.862898 0.634814 1.11449 0.96382L4.44602 5.32045C4.64614 5.58215 5.04026 5.58215 5.24038 5.32045Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="btn-key-sort" onClick={() => handleSort("change")}>
              <div className="f12-bold text-White">Change (24h)</div>
              <svg
                width={15}
                height={14}
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.1618 3.9199C7.1618 4.03073 7.12095 4.14158 7.03345 4.22908C6.86428 4.39825 6.58429 4.39825 6.41512 4.22908L4.55428 2.36825L2.69345 4.22908C2.52428 4.39825 2.24428 4.39825 2.07512 4.22908C1.90595 4.05992 1.90595 3.77992 2.07512 3.61075L4.24514 1.44073C4.3268 1.35906 4.43762 1.31242 4.55428 1.31242C4.67095 1.31242 4.7818 1.35906 4.86347 1.44073L7.03345 3.61075C7.11512 3.69825 7.1618 3.80906 7.1618 3.9199Z"
                  fill="white"
                />
                <path
                  d="M4.9917 1.75L4.9917 12.25C4.9917 12.4892 4.79337 12.6875 4.5542 12.6875C4.31503 12.6875 4.1167 12.4892 4.1167 12.25L4.1167 1.75C4.1167 1.51083 4.31503 1.3125 4.5542 1.3125C4.79337 1.3125 4.9917 1.51083 4.9917 1.75Z"
                  fill="white"
                />
                <path
                  d="M13.3161 10.08C13.3161 10.1909 13.2752 10.3017 13.1877 10.3892L11.0177 12.5592C10.9361 12.6409 10.8252 12.6875 10.7086 12.6875C10.5919 12.6875 10.4811 12.6409 10.3994 12.5592L8.22941 10.3892C8.06025 10.22 8.06025 9.94 8.22941 9.77083C8.39858 9.60167 8.67858 9.60167 8.84775 9.77083L10.7086 11.6317L12.5694 9.77083C12.7385 9.60167 13.0186 9.60167 13.1877 9.77083C13.2752 9.8525 13.3161 9.96335 13.3161 10.08Z"
                  fill="white"
                />
                <path
                  d="M11.1401 1.75L11.1401 12.25C11.1401 12.4892 10.9418 12.6875 10.7026 12.6875C10.4635 12.6875 10.2651 12.4892 10.2651 12.25L10.2651 1.75C10.2651 1.51083 10.4635 1.3125 10.7026 1.3125C10.9418 1.3125 11.1401 1.51083 11.1401 1.75Z"
                  fill="white"
                />
              </svg>
            </div>

            <div
              className="btn-key-sort"
              onClick={() => handleSort("marketCap")}
            >
              <div className="f12-bold text-White">Volume (24h)</div>
              <svg
                width={15}
                height={14}
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.1618 3.9199C7.1618 4.03073 7.12095 4.14158 7.03345 4.22908C6.86428 4.39825 6.58429 4.39825 6.41512 4.22908L4.55428 2.36825L2.69345 4.22908C2.52428 4.39825 2.24428 4.39825 2.07512 4.22908C1.90595 4.05992 1.90595 3.77992 2.07512 3.61075L4.24514 1.44073C4.3268 1.35906 4.43762 1.31242 4.55428 1.31242C4.67095 1.31242 4.7818 1.35906 4.86347 1.44073L7.03345 3.61075C7.11512 3.69825 7.1618 3.80906 7.1618 3.9199Z"
                  fill="white"
                />
                <path
                  d="M4.9917 1.75L4.9917 12.25C4.9917 12.4892 4.79337 12.6875 4.5542 12.6875C4.31503 12.6875 4.1167 12.4892 4.1167 12.25L4.1167 1.75C4.1167 1.51083 4.31503 1.3125 4.5542 1.3125C4.79337 1.3125 4.9917 1.51083 4.9917 1.75Z"
                  fill="white"
                />
                <path
                  d="M13.3161 10.08C13.3161 10.1909 13.2752 10.3017 13.1877 10.3892L11.0177 12.5592C10.9361 12.6409 10.8252 12.6875 10.7086 12.6875C10.5919 12.6875 10.4811 12.6409 10.3994 12.5592L8.22941 10.3892C8.06025 10.22 8.06025 9.94 8.22941 9.77083C8.39858 9.60167 8.67858 9.60167 8.84775 9.77083L10.7086 11.6317L12.5694 9.77083C12.7385 9.60167 13.0186 9.60167 13.1877 9.77083C13.2752 9.8525 13.3161 9.96335 13.3161 10.08Z"
                  fill="white"
                />
                <path
                  d="M11.1401 1.75L11.1401 12.25C11.1401 12.4892 10.9418 12.6875 10.7026 12.6875C10.4635 12.6875 10.2651 12.4892 10.2651 12.25L10.2651 1.75C10.2651 1.51083 10.4635 1.3125 10.7026 1.3125C10.9418 1.3125 11.1401 1.51083 11.1401 1.75Z"
                  fill="white"
                />
              </svg>
            </div>

            <div
              className="btn-key-sort"
              onClick={() => handleSort("percentage")}
            >
              <div className="f12-bold text-White">Graph</div>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 6.4585H2.5C2.15833 6.4585 1.875 6.17516 1.875 5.8335C1.875 5.49183 2.15833 5.2085 2.5 5.2085H17.5C17.8417 5.2085 18.125 5.49183 18.125 5.8335C18.125 6.17516 17.8417 6.4585 17.5 6.4585Z"
                  fill="white"
                />
                <path
                  d="M15 10.625H5C4.65833 10.625 4.375 10.3417 4.375 10C4.375 9.65833 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.65833 15.625 10C15.625 10.3417 15.3417 10.625 15 10.625Z"
                  fill="white"
                />
                <path
                  d="M11.6668 14.7915H8.3335C7.99183 14.7915 7.7085 14.5082 7.7085 14.1665C7.7085 13.8248 7.99183 13.5415 8.3335 13.5415H11.6668C12.0085 13.5415 12.2918 13.8248 12.2918 14.1665C12.2918 14.5082 12.0085 14.7915 11.6668 14.7915Z"
                  fill="white"
                />
              </svg>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z"
                  fill="white"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                  fill="white"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  fill="white"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <table className="list-crypto-content content-sort w-100">
            <tbody>
              {sorted.map((item, i) => (
                <tr
                  key={i}
                  className={`tf-table-item ${
                    selected.includes(item) ? "checked" : ""
                  }`}
                >
                  <td>
                    <div className="tf-cart-checkbox">
                      <div
                        className="tf-checkbox-wrapp"
                        onClick={() =>
                          setSelected((pre) =>
                            pre.includes(item)
                              ? pre.filter((elm) => elm !== item)
                              : [...pre, item]
                          )
                        }
                      >
                        <input
                          className="checkbox-item"
                          type="checkbox"
                          readOnly
                          checked={selected.includes(item)}
                        />
                        <div>
                          <i className="icon-check" />
                        </div>
                      </div>
                      <div
                        className="f12-medium text-break key-sort"
                        data-title="Rank : "
                      >
                        #{item.rank}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="wrap-image style-1">
                      <div className="image">
                        <img alt="" src={item.image} width={20} height={20} />
                      </div>
                      <div className="f12-bold key-sort">{item.name}</div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="f12-bold key-sort"
                      data-title="Last Price : "
                    >
                      ${item.price.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="f12-medium key-sort">
                      {item.change.toLocaleString()}%
                    </div>
                  </td>
                  <td>
                    <div className="f12-medium key-sort">
                      ${item.marketCap.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap6 items-center justify-end">
                      <div className="graph-wrap">
                        <div className="graph-chart">
                          <div
                            id={`column-chart-${item.id}`}
                            className="column-chart"
                          >
                            <CryptoChart />
                          </div>
                        </div>
                        <div className="graph-number">
                          {item.trend === "up" ? (
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
                          ) : (
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
                          )}
                          <div className="f12-medium number key-sort">
                            {item.percentage}%
                          </div>
                        </div>
                      </div>
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z"
                          fill="#A4A4A9"
                          stroke="#A4A4A9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                          fill="#A4A4A9"
                          stroke="#A4A4A9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          fill="#A4A4A9"
                          stroke="#A4A4A9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
