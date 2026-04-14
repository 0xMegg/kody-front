type BadgeVariant = "pending" | "confirmed" | "cancelled" | "shipped" | "warning";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const colorMap: Record<BadgeVariant, { color: string; backgroundColor: string }> = {
  pending: { color: "var(--k-warning)", backgroundColor: "var(--k-warning-bg)" },
  confirmed: { color: "var(--k-success)", backgroundColor: "var(--k-success-bg)" },
  cancelled: { color: "var(--k-danger)", backgroundColor: "var(--k-danger-bg)" },
  shipped: { color: "var(--k-info)", backgroundColor: "var(--k-info-bg)" },
  warning: { color: "var(--k-warning)", backgroundColor: "var(--k-warning-bg)" },
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
