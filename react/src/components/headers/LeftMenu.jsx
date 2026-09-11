import { menuData } from "@/data/menu";
import toggleLeftSidebar from "@/utlis/toggleLeftSidebar";

import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useThemeSettingsContext } from "../common/LayoutWrapper";

export default function LeftMenu() {
  const { settings, updateSetting } = useThemeSettingsContext();

  const [active, setActive] = useState(1);
  const { pathname } = useLocation();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  useEffect(() => {
    menuData.map((menu, i) => {
      if (menu.hasChildren) {
        if (isMenuParentActive(menu.subMenu)) {
          setActive(menu.id);
        }
      }
    });
  }, []);
  const layoutHandler = (pagename) => {
    if (pagename == "Default") {
      updateSetting("layoutWidth", "full");
      updateSetting("menuStyle", "menu-click");
      updateSetting("menuPosition", "menu-fixed");
      updateSetting("headerPosition", "header-fixed");
    } else if (pagename == "Boxed") {
      updateSetting("layoutWidth", "boxed");
    } else if (pagename == "Icon Menu") {
      updateSetting("layoutWidth", "full");

      updateSetting("menuPosition", "menu-fixed");
      updateSetting("headerPosition", "header-fixed");
      updateSetting("menuStyle", "icon-hover");
    } else if (pagename == "Icon & Text") {
      updateSetting("layoutWidth", "full");

      updateSetting("menuPosition", "menu-fixed");
      updateSetting("headerPosition", "header-fixed");
      updateSetting("menuStyle", "icon-default");
    }
  };
  return (
    <div className="section-menu-left">
      <div className="box-logo">
        <Link to={`/`} id="site-logo-inner">
          <img
            className=""
            id="logo_header"
            alt=""
            data-light="/images/logo/logo.svg"
            data-dark="/images/logo/logo-dark.svg"
            src="/images/logo/logo.svg"
            width={120}
            height={36}
          />
        </Link>
        <div className="button-show-hide" onClick={toggleLeftSidebar}>
          <i className="icon-back" />
        </div>
      </div>
      <div className="section-menu-left-wrap">
        <div className="center">
          <div className="center-item">
            <div className="center-heading f14-regular text-Gray menu-heading mb-12">
              Navigation
            </div>
          </div>
          <div className="center-item">
            <ul className="">
              {menuData.map((item, index) => {
                if (item.hasChildren) {
                  return (
                    <li
                      key={index}
                      className={`menu-item has-children ${
                        active === item.id ? "active" : ""
                      }`}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActive((prev) =>
                            prev === item.id ? -1 : item.id
                          );
                        }}
                        className="menu-item-button"
                      >
                        <div className="icon">
                          <i className={item.icon} />
                        </div>
                        <div className="text">{item.title}</div>
                      </a>
                      <ul
                        className="sub-menu"
                        style={{
                          display: active === item.id ? "block" : "none",
                        }}
                      >
                        {item.subMenu.map((sub, i) => (
                          <li
                            key={i}
                            className={`sub-menu-item ${
                              isMenuActive(sub) ? "active" : ""
                            }`}
                          >
                            <Link
                              to={sub.href}
                              onClick={() => layoutHandler(sub.text)}
                            >
                              <div className="text">{sub.text}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                } else {
                  return (
                    <li className={`menu-item`} key={index}>
                      <Link
                        to={item.href}
                        className={`menu-item-button  ${
                          isMenuActive(item) ? "active" : ""
                        } `}
                      >
                        {item.icon === "svg" ? (
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            style={{ color: "#fff", stroke: "#fff" }}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.1428 8.50146V14.2182"
                              stroke="#A4A4A9"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.0317 5.76562V14.2179"
                              stroke="#A4A4A9"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.8572 11.522V14.2178"
                              stroke="#A4A4A9"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.9047 1.6665H6.0952C3.37297 1.6665 1.66663 3.59324 1.66663 6.3208V13.6789C1.66663 16.4064 3.36504 18.3332 6.0952 18.3332H13.9047C16.6349 18.3332 18.3333 16.4064 18.3333 13.6789V6.3208C18.3333 3.59324 16.6349 1.6665 13.9047 1.6665Z"
                              stroke="#A4A4A9"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className="icon">
                            <i className={item.icon} />{" "}
                          </div>
                        )}

                        <div className="text">{item.title}</div>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="image">
            <img alt="" src="/images/item/bot.png" width={70} height={100} />
          </div>
          <div className="content">
            <p className="f12-regular text-White">For more features</p>
            <p className="f12-bold text-White">Contact Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
