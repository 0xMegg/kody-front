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
        alignItems: "flex-start",
        justifyContent: "space-between",
        minHeight: 64,
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {breadcrumb && (
          <span
            style={{
              fontSize: 13,
              color: "var(--k-text-muted)",
            }}
          >
            {breadcrumb}
          </span>
        )}
        <h1
          style={{
            fontFamily: "var(--font-source-serif)",
            fontSize: 30,
            fontWeight: 700,
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
              fontSize: 15,
              color: "var(--k-text-muted)",
              margin: 0,
              marginTop: 4,
            }}
          >
            {helperText}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 8 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
