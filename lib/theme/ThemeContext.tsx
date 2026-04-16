"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ThemeName, ThemeConfig } from "./types";
import { getThemeConfig } from "./themes";

const STORAGE_KEY = "kody-theme";
const DEFAULT_THEME: ThemeName = "linear";
const VALID_THEMES: ThemeName[] = ["linear", "notion", "supabase"];

function readStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored as ThemeName)) {
      return stored as ThemeName;
    }
  } catch {
    // localStorage unavailable (SSR or privacy mode)
  }
  return DEFAULT_THEME;
}

interface ThemeContextValue {
  theme: ThemeName;
  config: ThemeConfig;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);

  // Sync data-theme attribute and localStorage on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable
    }
  }, [theme]);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
  };

  const config = getThemeConfig(theme);

  return (
    <ThemeContext value={{ theme, config, setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function useThemeOptional(): ThemeContextValue | null {
  return useContext(ThemeContext);
}
