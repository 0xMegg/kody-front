"use client";

import type { AccountBalance } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useTheme } from "@/lib/theme/ThemeContext";
import Card from "@/lib/components/Card";

export default function BalanceCard({ balance }: { balance: AccountBalance }) {
  const { theme } = useTheme();

  if (theme === "notion") {
    return (
      <div
        style={{
          backgroundColor: "var(--k-bg-sub)",
          borderLeft: "3px solid var(--k-brand)",
          borderRadius: "var(--k-radius-sm)",
          padding: "var(--k-pad-card)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--k-font-heading)",
            fontSize: "var(--k-card-title-size)",
            fontWeight: 600,
            color: "var(--k-text)",
            marginBottom: 12,
          }}
        >
          선택된 거래처 잔액
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(["USD", "EUR", "RUB", "KRW"] as const).map((cur) => (
            <div
              key={cur}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "var(--k-font-size-md)",
                color: balance[cur] < 0 ? "var(--k-danger)" : "var(--k-text)",
              }}
            >
              <span style={{ color: "var(--k-text-muted)" }}>{cur}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(balance[cur], cur)}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              fontWeight: 600,
              color: balance.totalKRW < 0 ? "var(--k-danger)" : "var(--k-text)",
              borderTop: "1px solid var(--k-border)",
              paddingTop: 8,
              marginTop: 4,
            }}
          >
            <span>원화 환산 합계</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatCurrency(balance.totalKRW, "KRW")}
            </span>
          </div>
          <p style={{ fontSize: "var(--k-font-size-xs)", color: "var(--k-text-subtle)", marginTop: 4, margin: 0 }}>
            마이너스는 선주문/미수금입니다
          </p>
        </div>
      </div>
    );
  }

  if (theme === "supabase") {
    return (
      <Card title="선택된 거래처 잔액">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(["USD", "EUR", "RUB", "KRW"] as const).map((cur) => (
            <div
              key={cur}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "baseline",
                gap: 12,
                fontSize: "var(--k-font-size-md)",
                fontFamily: "var(--k-font-mono)",
                fontVariantNumeric: "tabular-nums",
                color:
                  balance[cur] < 0
                    ? "var(--k-danger)"
                    : balance[cur] > 0
                      ? "var(--k-positive-color)"
                      : "var(--k-text)",
              }}
            >
              <span style={{ color: "var(--k-text-muted)", minWidth: 40 }}>{cur}</span>
              <span style={{ textAlign: "right" }}>{formatCurrency(balance[cur], cur)}</span>
            </div>
          ))}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "baseline",
              gap: 12,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--k-font-mono)",
              fontVariantNumeric: "tabular-nums",
              color: balance.totalKRW < 0 ? "var(--k-danger)" : balance.totalKRW > 0 ? "var(--k-positive-color)" : "var(--k-text)",
              borderTop: "1px solid var(--k-border)",
              paddingTop: 8,
              marginTop: 4,
            }}
          >
            <span style={{ color: "var(--k-text-muted)", minWidth: 40 }}>KRW</span>
            <span style={{ textAlign: "right" }}>{formatCurrency(balance.totalKRW, "KRW")}</span>
          </div>
          <p style={{ fontSize: "var(--k-font-size-xs)", color: "var(--k-text-subtle)", marginTop: 4, margin: 0 }}>
            마이너스는 선주문/미수금입니다
          </p>
        </div>
      </Card>
    );
  }

  // linear (default)
  return (
    <Card title="선택된 거래처 잔액">
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {(["USD", "EUR", "RUB", "KRW"] as const).map((cur) => (
          <div
            key={cur}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "var(--k-font-size-md)",
              color: balance[cur] < 0 ? "var(--k-danger)" : "var(--k-text)",
            }}
          >
            <span style={{ color: "var(--k-text-muted)" }}>{cur}</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatCurrency(balance[cur], cur)}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 600,
            color: balance.totalKRW < 0 ? "var(--k-danger)" : "var(--k-text)",
            borderTop: "1px solid var(--k-border)",
            paddingTop: 8,
            marginTop: 4,
          }}
        >
          <span>원화 환산 합계</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatCurrency(balance.totalKRW, "KRW")}
          </span>
        </div>
        <p style={{ fontSize: "var(--k-font-size-xs)", color: "var(--k-text-subtle)", marginTop: 4, margin: 0 }}>
          마이너스는 선주문/미수금입니다
        </p>
      </div>
    </Card>
  );
}
