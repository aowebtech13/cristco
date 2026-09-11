import React, { useState } from "react";

export default function TabWidget2() {
  const tabs = ["Week", "Month", "Year"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="widget-tabs style-1">
      <ul className="widget-menu-tab mb-0">
        {tabs.map((label, index) => (
          <li
            key={label}
            className={`item-title f12-medium ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="inner">{label}</span>
          </li>
        ))}
      </ul>

      <div className="widget-content-tab">
        {tabs.map((_, index) => (
          <div
            key={index}
            className={`widget-content-inner ${
              activeIndex === index ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
