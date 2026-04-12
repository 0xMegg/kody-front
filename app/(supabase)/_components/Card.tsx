import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  highlighted?: boolean;
}

export default function Card({ title, actions, children, highlighted }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--s-border)",
        borderRadius: 6,
        backgroundColor: "var(--s-bg-sub)",
        overflow: "hidden",
        ...(highlighted ? { borderTop: "2px solid var(--s-brand)" } : {}),
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid var(--s-border)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--s-text)",
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
