"use client";

import { useState, useCallback } from "react";
import type { Order, Account } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import {
  accounts,
  getAccountById,
  getProductById,
  getBalanceByAccount,
  getRecentOrdersByAccount,
} from "@/lib/mock-data";
import Badge from "@/lib/components/Badge";
import Button from "@/lib/components/Button";
import Card from "@/lib/components/Card";
import Toast from "@/lib/components/Toast";
import BalanceCard from "@/lib/components/BalanceCard";
import { statusVariantMap, salesReps } from "@/lib/constants";

interface OrderFormProps {
  order?: Order;
  account?: Account;
}

const labelStyle = {
  fontSize: "var(--k-table-head-font-size)",
  fontWeight: 500,
  color: "var(--k-text-muted)",
  textTransform: "var(--k-table-head-text-transform)",
  letterSpacing: "var(--k-table-head-letter-spacing)",
  marginBottom: 4,
} as React.CSSProperties;

const inputStyle = {
  width: "100%",
  height: "var(--k-form-input-height)",
  padding: "0 var(--k-space-sm)",
  fontSize: "var(--k-font-size-md)",
  color: "var(--k-text)",
  backgroundColor: "var(--k-form-input-bg)",
  border: "1px solid var(--k-border)",
  borderRadius: "var(--k-radius-sm)",
  outline: "none",
  transition: "border-color var(--k-transition-fast)",
} as React.CSSProperties;

export default function OrderForm({ order, account }: OrderFormProps) {
  const isNew = !order;
  const [selectedAccountId, setSelectedAccountId] = useState(
    account?.id ?? accounts[0].id
  );
  const [toastVisible, setToastVisible] = useState(false);

  const currentAccount = getAccountById(selectedAccountId) ?? accounts[0];
  const balance = getBalanceByAccount(selectedAccountId);
  const recentOrders = getRecentOrdersByAccount(selectedAccountId, 3);

  const itemsSubtotal = order
    ? order.items.reduce((sum, item) => sum + item.subtotal, 0)
    : 0;
  const orderTotal = order
    ? itemsSubtotal + order.shippingFee + order.remittanceFee
    : 0;

  const handleSave = useCallback(() => {
    setToastVisible(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastVisible(false);
  }, []);

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Left 2/3 — Form */}
      <div style={{ flex: 2, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Header Section */}
        <Card title="주문 정보">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <div style={labelStyle}>주문번호</div>
              <div
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--k-bg-sub)",
                  color: isNew ? "var(--k-text-subtle)" : "var(--k-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {isNew ? "자동 생성" : order.id}
              </div>
            </div>
            <div>
              <div style={labelStyle}>주문일</div>
              <input
                type="date"
                defaultValue={order?.orderDate ?? new Date().toISOString().slice(0, 10)}
                style={{ ...inputStyle, fontVariantNumeric: "tabular-nums" }}
                readOnly
              />
            </div>
            <div>
              <div style={labelStyle}>주문상태</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  height: "var(--k-form-input-height)",
                }}
              >
                {order ? (
                  <Badge variant={statusVariantMap[order.status] ?? "neutral"}>
                    {order.status}
                  </Badge>
                ) : (
                  <Badge variant="warning">주문대기</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Selection Section */}
        <Card title="거래처 선택">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <div style={labelStyle}>거래처</div>
              {isNew ? (
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  style={inputStyle}
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "var(--k-bg-sub)",
                  }}
                >
                  {currentAccount.name}
                </div>
              )}
            </div>
            <div>
              <div style={labelStyle}>내부 담당자</div>
              <select
                defaultValue={order?.salesRepId ?? "REP-01"}
                style={inputStyle}
                disabled
              >
                {Object.entries(salesReps).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div style={labelStyle}>거래 통화</div>
              <div
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--k-bg-sub)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {order?.currency ?? "USD"}
              </div>
            </div>
          </div>
        </Card>

        {/* Items Table Section */}
        <Card
          title="품목"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm">
                + 품목 추가
              </Button>
              <div style={{ position: "relative" }}>
                <Button variant="ghost" size="sm">
                  + 수동 주문품목번호 생성
                </Button>
                <span
                  style={{
                    position: "absolute",
                    bottom: -18,
                    left: 0,
                    fontSize: 10,
                    color: "var(--k-text-subtle)",
                    whiteSpace: "nowrap",
                  }}
                >
                  기존 품목번호 체계 외 수동 부여
                </span>
              </div>
            </div>
          }
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <thead>
                <tr>
                  {["품목명", "단가", "수량", "할인율", "소계"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        height: "var(--k-table-head-height)",
                        padding: `0 var(--k-pad-cell-x)`,
                        backgroundColor: "var(--k-bg-sub)",
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: "var(--k-table-head-font-size)",
                        fontWeight: 500,
                        textTransform: "var(--k-table-head-text-transform)" as React.CSSProperties["textTransform"],
                        letterSpacing: "var(--k-table-head-letter-spacing)",
                        color: "var(--k-text-muted)",
                        textAlign: i === 0 ? "left" : "right",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const product = getProductById(item.productId);
                    return (
                      <tr key={item.id}>
                        <td
                          style={{
                            height: "var(--k-height-row)",
                            padding: `0 var(--k-pad-cell-x)`,
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: "var(--k-font-size-md)",
                            color: "var(--k-text)",
                          }}
                        >
                          {product?.name ?? item.productId}
                        </td>
                        <td
                          style={{
                            height: "var(--k-height-row)",
                            padding: `0 var(--k-pad-cell-x)`,
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: "var(--k-font-size-md)",
                            color: "var(--k-text)",
                            textAlign: "right",
                            fontFamily: "var(--k-font-mono)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {formatNumber(item.unitPrice)}
                        </td>
                        <td
                          style={{
                            height: "var(--k-height-row)",
                            padding: `0 var(--k-pad-cell-x)`,
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: "var(--k-font-size-md)",
                            color: "var(--k-text)",
                            textAlign: "right",
                            fontFamily: "var(--k-font-mono)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {formatNumber(item.quantity)}
                        </td>
                        <td
                          style={{
                            height: "var(--k-height-row)",
                            padding: `0 var(--k-pad-cell-x)`,
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: "var(--k-font-size-md)",
                            color: "var(--k-text)",
                            textAlign: "right",
                            fontFamily: "var(--k-font-mono)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {(item.discountRate * 100).toFixed(0)}%
                        </td>
                        <td
                          style={{
                            height: "var(--k-height-row)",
                            padding: `0 var(--k-pad-cell-x)`,
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: "var(--k-font-size-md)",
                            color: "var(--k-text)",
                            textAlign: "right",
                            fontWeight: 500,
                            fontFamily: "var(--k-font-mono)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {formatNumber(item.subtotal)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        height: 48,
                        padding: `0 var(--k-pad-cell-x)`,
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: "var(--k-font-size-md)",
                        color: "var(--k-text-subtle)",
                        textAlign: "center",
                      }}
                    >
                      품목을 추가해 주세요
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Amount Summary Section */}
        <Card title="금액 요약">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--k-font-size-md)", color: "var(--k-text)" }}>
              <span>품목 소계 합계</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatNumber(itemsSubtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--k-font-size-md)", color: "var(--k-text)" }}>
              <span>배송비</span>
              <input
                type="text"
                defaultValue={order ? formatNumber(order.shippingFee) : "0"}
                style={{ ...inputStyle, width: 120, textAlign: "right", fontVariantNumeric: "tabular-nums" }}
                readOnly
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--k-font-size-md)", color: "var(--k-text)" }}>
              <span>송금수수료</span>
              <input
                type="text"
                defaultValue={order ? formatNumber(order.remittanceFee) : "0"}
                style={{ ...inputStyle, width: 120, textAlign: "right", fontVariantNumeric: "tabular-nums" }}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--k-text)",
                borderTop: "1px solid var(--k-border-strong)",
                paddingTop: 8,
                marginTop: 4,
              }}
            >
              <span>주문합계액</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatNumber(orderTotal)}</span>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button variant="secondary">취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>

      {/* Right 1/3 — Sidebar Panel */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          position: "sticky",
          top: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Account Balance — theme-aware */}
        <BalanceCard balance={balance} />

        {/* Recent Orders */}
        <Card title="최근 주문 3건">
          {recentOrders.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <thead>
                  <tr>
                    {["주문번호", "일자", "상태"].map((h, i) => (
                      <th
                        key={h}
                        style={{
                          height: "var(--k-height-sm)",
                          padding: "0 8px",
                          backgroundColor: "var(--k-bg-sub)",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: "var(--k-font-size-xs)",
                          fontWeight: 500,
                          textTransform: "var(--k-table-head-text-transform)" as React.CSSProperties["textTransform"],
                          letterSpacing: "var(--k-table-head-letter-spacing)",
                          color: "var(--k-text-muted)",
                          textAlign: i === 0 ? "left" : "right",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td
                        style={{
                          height: "var(--k-height-md)",
                          padding: "0 8px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: "var(--k-font-size-sm)",
                          color: "var(--k-text)",
                        }}
                      >
                        {o.id}
                      </td>
                      <td
                        style={{
                          height: "var(--k-height-md)",
                          padding: "0 8px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: "var(--k-font-size-sm)",
                          color: "var(--k-text)",
                          textAlign: "right",
                        }}
                      >
                        {o.orderDate}
                      </td>
                      <td
                        style={{
                          height: "var(--k-height-md)",
                          padding: "0 8px",
                          borderBottom: "1px solid var(--k-border)",
                          textAlign: "right",
                        }}
                      >
                        <Badge variant={statusVariantMap[o.status] ?? "neutral"}>
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ fontSize: "var(--k-font-size-sm)", color: "var(--k-text-subtle)", margin: 0 }}>
              이 거래처의 주문 내역이 없습니다
            </p>
          )}
        </Card>

        {/* Shipping Addresses */}
        <Card title="배송지 목록">
          {currentAccount.shippingAddresses.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {currentAccount.shippingAddresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "var(--k-radius-sm)",
                    backgroundColor: addr.isPrimary
                      ? "var(--k-brand-subtle)"
                      : "var(--k-bg-sub)",
                    border: "1px solid var(--k-border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: "var(--k-font-size-sm)", fontWeight: 500, color: "var(--k-text)" }}>
                      {addr.label}
                    </span>
                    {addr.isPrimary && (
                      <Badge variant="success">기본</Badge>
                    )}
                    {addr.defaultIncoterm && (
                      <span style={{ fontSize: "var(--k-font-size-xs)", color: "var(--k-text-muted)" }}>
                        {addr.defaultIncoterm}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "var(--k-font-size-xs)", color: "var(--k-text-muted)" }}>
                    {addr.country} — {addr.fullAddress}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "var(--k-font-size-sm)", color: "var(--k-text-subtle)", margin: 0 }}>
              등록된 배송지가 없습니다
            </p>
          )}
        </Card>
      </div>

      <Toast
        message="프로토타입에서는 저장되지 않습니다"
        visible={toastVisible}
        onClose={handleToastClose}
      />
    </div>
  );
}
