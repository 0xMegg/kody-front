import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
}

export default function Card({ title, actions, children, className, highlighted }: CardProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--k-border)",
        borderRadius: "var(--k-radius-md)",
        backgroundColor: "var(--k-card-bg)",
        boxShadow: "var(--k-shadow-card)",
        overflow: "hidden",
        ...(highlighted ? { borderTop: "2px solid var(--k-brand)" } : {}),
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--k-pad-card)",
            borderBottom: "1px solid var(--k-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--k-font-heading)",
              fontSize: "var(--k-card-title-size)",
              fontWeight: 600,
              color: "var(--k-text)",
            }}
          >
            {title}
          </span>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: "var(--k-pad-card)" }}>{children}</div>
    </div>
  );
}
