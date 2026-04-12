import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, actions, children, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--l-border)",
        borderRadius: 8,
        backgroundColor: "var(--l-surface)",
        overflow: "hidden",
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid var(--l-border)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--l-text)",
            }}
          >
            {title}
          </span>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}
