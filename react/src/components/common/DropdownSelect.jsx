import React, { useEffect, useRef, useState } from "react";

const defaultOptions = [
  {
    label: "Dash Coin",

    thumbnail: "images/item/dashcoin.svg",
  },
  {
    label: "Bit Coin",

    thumbnail: "images/item/bitcoin.svg",
  },
];

const DropdownSelect = ({
  options = defaultOptions,
  parentClass = " image-select center w-100",
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(options[1]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false);
    onChange(item);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Run your close logic
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={"dropdown bootstrap-select" + " " + parentClass}
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      {/* Toggle Button */}
      <button
        type="button"
        className="btn dropdown-toggle btn-light"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              {selected.thumbnail ? (
                <img
                  src={selected.thumbnail}
                  alt={selected.label}
                  style={{ width: 20, marginRight: 8 }}
                />
              ) : (
                ""
              )}
              {selected.label}
            </div>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="dropdown-menu show"
          style={{
            maxHeight: 339,
            overflow: "hidden",
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 9999,
            width: "100%",
            transform: "translateY(4px)",
            display: "block",
          }}
        >
          <div
            className="inner show"
            role="listbox"
            tabIndex={-1}
            style={{ maxHeight: 323, overflowY: "auto" }}
          >
            <ul className="dropdown-menu inner show" role="presentation">
              {options.map((item, index) => (
                <li
                  key={index}
                  className={
                    item.label === selected.label ? "selected active" : ""
                  }
                >
                  <a
                    role="option"
                    className="dropdown-item"
                    tabIndex={0}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="text">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.label}
                          style={{ width: 20, marginRight: 8 }}
                        />
                      ) : (
                        ""
                      )}
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
