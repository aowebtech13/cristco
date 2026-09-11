import { useThemeSettingsContext } from "../common/LayoutWrapper";

const colorSets = {
  menuColor: ["161326", "1E293B", "fff", "3A3043"],
  headerColor: ["fff", "1E293B", "161326", "3A3043"],
  primaryColor: ["C0FAA0", "2377FC", "35988D", "7047D6"],
  backgroundColor: ["FFFFFF", "252E3A", "1E1D2A", "1B2627"],
};

const ThemeHandler = () => {
  const { settings, updateSetting } = useThemeSettingsContext();

  const renderColorItems = (type) =>
    colorSets[type].map((hex) => {
      const isActive = settings[type] === hex;
      return (
        <div
          key={hex}
          className={`item color-${hex} ${isActive ? "active default" : ""}`}
          onClick={() => updateSetting(type, hex)}
          style={{
            backgroundColor: `#${hex}`,
            border: isActive ? "2px solid #000" : "1px solid #ccc",
            width: 30,
            height: 30,
            cursor: "pointer",
            borderRadius: 4,
          }}
        />
      );
    });

  const clearAll = () => {
    updateSetting("menuColor", "161326");
    updateSetting("headerColor", "fff");
    updateSetting("primaryColor", "C0FAA0");
    updateSetting("backgroundColor", "FFFFFF");
  };

  return (
    <>
      <form className="form-theme-color">
        {/* Menu Background */}
        <fieldset className="menu-color">
          <div className="body-title mb-10">Menu Background color</div>
          <div className="select-colors-theme colors-menu mb-10">
            {renderColorItems("menuColor")}
          </div>
          <div className="text-tiny">
            Note: If you want to change menu color dynamically, use the Theme
            Primary color picker below
          </div>
        </fieldset>

        {/* Header Background */}
        <fieldset>
          <div className="body-title mb-10">Header Background color</div>
          <div className="select-colors-theme colors-header mb-10">
            {renderColorItems("headerColor")}
          </div>
          <div className="text-tiny">
            Note: If you want to change header color dynamically, use the Theme
            Primary color picker below
          </div>
        </fieldset>

        {/* Theme Primary Color */}
        <fieldset>
          <div className="body-title mb-10">Theme Primary color</div>
          <div className="select-colors-theme colors-theme-primary mb-10">
            {renderColorItems("primaryColor")}
          </div>
        </fieldset>

        {/* Theme Background Color */}
        <fieldset>
          <div className="body-title mb-10">Theme Background color</div>
          <div className="select-colors-theme colors-theme-background mb-10">
            {renderColorItems("backgroundColor")}
          </div>
        </fieldset>

        {/* Clear Button */}
        <div
          onClick={clearAll}
          className="tf-button style-1 label-01 w-100 cursor-pointer w-full button-clear-select"
        >
          Clear all
        </div>
      </form>{" "}
    </>
  );
};

export default ThemeHandler;
