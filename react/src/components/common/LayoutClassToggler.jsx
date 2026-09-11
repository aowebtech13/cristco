import { useEffect } from "react";

export default function LayoutClassToggler({ classes = [] }) {
  useEffect(() => {
    const layout = document.querySelector(".layout-wrap");

    if (!layout) {
      console.warn("Element .layout-wrap not found.");
      return;
    }

    if (classes.length) {
      classes.forEach((elm, i) => {
        layout.classList.add(elm);
      });
    }

    return () => {
      classes.forEach((elm, i) => {
        layout.classList.remove(elm);
      });
    };
  }, []);

  return null;
}
