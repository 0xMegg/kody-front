"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useThemeOptional } from "@/lib/theme/ThemeContext";
import type { ThemeName } from "@/lib/theme/types";
import {
  mockCurrentUser,
  canSeeAdminUsers,
  getInitials,
  roleLabels,
} from "@/lib/auth/mock-session";

const themeOptions: { name: ThemeName; label: string }[] = [
  { name: "linear", label: "Linear" },
  { name: "notion", label: "Notion" },
  { name: "supabase", label: "Supabase" },
];

export default function TopBar() {
  const themeCtx = useThemeOptional();
  const user = mockCurrentUser;
  const showAdminLink = canSeeAdminUsers(user);
  const initials = getInitials(user);

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutToast, setLogoutToast] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

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

      {/* Right: user menu + prototype badge + theme switcher or variant link */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--k-space-md)" }}>
        {/* User menu */}
        <div ref={userMenuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "1px solid var(--k-border)",
              borderRadius: "var(--k-radius-sm)",
              padding: "2px 8px 2px 2px",
              cursor: "pointer",
              color: "var(--k-text)",
              fontSize: "var(--k-font-size-sm)",
            }}
          >
            <span
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
              {initials}
            </span>
            <span style={{ fontWeight: 500 }}>{user.displayName}</span>
            <span style={{ fontSize: 10, color: "var(--k-text-muted)" }}>
              {userMenuOpen ? "▲" : "▼"}
            </span>
          </button>

          {userMenuOpen && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                minWidth: 240,
                backgroundColor: "var(--k-surface)",
                border: "1px solid var(--k-border)",
                borderRadius: "var(--k-radius-md)",
                boxShadow: "var(--k-dropdown-shadow)",
                zIndex: 100,
                overflow: "hidden",
                fontSize: "var(--k-font-size-sm)",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  borderBottom: "1px solid var(--k-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--k-text)" }}>
                  {user.displayName}
                </span>
                <span style={{ color: "var(--k-text-muted)", fontSize: 12 }}>
                  {user.email}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    marginTop: 4,
                  }}
                >
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "1px 6px",
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 500,
                        color: "var(--k-badge-info)",
                        backgroundColor: "var(--k-badge-info-bg)",
                      }}
                    >
                      {roleLabels[role]}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    marginTop: 6,
                    fontSize: 10,
                    color: "var(--k-text-subtle)",
                  }}
                >
                  F1 mock-only · 백엔드 세션 없음
                </span>
              </div>

              <Link
                href="/profile"
                onClick={() => setUserMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  color: "var(--k-text)",
                  textDecoration: "none",
                }}
              >
                내 프로필
              </Link>

              {showAdminLink && (
                <Link
                  href="/admin/users"
                  onClick={() => setUserMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    color: "var(--k-text)",
                    textDecoration: "none",
                  }}
                >
                  사용자 관리
                </Link>
              )}

              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  setLogoutToast(true);
                  window.setTimeout(() => setLogoutToast(false), 2400);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  background: "transparent",
                  border: "none",
                  borderTop: "1px solid var(--k-border)",
                  color: "var(--k-text)",
                  fontSize: "var(--k-font-size-sm)",
                  cursor: "pointer",
                }}
              >
                로그아웃 (mock)
              </button>
            </div>
          )}
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
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
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
              <span style={{ fontSize: 10 }}>{themeDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {themeDropdownOpen && (
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
                      setThemeDropdownOpen(false);
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

      {logoutToast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            padding: "10px 14px",
            backgroundColor: "var(--k-surface)",
            border: "1px solid var(--k-border)",
            borderRadius: "var(--k-radius-md)",
            boxShadow: "var(--k-dropdown-shadow)",
            fontSize: 12,
            color: "var(--k-text)",
            zIndex: 200,
          }}
        >
          F1 mock-only · 로그아웃은 백엔드 세션 연결 이후 슬라이스에서 처리됩니다
        </div>
      )}
    </header>
  );
}
