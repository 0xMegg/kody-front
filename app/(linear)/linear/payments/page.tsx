"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/lib/components/PageHeader";
import StatCard from "@/lib/components/StatCard";
import Button from "@/lib/components/Button";
import Card from "@/lib/components/Card";
import Table, { type TableColumn } from "@/lib/components/Table";
import {
  payments,
  getAccountById,
  getBalanceByAccount,
} from "@/lib/mock-data";
import type { Currency, DepositSource } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

const PAGE_SIZE = 20;
const TODAY = "2026-04-12";
const THIS_MONTH = "2026-04";

// ---------------------------------------------------------------------------
// Row type for Table<T>
// ---------------------------------------------------------------------------
interface PaymentRow {
  [key: string]: unknown;
  id: string;
  date: string;
  accountName: string;
  depositSource: DepositSource;
  currency: Currency;
  amount: number;
  krwEquivalent: number;
  memo: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildPaymentRow(p: (typeof payments)[number]): PaymentRow {
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
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------
const paymentColumns: TableColumn<PaymentRow>[] = [
  { key: "date", label: "입금일", sortable: true, width: 110 },
  { key: "accountName", label: "거래처", sortable: true },
  { key: "depositSource", label: "입금처", sortable: true, width: 100 },
  { key: "currency", label: "통화", width: 60 },
  { key: "amount", label: "수금액", align: "right", sortable: true, width: 120 },
  { key: "krwEquivalent", label: "원화 환산", align: "right", sortable: true, width: 130 },
  { key: "memo", label: "비고", width: 140 },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function FilterBar({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  accountSearch,
  onAccountSearchChange,
  depositSourceFilter,
  onDepositSourceChange,
  currencyFilter,
  onCurrencyChange,
}: {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  accountSearch: string;
  onAccountSearchChange: (v: string) => void;
  depositSourceFilter: string;
  onDepositSourceChange: (v: string) => void;
  currencyFilter: string;
  onCurrencyChange: (v: string) => void;
}) {
  const inputStyle: React.CSSProperties = {
    height: 28,
    padding: "0 8px",
    fontSize: 12,
    border: "1px solid var(--k-border)",
    borderRadius: 6,
    backgroundColor: "var(--k-bg)",
    color: "var(--k-text)",
    outline: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Date range */}
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        style={inputStyle}
      />
      <span style={{ fontSize: 12, color: "var(--k-text-muted)" }}>~</span>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        style={inputStyle}
      />

      {/* Account search */}
      <input
        type="text"
        placeholder="거래처 검색"
        value={accountSearch}
        onChange={(e) => onAccountSearchChange(e.target.value)}
        style={{ ...inputStyle, minWidth: 140 }}
      />

      {/* Deposit source */}
      <select
        value={depositSourceFilter}
        onChange={(e) => onDepositSourceChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">전체 입금처</option>
        <option value="농협외환">농협외환</option>
        <option value="하나외환">하나외환</option>
        <option value="Paypal">Paypal</option>
        <option value="Payoneer">Payoneer</option>
      </select>

      {/* Currency */}
      <select
        value={currencyFilter}
        onChange={(e) => onCurrencyChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">전체 통화</option>
        <option value="KRW">KRW</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
  );
}

function Pagination({
  page,
  total,
  onPageChange,
}: {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const from = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const to = Math.min((page + 1) * PAGE_SIZE, total);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        padding: "12px 0",
        fontSize: 12,
        color: "var(--k-text-muted)",
      }}
    >
      <span>
        {from}–{to} of {total}
      </span>
      <Button
        variant="ghost"
        size="sm"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        ← 이전
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        다음 →
      </Button>
    </div>
  );
}

function BalanceSummaryPanel() {
  // Get unique account IDs from payments
  const accountIds = useMemo(() => {
    const ids = new Set<string>();
    for (const p of payments) {
      ids.add(p.accountId);
    }
    return Array.from(ids);
  }, []);

  // Build ranked list by absolute totalKRW
  const ranked = useMemo(() => {
    return accountIds
      .map((id) => {
        const account = getAccountById(id);
        const balance = getBalanceByAccount(id);
        return {
          id,
          name: account?.name ?? id,
          totalKRW: balance.totalKRW,
        };
      })
      .sort((a, b) => Math.abs(b.totalKRW) - Math.abs(a.totalKRW))
      .slice(0, 10);
  }, [accountIds]);

  return (
    <Card title="거래처별 잔액 요약">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ranked.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              borderBottom:
                i < ranked.length - 1
                  ? "1px solid var(--k-border)"
                  : "none",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "var(--k-text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 140,
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                color:
                  item.totalKRW < 0
                    ? "var(--k-danger)"
                    : "var(--k-text)",
              }}
            >
              ₩{formatNumber(Math.round(item.totalKRW))}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function LinearPaymentsPage() {
  // Filter state
  const [dateFrom, setDateFrom] = useState("2026-03-13");
  const [dateTo, setDateTo] = useState("2026-04-12");
  const [accountSearch, setAccountSearch] = useState("");
  const [depositSourceFilter, setDepositSourceFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [page, setPage] = useState(0);

  // Reset page on filter change
  const changeFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(0);
  };

  // Filtered payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (dateFrom && p.date < dateFrom) return false;
      if (dateTo && p.date > dateTo) return false;
      if (accountSearch) {
        const acc = getAccountById(p.accountId);
        const name = acc?.name ?? "";
        if (!name.toLowerCase().includes(accountSearch.toLowerCase()))
          return false;
      }
      if (depositSourceFilter && p.depositSource !== depositSourceFilter)
        return false;
      if (currencyFilter && p.currency !== currencyFilter) return false;
      return true;
    });
  }, [dateFrom, dateTo, accountSearch, depositSourceFilter, currencyFilter]);

  // Rows
  const rows = useMemo(
    () => filteredPayments.map(buildPaymentRow),
    [filteredPayments],
  );
  const paginatedRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Summary stats
  const todayKRW = useMemo(
    () =>
      payments
        .filter((p) => p.date === TODAY)
        .reduce((sum, p) => sum + p.krwEquivalent, 0),
    [],
  );

  const thisMonthKRW = useMemo(
    () =>
      payments
        .filter((p) => p.date.startsWith(THIS_MONTH))
        .reduce((sum, p) => sum + p.krwEquivalent, 0),
    [],
  );

  const currencyBreakdown = useMemo(() => {
    const map: Partial<Record<Currency, number>> = {};
    for (const p of payments) {
      if (p.date.startsWith(THIS_MONTH)) {
        map[p.currency] = (map[p.currency] ?? 0) + p.amount;
      }
    }
    return map;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <PageHeader
        title="수금"
        actions={<Button disabled>수금 업로드</Button>}
      />

      {/* Main layout: content left + panel right */}
      <div style={{ display: "flex", gap: 20 }}>
        {/* Left content */}
        <div style={{ flex: "1 1 0%", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Summary Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            <StatCard
              label="오늘 수금 (원화 환산)"
              value={`₩${formatNumber(todayKRW)}`}
              trend="neutral"
              trendLabel={todayKRW === 0 ? "오늘 입금 없음" : undefined}
            />
            <StatCard
              label="이번 달 수금 (원화 환산)"
              value={`₩${formatNumber(thisMonthKRW)}`}
              trend={thisMonthKRW > 0 ? "up" : "neutral"}
              trendLabel={`${payments.filter((p) => p.date.startsWith(THIS_MONTH)).length}건`}
            />
            {/* Currency breakdown card */}
            <Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--k-text-muted)",
                  }}
                >
                  통화별 이번 달 합계
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {(["USD", "EUR", "RUB", "KRW"] as Currency[]).map((cur) => {
                    const val = currencyBreakdown[cur];
                    if (!val) return null;
                    return (
                      <span
                        key={cur}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "4px 10px",
                          borderRadius: 12,
                          backgroundColor: "var(--k-bg-sub)",
                          fontSize: 12,
                          fontWeight: 500,
                          fontVariantNumeric: "tabular-nums",
                          color: "var(--k-text)",
                        }}
                      >
                        <span style={{ color: "var(--k-text-muted)" }}>{cur}</span>
                        {formatNumber(val)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Filter bar */}
          <FilterBar
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={changeFilter(setDateFrom)}
            onDateToChange={changeFilter(setDateTo)}
            accountSearch={accountSearch}
            onAccountSearchChange={changeFilter(setAccountSearch)}
            depositSourceFilter={depositSourceFilter}
            onDepositSourceChange={changeFilter(setDepositSourceFilter)}
            currencyFilter={currencyFilter}
            onCurrencyChange={changeFilter(setCurrencyFilter)}
          />

          {/* Payments table */}
          <Card>
            <div style={{ margin: -16 }}>
              <Table<PaymentRow>
                columns={paymentColumns}
                data={paginatedRows}
                renderCell={(key, value, row) => {
                  if (key === "amount") {
                    return (
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>
                        {row.currency} {formatNumber(value as number)}
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
                  return String(value ?? "");
                }}
              />
            </div>
          </Card>

          {/* Pagination */}
          <Pagination
            page={page}
            total={rows.length}
            onPageChange={setPage}
          />
        </div>

        {/* Right side panel */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <BalanceSummaryPanel />
        </div>
      </div>
    </div>
  );
}
