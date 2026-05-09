import type { ThemeName } from "./types";

export const THEME_STORAGE_KEY = "kody-theme";
export const THEME_COOKIE_KEY = "kody-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const DEFAULT_THEME: ThemeName = "linear";
export const VALID_THEMES: readonly ThemeName[] = [
  "linear",
  "notion",
  "supabase",
];

export function resolveThemeName(value: unknown): ThemeName {
  if (typeof value === "string" && VALID_THEMES.includes(value as ThemeName)) {
    return value as ThemeName;
  }
  return DEFAULT_THEME;
}

export function buildThemeCookie(theme: ThemeName): string {
  return `${THEME_COOKIE_KEY}=${theme}; Path=/; SameSite=Lax; Max-Age=${THEME_COOKIE_MAX_AGE}`;
}
