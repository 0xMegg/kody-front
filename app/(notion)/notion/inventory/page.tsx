"use client";

import { useState, useMemo } from "react";
import PageHeader from "../../_components/PageHeader";
import StatCard from "../../_components/StatCard";
import Button from "../../_components/Button";
import Card from "../../_components/Card";
import Table, { type TableColumn } from "../../_components/Table";
import Badge from "../../_components/Badge";
import {
  products,
  artists,
  orders,
  getShipmentBasedStock,
  getOrderBasedStock,
} from "@/lib/mock-data";
import type { ProductCategory } from "@/lib/types";

// ---------------------------------------------------------------------------
// Row type for the inventory table
// ---------------------------------------------------------------------------
interface InventoryRow {
  [key: string]: unknown;
  id: string;
  artistName: string;
  name: string;
  category: string;
  weightG: number;
  orderBasedStock: number;
  shipmentBasedStock: number;
  diff: number;
  artistId: string;
  productCategory: ProductCategory;
}

// ---------------------------------------------------------------------------
// Build rows
// ---------------------------------------------------------------------------
function buildRows(): InventoryRow[] {
  return products.map((p) => {
    const artist = artists.find((a) => a.id === p.artistId);
    const shipmentBased = getShipmentBasedStock(p.id);
    const orderBased = getOrderBasedStock(p.id);
    return {
      id: p.id,
      artistName: artist?.name ?? "",
      name: p.name,
      category: p.category,
      weightG: p.weightG,
      orderBasedStock: orderBased,
      shipmentBasedStock: shipmentBased,
      diff: shipmentBased - orderBased,
      artistId: p.artistId,
      productCategory: p.category,
    };
  });
}

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------
const columns: TableColumn<InventoryRow>[] = [
  { key: "id", label: "상품번호", sortable: true, width: 130 },
  { key: "artistName", label: "아티스트", sortable: true, width: 90 },
  { key: "name", label: "상품명", sortable: true },
  { key: "category", label: "분류", sortable: true, width: 80 },
  { key: "weightG", label: "무게(g)", align: "right", sortable: true, width: 80 },
  { key: "orderBasedStock", label: "주문기준 재고", align: "right", sortable: true, width: 110 },
  { key: "shipmentBasedStock", label: "출고기준 재고", align: "right", sortable: true, width: 110 },
  { key: "diff", label: "차이", align: "right", sortable: true, width: 70 },
];

// ---------------------------------------------------------------------------
// Product Detail Drawer (Notion style)
// ---------------------------------------------------------------------------
function ProductDrawer({
  row,
  onClose,
}: {
  row: InventoryRow;
  onClose: () => void;
}) {
  const relatedOrders = orders.filter(
    (o) =>
      o.status !== "주문중지" &&
      o.items.some((item) => item.productId === row.id),
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 15, 15, 0.6)",
          zIndex: 40,
          transition: "opacity 180ms ease",
        }}
      />
      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 420,
          backgroundColor: "var(--n-surface)",
          borderLeft: "1px solid var(--n-border)",
          borderRadius: "3px 0 0 3px",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.06) 0px 3px 6px, rgba(15, 15, 15, 0.12) 0px 9px 24px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--n-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-source-serif)",
              fontSize: 17,
              fontWeight: 600,
              color: "var(--n-text)",
            }}
          >
            상품 상세
          </span>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--n-border)",
              borderRadius: 3,
              backgroundColor: "transparent",
              color: "var(--n-text-muted)",
              cursor: "pointer",
              fontSize: 14,
              transition: "background-color 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--n-bg-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Product Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoRow label="상품번호" value={row.id} />
            <InfoRow label="아티스트" value={row.artistName} />
            <InfoRow label="상품명" value={row.name} />
            <InfoRow label="분류" value={row.category} />
            <InfoRow label="무게" value={`${row.weightG.toLocaleString()}g`} />
          </div>

          {/* Stock Breakdown */}
          <div
            style={{
              padding: 20,
              borderRadius: 3,
              backgroundColor: "var(--n-bg-sub)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-source-serif)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--n-text)",
              }}
            >
              재고 현황
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <StockCell
                label="주문기준"
                value={row.orderBasedStock}
                color={
                  row.orderBasedStock < 0
                    ? "var(--n-danger)"
                    : "var(--n-text)"
                }
              />
              <StockCell
                label="출고기준"
                value={row.shipmentBasedStock}
                color="var(--n-text)"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 10,
                borderTop: "1px solid var(--n-border)",
              }}
            >
              <span
                style={{ fontSize: 13, color: "var(--n-text-muted)" }}
              >
                차이
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color:
                    row.diff > 0
                      ? "var(--n-success)"
                      : row.diff < 0
                        ? "var(--n-danger)"
                        : "var(--n-text)",
                }}
              >
                {row.diff > 0 ? "+" : ""}
                {row.diff.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Related Orders */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                fontFamily: "var(--font-source-serif)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--n-text)",
              }}
            >
              관련 주문 {relatedOrders.length}건
            </span>
            {relatedOrders.slice(0, 5).map((o) => (
              <div
                key={o.id}
                style={{
                  padding: "10px 14px",
                  borderRadius: 3,
                  border: "1px solid var(--n-border)",
                  backgroundColor: "var(--n-surface)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "var(--n-text)", fontVariantNumeric: "tabular-nums" }}>
                  #{o.id}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color:
                      o.status === "주문완료"
                        ? "var(--n-success)"
                        : "var(--n-warning)",
                  }}
                >
                  {o.status}
                </span>
              </div>
            ))}
            {relatedOrders.length > 5 && (
              <span style={{ fontSize: 12, color: "var(--n-text-muted)" }}>
                외 {relatedOrders.length - 5}건
              </span>
            )}
          </div>

          {/* Inbound/Outbound History Stub */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-source-serif)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--n-text)",
              }}
            >
              입/출고 이력
            </span>
            <p
              style={{
                fontSize: 14,
                color: "var(--n-text-muted)",
                margin: 0,
                padding: "12px 14px",
                borderRadius: 3,
                backgroundColor: "var(--n-bg-sub)",
              }}
            >
              입/출고 이력 데이터는 프로토타입에서 제공하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 13, color: "var(--n-text-muted)" }}>
        {label}
      </span>
      <span style={{ fontSize: 14, color: "var(--n-text)", fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}

function StockCell({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "var(--n-text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 20,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          color,
        }}
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function NotionInventoryPage() {
  const allRows = useMemo(() => buildRows(), []);

  // Filters
  const [artistFilter, setArtistFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Drawer
  const [selectedRow, setSelectedRow] = useState<InventoryRow | null>(null);

  // Filter logic
  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      if (artistFilter !== "all" && row.artistId !== artistFilter) return false;
      if (categoryFilter !== "all" && row.productCategory !== categoryFilter)
        return false;
      if (
        search &&
        !row.name.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allRows, artistFilter, categoryFilter, search]);

  // Stats
  const negativeOrderStockCount = allRows.filter(
    (r) => r.orderBasedStock < 0,
  ).length;

  const selectStyle: React.CSSProperties = {
    height: 30,
    padding: "0 10px",
    fontSize: 14,
    border: "1px solid var(--n-border)",
    borderRadius: 3,
    backgroundColor: "var(--n-surface)",
    color: "var(--n-text)",
    outline: "none",
  };

  const inputStyle: React.CSSProperties = {
    height: 30,
    padding: "0 12px",
    fontSize: 14,
    border: "1px solid var(--n-border)",
    borderRadius: 3,
    backgroundColor: "var(--n-surface)",
    color: "var(--n-text)",
    outline: "none",
    width: 220,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <PageHeader
        breadcrumb="Notion / 재고"
        title="재고 현황"
        helperText="이 화면에서는 품목별 재고 현황을 확인할 수 있습니다"
        actions={<Button disabled>신규 입고 등록</Button>}
      />

      {/* Summary Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <StatCard label="총 품목 수" value={String(products.length)} />
        <StatCard
          label="주문기준 음수 품목"
          value={String(negativeOrderStockCount)}
          trend={negativeOrderStockCount > 0 ? "down" : "neutral"}
          trendLabel="조달 필요"
        />
        {/* Hardcoded — no inbound-receipt entity in mock data */}
        <StatCard label="오늘 입고 수량" value="12" trend="up" trendLabel="건" />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <select
          value={artistFilter}
          onChange={(e) => setArtistFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">전체 아티스트</option>
          {artists.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">전체 분류</option>
          <option value="앨범">앨범</option>
          <option value="포토카드">포토카드</option>
          <option value="굿즈">굿즈</option>
        </select>

        <input
          type="text"
          placeholder="상품명 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <span
          style={{ fontSize: 13, color: "var(--n-text-muted)", marginLeft: 4 }}
        >
          {filteredRows.length}건
        </span>
      </div>

      {/* Table */}
      <Card>
        <div style={{ margin: -20 }}>
          <Table<InventoryRow>
            columns={columns}
            data={filteredRows}
            onRowClick={(row) => setSelectedRow(row)}
            renderCell={(key, value, row) => {

              if (key === "weightG") {
                return (
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {(value as number).toLocaleString()}
                  </span>
                );
              }

              if (key === "orderBasedStock") {
                const v = value as number;
                if (v < 0) {
                  return <Badge variant="음수재고">{v.toLocaleString()}</Badge>;
                }
                return (
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      backgroundColor: "color-mix(in srgb, var(--n-blue-bg) 30%, transparent)",
                      padding: "2px 8px",
                      borderRadius: 3,
                    }}
                  >
                    {v.toLocaleString()}
                  </span>
                );
              }

              if (key === "shipmentBasedStock") {
                return (
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      backgroundColor: "color-mix(in srgb, var(--n-green-bg) 30%, transparent)",
                      padding: "2px 8px",
                      borderRadius: 3,
                    }}
                  >
                    {(value as number).toLocaleString()}
                  </span>
                );
              }

              if (key === "diff") {
                const v = row.diff as number;
                return (
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      color:
                        v > 0
                          ? "var(--n-success)"
                          : v < 0
                            ? "var(--n-danger)"
                            : "var(--n-text-muted)",
                    }}
                  >
                    {v > 0 ? "+" : ""}
                    {v.toLocaleString()}
                  </span>
                );
              }

              return String(value ?? "");
            }}
          />
        </div>
      </Card>

      {/* Drawer */}
      {selectedRow && (
        <ProductDrawer
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
