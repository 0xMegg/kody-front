"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "대시보드", href: "/notion", icon: "📊" },
  { label: "주문", href: "/notion/orders", icon: "📝" },
  { label: "거래처", href: "/notion/accounts", icon: "👥" },
  { label: "출고", href: "/notion/shipments", icon: "📦" },
  { label: "재고", href: "/notion/inventory", icon: "🏬" },
  { label: "수금", href: "/notion/payments", icon: "💳" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 240,
        minWidth: 240,
        height: "100vh",
        backgroundColor: "var(--n-bg-sub)",
        borderRight: "1px solid var(--n-border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--n-text)",
            fontFamily:
              "'Source Serif 4', 'Iowan Old Style', ui-serif, Georgia, serif",
          }}
        >
          KODY OMS
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--n-text-subtle)",
            backgroundColor: "var(--n-bg-hover)",
            padding: "2px 6px",
            borderRadius: 3,
          }}
        >
          Notion
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "4px 8px" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/notion" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 32,
                padding: "0 10px",
                borderRadius: 3,
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "var(--n-text)" : "var(--n-text-muted)",
                backgroundColor: isActive
                  ? "var(--n-bg-hover)"
                  : "transparent",
                textDecoration: "none",
                transition: "background-color 180ms ease",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
