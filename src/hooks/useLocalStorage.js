import { useState, useEffect } from "react";

/**
 * useLocalStorage - store React state in localStorage
 * @param {string} key - localStorage key name
 * @param {*} initialValue - default value if nothing in localStorage
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("Error reading localStorage key:", key, err);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting localStorage key:", key, err);
    }
  }, [key, value]);

  return [value, setValue];
}
