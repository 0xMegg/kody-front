import { Source_Serif_4 } from "next/font/google";
import "./_design/tokens.css";
import Sidebar from "@/lib/components/Sidebar";
import TopBar from "@/lib/components/TopBar";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
});

const navItems = [
  { label: "대시보드", href: "/notion", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>📊</span> },
  { label: "주문", href: "/notion/orders", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>📝</span> },
  { label: "거래처", href: "/notion/accounts", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>👥</span> },
  { label: "출고", href: "/notion/shipments", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>📦</span> },
  { label: "재고", href: "/notion/inventory", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>🏬</span> },
  { label: "수금", href: "/notion/payments", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>💳</span> },
];

const notionHeader = (
  <>
    <span
      style={{
        fontSize: 15,
        fontWeight: 600,
        color: "var(--k-text)",
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
        color: "var(--k-text-subtle)",
        backgroundColor: "var(--k-bg-hover)",
        padding: "2px 6px",
        borderRadius: 3,
      }}
    >
      Notion
    </span>
  </>
);

export default function NotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={sourceSerif.variable} style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        navItems={navItems}
        header={notionHeader}
        basePath="/notion"
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        {/* Main content */}
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  );
}
