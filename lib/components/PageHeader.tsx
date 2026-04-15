import type { ReactNode } from "react";

interface PageHeaderProps {
  breadcrumb?: ReactNode;
  title: string;
  helperText?: string;
  actions?: ReactNode;
}

export default function PageHeader({ breadcrumb, title, helperText, actions }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: helperText ? "flex-start" : "center",
        justifyContent: "space-between",
        minHeight: "var(--k-header-height)",
        marginBottom: "var(--k-space-xl)",
        paddingBottom: "var(--k-page-header-pad-bottom)",
        borderBottom: "var(--k-page-header-border)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--k-space-xs)" }}>
        {breadcrumb && (
          <span
            style={{
              fontSize: "var(--k-font-size-sm)",
              color: "var(--k-text-muted)",
            }}
          >
            {breadcrumb}
          </span>
        )}
        <h1
          style={{
            fontFamily: "var(--k-font-heading)",
            fontSize: "var(--k-page-title-size)",
            fontWeight: "var(--k-page-title-weight)" as React.CSSProperties["fontWeight"],
            color: "var(--k-text)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h1>
        {helperText && (
          <p
            style={{
              fontSize: "var(--k-font-size-md)",
              color: "var(--k-text-muted)",
              margin: 0,
              marginTop: "var(--k-space-xs)",
            }}
          >
            {helperText}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--k-space-sm)", paddingTop: helperText ? "var(--k-space-sm)" : 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
