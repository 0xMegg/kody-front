"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navIcons: Record<string, React.ReactNode> = {
  대시보드: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  ),
  주문: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="1.5" width="10" height="13" rx="1.5" />
      <line x1="5.5" y1="5" x2="10.5" y2="5" />
      <line x1="5.5" y1="7.5" x2="10.5" y2="7.5" />
      <line x1="5.5" y1="10" x2="8.5" y2="10" />
    </svg>
  ),
  거래처: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
      <circle cx="11.5" cy="5.5" r="1.8" />
      <path d="M14.5 14c0-2 -1.3-3.5-3-3.5" />
    </svg>
  ),
  출고: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="1" y="4" width="10" height="8" rx="1" />
      <path d="M11 7h2.5l1.5 2.5V12h-4" />
      <circle cx="4" cy="13" r="1.5" />
      <circle cx="12.5" cy="13" r="1.5" />
    </svg>
  ),
  재고: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 1.5L14 5v6l-6 3.5L2 11V5l6-3.5z" />
      <path d="M8 8.5V15" />
      <path d="M2 5l6 3.5L14 5" />
    </svg>
  ),
  수금: (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <path d="M1.5 7h13" />
      <rect x="3.5" y="9" width="3" height="1.5" rx="0.5" />
    </svg>
  ),
};

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
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--k-brand)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--k-text)",
          }}
        >
          KODY OMS
        </span>
        <span
          style={{
            fontSize: 10,
            color: "var(--k-text-subtle)",
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
          color: "var(--k-text-subtle)",
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
                gap: 8,
                height: 34,
                padding: "0 8px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "var(--k-brand)" : "var(--k-text-muted)",
                backgroundColor: isActive ? "var(--k-bg-raise)" : "transparent",
                textDecoration: "none",
                transition: "background-color 120ms ease-out",
                boxShadow: isActive
                  ? "inset 2px 0 0 var(--k-brand)"
                  : "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {navIcons[item.label]}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
