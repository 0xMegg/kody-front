"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/app/(notion)/_components/PageHeader";
import Button from "@/app/(notion)/_components/Button";
import StatCard from "@/app/(notion)/_components/StatCard";
import Card from "@/app/(notion)/_components/Card";
import Table, { type TableColumn } from "@/app/(notion)/_components/Table";
import {
  payments,
  accounts,
  getAccountById,
  getBalanceByAccount,
} from "@/lib/mock-data";
import type { Currency, DepositSource } from "@/lib/types";

// Mock "today" — last payment date in mock data
const MOCK_TODAY = "2026-04-10";
const MOCK_MONTH = "2026-04";

const DEPOSIT_SOURCES: DepositSource[] = [
  "농협외환",
  "하나외환",
  "Paypal",
  "Payoneer",
];
const CURRENCIES: Currency[] = ["KRW", "USD", "EUR", "RUB"];

// ---------------------------------------------------------------------------
// Row type for Table<T>
// ---------------------------------------------------------------------------
type PaymentRow = Record<string, unknown> & {
  id: string;
  date: string;
  accountName: string;
  depositSource: string;
  currency: Currency;
  amount: number;
  krwEquivalent: number;
  memo: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
}

function formatCurrency(n: number, currency: Currency): string {
  const symbols: Record<Currency, string> = {
    KRW: "₩",
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };
  return `${symbols[currency]}${formatNumber(n)}`;
}

function defaultDateFrom(): string {
  // 30 days before MOCK_TODAY
  const d = new Date("2026-04-10");
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function NotionPaymentsPage() {
  // Filter state
  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(MOCK_TODAY);
  const [accountFilter, setAccountFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");

  // ---------------------------------------------------------------------------
  // Summary stats (computed from ALL payments, not filtered)
  // ---------------------------------------------------------------------------
  const todayTotal = useMemo(
    () =>
      payments
        .filter((p) => p.date === MOCK_TODAY)
        .reduce((sum, p) => sum + p.krwEquivalent, 0),
    [],
  );

  const monthlyTotal = useMemo(
    () =>
      payments
        .filter((p) => p.date.startsWith(MOCK_MONTH))
        .reduce((sum, p) => sum + p.krwEquivalent, 0),
    [],
  );

  const monthlyCurrencyTotals = useMemo(() => {
    const totals: Record<Currency, number> = { KRW: 0, USD: 0, EUR: 0, RUB: 0 };
    for (const p of payments) {
      if (p.date.startsWith(MOCK_MONTH)) {
        totals[p.currency] += p.amount;
      }
    }
    return totals;
  }, []);

  // ---------------------------------------------------------------------------
  // Filtered rows
  // ---------------------------------------------------------------------------
  const filteredRows: PaymentRow[] = useMemo(() => {
    return payments
      .filter((p) => {
        if (dateFrom && p.date < dateFrom) return false;
        if (dateTo && p.date > dateTo) return false;
        if (accountFilter && p.accountId !== accountFilter) return false;
        if (sourceFilter && p.depositSource !== sourceFilter) return false;
        if (currencyFilter && p.currency !== currencyFilter) return false;
        return true;
      })
      .map((p) => {
        const account = getAccountById(p.accountId);
        return {
          id: p.id,
          date: p.date,
          accountName: account?.name ?? p.accountId,
          depositSource: p.depositSource,
          currency: p.currency,
          amount: p.amount,
          krwEquivalent: p.krwEquivalent,
          memo: p.memo ?? "",
        };
      });
  }, [dateFrom, dateTo, accountFilter, sourceFilter, currencyFilter]);

  // ---------------------------------------------------------------------------
  // Side panel: top 10 accounts by absolute totalKRW balance
  // ---------------------------------------------------------------------------
  const top10Balances = useMemo(() => {
    return accounts
      .map((a) => {
        const bal = getBalanceByAccount(a.id);
        return { id: a.id, name: a.name, totalKRW: bal.totalKRW };
      })
      .sort((a, b) => Math.abs(b.totalKRW) - Math.abs(a.totalKRW))
      .slice(0, 10);
  }, []);

  // ---------------------------------------------------------------------------
  // Table columns
  // ---------------------------------------------------------------------------
  const columns: TableColumn<PaymentRow>[] = [
    { key: "date", label: "입금일", sortable: true, width: 110 },
    { key: "accountName", label: "거래처", sortable: true },
    { key: "depositSource", label: "입금처", width: 100 },
    { key: "currency", label: "통화", width: 60, align: "center" },
    { key: "amount", label: "수금액", align: "right", sortable: true, width: 120 },
    {
      key: "krwEquivalent",
      label: "원화 환산",
      align: "right",
      sortable: true,
      width: 130,
    },
    { key: "memo", label: "비고", width: 140 },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Select style shared across filter dropdowns
  const selectStyle: React.CSSProperties = {
    height: 32,
    padding: "0 10px",
    fontSize: 14,
    border: "1px solid var(--k-border-strong)",
    borderRadius: 3,
    backgroundColor: "var(--k-surface)",
    color: "var(--k-text)",
    outline: "none",
  };

  const inputStyle: React.CSSProperties = {
    ...selectStyle,
    width: 140,
  };

  // Currency chips for the third stat card
  const currencyChips = (["USD", "EUR", "RUB", "KRW"] as Currency[])
    .filter((c) => monthlyCurrencyTotals[c] > 0)
    .map((c) => `${c} ${formatNumber(monthlyCurrencyTotals[c])}`)
    .join("  ·  ");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Page Header */}
      <PageHeader
        breadcrumb="Notion / 수금"
        title="수금 내역"
        helperText="거래처별 입금 내역과 잔액 현황을 확인합니다."
        actions={
          <Button variant="secondary" disabled>
            수금 업로드
          </Button>
        }
      />

      {/* Summary Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <StatCard
          label="오늘 수금 (원화)"
          value={`₩${formatNumber(todayTotal)}`}
        />
        <StatCard
          label="이번 달 수금 (원화)"
          value={`₩${formatNumber(monthlyTotal)}`}
        />
        <StatCard
          label="통화별 이번 달 합계"
          value={currencyChips || "—"}
        />
      </div>

      {/* Main layout: table (left) + side panel (right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left: filter bar + table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Filter Bar */}
          <Card>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Date range */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--k-text-muted)",
                  }}
                >
                  기간
                </span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={inputStyle}
                />
                <span style={{ color: "var(--k-text-muted)", fontSize: 13 }}>~</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Account filter */}
              <select
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
                style={selectStyle}
              >
                <option value="">거래처 전체</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              {/* Deposit source filter */}
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                style={selectStyle}
              >
                <option value="">입금처 전체</option>
                {DEPOSIT_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Currency filter */}
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                style={selectStyle}
              >
                <option value="">통화 전체</option>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Payment count */}
          <div
            style={{
              fontSize: 13,
              color: "var(--k-text-muted)",
              paddingLeft: 4,
            }}
          >
            총 {filteredRows.length}건
          </div>

          {/* Table */}
          <Table<PaymentRow>
            columns={columns}
            data={filteredRows}
            renderCell={(key, value, row) => {
              if (key === "amount") {
                return (
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatCurrency(value as number, row.currency as Currency)}
                  </span>
                );
              }
              if (key === "krwEquivalent") {
                return (
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    ₩{formatNumber(value as number)}
                  </span>
                );
              }
              if (key === "currency") {
                return (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--k-text-muted)",
                    }}
                  >
                    {String(value)}
                  </span>
                );
              }
              return String(value ?? "");
            }}
          />
        </div>

        {/* Right: side panel — account balance ranking */}
        <Card title="거래처별 잔액 요약">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {top10Balances.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom:
                    i < top10Balances.length - 1
                      ? "1px solid var(--k-border)"
                      : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--k-text-muted)",
                      width: 20,
                      textAlign: "right",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--k-text)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 160,
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                    color:
                      item.totalKRW < 0
                        ? "var(--k-danger)"
                        : "var(--k-text)",
                  }}
                >
                  {item.totalKRW < 0 ? "−" : ""}₩
                  {formatNumber(Math.abs(item.totalKRW))}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
