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
        border: "1px solid var(--k-border)",
        borderRadius: 3,
        backgroundColor: "var(--k-surface)",
        boxShadow: "rgba(15, 15, 15, 0.04) 0px 1px 2px",
        overflow: "hidden",
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            borderBottom: "1px solid var(--k-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-source-serif)",
              fontSize: 17,
              fontWeight: 600,
              color: "var(--k-text)",
            }}
          >
            {title}
          </span>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}
