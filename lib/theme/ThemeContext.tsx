"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ThemeName, ThemeConfig } from "./types";
import { getThemeConfig } from "./themes";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  buildThemeCookie,
} from "./cookie";

interface ThemeContextValue {
  theme: ThemeName;
  config: ThemeConfig;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  initialTheme?: ThemeName;
  children: React.ReactNode;
}

export function ThemeProvider({
  initialTheme = DEFAULT_THEME,
  children,
}: ThemeProviderProps) {
  // Cookie is the SSR source of truth. The Server Component layout reads it
  // and passes the resolved theme as `initialTheme`, so server and client
  // render the same value on first paint and hydration is clean.
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);

  // Post-hydration: localStorage is a client-side mirror only. If it diverged
  // from the cookie-derived theme, overwrite it without changing state.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored !== theme) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch {
      // localStorage unavailable
    }
    // Mount-only reconciliation; theme intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
      document.cookie = buildThemeCookie(next);
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable
    }
  }, []);

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
