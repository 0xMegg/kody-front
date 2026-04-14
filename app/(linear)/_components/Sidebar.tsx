"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const icons: Record<string, React.ReactNode> = {
  대시보드: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  ),
  주문: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 1.5h7a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
      <line x1="5.5" y1="5" x2="10.5" y2="5" />
      <line x1="5.5" y1="7.5" x2="10.5" y2="7.5" />
      <line x1="5.5" y1="10" x2="8.5" y2="10" />
    </svg>
  ),
  거래처: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="5" r="2" />
      <path d="M1.5 13.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <circle cx="11" cy="5" r="1.5" />
      <path d="M14.5 13.5c0-1.7-1.1-3.1-2.7-3.6" />
    </svg>
  ),
  출고: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 10.5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2" />
      <path d="M1.5 10.5l2-6h9l2 6" />
      <circle cx="4.5" cy="13.5" r="0" />
      <circle cx="11.5" cy="13.5" r="0" />
      <line x1="5" y1="4.5" x2="5" y2="2" />
      <polyline points="3.5 3.5 5 2 6.5 3.5" />
    </svg>
  ),
  재고: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 5.5l5.5-3 5.5 3v5l-5.5 3-5.5-3z" />
      <line x1="8" y1="8.5" x2="8" y2="13.5" />
      <line x1="2.5" y1="5.5" x2="8" y2="8.5" />
      <line x1="13.5" y1="5.5" x2="8" y2="8.5" />
    </svg>
  ),
  수금: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
      <line x1="1.5" y1="7" x2="14.5" y2="7" />
      <line x1="4.5" y1="10" x2="7.5" y2="10" />
    </svg>
  ),
};

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
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: "1px solid var(--k-border)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--k-text)",
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
            color: "var(--k-brand)",
            backgroundColor: "var(--k-brand-subtle)",
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
                gap: 8,
                height: 32,
                padding: "0 8px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "var(--k-brand)" : "var(--k-text)",
                backgroundColor: isActive
                  ? "var(--k-brand-subtle)"
                  : "transparent",
                textDecoration: "none",
                transition: "background-color 150ms ease-out",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {icons[item.label]}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
