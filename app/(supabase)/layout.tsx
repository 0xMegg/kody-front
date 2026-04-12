import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import "./_design/tokens.css";
import Sidebar from "./_components/Sidebar";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

export default function SupabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`supabase-root ${jetbrainsMono.variable}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--s-bg)",
        color: "var(--s-text)",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid var(--s-border)",
            backgroundColor: "var(--s-bg)",
            fontSize: 12,
            gap: 12,
          }}
        >
          {/* Left: breadcrumb */}
          <span
            style={{
              fontSize: 12,
              color: "var(--s-text-muted)",
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
              border: "1px solid var(--s-border)",
              borderRadius: 6,
              color: "var(--s-text-subtle)",
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
                backgroundColor: "var(--s-bg-raise)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--s-text-muted)",
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
                color: "var(--s-warning)",
                backgroundColor: "var(--s-warning-bg)",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Prototype
            </span>
            <Link
              href="/"
              style={{
                color: "var(--s-brand)",
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
