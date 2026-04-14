"use client";

import Card from "@/lib/components/Card";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  trend?: TrendDirection;
  trendLabel?: string;
  highlighted?: boolean;
}

const trendConfig: Record<TrendDirection, { color: string; arrow: string }> = {
  up: { color: "var(--k-success)", arrow: "\u2191" },
  down: { color: "var(--k-danger)", arrow: "\u2193" },
  neutral: { color: "var(--k-text-muted)", arrow: "\u2192" },
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
        transition: `box-shadow var(--k-transition-fast)`,
        borderRadius: "var(--k-radius-md)",
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
              fontSize: "var(--k-stat-label-size)",
              fontWeight: 500,
              textTransform: "var(--k-stat-label-transform)" as React.CSSProperties["textTransform"],
              letterSpacing: "var(--k-stat-label-tracking)",
              color: "var(--k-text-muted)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: "var(--k-stat-value-size)",
              fontWeight: 600,
              color: "var(--k-text)",
              lineHeight: 1.2,
              fontFamily: "var(--k-stat-value-font)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </span>
          {trend && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  fontSize: "var(--k-font-size-sm)",
                  fontWeight: 500,
                  color: trendConfig[trend].color,
                }}
              >
                {trendConfig[trend].arrow}
              </span>
              {trendLabel && (
                <span
                  style={{
                    fontSize: "var(--k-font-size-sm)",
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
