import React, { useState } from "react";
import MarketOverviewChart from "../charts/MarketOverviewChart";

export default function MarketOverview() {
  const options = ["Week", "Month", "Year"];
  const [activeOption, setActiveOption] = useState("Month"); // default active

  return (
    <div className="wg-box style-1 bg-Gainsboro shadow-none widget-tabs mb-32">
      <div>
        <div className="title mb-16">
          <div className="label-01">Market Overview</div>
          <ul className="widget-menu-tab">
            {options.map((label) => (
              <li
                key={label}
                className={`item-title f12-medium ${
                  activeOption === label ? "active" : ""
                }`}
                onClick={() => setActiveOption(label)}
              >
                <span className="inner">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <div className="flex gap16 items-center flex-wrap">
            <div className="block-legend">
              <div className="dot bg-Orchid" />
              <div className="f12-medium">
                <span className="text-Gray">Buy</span>{" "}
                <span className="f12-bold">$8,420.50</span>
              </div>
            </div>
            <div className="block-legend">
              <div className="dot bg-Primary" />
              <div className="f12-medium">
                <span className="text-Gray">Sell</span>{" "}
                <span className="f12-bold">$8,420.50</span>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="tf-button style-default gap8 f14-bold text-Orchid"
          >
            <i className="icon icon-receive-square" />
            Get Report
          </a>
        </div>
      </div>
      <div className="widget-content-tab">
        <div className="widget-content-inner">
          <MarketOverviewChart />
        </div>
        <div className="widget-content-inner active">
          <div id="candlestick-4" className="candlestick-chart" />
        </div>
        <div className="widget-content-inner">
          <div id="candlestick-5" className="candlestick-chart" />
        </div>
      </div>
    </div>
  );
}
