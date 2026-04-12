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
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            borderBottom: "1px solid var(--n-border)",
            backgroundColor: "var(--n-bg)",
            fontSize: 13,
          }}
        >
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
        </header>
        {/* Main content */}
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  );
}
