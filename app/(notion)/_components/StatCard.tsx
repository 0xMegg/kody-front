import Card from "./Card";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  trend?: TrendDirection;
  trendLabel?: string;
}

const trendConfig: Record<TrendDirection, { color: string; arrow: string }> = {
  up: { color: "var(--n-success)", arrow: "↑" },
  down: { color: "var(--n-danger)", arrow: "↓" },
  neutral: { color: "var(--n-text-muted)", arrow: "→" },
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
            fontSize: 14,
            fontWeight: 500,
            color: "var(--n-text-muted)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "var(--n-text)",
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
                fontSize: 13,
                fontWeight: 500,
                color: trendConfig[trend].color,
              }}
            >
              {trendConfig[trend].arrow}
            </span>
            {trendLabel && (
              <span
                style={{
                  fontSize: 13,
                  color: "var(--n-text-muted)",
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
