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
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid var(--l-border)",
            backgroundColor: "var(--l-bg)",
            fontSize: 12,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--l-text-subtle)",
              backgroundColor: "var(--l-warning-bg)",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            Prototype
          </span>
          <Link
            href="/"
            style={{
              color: "var(--l-brand)",
              textDecoration: "none",
              fontSize: 12,
            }}
          >
            변형 바꾸기
          </Link>
        </header>
        {/* Main content */}
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
