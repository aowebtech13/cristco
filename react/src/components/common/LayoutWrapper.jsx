// components/LayoutWrapper.js

import { createContext, useContext, useEffect } from "react";
import useThemeSettings from "@/hooks/useThemeSettings"; // Or your custom useThemeSettings if already created

// Create context
const ThemeSettingsContext = createContext();

// Custom hook to use context
export const useThemeSettingsContext = () => useContext(ThemeSettingsContext);

export default function LayoutWrapper({ children }) {
  // Use the theme settings hook
  const { settings, updateSetting } = useThemeSettings();

  // Bootstrap import
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm");
    }
  }, []);

  // Remove preloader
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".preload-container")?.remove();
    }, 100);
  }, []);

  return (
    <ThemeSettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ThemeSettingsContext.Provider>
  );
}
