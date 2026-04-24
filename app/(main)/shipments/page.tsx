"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  orders,
  shipments,
  getAccountById,
  getProductById,
} from "@/lib/mock-data";
import Badge from "@/lib/components/Badge";
import Button from "@/lib/components/Button";
import Toast from "@/lib/components/Toast";
import PageHeader from "@/lib/components/PageHeader";
import Table, { type TableColumn } from "@/lib/components/Table";
import { formatNumber } from "@/lib/utils";
import type { Incoterm, ShipmentStatus } from "@/lib/types";

type PickingRow = Record<string, unknown> & {
  _select: "";
  orderItemId: string;
  orderId: string;
  accountName: string;
  productName: string;
  quantity: number;
  shippingAddress: string;
};

type ShipmentRow = Record<string, unknown> & {
  id: string;
  accountName: string;
  shippingAddress: string;
  shipDate: string;
  itemCount: number;
  totalAmount: number;
  incoterm: Incoterm;
  status: ShipmentStatus;
};

export default function ShipmentsPage() {
  const router = useRouter();

  // Left pane state
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [accountFilter, setAccountFilter] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Right pane state
  const [activeTab, setActiveTab] = useState<"출고대기" | "출고완료">("출고대기");

  // Derive picking queue: order items with 미출고 status from 주문완료 orders
  const pickingItems = useMemo<PickingRow[]>(() => {
    const result: PickingRow[] = [];
    for (const order of orders) {
      if (order.status !== "주문완료") continue;
      const account = getAccountById(order.accountId);
      const primaryAddr = account?.shippingAddresses.find((a) => a.isPrimary);
      for (const item of order.items) {
        if (item.shipmentStatus !== "미출고") continue;
        const product = getProductById(item.productId);
        result.push({
          _select: "",
          orderItemId: item.id,
          orderId: order.id,
          accountName: account?.name ?? "-",
          productName: product?.name ?? "-",
          quantity: item.quantity,
          shippingAddress: primaryAddr
            ? `${primaryAddr.label} (${primaryAddr.country})`
            : "-",
        });
      }
    }
    return result;
  }, []);

  // Apply filter
  const filteredPickingItems = useMemo(() => {
    if (!accountFilter.trim()) return pickingItems;
    const q = accountFilter.trim().toLowerCase();
    return pickingItems.filter((item) =>
      (item.accountName as string).toLowerCase().includes(q)
    );
  }, [pickingItems, accountFilter]);

  // Right pane data
  const filteredShipments = useMemo(() => {
    return shipments.filter((s) => s.status === activeTab);
  }, [activeTab]);

  const shipmentRows = useMemo<ShipmentRow[]>(() => {
    return filteredShipments.map((shipment) => {
      const account = getAccountById(shipment.accountId);
      const addr = account?.shippingAddresses.find(
        (a) => a.id === shipment.shippingAddressId
      );
      const totalAmount = shipment.items.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );
      return {
        id: shipment.id,
        accountName: account?.name ?? "-",
        shippingAddress: addr ? `${addr.label} (${addr.country})` : "-",
        shipDate: shipment.shipDate ?? "-",
        itemCount: shipment.items.length,
        totalAmount,
        incoterm: shipment.incoterm,
        status: shipment.status,
      };
    });
  }, [filteredShipments]);

  const pendingCount = shipments.filter((s) => s.status === "출고대기").length;
  const completedCount = shipments.filter(
    (s) => s.status === "출고완료"
  ).length;

  const toggleItem = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedItems((prev) => {
      if (prev.size === filteredPickingItems.length) return new Set();
      return new Set(filteredPickingItems.map((i) => i.orderItemId as string));
    });
  }, [filteredPickingItems]);

  const handleCreateShipment = useCallback(() => {
    setToastVisible(true);
  }, []);

  const pickingColumns: TableColumn<PickingRow>[] = useMemo(
    () => [
      {
        key: "_select",
        label: "",
        width: 36,
        align: "center",
        iconLeft: (
          <input
            type="checkbox"
            checked={
              filteredPickingItems.length > 0 &&
              selectedItems.size === filteredPickingItems.length
            }
            onChange={toggleAll}
            style={{ cursor: "pointer" }}
          />
        ),
      },
      { key: "orderItemId", label: "주문품목번호" },
      { key: "orderId", label: "주문번호" },
      { key: "accountName", label: "거래처" },
      { key: "productName", label: "품목명" },
      { key: "quantity", label: "수량", align: "right", mono: true, width: 60 },
      { key: "shippingAddress", label: "배송지" },
    ],
    [filteredPickingItems, selectedItems, toggleAll]
  );

  const shipmentColumns: TableColumn<ShipmentRow>[] = [
    { key: "id", label: "출고번호" },
    { key: "accountName", label: "거래처" },
    { key: "shippingAddress", label: "배송지" },
    { key: "shipDate", label: "출고일" },
    { key: "itemCount", label: "품목 수", align: "right", mono: true },
    { key: "totalAmount", label: "합계액", align: "right", mono: true },
    { key: "incoterm", label: "인코템즈", align: "center" },
    { key: "status", label: "상태", align: "center" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PageHeader
        title="출고"
        helperText="이 화면에서는 피킹 대기 품목을 모아 출고리스트를 만들고 진행 상태를 관리합니다."
      />

      {/* Split pane */}
      <div
        style={{
          display: "flex",
          flex: 1,
          border: "1px solid var(--k-border)",
          borderRadius: 8,
          backgroundColor: "var(--k-surface)",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Left pane — 피킹 대기 품목 */}
        <div
          style={{
            flex: "0 0 55%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--k-border)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 16px 12px",
              borderBottom: "1px solid var(--k-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--k-text)",
                  }}
                >
                  피킹 대기
                </span>
                <Badge variant="warning">{pickingItems.length}</Badge>
              </div>
            </div>
            {/* Filter */}
            <input
              type="text"
              placeholder="거래처 검색..."
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
              style={{
                width: "100%",
                height: 28,
                padding: "0 10px",
                fontSize: 12,
                border: "1px solid var(--k-border)",
                borderRadius: 6,
                backgroundColor: "var(--k-bg)",
                color: "var(--k-text)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Table<PickingRow>
              columns={pickingColumns}
              data={filteredPickingItems}
              stickyHeader
              renderCell={(key, value, row) => {
                if (key === "_select") {
                  return (
                    <input
                      type="checkbox"
                      checked={selectedItems.has(row.orderItemId as string)}
                      onChange={() => toggleItem(row.orderItemId as string)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                }
                if (key === "quantity") return formatNumber(value as number, 0);
                if (
                  key === "accountName" ||
                  key === "productName" ||
                  key === "shippingAddress"
                ) {
                  return (
                    <Ellipsis maxWidth={200}>{String(value ?? "")}</Ellipsis>
                  );
                }
                return String(value ?? "");
              }}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--k-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "var(--k-text-muted)",
              }}
            >
              {selectedItems.size}개 선택됨
            </span>
            <Button
              size="sm"
              disabled={selectedItems.size === 0}
              onClick={handleCreateShipment}
            >
              선택한 품목으로 출고리스트 생성
            </Button>
          </div>
        </div>

        {/* Right pane — 출고리스트 */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--k-border)",
            }}
          >
            {(["출고대기", "출고완료"] as const).map((tab) => {
              const count = tab === "출고대기" ? pendingCount : completedCount;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--k-brand)" : "var(--k-text-muted)",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: isActive
                      ? "2px solid var(--k-brand)"
                      : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 150ms ease-out",
                  }}
                >
                  {tab}
                  <span
                    style={{
                      fontSize: 11,
                      padding: "1px 6px",
                      borderRadius: 10,
                      backgroundColor: isActive
                        ? "var(--k-brand-bg)"
                        : "var(--k-bg-sub)",
                      color: isActive ? "var(--k-brand)" : "var(--k-text-muted)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Table<ShipmentRow>
              columns={shipmentColumns}
              data={shipmentRows}
              stickyHeader
              onRowClick={(row) => router.push(`/shipments/${row.id}`)}
              renderCell={(key, value, row) => {
                if (key === "id")
                  return (
                    <span style={{ color: "var(--k-brand)", fontWeight: 500 }}>
                      {row.id}
                    </span>
                  );
                if (key === "totalAmount")
                  return formatNumber(Math.round(value as number), 0);
                if (key === "itemCount")
                  return formatNumber(value as number, 0);
                if (key === "incoterm")
                  return <Badge variant="shipped">{value as string}</Badge>;
                if (key === "status")
                  return (
                    <Badge
                      variant={value === "출고대기" ? "pending" : "confirmed"}
                    >
                      {value as string}
                    </Badge>
                  );
                if (key === "accountName")
                  return (
                    <Ellipsis maxWidth={140}>{String(value ?? "")}</Ellipsis>
                  );
                if (key === "shippingAddress")
                  return (
                    <Ellipsis maxWidth={120}>{String(value ?? "")}</Ellipsis>
                  );
                return String(value ?? "");
              }}
            />
          </div>
        </div>
      </div>

      <Toast
        message="프로토타입입니다. 실제 출고리스트 생성은 지원되지 않습니다."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

function Ellipsis({
  maxWidth,
  children,
}: {
  maxWidth: number;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        maxWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
      }}
    >
      {children}
    </span>
  );
}
