"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/lib/components/PageHeader";
import StatCard from "@/lib/components/StatCard";
import Button from "@/lib/components/Button";
import Card from "@/lib/components/Card";
import Table, { type TableColumn } from "@/lib/components/Table";
import StockCell from "@/lib/components/StockCell";
import ViewToggle, { type ViewToggleOption } from "@/lib/components/ViewToggle";
import {
  products,
  artists,
  orders,
  getShipmentBasedStock,
  getOrderBasedStock,
} from "@/lib/mock-data";
import type { ProductCategory } from "@/lib/types";

type ProductDbTab = "register" | "inbound" | "stock" | "purchase";

const PRODUCT_DB_TABS: readonly ViewToggleOption<ProductDbTab>[] = [
  { value: "register", label: "상품등록" },
  { value: "inbound", label: "입고" },
  { value: "stock", label: "재고" },
  { value: "purchase", label: "발주" },
];

// ---------------------------------------------------------------------------
// Row type for the inventory table
// ---------------------------------------------------------------------------
interface InventoryRow {
  [key: string]: unknown;
  id: string;
  sku: string;
  barcode: string;
  artistName: string;
  name: string;
  category: string;
  weightG: number;
  averagePurchasePrice: number;
  orderBasedStock: number;
  shipmentBasedStock: number;
  diff: number;
  artistId: string;
  productCategory: ProductCategory;
}

// ---------------------------------------------------------------------------
// Build rows (memoised inside component)
// ---------------------------------------------------------------------------
function buildRows(): InventoryRow[] {
  return products.map((p) => {
    const artist = artists.find((a) => a.id === p.artistId);
    const shipmentBased = getShipmentBasedStock(p.id);
    const orderBased = getOrderBasedStock(p.id);
    return {
      id: p.id,
      sku: `${artist?.name ?? "KODY"}-${p.id.split("-").at(-1)}`,
      barcode: `880${p.id.replace(/\D/g, "").padEnd(10, "0").slice(0, 10)}`,
      artistName: artist?.name ?? "",
      name: p.name,
      category: p.category,
      weightG: p.weightG,
      averagePurchasePrice: Math.round(p.priceKRW * 0.72),
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
  { key: "sku", label: "SKU", sortable: true, width: 120, mono: true },
  { key: "barcode", label: "바코드", sortable: true, width: 130, mono: true },
  { key: "artistName", label: "아티스트", sortable: true, width: 90 },
  { key: "name", label: "상품명", sortable: true },
  { key: "category", label: "분류", sortable: true, width: 80 },
  { key: "weightG", label: "무게(g)", align: "right", sortable: true, width: 80 },
  { key: "averagePurchasePrice", label: "평균매입가", align: "right", sortable: true, width: 100, mono: true },
  { key: "orderBasedStock", label: "주문기준 재고", align: "right", sortable: true, width: 110 },
  { key: "shipmentBasedStock", label: "출고기준 재고", align: "right", sortable: true, width: 110 },
  { key: "diff", label: "차이", align: "right", sortable: true, width: 70 },
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
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 40,
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
          backgroundColor: "var(--k-bg)",
          borderLeft: "1px solid var(--k-border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
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
              border: "1px solid var(--k-border)",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: "var(--k-text-muted)",
              cursor: "pointer",
              fontSize: 14,
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
            <InfoRow label="상품번호" value={row.id} />
            <InfoRow label="SKU" value={row.sku} />
            <InfoRow label="바코드" value={row.barcode} />
            <InfoRow label="아티스트" value={row.artistName} />
            <InfoRow label="상품명" value={row.name} />
            <InfoRow label="분류" value={row.category} />
            <InfoRow label="무게" value={`${row.weightG.toLocaleString()}g`} />
            <InfoRow
              label="평균매입가"
              value={`${row.averagePurchasePrice.toLocaleString()} KRW`}
            />
          </div>

          {/* Stock Breakdown */}
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: "var(--k-bg-sub)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "var(--k-table-head-text-transform)" as React.CSSProperties["textTransform"],
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
              />
              <StockCell
                label="출고기준"
                value={row.shipmentBasedStock}
                color="var(--k-text)"
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
                  fontVariantNumeric: "tabular-nums",
                  color:
                    row.diff > 0
                      ? "var(--k-success)"
                      : row.diff < 0
                        ? "var(--k-danger)"
                        : "var(--k-text)",
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
                textTransform: "var(--k-table-head-text-transform)" as React.CSSProperties["textTransform"],
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
                }}
              >
                <span style={{ color: "var(--k-text)", fontVariantNumeric: "tabular-nums" }}>
                  #{o.id}
                </span>
                <span
                  style={{
                    fontSize: 11,
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
      <span style={{ fontSize: 12, color: "var(--k-text-muted)" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: "var(--k-text)", fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function InventoryPage() {
  const allRows = useMemo(() => buildRows(), []);

  // Filters
  const [artistFilter, setArtistFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ProductDbTab>("stock");

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
    height: 28,
    padding: "0 8px",
    fontSize: 12,
    border: "1px solid var(--k-border)",
    borderRadius: 6,
    backgroundColor: "var(--k-surface)",
    color: "var(--k-text)",
    outline: "none",
  };

  const inputStyle: React.CSSProperties = {
    height: 28,
    padding: "0 10px",
    fontSize: 12,
    border: "1px solid var(--k-border)",
    borderRadius: 6,
    backgroundColor: "var(--k-surface)",
    color: "var(--k-text)",
    outline: "none",
    width: 200,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <PageHeader
        title="Product DB"
        helperText="상품등록·입고·재고·발주 mock을 같은 Product DB 흐름에서 확인합니다."
        actions={<Button disabled>신규 입고 등록</Button>}
      />

      <ViewToggle<ProductDbTab>
        options={PRODUCT_DB_TABS}
        value={activeTab}
        onChange={setActiveTab}
        ariaLabel="Product DB 탭"
      />

      {activeTab === "register" && (
        <PrototypePanel
          title="상품등록 mock"
          rows={[
            ["상품명", "ATEZ 신규 응원봉 V2"],
            ["SKU", "ATEZ-NEW-0412"],
            ["바코드", "880412000104"],
            ["무게", "360g"],
            ["평균매입가", "18,900 KRW"],
          ]}
        />
      )}

      {activeTab === "inbound" && (
        <PrototypePanel
          title="입고 mock"
          rows={[
            ["입고번호", "IN-260412-001"],
            ["상품", "LUVSTAR 2nd Mini GLOW"],
            ["수량", "+120"],
            ["담당자", "김하나"],
            ["메모", "초도 입고 검수 완료"],
          ]}
        />
      )}

      {activeTab === "purchase" && (
        <PrototypePanel
          title="발주 mock"
          rows={[
            ["발주번호", "PO-260412-003"],
            ["공급처", "KODY 국내 총판"],
            ["예상입고", "2026-04-18"],
            ["상태", "발주대기"],
            ["품목수", "6"],
          ]}
        />
      )}

      {activeTab === "stock" && (
        <>
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
              const cellBleedStyle = (bg: string): React.CSSProperties => ({
                margin: "0 calc(var(--k-pad-cell-x) * -1)",
                padding: "0 var(--k-pad-cell-x)",
                height: "var(--k-height-row)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                backgroundColor: bg,
                boxSizing: "border-box",
              });

              if (key === "weightG" || key === "averagePurchasePrice") {
                return (
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    {(value as number).toLocaleString()}
                  </span>
                );
              }

              if (key === "orderBasedStock") {
                const v = value as number;
                const isNeg = v < 0;

                const wrapperBg = isNeg
                  ? "var(--k-danger-bg)"
                  : "var(--k-inventory-col1-bg)";

                const negStyle: React.CSSProperties = isNeg
                  ? {
                      backgroundColor: "var(--k-highlight-red-bg)",
                      color: "var(--k-highlight-red)",
                      padding: "2px 10px",
                      borderRadius: "var(--k-radius-sm)",
                    }
                  : {};

                return (
                  <div style={cellBleedStyle(wrapperBg)}>
                    <span
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 500,
                        ...negStyle,
                      }}
                    >
                      {v.toLocaleString()}
                    </span>
                  </div>
                );
              }

              if (key === "shipmentBasedStock") {
                return (
                  <div style={cellBleedStyle("var(--k-inventory-col2-bg)")}>
                    <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
                      {(value as number).toLocaleString()}
                    </span>
                  </div>
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

          <StockAdjustmentMock />
        </>
      )}

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

// ---------------------------------------------------------------------------
// 재고조정 mock — interactive prototype: inline quantity edit + local log append.
// Mock-only. No backend/API contract; state lives in this component.
// ---------------------------------------------------------------------------
interface AdjustmentLogEntry {
  id: string;
  timestamp: string;
  product: string;
  before: number;
  after: number;
  delta: number;
  reason: string;
  actor: string;
}

const ADJUSTMENT_PRODUCT = "P-ATEZ-009 / ATEZ 키링 세트";
const ADJUSTMENT_INITIAL_STOCK = 120;
const ADJUSTMENT_ACTOR = "김하나";

function formatLogTimestamp(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function StockAdjustmentMock() {
  const [currentStock, setCurrentStock] = useState<number>(ADJUSTMENT_INITIAL_STOCK);
  const [draftStock, setDraftStock] = useState<string>(String(ADJUSTMENT_INITIAL_STOCK));
  const [reason, setReason] = useState<string>("실사 차이 조정");
  const [logEntries, setLogEntries] = useState<AdjustmentLogEntry[]>([]);

  const parsedDraft = Number.parseInt(draftStock, 10);
  const draftValid = Number.isFinite(parsedDraft);
  const delta = draftValid ? parsedDraft - currentStock : 0;
  const canApply = draftValid && delta !== 0 && reason.trim().length > 0;

  const handleApply = () => {
    if (!canApply) return;
    const entry: AdjustmentLogEntry = {
      id: `ADJ-${Date.now()}`,
      timestamp: formatLogTimestamp(new Date()),
      product: ADJUSTMENT_PRODUCT,
      before: currentStock,
      after: parsedDraft,
      delta,
      reason: reason.trim(),
      actor: ADJUSTMENT_ACTOR,
    };
    setLogEntries((prev) => [entry, ...prev]);
    setCurrentStock(parsedDraft);
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: 11,
    color: "var(--k-text-muted)",
    marginBottom: 6,
  };

  const fieldShellStyle: React.CSSProperties = {
    border: "1px solid var(--k-border)",
    borderRadius: 8,
    padding: "12px 14px",
    backgroundColor: "var(--k-bg-sub)",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle: React.CSSProperties = {
    height: 28,
    padding: "0 8px",
    fontSize: 13,
    border: "1px solid var(--k-border)",
    borderRadius: 6,
    backgroundColor: "var(--k-surface)",
    color: "var(--k-text)",
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <Card
      title="재고조정 mock"
      actions={
        <Button
          size="sm"
          onClick={handleApply}
          disabled={!canApply}
        >
          조정 적용
        </Button>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        <div style={fieldShellStyle}>
          <div style={fieldLabelStyle}>조정상품</div>
          <div
            style={{
              fontSize: 13,
              color: "var(--k-text)",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ADJUSTMENT_PRODUCT}
          </div>
        </div>

        <div style={fieldShellStyle}>
          <div style={fieldLabelStyle}>주문기준 재고 (현재)</div>
          <div
            style={{
              fontSize: 13,
              color: "var(--k-text)",
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentStock.toLocaleString()}
          </div>
        </div>

        <div style={fieldShellStyle}>
          <div style={fieldLabelStyle}>조정 후 수량</div>
          <input
            type="text"
            inputMode="numeric"
            pattern="-?[0-9]*"
            value={draftStock}
            onChange={(e) => {
              const next = e.target.value;
              if (next === "" || next === "-" || /^-?\d+$/.test(next)) {
                setDraftStock(next);
              }
            }}
            aria-label="조정 후 수량"
            data-testid="stock-adjustment-quantity-input"
            style={inputStyle}
          />
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              fontVariantNumeric: "tabular-nums",
              color:
                !draftValid
                  ? "var(--k-danger)"
                  : delta > 0
                    ? "var(--k-success)"
                    : delta < 0
                      ? "var(--k-danger)"
                      : "var(--k-text-muted)",
            }}
          >
            {!draftValid
              ? "숫자를 입력하세요"
              : `차이 ${delta > 0 ? "+" : ""}${delta.toLocaleString()}`}
          </div>
        </div>

        <div style={fieldShellStyle}>
          <div style={fieldLabelStyle}>변경사유</div>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            aria-label="변경사유"
            style={inputStyle}
          />
        </div>

        <div style={fieldShellStyle}>
          <div style={fieldLabelStyle}>변경자</div>
          <div
            style={{
              fontSize: 13,
              color: "var(--k-text)",
              fontWeight: 500,
            }}
          >
            {ADJUSTMENT_ACTOR}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          data-testid="stock-adjustment-log-count"
          data-log-count={logEntries.length}
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: "var(--k-table-head-text-transform)" as React.CSSProperties["textTransform"],
            letterSpacing: "0.05em",
            color: "var(--k-text-muted)",
          }}
        >
          변경로그 (mock) {logEntries.length}건
        </div>
        {logEntries.length === 0 ? (
          <div
            style={{
              fontSize: 12,
              color: "var(--k-text-muted)",
              padding: "8px 12px",
              border: "1px dashed var(--k-border)",
              borderRadius: 6,
            }}
          >
            아직 적용된 조정이 없습니다. 수량을 변경하고 &ldquo;조정 적용&rdquo;을 누르면 mock 로그가 추가됩니다.
          </div>
        ) : (
          logEntries.map((entry) => (
            <div
              key={entry.id}
              data-testid="stock-adjustment-log-row"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto auto",
                gap: 12,
                alignItems: "center",
                padding: "8px 12px",
                border: "1px solid var(--k-border)",
                borderRadius: 6,
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                color: "var(--k-text)",
              }}
            >
              <span style={{ color: "var(--k-text-muted)" }}>
                {entry.timestamp}
              </span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.product}
              </span>
              <span style={{ color: "var(--k-text-muted)" }}>
                {entry.before.toLocaleString()} → {entry.after.toLocaleString()}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color:
                    entry.delta > 0
                      ? "var(--k-success)"
                      : entry.delta < 0
                        ? "var(--k-danger)"
                        : "var(--k-text-muted)",
                }}
              >
                {entry.delta > 0 ? "+" : ""}
                {entry.delta.toLocaleString()}
              </span>
              <span style={{ color: "var(--k-text-muted)" }}>
                {entry.actor} · {entry.reason}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

function PrototypePanel({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <Card title={title}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {rows.map(([label, value]) => (
          <div
            key={label}
            style={{
              border: "1px solid var(--k-border)",
              borderRadius: 8,
              padding: "12px 14px",
              backgroundColor: "var(--k-bg-sub)",
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--k-text-muted)",
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--k-text)",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
