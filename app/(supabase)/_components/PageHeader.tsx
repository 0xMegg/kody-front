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
        minHeight: 60,
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid var(--s-border)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {breadcrumb && (
          <span
            style={{
              fontSize: 12,
              color: "var(--s-text-muted)",
            }}
          >
            {breadcrumb}
          </span>
        )}
        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--s-text)",
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
