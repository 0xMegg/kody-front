"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/lib/components/PageHeader";
import Button from "@/lib/components/Button";
import Table, { type TableColumn } from "@/lib/components/Table";
import Badge from "@/lib/components/Badge";
import ViewToggle, { type ViewToggleOption } from "@/lib/components/ViewToggle";
import { useThemeOptional } from "@/lib/theme/ThemeContext";
import {
  orders,
  getAccountById,
  getProductById,
  salesRepNames,
} from "@/lib/mock-data";
import type { Order, OrderItem, Currency, OrderStatus } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

const PAGE_SIZE = 20;

type ViewMode = "order" | "item";

const VIEW_OPTIONS: readonly ViewToggleOption<ViewMode>[] = [
  { value: "order", label: "주문서 뷰" },
  { value: "item", label: "품목 뷰" },
] as const;

// ---------------------------------------------------------------------------
// Row types for Table<T>
// ---------------------------------------------------------------------------
type OrderRow = Record<string, unknown> & {
  id: string;
  orderDate: string;
  accountName: string;
  salesRep: string;
  currency: Currency;
  total: number;
  status: OrderStatus;
  shipmentSummary: string;
};

type OrderItemRow = Record<string, unknown> & {
  id: string;
  orderId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  subtotal: number;
  shipmentStatus: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildOrderRow(o: Order): OrderRow {
  const itemsTotal = o.items.reduce((s, i) => s + i.subtotal, 0);
  const total = itemsTotal + o.shippingFee + o.remittanceFee;
  const account = getAccountById(o.accountId);
  const shipped = o.items.filter((i) => i.shipmentStatus === "출고완료").length;
  return {
    id: o.id,
    orderDate: o.orderDate,
    accountName: account?.name ?? o.accountId,
    salesRep: salesRepNames[o.salesRepId] ?? o.salesRepId,
    currency: o.currency,
    total,
    status: o.status,
    shipmentSummary: `${shipped}/${o.items.length} 출고완료`,
  };
}

function buildItemRow(item: OrderItem): OrderItemRow {
  const product = getProductById(item.productId);
  return {
    id: item.id,
    orderId: item.orderId,
    productName: product?.name ?? item.productId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    discountRate: item.discountRate,
    subtotal: item.subtotal,
    shipmentStatus: item.shipmentStatus,
  };
}

function statusBadgeVariant(s: OrderStatus) {
  if (s === "주문대기") return "pending";
  if (s === "주문완료") return "confirmed";
  return "cancelled";
}

function shipmentBadgeVariant(s: string) {
  if (s === "출고완료") return "confirmed";
  if (s === "출고대기") return "pending";
  return "warning"; // 미출고
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------
const orderColumns: TableColumn<OrderRow>[] = [
  { key: "id", label: "주문번호", sortable: true, mono: true },
  { key: "orderDate", label: "주문일", sortable: true },
  { key: "accountName", label: "거래처", sortable: true },
  { key: "salesRep", label: "담당자" },
  { key: "currency", label: "통화", mono: true },
  { key: "total", label: "주문합계액", align: "right", sortable: true, mono: true },
  { key: "status", label: "주문상태" },
  { key: "shipmentSummary", label: "출고상태 요약" },
];

const itemColumns: TableColumn<OrderItemRow>[] = [
  { key: "id", label: "주문품목번호", sortable: true, mono: true },
  { key: "orderId", label: "주문번호", sortable: true, mono: true },
  { key: "productName", label: "품목명", sortable: true },
  { key: "quantity", label: "수량", align: "right", sortable: true, mono: true },
  { key: "unitPrice", label: "단가", align: "right", sortable: true, mono: true },
  { key: "discountRate", label: "할인율", align: "right" },
  { key: "subtotal", label: "소계", align: "right", sortable: true, mono: true },
  { key: "shipmentStatus", label: "출고상태" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function FilterBar({
  view,
  onViewChange,
  statusFilter,
  onStatusChange,
  currencyFilter,
  onCurrencyChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  accountSearch,
  onAccountSearchChange,
}: {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  currencyFilter: string;
  onCurrencyChange: (v: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  accountSearch: string;
  onAccountSearchChange: (v: string) => void;
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
        marginBottom: 16,
      }}
    >
      {/* View toggle */}
      <ViewToggle<ViewMode>
        options={VIEW_OPTIONS}
        value={view}
        onChange={onViewChange}
        ariaLabel="주문/품목 뷰 전환"
      />

      {/* Status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">전체 상태</option>
        <option value="주문대기">주문대기</option>
        <option value="주문완료">주문완료</option>
        <option value="주문중지">주문중지</option>
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

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function OrdersPage() {
  const router = useRouter();
  const theme = useThemeOptional()?.theme ?? "linear";
  const helperText =
    theme === "notion"
      ? "주문서 뷰로 결제를 관리하고, 품목 뷰로 출고를 준비합니다."
      : undefined;

  // Filter state
  const [view, setView] = useState<ViewMode>("order");
  const [statusFilter, setStatusFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("2026-02-01");
  const [dateTo, setDateTo] = useState("2026-04-30");
  const [accountSearch, setAccountSearch] = useState("");
  const [page, setPage] = useState(0);

  // Reset page on filter change
  const changeFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(0);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter && o.status !== statusFilter) return false;
      if (currencyFilter && o.currency !== currencyFilter) return false;
      if (dateFrom && o.orderDate < dateFrom) return false;
      if (dateTo && o.orderDate > dateTo) return false;
      if (accountSearch) {
        const acc = getAccountById(o.accountId);
        const name = acc?.name ?? "";
        if (!name.toLowerCase().includes(accountSearch.toLowerCase()))
          return false;
      }
      return true;
    });
  }, [statusFilter, currencyFilter, dateFrom, dateTo, accountSearch]);

  // Order rows
  const orderRows = useMemo(
    () => filteredOrders.map(buildOrderRow),
    [filteredOrders],
  );

  // Item rows (flattened)
  const itemRows = useMemo(
    () => filteredOrders.flatMap((o) => o.items.map(buildItemRow)),
    [filteredOrders],
  );

  const activeData = view === "order" ? orderRows : itemRows;
  const paginatedData = activeData.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <div>
      <PageHeader
        breadcrumb="주문"
        title="주문"
        helperText={helperText}
        actions={
          <Button onClick={() => router.push("/orders/new")}>
            새 주문
          </Button>
        }
      />

      <FilterBar
        view={view}
        onViewChange={changeFilter(setView)}
        statusFilter={statusFilter}
        onStatusChange={changeFilter(setStatusFilter)}
        currencyFilter={currencyFilter}
        onCurrencyChange={changeFilter(setCurrencyFilter)}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={changeFilter(setDateFrom)}
        onDateToChange={changeFilter(setDateTo)}
        accountSearch={accountSearch}
        onAccountSearchChange={changeFilter(setAccountSearch)}
      />

      {view === "order" ? (
        <Table<OrderRow>
          columns={orderColumns}
          data={paginatedData as OrderRow[]}
          onRowClick={(row: OrderRow) =>
            router.push(`/orders/${row.id}`)
          }
          renderCell={(
            key: keyof OrderRow & string,
            value: unknown,
            row: OrderRow,
          ) => {
            if (key === "total")
              return `${row.currency} ${formatNumber(value as number)}`;
            if (key === "status")
              return (
                <Badge variant={statusBadgeVariant(value as OrderStatus)}>
                  {value as string}
                </Badge>
              );
            return String(value ?? "");
          }}
        />
      ) : (
        <Table<OrderItemRow>
          columns={itemColumns}
          data={paginatedData as OrderItemRow[]}
          onRowClick={(row: OrderItemRow) =>
            router.push(`/orders/${row.orderId}#${row.id}`)
          }
          renderCell={(key: keyof OrderItemRow & string, value: unknown) => {
            if (key === "unitPrice" || key === "subtotal")
              return formatNumber(value as number);
            if (key === "discountRate")
              return `${((value as number) * 100).toFixed(0)}%`;
            if (key === "shipmentStatus")
              return (
                <Badge variant={shipmentBadgeVariant(value as string)}>
                  {value as string}
                </Badge>
              );
            return String(value ?? "");
          }}
        />
      )}

      <Pagination
        page={page}
        total={activeData.length}
        onPageChange={setPage}
      />
    </div>
  );
}
