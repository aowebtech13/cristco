import { useEffect, useState } from "react";
import LayoutHandler from "./LayoutHandler";
import ThemeHandler from "./ThemeHandler";
const items = ["Theme Style", "Theme Colors"];

export default function Offcanvas() {
  const [showHandlers, setShowHandlers] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Default to first item
  useEffect(() => {
    setShowHandlers(true);
  }, []);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-modal="true"
      role="dialog"
    >
      <div className="offcanvas-header">
        <h6 id="offcanvasRightLabel">Setting</h6>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div className="widget-tabs">
          <ul className="widget-menu-tab style-1">
            {items.map((title, index) => (
              <li
                key={index}
                className={`item-title ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="inner">
                  <div className="body-title">{title}</div>
                </span>
              </li>
            ))}
          </ul>
          {showHandlers && (
            <div className="widget-content-tab">
              <div
                className="widget-content-inner active"
                style={{ display: activeIndex == 0 ? "block" : "none" }}
              >
                <LayoutHandler />
              </div>

              <div
                className="widget-content-inner active"
                style={{ display: activeIndex == 1 ? "block" : "none" }}
              >
                <ThemeHandler />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
