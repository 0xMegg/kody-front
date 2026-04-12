import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import "./_design/tokens.css";
import Sidebar from "./_components/Sidebar";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
});

export default function NotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={sourceSerif.variable} style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            borderBottom: "1px solid var(--n-border)",
            backgroundColor: "var(--n-bg)",
            fontSize: 13,
            gap: 14,
          }}
        >
          {/* Left: breadcrumb */}
          <span
            style={{
              fontSize: 13,
              color: "var(--n-text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            대시보드
          </span>

          {/* Center: search placeholder */}
          <div
            style={{
              flex: 1,
              maxWidth: 360,
              height: 30,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              border: "1px solid var(--n-border)",
              borderRadius: 3,
              color: "var(--n-text-subtle)",
              fontSize: 13,
            }}
          >
            검색...
          </div>

          {/* Right: avatar + prototype badge + variant link */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* User avatar placeholder */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--n-bg-hover)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--n-text-muted)",
              }}
            >
              U
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--n-text-subtle)",
                backgroundColor: "var(--n-yellow-bg)",
                padding: "2px 8px",
                borderRadius: 3,
              }}
            >
              Prototype
            </span>
            <Link
              href="/"
              style={{
                color: "var(--n-accent)",
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              변형 바꾸기
            </Link>
          </div>
        </header>
        {/* Main content */}
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  );
}
