type BadgeVariant =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "shipped"
  | "warning"
  | "주문대기"
  | "주문완료"
  | "주문중지"
  | "출고대기"
  | "출고완료"
  | "음수재고";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const colorMap: Record<BadgeVariant, { color: string; backgroundColor: string }> = {
  pending: { color: "var(--k-warning)", backgroundColor: "var(--k-highlight-yellow-bg)" },
  주문대기: { color: "var(--k-warning)", backgroundColor: "var(--k-highlight-yellow-bg)" },
  confirmed: { color: "var(--k-success)", backgroundColor: "var(--k-highlight-green-bg)" },
  주문완료: { color: "var(--k-success)", backgroundColor: "var(--k-highlight-green-bg)" },
  cancelled: { color: "var(--k-text-muted)", backgroundColor: "var(--k-highlight-gray-bg)" },
  주문중지: { color: "var(--k-text-muted)", backgroundColor: "var(--k-highlight-gray-bg)" },
  shipped: { color: "var(--k-brand)", backgroundColor: "var(--k-highlight-blue-bg)" },
  출고대기: { color: "var(--k-brand)", backgroundColor: "var(--k-highlight-blue-bg)" },
  출고완료: { color: "var(--k-highlight-purple)", backgroundColor: "var(--k-highlight-purple-bg)" },
  warning: { color: "var(--k-danger)", backgroundColor: "var(--k-highlight-red-bg)" },
  음수재고: { color: "var(--k-danger)", backgroundColor: "var(--k-highlight-red-bg)" },
};

export default function Badge({ variant, children }: BadgeProps) {
  const c = colorMap[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 22,
        padding: "0 10px",
        borderRadius: 3,
        fontSize: 13,
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
