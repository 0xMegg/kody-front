"use client";

import type { AccountBalance } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useTheme } from "@/lib/theme/ThemeContext";
import { CURRENCIES } from "@/lib/constants";
import Card from "@/lib/components/Card";

export default function CurrencyBalanceCard({ balance }: { balance: AccountBalance }) {
  const { theme } = useTheme();

  const cellLabelStyle: React.CSSProperties = {
    fontSize: "var(--k-font-size-sm)",
    color: "var(--k-text-muted)",
    padding: "var(--k-space-sm) 0",
    width: 120,
  };
  const cellValueStyle: React.CSSProperties = {
    fontSize: "var(--k-font-size-md)",
    color: "var(--k-text)",
    padding: "var(--k-space-sm) 0",
  };

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
          통화별 잔액
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {CURRENCIES.map((c) => (
              <tr key={c}>
                <td style={cellLabelStyle}>{c}</td>
                <td
                  style={{
                    ...cellValueStyle,
                    textAlign: "right",
                    color:
                      balance[c] < 0
                        ? "var(--k-danger)"
                        : balance[c] > 0
                          ? "var(--k-positive-color)"
                          : "var(--k-text)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatNumber(balance[c])}
                </td>
              </tr>
            ))}
            <tr style={{ borderTop: "1px solid var(--k-border)" }}>
              <td style={{ ...cellLabelStyle, fontWeight: 600 }}>원화 환산 총합</td>
              <td
                style={{
                  ...cellValueStyle,
                  textAlign: "right",
                  fontWeight: 600,
                  color:
                    balance.totalKRW < 0
                      ? "var(--k-danger)"
                      : balance.totalKRW > 0
                        ? "var(--k-positive-color)"
                        : "var(--k-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatNumber(Math.round(balance.totalKRW))} KRW
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (theme === "supabase") {
    return (
      <Card title="통화별 잔액">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CURRENCIES.map((c) => (
            <div
              key={c}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "baseline",
                gap: 12,
                fontSize: "var(--k-font-size-md)",
                fontFamily: "var(--k-font-mono)",
                fontVariantNumeric: "tabular-nums",
                color:
                  balance[c] < 0
                    ? "var(--k-danger)"
                    : balance[c] > 0
                      ? "var(--k-positive-color)"
                      : "var(--k-text)",
              }}
            >
              <span style={{ color: "var(--k-text-muted)", minWidth: 40 }}>{c}</span>
              <span style={{ textAlign: "right" }}>{formatNumber(balance[c])}</span>
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
              color:
                balance.totalKRW < 0
                  ? "var(--k-danger)"
                  : balance.totalKRW > 0
                    ? "var(--k-positive-color)"
                    : "var(--k-text)",
              borderTop: "1px solid var(--k-border)",
              paddingTop: 8,
              marginTop: 4,
            }}
          >
            <span style={{ color: "var(--k-text-muted)", minWidth: 60 }}>KRW 합계</span>
            <span style={{ textAlign: "right" }}>{formatNumber(Math.round(balance.totalKRW))}</span>
          </div>
        </div>
      </Card>
    );
  }

  // linear (default)
  return (
    <Card title="통화별 잔액">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {CURRENCIES.map((c) => (
            <tr key={c}>
              <td style={cellLabelStyle}>{c}</td>
              <td
                style={{
                  ...cellValueStyle,
                  textAlign: "right",
                  color:
                    balance[c] < 0
                      ? "var(--k-danger)"
                      : balance[c] > 0
                        ? "var(--k-positive-color)"
                        : "var(--k-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatNumber(balance[c])}
              </td>
            </tr>
          ))}
          <tr style={{ borderTop: "1px solid var(--k-border)" }}>
            <td style={{ ...cellLabelStyle, fontWeight: 600 }}>원화 환산 총합</td>
            <td
              style={{
                ...cellValueStyle,
                textAlign: "right",
                fontWeight: 600,
                color:
                  balance.totalKRW < 0
                    ? "var(--k-danger)"
                    : balance.totalKRW > 0
                      ? "var(--k-positive-color)"
                      : "var(--k-text)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatNumber(Math.round(balance.totalKRW))} KRW
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
