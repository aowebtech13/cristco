import { useThemeSettingsContext } from "../common/LayoutWrapper";

const LayoutHandler = () => {
  const { settings, updateSetting } = useThemeSettingsContext();

  const clearAll = () => {
    updateSetting("layoutWidth", "full");
    updateSetting("menuStyle", "menu-click");
    updateSetting("menuPosition", "menu-fixed");
    updateSetting("headerPosition", "header-fixed");
    updateSetting("loader", "style-loader-on");
  };
  return (
    <form className="form-theme-style">
      {/* Layout Width */}
      <fieldset className="layout-width">
        <div className="body-title mb-5">Layout width style</div>
        <div className="radio-buttons">
          <div className="item">
            <input
              type="radio"
              id="width-style2"
              name="layoutWidth"
              checked={settings.layoutWidth === "boxed"}
              onChange={() => updateSetting("layoutWidth", "boxed")}
            />
            <label htmlFor="width-style2">
              <div className="body-title">Boxed</div>
            </label>
          </div>
          <div className="item">
            <input
              type="radio"
              id="width-style1"
              name="layoutWidth"
              checked={settings.layoutWidth === "full"}
              onChange={() => updateSetting("layoutWidth", "full")}
            />
            <label htmlFor="width-style1">
              <div className="body-title">Full width</div>
            </label>
          </div>
        </div>
      </fieldset>

      {/* Menu Style */}
      <fieldset className="menu-style">
        <div className="body-title mb-5">Vertical & Horizontal menu style</div>
        <div className="radio-buttons">
          {["menu-click", "icon-hover", "icon-default"].map((val, idx) => (
            <div className="item" key={val}>
              <input
                type="radio"
                id={`menu-style${idx + 1}`}
                name="menuStyle"
                checked={settings.menuStyle === val}
                onChange={() => updateSetting("menuStyle", val)}
              />
              <label htmlFor={`menu-style${idx + 1}`}>
                <div className="body-title">
                  {val.replace("-", " ").replace("menu ", "")}
                </div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Menu Position */}
      <fieldset className="menu-position">
        <div className="body-title mb-5">Menu position</div>
        <div className="radio-buttons">
          {["menu-fixed", "menu-scrollable"].map((val, idx) => (
            <div className="item" key={val}>
              <input
                type="radio"
                id={`menu-position${idx + 1}`}
                name="menuPosition"
                checked={settings.menuPosition === val}
                onChange={() => updateSetting("menuPosition", val)}
              />
              <label htmlFor={`menu-position${idx + 1}`}>
                <div className="body-title">
                  {val.replace("menu-", "").charAt(0).toUpperCase() +
                    val.replace("menu-", "").slice(1)}
                </div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Header Position */}
      <fieldset className="header-position">
        <div className="body-title mb-5">Header positions</div>
        <div className="radio-buttons">
          {["header-fixed", "header-scrollable"].map((val, idx) => (
            <div className="item" key={val}>
              <input
                type="radio"
                id={`header-position${idx + 1}`}
                name="headerPosition"
                checked={settings.headerPosition === val}
                onChange={() => updateSetting("headerPosition", val)}
              />
              <label htmlFor={`header-position${idx + 1}`}>
                <div className="body-title">
                  {val.replace("header-", "").charAt(0).toUpperCase() +
                    val.replace("header-", "").slice(1)}
                </div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Loader */}
      <fieldset className="style-loader">
        <div className="body-title mb-5">Loader</div>
        <div className="radio-buttons">
          {["style-loader-on", "style-loader-off"].map((val, idx) => (
            <div className="item" key={val}>
              <input
                type="radio"
                id={`loader${idx + 1}`}
                name="loader"
                checked={settings.loader === val}
                onChange={() => updateSetting("loader", val)}
              />
              <label htmlFor={`loader${idx + 1}`}>
                <div className="body-title">
                  {val.endsWith("on") ? "Enable" : "Disable"}
                </div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Clear All */}
      <div
        onClick={clearAll}
        className="tf-button style-1 label-01 w-100 cursor-pointer w-full button-clear-select"
      >
        Clear all
      </div>
    </form>
  );
};

export default LayoutHandler;
