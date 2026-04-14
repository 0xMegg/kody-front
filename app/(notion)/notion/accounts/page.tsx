"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/(notion)/_components/PageHeader";
import Button from "@/app/(notion)/_components/Button";
import Table, { type TableColumn } from "@/app/(notion)/_components/Table";
import {
  accounts,
  getBalanceByAccount,
  salesRepNames,
} from "@/lib/mock-data";

const PAGE_SIZE = 20;

// ---------------------------------------------------------------------------
// Row type for Table<T>
// ---------------------------------------------------------------------------
type AccountRow = Record<string, unknown> & {
  id: string;
  name: string;
  representative: string;
  salesRep: string;
  salesRepId: string;
  discountRate: number;
  balanceKRW: number;
  relatedCount: number;
  addressCount: number;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
}

function buildAccountRow(acc: (typeof accounts)[number]): AccountRow {
  const balance = getBalanceByAccount(acc.id);
  return {
    id: acc.id,
    name: acc.name,
    representative: acc.representative,
    salesRep: salesRepNames[acc.salesRepId] ?? acc.salesRepId,
    salesRepId: acc.salesRepId,
    discountRate: acc.defaultDiscountRate,
    balanceKRW: balance.totalKRW,
    relatedCount: acc.relatedAccountIds.length,
    addressCount: acc.shippingAddresses.length,
  };
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------
const columns: TableColumn<AccountRow>[] = [
  { key: "name", label: "거래처명", sortable: true },
  { key: "representative", label: "대표자" },
  { key: "salesRep", label: "담당자" },
  { key: "discountRate", label: "기본 할인율", align: "right" },
  { key: "balanceKRW", label: "잔액 (KRW 환산)", align: "right", sortable: true },
  { key: "relatedCount", label: "관계 거래처", align: "center" },
  { key: "addressCount", label: "배송지 수", align: "center" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function FilterBar({
  search,
  onSearchChange,
  salesRepFilter,
  onSalesRepChange,
  balanceOnly,
  onBalanceOnlyChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  salesRepFilter: string;
  onSalesRepChange: (v: string) => void;
  balanceOnly: boolean;
  onBalanceOnlyChange: (v: boolean) => void;
}) {
  const inputStyle: React.CSSProperties = {
    height: 32,
    padding: "0 10px",
    fontSize: 15,
    border: "1px solid var(--k-border)",
    borderRadius: 3,
    backgroundColor: "var(--k-bg)",
    color: "var(--k-text)",
    outline: "none",
    transition: "border-color 180ms ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <input
        type="text"
        placeholder="거래처 검색"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ ...inputStyle, minWidth: 200 }}
      />

      <select
        value={salesRepFilter}
        onChange={(e) => onSalesRepChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">전체 담당자</option>
        {Object.entries(salesRepNames).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 15,
          color: "var(--k-text-muted)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={balanceOnly}
          onChange={(e) => onBalanceOnlyChange(e.target.checked)}
        />
        잔액 있음만
      </label>
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
        padding: "16px 0",
        fontSize: 15,
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
export default function NotionAccountsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [salesRepFilter, setSalesRepFilter] = useState("");
  const [balanceOnly, setBalanceOnly] = useState(false);
  const [page, setPage] = useState(0);

  const changeFilter = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(0);
  };

  const rows = useMemo(() => {
    const allRows = accounts.map(buildAccountRow);
    return allRows.filter((row) => {
      if (search && !row.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (salesRepFilter && row.salesRepId !== salesRepFilter) return false;
      if (balanceOnly && row.balanceKRW === 0) return false;
      return true;
    });
  }, [search, salesRepFilter, balanceOnly]);

  const paginatedRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="거래처"
        helperText="이 화면에서는 거래처를 검색하고 상세 정보를 확인할 수 있습니다"
        actions={
          <Button variant="secondary" onClick={() => {}}>
            새 거래처
          </Button>
        }
      />

      <FilterBar
        search={search}
        onSearchChange={changeFilter(setSearch)}
        salesRepFilter={salesRepFilter}
        onSalesRepChange={changeFilter(setSalesRepFilter)}
        balanceOnly={balanceOnly}
        onBalanceOnlyChange={changeFilter(setBalanceOnly)}
      />

      <Table<AccountRow>
        columns={columns}
        data={paginatedRows}
        onRowClick={(row: AccountRow) =>
          router.push(`/notion/accounts/${row.id}`)
        }
        renderCell={(
          key: keyof AccountRow & string,
          value: unknown,
        ) => {
          if (key === "discountRate")
            return `${((value as number) * 100).toFixed(0)}%`;
          if (key === "balanceKRW") {
            const n = value as number;
            return (
              <span
                style={{
                  color: n < 0 ? "var(--k-danger)" : undefined,
                }}
              >
                {formatNumber(Math.round(n))}
              </span>
            );
          }
          if (key === "relatedCount") {
            const count = value as number;
            return count > 0 ? `${count}개` : "—";
          }
          if (key === "addressCount") return `${value as number}`;
          return String(value ?? "");
        }}
      />

      <Pagination page={page} total={rows.length} onPageChange={setPage} />
    </div>
  );
}
