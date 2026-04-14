"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Card from "@/lib/components/Card";
import Table, { type TableColumn } from "@/lib/components/Table";
import Badge from "@/lib/components/Badge";
import {
  orders,
  payments,
  salesRepNames,
  getAccountById,
} from "@/lib/mock-data";
import type {
  Account,
  AccountBalance,
  Currency,
  OrderStatus,
} from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { CURRENCIES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TabId = "overview" | "orders" | "payments" | "addresses";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "개요" },
  { id: "orders", label: "주문 이력" },
  { id: "payments", label: "수금 이력" },
  { id: "addresses", label: "배송지" },
];

interface AccountDetailClientProps {
  account: Account;
  balance: AccountBalance;
}

// ---------------------------------------------------------------------------
// Row types
// ---------------------------------------------------------------------------
type OrderRow = Record<string, unknown> & {
  id: string;
  orderDate: string;
  currency: Currency;
  total: number;
  status: OrderStatus;
  itemCount: number;
};

type PaymentRow = Record<string, unknown> & {
  id: string;
  date: string;
  depositSource: string;
  currency: Currency;
  amount: number;
  krwEquivalent: number;
  memo: string;
};

type AddressRow = Record<string, unknown> & {
  id: string;
  label: string;
  country: string;
  fullAddress: string;
  isPrimary: boolean;
  defaultIncoterm: string;
};

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------
const orderColumns: TableColumn<OrderRow>[] = [
  { key: "id", label: "주문번호", sortable: true },
  { key: "orderDate", label: "주문일", sortable: true },
  { key: "currency", label: "통화" },
  { key: "total", label: "주문합계액", align: "right", sortable: true },
  { key: "status", label: "주문상태" },
  { key: "itemCount", label: "품목 수", align: "center" },
];

const paymentColumns: TableColumn<PaymentRow>[] = [
  { key: "date", label: "입금일", sortable: true },
  { key: "depositSource", label: "입금처" },
  { key: "currency", label: "통화" },
  { key: "amount", label: "수금액", align: "right", sortable: true },
  { key: "krwEquivalent", label: "원화 환산", align: "right", sortable: true },
  { key: "memo", label: "비고" },
];

const addressColumns: TableColumn<AddressRow>[] = [
  { key: "label", label: "배송지명" },
  { key: "country", label: "국가" },
  { key: "fullAddress", label: "주소" },
  { key: "isPrimary", label: "주요" },
  { key: "defaultIncoterm", label: "인코텀" },
];

// ---------------------------------------------------------------------------
// Badge helpers
// ---------------------------------------------------------------------------
function statusBadgeVariant(s: OrderStatus) {
  if (s === "주문대기") return "pending";
  if (s === "주문완료") return "confirmed";
  return "cancelled";
}

// ---------------------------------------------------------------------------
// Tab contents
// ---------------------------------------------------------------------------
function OverviewTab({
  account,
  balance,
}: {
  account: Account;
  balance: AccountBalance;
}) {
  const infoRows: { label: string; value: React.ReactNode }[] = [
    { label: "거래처명", value: account.name },
    { label: "대표자", value: account.representative },
    { label: "주요 입금자", value: account.primaryDepositor },
    {
      label: "담당자",
      value: salesRepNames[account.salesRepId] ?? account.salesRepId,
    },
    {
      label: "기본 할인율",
      value: `${(account.defaultDiscountRate * 100).toFixed(0)}%`,
    },
    { label: "입금처", value: account.depositSource },
    {
      label: "관계 거래처",
      value:
        account.relatedAccountIds.length > 0
          ? account.relatedAccountIds.map((rid) => {
              const related = getAccountById(rid);
              return (
                <Link
                  key={rid}
                  href={`/linear/accounts/${rid}`}
                  style={{
                    color: "var(--k-brand)",
                    textDecoration: "none",
                    marginRight: 8,
                  }}
                >
                  {related?.name ?? rid}
                </Link>
              );
            })
          : "—",
    },
  ];

  const cellLabelStyle: React.CSSProperties = {
    fontSize: 12,
    color: "var(--k-text-muted)",
    padding: "6px 0",
    width: 120,
  };
  const cellValueStyle: React.CSSProperties = {
    fontSize: 13,
    color: "var(--k-text)",
    padding: "6px 0",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="기본 정보">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {infoRows.map((row) => (
              <tr key={row.label}>
                <td style={cellLabelStyle}>{row.label}</td>
                <td style={cellValueStyle}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

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
                        : "var(--k-text)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatNumber(balance[c])}
                </td>
              </tr>
            ))}
            <tr
              style={{
                borderTop: "1px solid var(--k-border)",
              }}
            >
              <td style={{ ...cellLabelStyle, fontWeight: 600 }}>
                원화 환산 총합
              </td>
              <td
                style={{
                  ...cellValueStyle,
                  textAlign: "right",
                  fontWeight: 600,
                  color:
                    balance.totalKRW < 0
                      ? "var(--k-danger)"
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

      {account.memo && (
        <Card title="메모 / 비고">
          <p
            style={{
              fontSize: 13,
              color: "var(--k-text)",
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {account.memo}
          </p>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function AccountDetailClient({
  account,
  balance,
}: AccountDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Order rows for this account
  const orderRows = useMemo(() => {
    return orders
      .filter((o) => o.accountId === account.id)
      .map((o): OrderRow => {
        const total =
          o.items.reduce((s, i) => s + i.subtotal, 0) +
          o.shippingFee +
          o.remittanceFee;
        return {
          id: o.id,
          orderDate: o.orderDate,
          currency: o.currency,
          total,
          status: o.status,
          itemCount: o.items.length,
        };
      });
  }, [account.id]);

  // Payment rows for this account
  const paymentRows = useMemo(() => {
    return payments
      .filter((p) => p.accountId === account.id)
      .map(
        (p): PaymentRow => ({
          id: p.id,
          date: p.date,
          depositSource: p.depositSource,
          currency: p.currency,
          amount: p.amount,
          krwEquivalent: p.krwEquivalent,
          memo: p.memo ?? "",
        }),
      );
  }, [account.id]);

  // Address rows
  const addressRows = useMemo(() => {
    return account.shippingAddresses.map(
      (a): AddressRow => ({
        id: a.id,
        label: a.label,
        country: a.country,
        fullAddress: a.fullAddress,
        isPrimary: a.isPrimary,
        defaultIncoterm: a.defaultIncoterm ?? "",
      }),
    );
  }, [account.shippingAddresses]);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0 12px",
    height: 32,
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? "var(--k-brand)" : "var(--k-text-muted)",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid var(--k-brand)" : "2px solid transparent",
    cursor: "pointer",
    transition: "all 150ms",
  });

  return (
    <div>
      {/* Tab navigation */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--k-border)",
          marginBottom: 20,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            style={tabStyle(activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <OverviewTab account={account} balance={balance} />
      )}

      {activeTab === "orders" && (
        <div>
          {orderRows.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--k-text-muted)" }}>
              이 거래처의 주문 이력이 없습니다.
            </p>
          ) : (
            <Table<OrderRow>
              columns={orderColumns}
              data={orderRows}
              renderCell={(
                key: keyof OrderRow & string,
                value: unknown,
                row: OrderRow,
              ) => {
                if (key === "total")
                  return `${row.currency} ${formatNumber(value as number)}`;
                if (key === "status")
                  return (
                    <Badge
                      variant={statusBadgeVariant(value as OrderStatus)}
                    >
                      {value as string}
                    </Badge>
                  );
                return String(value ?? "");
              }}
            />
          )}
        </div>
      )}

      {activeTab === "payments" && (
        <div>
          {paymentRows.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--k-text-muted)" }}>
              이 거래처의 수금 이력이 없습니다.
            </p>
          ) : (
            <Table<PaymentRow>
              columns={paymentColumns}
              data={paymentRows}
              renderCell={(
                key: keyof PaymentRow & string,
                value: unknown,
              ) => {
                if (key === "amount" || key === "krwEquivalent")
                  return formatNumber(value as number);
                return String(value ?? "");
              }}
            />
          )}
        </div>
      )}

      {activeTab === "addresses" && (
        <div>
          {addressRows.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--k-text-muted)" }}>
              등록된 배송지가 없습니다.
            </p>
          ) : (
            <Table<AddressRow>
              columns={addressColumns}
              data={addressRows}
              renderCell={(
                key: keyof AddressRow & string,
                value: unknown,
              ) => {
                if (key === "isPrimary") {
                  return value ? (
                    <Badge variant="confirmed">주요</Badge>
                  ) : (
                    ""
                  );
                }
                if (key === "defaultIncoterm") {
                  const v = value as string;
                  return v ? <Badge variant="pending">{v}</Badge> : "—";
                }
                return String(value ?? "");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
