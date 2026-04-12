"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "대시보드", href: "/supabase" },
  { label: "주문", href: "/supabase/orders" },
  { label: "거래처", href: "/supabase/accounts" },
  { label: "출고", href: "/supabase/shipments" },
  { label: "재고", href: "/supabase/inventory" },
  { label: "수금", href: "/supabase/payments" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 256,
        minWidth: 256,
        height: "100vh",
        backgroundColor: "var(--s-bg-sub)",
        borderRight: "1px solid var(--s-border)",
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
          borderBottom: "1px solid var(--s-border)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--s-brand)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--s-text)",
          }}
        >
          KODY OMS
        </span>
        <span
          style={{
            fontSize: 10,
            color: "var(--s-text-subtle)",
            letterSpacing: "0.05em",
          }}
        >
          supabase
        </span>
      </div>

      {/* Section label */}
      <div
        style={{
          padding: "16px 16px 4px",
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--s-text-subtle)",
        }}
      >
        메뉴
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 8px" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/supabase" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                height: 34,
                padding: "0 8px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "var(--s-brand)" : "var(--s-text-muted)",
                backgroundColor: isActive ? "var(--s-bg-raise)" : "transparent",
                textDecoration: "none",
                transition: "background-color 120ms ease-out",
                boxShadow: isActive
                  ? "inset 2px 0 0 var(--s-brand)"
                  : "none",
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
