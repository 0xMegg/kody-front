import Card from "./Card";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  trend?: TrendDirection;
  trendLabel?: string;
}

const trendConfig: Record<TrendDirection, { color: string; arrow: string }> = {
  up: { color: "var(--l-success)", arrow: "↑" },
  down: { color: "var(--l-danger)", arrow: "↓" },
  neutral: { color: "var(--l-text-muted)", arrow: "→" },
};

export default function StatCard({ label, value, trend, trendLabel }: StatCardProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          cursor: "default",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--l-text-muted)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "var(--l-text)",
            lineHeight: 1.2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
        {trend && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: trendConfig[trend].color,
              }}
            >
              {trendConfig[trend].arrow}
            </span>
            {trendLabel && (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--l-text-muted)",
                }}
              >
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
