type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const colorMap: Record<BadgeVariant, { color: string; backgroundColor: string }> = {
  success: { color: "var(--s-success)", backgroundColor: "var(--s-success-bg)" },
  warning: { color: "var(--s-warning)", backgroundColor: "var(--s-warning-bg)" },
  danger: { color: "var(--s-danger)", backgroundColor: "var(--s-danger-bg)" },
  info: { color: "var(--s-info)", backgroundColor: "var(--s-info-bg)" },
  neutral: { color: "var(--s-text-muted)", backgroundColor: "var(--s-bg-raise)" },
};

export const statusVariantMap: Record<string, BadgeVariant> = {
  주문대기: "warning",
  주문완료: "success",
  주문중지: "neutral",
  출고대기: "info",
  출고완료: "success",
};

export default function Badge({ variant, children }: BadgeProps) {
  const c = colorMap[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 22,
        padding: "0 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        lineHeight: 1,
        color: c.color,
        backgroundColor: c.backgroundColor,
      }}
    >
      {children}
    </span>
  );
}
