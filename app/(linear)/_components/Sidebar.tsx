"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "대시보드", href: "/linear" },
  { label: "주문", href: "/linear/orders" },
  { label: "거래처", href: "/linear/accounts" },
  { label: "출고", href: "/linear/shipments" },
  { label: "재고", href: "/linear/inventory" },
  { label: "수금", href: "/linear/payments" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        height: "100vh",
        backgroundColor: "var(--l-bg-sub)",
        borderRight: "1px solid var(--l-border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: "1px solid var(--l-border)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--l-text)",
          }}
        >
          KODY OMS
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--l-brand)",
            backgroundColor: "var(--l-brand-subtle)",
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          Linear
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "8px 8px" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/linear" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                height: 32,
                padding: "0 8px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "var(--l-brand)" : "var(--l-text)",
                backgroundColor: isActive
                  ? "var(--l-brand-subtle)"
                  : "transparent",
                textDecoration: "none",
                transition: "background-color 150ms ease-out",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
