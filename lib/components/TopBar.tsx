"use client";

import { useState } from "react";
import Link from "next/link";
import { useThemeOptional } from "@/lib/theme/ThemeContext";
import type { ThemeName } from "@/lib/theme/types";

const themeOptions: { name: ThemeName; label: string }[] = [
  { name: "linear", label: "Linear" },
  { name: "notion", label: "Notion" },
  { name: "supabase", label: "Supabase" },
];

export default function TopBar() {
  const themeCtx = useThemeOptional();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      style={{
        height: "var(--k-header-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--k-space-lg)",
        borderBottom: "1px solid var(--k-border)",
        backgroundColor: "var(--k-bg)",
        fontSize: "var(--k-font-size-sm)",
        gap: "var(--k-space-md)",
      }}
    >
      {/* Left: breadcrumb */}
      <span
        style={{
          fontSize: "var(--k-font-size-sm)",
          color: "var(--k-text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        대시보드
      </span>

      {/* Center: search placeholder */}
      <div
        style={{
          flex: 1,
          maxWidth: "var(--k-topbar-search-width)",
          height: "var(--k-topbar-search-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--k-space-md)",
          border: "1px solid var(--k-border)",
          borderRadius: "var(--k-radius-sm)",
          color: "var(--k-text-subtle)",
          fontSize: "var(--k-font-size-sm)",
        }}
      >
        검색...
      </div>

      {/* Right: avatar + prototype badge + theme switcher or variant link */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--k-space-md)" }}>
        {/* User avatar placeholder */}
        <div
          style={{
            width: "var(--k-topbar-avatar-size)",
            height: "var(--k-topbar-avatar-size)",
            borderRadius: "50%",
            backgroundColor: "var(--k-topbar-avatar-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--k-topbar-badge-size)",
            fontWeight: 600,
            color: "var(--k-text-muted)",
          }}
        >
          U
        </div>
        <span
          style={{
            fontSize: "var(--k-topbar-badge-size)",
            fontWeight: 500,
            textTransform: "var(--k-topbar-badge-transform)" as React.CSSProperties["textTransform"],
            letterSpacing: "0.08em",
            color: "var(--k-topbar-badge-text)",
            backgroundColor: "var(--k-topbar-badge-bg)",
            padding: "2px var(--k-space-sm)",
            borderRadius: "var(--k-badge-radius)",
          }}
        >
          Prototype
        </span>

        {/* Theme switcher (when inside ThemeProvider) or fallback link */}
        {themeCtx ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                background: "none",
                border: "1px solid var(--k-border)",
                borderRadius: "var(--k-radius-sm)",
                padding: "4px 10px",
                fontSize: "var(--k-font-size-sm)",
                color: "var(--k-brand)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {themeCtx.theme.charAt(0).toUpperCase() + themeCtx.theme.slice(1)}
              <span style={{ fontSize: 10 }}>{dropdownOpen ? "\u25B2" : "\u25BC"}</span>
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  right: 0,
                  minWidth: 120,
                  backgroundColor: "var(--k-surface)",
                  border: "1px solid var(--k-border)",
                  borderRadius: "var(--k-radius-md)",
                  boxShadow: "var(--k-dropdown-shadow)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                {themeOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => {
                      themeCtx.setTheme(opt.name);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 12px",
                      background: themeCtx.theme === opt.name
                        ? "var(--k-bg-hover)"
                        : "transparent",
                      border: "none",
                      textAlign: "left",
                      fontSize: "var(--k-font-size-sm)",
                      color: themeCtx.theme === opt.name
                        ? "var(--k-brand)"
                        : "var(--k-text)",
                      fontWeight: themeCtx.theme === opt.name ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/"
            style={{
              color: "var(--k-brand)",
              textDecoration: "none",
              fontSize: "var(--k-font-size-sm)",
            }}
          >
            변형 바꾸기
          </Link>
        )}
      </div>
    </header>
  );
}
