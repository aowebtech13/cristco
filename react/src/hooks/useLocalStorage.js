// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
}
