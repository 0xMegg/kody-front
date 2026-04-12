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
  pending: { color: "var(--n-warning)", backgroundColor: "var(--n-yellow-bg)" },
  주문대기: { color: "var(--n-warning)", backgroundColor: "var(--n-yellow-bg)" },
  confirmed: { color: "var(--n-success)", backgroundColor: "var(--n-green-bg)" },
  주문완료: { color: "var(--n-success)", backgroundColor: "var(--n-green-bg)" },
  cancelled: { color: "var(--n-text-muted)", backgroundColor: "var(--n-gray-bg)" },
  주문중지: { color: "var(--n-text-muted)", backgroundColor: "var(--n-gray-bg)" },
  shipped: { color: "var(--n-accent)", backgroundColor: "var(--n-blue-bg)" },
  출고대기: { color: "var(--n-accent)", backgroundColor: "var(--n-blue-bg)" },
  출고완료: { color: "var(--n-purple)", backgroundColor: "var(--n-purple-bg)" },
  warning: { color: "var(--n-danger)", backgroundColor: "var(--n-red-bg)" },
  음수재고: { color: "var(--n-danger)", backgroundColor: "var(--n-red-bg)" },
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
