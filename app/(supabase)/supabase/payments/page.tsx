"use client";

import { useState, useMemo } from "react";
import {
  payments,
  accounts,
  getAccountById,
  getBalanceByAccount,
} from "@/lib/mock-data";
import type { Currency } from "@/lib/types";
import PageHeader from "@/app/(supabase)/_components/PageHeader";
import StatCard from "@/app/(supabase)/_components/StatCard";
import Card from "@/app/(supabase)/_components/Card";
import Table, { type TableColumn } from "@/app/(supabase)/_components/Table";
import Badge from "@/app/(supabase)/_components/Badge";
import Button from "@/app/(supabase)/_components/Button";

// ── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

const fmtAmount = (n: number, currency: Currency) => {
  const prefix: Record<Currency, string> = {
    KRW: "₩",
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };
  return `${prefix[currency]}${n.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}`;
};

const TODAY = "2026-04-12";
const THIS_MONTH = "2026-04";

// unique deposit sources and currencies from mock data
const DEPOSIT_SOURCES = ["전체", "농협외환", "하나외환", "Paypal", "Payoneer"] as const;
const CURRENCIES = ["전체", "KRW", "USD", "EUR", "RUB"] as const;

// ── row type for the Table primitive ─────────────────────────────────────────

interface PaymentRow extends Record<string, unknown> {
  id: string;
  date: string;
  accountName: string;
  depositSource: string;
  currency: Currency;
  amount: number;
  krwEquivalent: number;
  memo: string;
}

// ── columns ──────────────────────────────────────────────────────────────────

const columns: TableColumn<PaymentRow>[] = [
  { key: "date", label: "입금일", sortable: true, mono: true, width: 110 },
  { key: "accountName", label: "거래처", sortable: true },
  { key: "depositSource", label: "입금처", sortable: true, width: 100 },
  { key: "currency", label: "통화", sortable: true, width: 60, align: "center" },
  { key: "amount", label: "수금액", sortable: true, mono: true, align: "right", width: 120 },
  { key: "krwEquivalent", label: "원화 환산", sortable: true, mono: true, align: "right", width: 160 },
  { key: "memo", label: "비고", width: 140 },
];

// ── component ────────────────────────────────────────────────────────────────

export default function SupabasePaymentsPage() {
  // filters
  const [dateFrom, setDateFrom] = useState("2026-02-28");
  const [dateTo, setDateTo] = useState("2026-04-10");
  const [accountFilter, setAccountFilter] = useState("전체");
  const [depositFilter, setDepositFilter] = useState("전체");
  const [currencyFilter, setCurrencyFilter] = useState("전체");

  // unique account names for the filter dropdown
  const accountOptions = useMemo(() => {
    const ids = new Set(payments.map((p) => p.accountId));
    const names = Array.from(ids).map((id) => getAccountById(id)?.name ?? id);
    names.sort((a, b) => a.localeCompare(b));
    return ["전체", ...names];
  }, []);

  // map account name → id for filtering
  const accountNameToId = useMemo(() => {
    const map = new Map<string, string>();
    for (const acc of accounts) {
      map.set(acc.name, acc.id);
    }
    return map;
  }, []);

  // filtered payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (p.date < dateFrom || p.date > dateTo) return false;
      if (accountFilter !== "전체") {
        const targetId = accountNameToId.get(accountFilter);
        if (targetId && p.accountId !== targetId) return false;
      }
      if (depositFilter !== "전체" && p.depositSource !== depositFilter) return false;
      if (currencyFilter !== "전체" && p.currency !== currencyFilter) return false;
      return true;
    });
  }, [dateFrom, dateTo, accountFilter, depositFilter, currencyFilter, accountNameToId]);

  // table rows
  const rows = useMemo<PaymentRow[]>(() => {
    return filteredPayments.map((p) => ({
      id: p.id,
      date: p.date,
      accountName: getAccountById(p.accountId)?.name ?? p.accountId,
      depositSource: p.depositSource,
      currency: p.currency,
      amount: p.amount,
      krwEquivalent: p.krwEquivalent,
      memo: p.memo ?? "—",
    }));
  }, [filteredPayments]);

  // max KRW equivalent for bar chart (from filtered data)
  const maxKrw = useMemo(
    () => Math.max(...rows.map((r) => r.krwEquivalent), 1),
    [rows]
  );

  // ── stat computations ──────────────────────────────────────────────────────

  const todayTotal = useMemo(
    () =>
      payments
        .filter((p) => p.date === TODAY)
        .reduce((s, p) => s + p.krwEquivalent, 0),
    []
  );

  const monthTotal = useMemo(
    () =>
      payments
        .filter((p) => p.date.startsWith(THIS_MONTH))
        .reduce((s, p) => s + p.krwEquivalent, 0),
    []
  );

  const currencySums = useMemo(() => {
    const sums: Record<Currency, number> = { KRW: 0, USD: 0, EUR: 0, RUB: 0 };
    for (const p of payments) {
      if (p.date.startsWith(THIS_MONTH)) {
        sums[p.currency] += p.amount;
      }
    }
    return sums;
  }, []);

  // ── side panel: top 10 accounts by absolute KRW balance ────────────────────

  const rankedBalances = useMemo(() => {
    const balances = accounts.map((acc) => {
      const bal = getBalanceByAccount(acc.id);
      return { name: acc.name, totalKRW: bal.totalKRW };
    });
    balances.sort((a, b) => Math.abs(b.totalKRW) - Math.abs(a.totalKRW));
    return balances.slice(0, 10);
  }, []);

  // ── render cell ────────────────────────────────────────────────────────────

  const renderCell = (
    key: keyof PaymentRow & string,
    value: unknown,
    row: PaymentRow
  ): React.ReactNode => {
    if (key === "amount") {
      return fmtAmount(row.amount, row.currency);
    }
    if (key === "krwEquivalent") {
      const barWidth = (row.krwEquivalent / maxKrw) * 100;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
          <span>₩{fmt(row.krwEquivalent)}</span>
          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "var(--s-border)",
              borderRadius: 1,
            }}
          >
            <div
              style={{
                width: `${barWidth}%`,
                height: 1,
                backgroundColor: "var(--s-brand)",
                borderRadius: 1,
                transition: "width 120ms ease-out",
              }}
            />
          </div>
        </div>
      );
    }
    if (key === "currency") {
      const variantMap: Record<Currency, "info" | "success" | "warning" | "neutral"> = {
        USD: "info",
        EUR: "success",
        RUB: "warning",
        KRW: "neutral",
      };
      return <Badge variant={variantMap[row.currency]}>{row.currency}</Badge>;
    }
    return String(value ?? "");
  };

  // ── select style ───────────────────────────────────────────────────────────

  const selectStyle: React.CSSProperties = {
    height: 28,
    padding: "0 8px",
    fontSize: 12,
    border: "1px solid var(--s-border)",
    borderRadius: 4,
    backgroundColor: "var(--s-bg)",
    color: "var(--s-text)",
    outline: "none",
    transition: "border-color 120ms ease-out",
  };

  const inputStyle: React.CSSProperties = {
    ...selectStyle,
    width: 130,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <PageHeader
        title="수금 내역"
        actions={
          <Button disabled>수금 업로드</Button>
        }
      />

      {/* Summary stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <StatCard
          label="오늘 수금"
          value={`₩${fmt(todayTotal)}`}
          trend="neutral"
          trendLabel={todayTotal === 0 ? "해당 없음" : undefined}
        />
        <StatCard
          label="이번 달 수금"
          value={`₩${fmt(monthTotal)}`}
          trend={monthTotal > 0 ? "up" : "neutral"}
          trendLabel={`${THIS_MONTH}`}
        />
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--s-text-muted)",
              }}
            >
              통화별 이번 달 합계
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(["USD", "EUR", "RUB", "KRW"] as Currency[]).map((cur) =>
                currencySums[cur] > 0 ? (
                  <span
                    key={cur}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontFeatureSettings: "'tnum'",
                      backgroundColor: "var(--s-bg-raise)",
                      color: "var(--s-text)",
                    }}
                  >
                    <span style={{ color: "var(--s-text-muted)" }}>{cur}</span>
                    {fmtAmount(currencySums[cur], cur)}
                  </span>
                ) : null
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid var(--s-border)",
          backgroundColor: "var(--s-bg-sub)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 12, color: "var(--s-text-muted)", whiteSpace: "nowrap" }}>기간</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={inputStyle}
          />
          <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>~</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 12, color: "var(--s-text-muted)", whiteSpace: "nowrap" }}>거래처</label>
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            style={selectStyle}
          >
            {accountOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 12, color: "var(--s-text-muted)", whiteSpace: "nowrap" }}>입금처</label>
          <select
            value={depositFilter}
            onChange={(e) => setDepositFilter(e.target.value)}
            style={selectStyle}
          >
            {DEPOSIT_SOURCES.map((src) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 12, color: "var(--s-text-muted)", whiteSpace: "nowrap" }}>통화</label>
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            style={selectStyle}
          >
            {CURRENCIES.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "var(--s-text-muted)",
            fontFamily: "var(--font-jetbrains-mono)",
            fontFeatureSettings: "'tnum'",
          }}
        >
          {rows.length}건
        </span>
      </div>

      {/* Main content: left table + right side panel */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* Left: payments table */}
        <div
          style={{
            flex: "0 0 70%",
            border: "1px solid var(--s-border)",
            borderRadius: 6,
            backgroundColor: "var(--s-bg-sub)",
            overflow: "hidden",
          }}
        >
          <Table<PaymentRow>
            columns={columns}
            data={rows}
            renderCell={renderCell}
          />
        </div>

        {/* Right: account balance side panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Card title="거래처별 잔액 요약">
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {rankedBalances.map((item, i) => {
                const isNegative = item.totalKRW < 0;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom:
                        i < rankedBalances.length - 1
                          ? "1px solid var(--s-border)"
                          : "none",
                      transition: "background-color 120ms ease-out",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--s-text-muted)",
                          fontFamily: "var(--font-jetbrains-mono)",
                          width: 18,
                          textAlign: "right",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--s-text)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 140,
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontFeatureSettings: "'tnum'",
                        color: isNegative ? "var(--s-danger)" : "var(--s-brand)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₩{fmt(Math.round(item.totalKRW))}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
