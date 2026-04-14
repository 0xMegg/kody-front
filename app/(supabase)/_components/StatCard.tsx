"use client";

import Card from "./Card";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  trend?: TrendDirection;
  trendLabel?: string;
  highlighted?: boolean;
}

const trendConfig: Record<TrendDirection, { color: string; arrow: string }> = {
  up: { color: "var(--k-success)", arrow: "↑" },
  down: { color: "var(--k-danger)", arrow: "↓" },
  neutral: { color: "var(--k-text-muted)", arrow: "→" },
};

export default function StatCard({
  label,
  value,
  trend,
  trendLabel,
  highlighted,
}: StatCardProps) {
  return (
    <div
      style={{
        transition: "box-shadow 120ms ease-out",
        borderRadius: 6,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 1px var(--k-brand-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Card highlighted={highlighted}>
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
              color: "var(--k-text-muted)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "var(--k-text)",
              lineHeight: 1.2,
              fontFamily: "var(--font-jetbrains-mono)",
              fontFeatureSettings: "'tnum'",
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
                    color: "var(--k-text-muted)",
                  }}
                >
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
