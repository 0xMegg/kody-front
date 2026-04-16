"use client";

import { useTheme } from "@/lib/theme/ThemeContext";
import { linearIcons, notionIcons, supabaseIcons } from "@/lib/theme/icons";
import Sidebar from "@/lib/components/Sidebar";
import TopBar from "@/lib/components/TopBar";
import type { ThemeName } from "@/lib/theme/types";

/* ── Unified nav items (basePath = "/") ── */
const pageRoutes = [
  { label: "대시보드", path: "/" },
  { label: "주문", path: "/orders" },
  { label: "거래처", path: "/accounts" },
  { label: "출고", path: "/shipments" },
  { label: "재고", path: "/inventory" },
  { label: "수금", path: "/payments" },
];

const iconMaps: Record<ThemeName, Record<string, React.ReactNode>> = {
  linear: linearIcons,
  notion: notionIcons,
  supabase: supabaseIcons,
};

function buildUnifiedNavItems(theme: ThemeName) {
  const icons = iconMaps[theme];
  return pageRoutes.map(({ label, path }) => ({
    label,
    href: path,
    icon: icons[label],
  }));
}

/* ── Sidebar header per theme ── */
function SidebarHeader({ config }: { config: { header: { prefix?: React.ReactNode; logoStyle: Record<string, string | number>; badgeStyle: Record<string, string | number>; badgeText: string } } }) {
  return (
    <>
      {config.header.prefix}
      <span style={config.header.logoStyle as React.CSSProperties}>
        KODY OMS
      </span>
      <span style={config.header.badgeStyle as React.CSSProperties}>
        {config.header.badgeText}
      </span>
    </>
  );
}

interface MainShellProps {
  fontClasses: string;
  children: React.ReactNode;
}

export default function MainShell({ fontClasses, children }: MainShellProps) {
  const { theme, config } = useTheme();
  const navItems = buildUnifiedNavItems(theme);

  return (
    <div
      data-theme={theme}
      className={`${fontClasses} ${config.rootClassName ?? ""}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--k-bg)",
        color: "var(--k-text)",
      }}
    >
      <Sidebar
        navItems={navItems}
        header={<SidebarHeader config={config} />}
        sectionLabel={config.sectionLabel}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <main style={{ flex: 1, padding: config.mainPadding }}>
          {children}
        </main>
      </div>
    </div>
  );
}
