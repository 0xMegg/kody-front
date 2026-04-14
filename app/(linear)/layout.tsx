import Link from "next/link";
import "./_design/tokens.css";
import Sidebar from "./_components/Sidebar";

export default function LinearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid var(--k-border)",
            backgroundColor: "var(--k-bg)",
            fontSize: 12,
            gap: 12,
          }}
        >
          {/* Left: breadcrumb */}
          <span
            style={{
              fontSize: 12,
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
              maxWidth: 320,
              height: 28,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              border: "1px solid var(--k-border)",
              borderRadius: 6,
              color: "var(--k-text-subtle)",
              fontSize: 12,
            }}
          >
            검색...
          </div>

          {/* Right: avatar + prototype badge + variant link */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* User avatar placeholder */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: "var(--k-bg-hover)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--k-text-muted)",
              }}
            >
              U
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--k-text-subtle)",
                backgroundColor: "var(--k-warning-bg)",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Prototype
            </span>
            <Link
              href="/"
              style={{
                color: "var(--k-brand)",
                textDecoration: "none",
                fontSize: 12,
              }}
            >
              변형 바꾸기
            </Link>
          </div>
        </header>
        {/* Main content */}
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
