import type { ReactNode } from "react";

interface PageHeaderProps {
  breadcrumb?: ReactNode;
  title: string;
  actions?: ReactNode;
}

export default function PageHeader({ breadcrumb, title, actions }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 56,
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {breadcrumb && (
          <span
            style={{
              fontSize: 12,
              color: "var(--l-text-muted)",
            }}
          >
            {breadcrumb}
          </span>
        )}
        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--l-text)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h1>
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
