"use client";

import { useState, useMemo } from "react";
import PageHeader from "../../_components/PageHeader";
import StatCard from "../../_components/StatCard";
import Button from "../../_components/Button";
import Card from "../../_components/Card";
import Table, { type TableColumn } from "../../_components/Table";
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
  { key: "id", label: "상품번호", sortable: true, width: 130, mono: true },
  { key: "artistName", label: "아티스트", sortable: true, width: 90 },
  { key: "name", label: "상품명", sortable: true },
  { key: "category", label: "분류", sortable: true, width: 80 },
  { key: "weightG", label: "무게(g)", align: "right", sortable: true, width: 80, mono: true },
  { key: "orderBasedStock", label: "주문기준 재고", align: "right", sortable: true, width: 120, mono: true },
  { key: "shipmentBasedStock", label: "출고기준 재고", align: "right", sortable: true, width: 120, mono: true },
  { key: "diff", label: "차이", align: "right", sortable: true, width: 70, mono: true },
];

// ---------------------------------------------------------------------------
// Product Detail Drawer
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
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 40,
          transition: "opacity 120ms ease-out",
        }}
      />
      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 400,
          backgroundColor: "var(--k-bg-sub)",
          borderLeft: "1px solid var(--k-border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "-8px 0 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--k-border)",
          }}
        >
          <span
            style={{ fontSize: 15, fontWeight: 600, color: "var(--k-text)" }}
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
              border: "1px solid var(--k-border-strong)",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: "var(--k-text-muted)",
              cursor: "pointer",
              fontSize: 14,
              transition: "all 120ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--k-bg-raise)";
              e.currentTarget.style.color = "var(--k-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--k-text-muted)";
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
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Product Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoRow label="상품번호" value={row.id} mono />
            <InfoRow label="아티스트" value={row.artistName} />
            <InfoRow label="상품명" value={row.name} />
            <InfoRow label="분류" value={row.category} />
            <InfoRow label="무게" value={`${row.weightG.toLocaleString()}g`} mono />
          </div>

          {/* Stock Breakdown */}
          <div
            style={{
              padding: 16,
              borderRadius: 6,
              backgroundColor: "var(--k-bg)",
              border: "1px solid var(--k-border)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--k-text-muted)",
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
                    ? "var(--k-danger)"
                    : "var(--k-text)"
                }
                bgColor={
                  row.orderBasedStock < 0
                    ? "var(--k-danger-bg)"
                    : "var(--k-brand-subtle)"
                }
              />
              <StockCell
                label="출고기준"
                value={row.shipmentBasedStock}
                color="var(--k-text)"
                bgColor="var(--k-info-bg)"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 8,
                borderTop: "1px solid var(--k-border)",
              }}
            >
              <span
                style={{ fontSize: 12, color: "var(--k-text-muted)" }}
              >
                차이
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontVariantNumeric: "tabular-nums",
                  color:
                    row.diff > 0
                      ? "var(--k-success)"
                      : row.diff < 0
                        ? "var(--k-danger)"
                        : "var(--k-text-muted)",
                }}
              >
                {row.diff > 0 ? "+" : ""}
                {row.diff.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Related Orders */}
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
              관련 주문 {relatedOrders.length}건
            </span>
            {relatedOrders.slice(0, 5).map((o) => (
              <div
                key={o.id}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid var(--k-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 12,
                  transition: "background-color 120ms ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--k-bg-raise)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  style={{
                    color: "var(--k-text)",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  #{o.id}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color:
                      o.status === "주문완료"
                        ? "var(--k-success)"
                        : "var(--k-warning)",
                  }}
                >
                  {o.status}
                </span>
              </div>
            ))}
            {relatedOrders.length > 5 && (
              <span style={{ fontSize: 11, color: "var(--k-text-muted)" }}>
                외 {relatedOrders.length - 5}건
              </span>
            )}
            {relatedOrders.length === 0 && (
              <span style={{ fontSize: 12, color: "var(--k-text-subtle)" }}>
                관련 주문 없음
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 12, color: "var(--k-text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          color: "var(--k-text)",
          fontWeight: 500,
          ...(mono
            ? {
                fontFamily: "var(--font-jetbrains-mono)",
                fontVariantNumeric: "tabular-nums",
              }
            : {}),
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StockCell({
  label,
  value,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "8px 10px",
        borderRadius: 4,
        backgroundColor: bgColor,
      }}
    >
      <span style={{ fontSize: 11, color: "var(--k-text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "var(--font-jetbrains-mono)",
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
export default function SupabaseInventoryPage() {
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
      if (search && !row.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [allRows, artistFilter, categoryFilter, search]);

  // Stats
  const negativeOrderStockCount = allRows.filter(
    (r) => r.orderBasedStock < 0,
  ).length;

  const selectStyle: React.CSSProperties = {
    height: 32,
    padding: "0 10px",
    fontSize: 12,
    border: "1px solid var(--k-border-strong)",
    borderRadius: 6,
    backgroundColor: "var(--k-bg-sub)",
    color: "var(--k-text)",
    outline: "none",
    transition: "border-color 120ms ease-out",
  };

  const inputStyle: React.CSSProperties = {
    height: 32,
    padding: "0 10px",
    fontSize: 12,
    border: "1px solid var(--k-border-strong)",
    borderRadius: 6,
    backgroundColor: "var(--k-bg-sub)",
    color: "var(--k-text)",
    outline: "none",
    width: 200,
    transition: "border-color 120ms ease-out",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <PageHeader
        title="재고 현황"
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
          style={{ fontSize: 12, color: "var(--k-text-muted)", marginLeft: 4 }}
        >
          {filteredRows.length}건
        </span>
      </div>

      {/* Table */}
      <Card>
        <div style={{ margin: -16 }}>
          <Table<InventoryRow>
            columns={columns}
            data={filteredRows}
            onRowClick={(row) => setSelectedRow(row)}
            renderCell={(key, value, row) => {
              if (key === "id") {
                return (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(value)}
                  </span>
                );
              }

              if (key === "weightG") {
                return (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {(value as number).toLocaleString()}
                  </span>
                );
              }

              if (key === "orderBasedStock") {
                const v = value as number;
                return (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      color: v < 0 ? "var(--k-danger)" : "var(--k-text)",
                      backgroundColor:
                        v < 0 ? "var(--k-danger-bg)" : "var(--k-brand-subtle)",
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
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      backgroundColor: "var(--k-info-bg)",
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
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                      color:
                        v > 0
                          ? "var(--k-success)"
                          : v < 0
                            ? "var(--k-danger)"
                            : "var(--k-text-muted)",
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
