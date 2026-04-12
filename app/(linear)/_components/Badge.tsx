type BadgeVariant = "pending" | "confirmed" | "cancelled" | "shipped" | "warning";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const colorMap: Record<BadgeVariant, { color: string; backgroundColor: string }> = {
  pending: { color: "var(--l-warning)", backgroundColor: "var(--l-warning-bg)" },
  confirmed: { color: "var(--l-success)", backgroundColor: "var(--l-success-bg)" },
  cancelled: { color: "var(--l-danger)", backgroundColor: "var(--l-danger-bg)" },
  shipped: { color: "var(--l-info)", backgroundColor: "var(--l-info-bg)" },
  warning: { color: "var(--l-warning)", backgroundColor: "var(--l-warning-bg)" },
};

export default function Badge({ variant, children }: BadgeProps) {
  const c = colorMap[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 20,
        padding: "0 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1,
        color: c.color,
        backgroundColor: c.backgroundColor,
      }}
    >
      {children}
    </span>
  );
}
