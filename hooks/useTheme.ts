import { useEffect, useState } from "react";

export function useSystemTheme() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Detect system theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Set the theme based on the initial system preference
    setTheme(systemTheme.matches ? "dark" : "light");

    // Listen for changes in the system's theme
    systemTheme.addEventListener("change", updateTheme);

    // Clean up the event listener on unmount
    return () => systemTheme.removeEventListener("change", updateTheme);
  }, []);

  return theme;
}
