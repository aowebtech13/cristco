import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function useThemeSettings() {
  const [layoutWidth, setLayoutWidth] = useLocalStorage("layoutWidth", "full");
  const [menuStyle, setMenuStyle] = useLocalStorage("menuStyle", "menu-click");
  const [menuPosition, setMenuPosition] = useLocalStorage(
    "menuPosition",
    "menu-fixed"
  );
  const [headerPosition, setHeaderPosition] = useLocalStorage(
    "headerPosition",
    "header-fixed"
  );
  const [loader, setLoader] = useLocalStorage("loader", "on");
  const [menuColor, setMenuColor] = useLocalStorage("menuColor", "161326");
  const [headerColor, setHeaderColor] = useLocalStorage("headerColor", "fff");
  const [primaryColor, setPrimaryColor] = useLocalStorage(
    "primaryColor",
    "C0FAA0"
  );
  const [backgroundColor, setBackgroundColor] = useLocalStorage(
    "backgroundColor",
    "FFFFFF"
  );

  const settings = {
    layoutWidth,
    menuStyle,
    menuPosition,
    headerPosition,
    loader,
    menuColor,
    headerColor,
    primaryColor,
    backgroundColor,
  };

  useEffect(() => {
    const layout = document.querySelector(".layout-wrap");
    const body = document.body;

    if (!layout || !body) return;

    layout.classList.toggle("layout-width-boxed", layoutWidth === "boxed");

    layout.classList.toggle("menu-style-icon", menuStyle === "icon-hover");
    layout.classList.toggle(
      "menu-style-icon-default",
      menuStyle === "icon-default"
    );
    if (menuStyle === "menu-click") {
      layout.classList.remove("menu-style-icon", "menu-style-icon-default");
    }

    layout.classList.toggle(
      "menu-position-scrollable",
      menuPosition === "menu-scrollable"
    );
    layout.classList.toggle(
      "header-position-scrollable",
      headerPosition === "header-scrollable"
    );
    layout.classList.toggle("loader-off", loader === "off");

    layout.setAttribute("data-menu-background", `colors-menu-${menuColor}`);
    layout.setAttribute("data-colors-header", `colors-header-${headerColor}`);
    layout.setAttribute("data-theme-primary", `theme-primary-${primaryColor}`);
    body.setAttribute(
      "data-theme-background",
      `theme-background-${backgroundColor}`
    );
  }, [
    layoutWidth,
    menuStyle,
    menuPosition,
    headerPosition,
    loader,
    menuColor,
    headerColor,
    primaryColor,
    backgroundColor,
  ]);

  const updateSetting = (key, value) => {
    switch (key) {
      case "layoutWidth":
        return setLayoutWidth(value);
      case "menuStyle":
        return setMenuStyle(value);
      case "menuPosition":
        return setMenuPosition(value);
      case "headerPosition":
        return setHeaderPosition(value);
      case "loader":
        return setLoader(value);
      case "menuColor":
        return setMenuColor(value);
      case "headerColor":
        return setHeaderColor(value);
      case "primaryColor":
        return setPrimaryColor(value);
      case "backgroundColor":
        return setBackgroundColor(value);
      default:
        break;
    }
  };

  return { settings, updateSetting };
}
