import Link from "next/link";

export default function TopBar() {
  return (
    <header
      style={{
        height: "var(--k-header-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--k-space-lg)",
        borderBottom: "1px solid var(--k-border)",
        backgroundColor: "var(--k-bg)",
        fontSize: "var(--k-font-size-sm)",
        gap: "var(--k-space-md)",
      }}
    >
      {/* Left: breadcrumb */}
      <span
        style={{
          fontSize: "var(--k-font-size-sm)",
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
          maxWidth: "var(--k-topbar-search-width)",
          height: "var(--k-topbar-search-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--k-space-md)",
          border: "1px solid var(--k-border)",
          borderRadius: "var(--k-radius-sm)",
          color: "var(--k-text-subtle)",
          fontSize: "var(--k-font-size-sm)",
        }}
      >
        검색...
      </div>

      {/* Right: avatar + prototype badge + variant link */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--k-space-md)" }}>
        {/* User avatar placeholder */}
        <div
          style={{
            width: "var(--k-topbar-avatar-size)",
            height: "var(--k-topbar-avatar-size)",
            borderRadius: "50%",
            backgroundColor: "var(--k-topbar-avatar-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--k-topbar-badge-size)",
            fontWeight: 600,
            color: "var(--k-text-muted)",
          }}
        >
          U
        </div>
        <span
          style={{
            fontSize: "var(--k-topbar-badge-size)",
            fontWeight: 500,
            textTransform: "var(--k-topbar-badge-transform)" as React.CSSProperties["textTransform"],
            letterSpacing: "0.08em",
            color: "var(--k-topbar-badge-text)",
            backgroundColor: "var(--k-topbar-badge-bg)",
            padding: "2px var(--k-space-sm)",
            borderRadius: "var(--k-badge-radius)",
          }}
        >
          Prototype
        </span>
        <Link
          href="/"
          style={{
            color: "var(--k-brand)",
            textDecoration: "none",
            fontSize: "var(--k-font-size-sm)",
          }}
        >
          변형 바꾸기
        </Link>
      </div>
    </header>
  );
}
