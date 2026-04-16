import React from "react";
import type { ThemeConfig } from "./types";

/* ── Linear ── */
const linearTheme: ThemeConfig = {
  name: "linear",
  displayName: "Linear",
  fontImports: [],
  fontVariables: [],
  mainPadding: 24,
  header: {
    logoStyle: { fontSize: 13, fontWeight: 600, color: "var(--k-text)" },
    badgeStyle: {
      fontSize: 10,
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "var(--k-brand)",
      backgroundColor: "var(--k-brand-subtle)",
      padding: "2px 6px",
      borderRadius: 4,
    },
    badgeText: "Linear",
  },
};

/* ── Notion ── */
const notionTheme: ThemeConfig = {
  name: "notion",
  displayName: "Notion",
  fontImports: ["Source_Serif_4"],
  fontVariables: ["--font-source-serif"],
  mainPadding: 32,
  header: {
    logoStyle: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--k-text)",
      fontFamily: "'Source Serif 4', 'Iowan Old Style', ui-serif, Georgia, serif",
    },
    badgeStyle: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--k-text-subtle)",
      backgroundColor: "var(--k-bg-hover)",
      padding: "2px 6px",
      borderRadius: 3,
    },
    badgeText: "Notion",
  },
};

/* ── Supabase ── */
const supabaseTheme: ThemeConfig = {
  name: "supabase",
  displayName: "Supabase",
  fontImports: ["JetBrains_Mono"],
  fontVariables: ["--font-jetbrains-mono"],
  rootClassName: "supabase-root",
  sectionLabel: "메뉴",
  mainPadding: 24,
  header: {
    logoStyle: { fontSize: 14, fontWeight: 600, color: "var(--k-text)" },
    badgeStyle: {
      fontSize: 10,
      color: "var(--k-text-subtle)",
      letterSpacing: "0.05em",
    },
    badgeText: "supabase",
    prefix: React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "var(--k-brand)",
        flexShrink: 0,
        display: "inline-block",
      },
    }),
  },
};

/* ── Public API ── */
export const themes: Record<string, ThemeConfig> = {
  linear: linearTheme,
  notion: notionTheme,
  supabase: supabaseTheme,
};

export function getThemeConfig(name: string): ThemeConfig {
  return themes[name] ?? themes.linear;
}
