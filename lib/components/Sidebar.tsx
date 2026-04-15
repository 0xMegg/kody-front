"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  header: React.ReactNode;
  basePath: string;
  sectionLabel?: string;
}

export default function Sidebar({
  navItems,
  header,
  basePath,
  sectionLabel,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "var(--k-sidebar-width)",
        minWidth: "var(--k-sidebar-width)",
        height: "100vh",
        backgroundColor: "var(--k-bg-sub)",
        borderRight: "1px solid var(--k-border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: "var(--k-sidebar-logo-height)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: "var(--k-sidebar-logo-border)",
        }}
      >
        {header}
      </div>

      {/* Optional section label */}
      {sectionLabel && (
        <div
          style={{
            padding: "16px 16px 4px",
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--k-text-subtle)",
          }}
        >
          {sectionLabel}
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "var(--k-sidebar-nav-padding)" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== basePath && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: "var(--k-sidebar-nav-item-height)",
                padding: "0 8px",
                borderRadius: "var(--k-radius-sm)",
                fontSize: "var(--k-sidebar-nav-font-size)",
                fontWeight: isActive
                  ? "var(--k-sidebar-active-weight)"
                  : 400,
                color: isActive
                  ? "var(--k-sidebar-active-color)"
                  : "var(--k-sidebar-inactive-color)",
                backgroundColor: isActive
                  ? "var(--k-sidebar-active-bg)"
                  : "transparent",
                boxShadow: isActive
                  ? "var(--k-sidebar-active-shadow)"
                  : "none",
                textDecoration: "none",
                transition: "var(--k-transition-fast)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
