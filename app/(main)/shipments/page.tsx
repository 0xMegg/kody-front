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

interface PickingItem {
  orderItemId: string;
  orderId: string;
  accountName: string;
  productName: string;
  quantity: number;
  shippingAddress: string;
}

export default function ShipmentsPage() {
  const router = useRouter();

  // Left pane state
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [accountFilter, setAccountFilter] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Right pane state
  const [activeTab, setActiveTab] = useState<"출고대기" | "출고완료">("출고대기");

  // Derive picking queue: order items with 미출고 status from 주문완료 orders
  const pickingItems = useMemo<PickingItem[]>(() => {
    const result: PickingItem[] = [];
    for (const order of orders) {
      if (order.status !== "주문완료") continue;
      const account = getAccountById(order.accountId);
      const primaryAddr = account?.shippingAddresses.find((a) => a.isPrimary);
      for (const item of order.items) {
        if (item.shipmentStatus !== "미출고") continue;
        const product = getProductById(item.productId);
        result.push({
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
      item.accountName.toLowerCase().includes(q)
    );
  }, [pickingItems, accountFilter]);

  // Right pane data
  const filteredShipments = useMemo(() => {
    return shipments.filter((s) => s.status === activeTab);
  }, [activeTab]);

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
      return new Set(filteredPickingItems.map((i) => i.orderItemId));
    });
  }, [filteredPickingItems]);

  const handleCreateShipment = useCallback(() => {
    setToastVisible(true);
  }, []);

  const fmt = (n: number) => n.toLocaleString("ko-KR");

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
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <thead>
                <tr>
                  {[
                    { label: "☐", width: 36, align: "center" as const },
                    { label: "주문품목번호", width: undefined, align: "left" as const },
                    { label: "주문번호", width: undefined, align: "left" as const },
                    { label: "거래처", width: undefined, align: "left" as const },
                    { label: "품목명", width: undefined, align: "left" as const },
                    { label: "수량", width: 60, align: "right" as const },
                    { label: "배송지", width: undefined, align: "left" as const },
                  ].map((col, i) => (
                    <th
                      key={i}
                      style={{
                        height: 32,
                        padding: "0 12px",
                        backgroundColor: "var(--k-bg-sub)",
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--k-text-muted)",
                        textAlign: col.align,
                        whiteSpace: "nowrap",
                        width: col.width,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {i === 0 ? (
                        <input
                          type="checkbox"
                          checked={
                            filteredPickingItems.length > 0 &&
                            selectedItems.size === filteredPickingItems.length
                          }
                          onChange={toggleAll}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPickingItems.map((item) => (
                  <tr
                    key={item.orderItemId}
                    style={{ transition: "background-color 100ms ease-out" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--k-bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      style={{
                        height: 36,
                        padding: "0 12px",
                        borderBottom: "1px solid var(--k-border)",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.orderItemId)}
                        onChange={() => toggleItem(item.orderItemId)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    {[
                      { value: item.orderItemId, align: "left" as const },
                      { value: item.orderId, align: "left" as const },
                      { value: item.accountName, align: "left" as const },
                      { value: item.productName, align: "left" as const },
                      { value: fmt(item.quantity), align: "right" as const },
                      { value: item.shippingAddress, align: "left" as const },
                    ].map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                          textAlign: cell.align,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 200,
                        }}
                      >
                        {cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <thead>
                <tr>
                  {[
                    { label: "출고번호", align: "left" as const },
                    { label: "거래처", align: "left" as const },
                    { label: "배송지", align: "left" as const },
                    { label: "출고일", align: "left" as const },
                    { label: "품목 수", align: "right" as const },
                    { label: "합계액", align: "right" as const },
                    { label: "인코템즈", align: "center" as const },
                    { label: "상태", align: "center" as const },
                  ].map((col, i) => (
                    <th
                      key={i}
                      style={{
                        height: 32,
                        padding: "0 12px",
                        backgroundColor: "var(--k-bg-sub)",
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--k-text-muted)",
                        textAlign: col.align,
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => {
                  const account = getAccountById(shipment.accountId);
                  const addr = account?.shippingAddresses.find(
                    (a) => a.id === shipment.shippingAddressId
                  );
                  const totalAmount = shipment.items.reduce(
                    (sum, item) => sum + item.subtotal,
                    0
                  );
                  return (
                    <tr
                      key={shipment.id}
                      onClick={() =>
                        router.push(`/shipments/${shipment.id}`)
                      }
                      style={{
                        cursor: "pointer",
                        transition: "background-color 100ms ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--k-bg-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-brand)",
                          fontWeight: 500,
                        }}
                      >
                        {shipment.id}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 140,
                        }}
                      >
                        {account?.name ?? "-"}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 120,
                        }}
                      >
                        {addr
                          ? `${addr.label} (${addr.country})`
                          : "-"}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                        }}
                      >
                        {shipment.shipDate ?? "-"}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                          textAlign: "right",
                        }}
                      >
                        {shipment.items.length}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          color: "var(--k-text)",
                          textAlign: "right",
                        }}
                      >
                        {fmt(Math.round(totalAmount))}
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          textAlign: "center",
                        }}
                      >
                        <Badge variant="shipped">{shipment.incoterm}</Badge>
                      </td>
                      <td
                        style={{
                          height: 36,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          textAlign: "center",
                        }}
                      >
                        <Badge
                          variant={
                            shipment.status === "출고대기"
                              ? "pending"
                              : "confirmed"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
