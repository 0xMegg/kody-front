"use client";

import { useState, useCallback } from "react";
import type { Order, Account } from "@/lib/types";
import { formatNumber, formatCurrency } from "@/lib/utils";
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

interface OrderFormProps {
  order?: Order;
  account?: Account;
}

const statusBadgeVariant = {
  주문완료: "confirmed",
  주문대기: "pending",
  주문중지: "cancelled",
} as const;

const salesReps: Record<string, string> = {
  "REP-01": "정민수",
  "REP-02": "박서영",
  "REP-03": "이준혁",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--k-text-muted)",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 36,
  padding: "0 12px",
  fontSize: 15,
  color: "var(--k-text)",
  backgroundColor: "var(--k-surface)",
  border: "1px solid var(--k-border)",
  borderRadius: 3,
  outline: "none",
};

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
      <div
        style={{
          flex: 2,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* 주문 정보 */}
        <Card title="주문 정보">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <div style={labelStyle}>주문번호</div>
              <div
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--k-bg-sub)",
                  color: isNew ? "var(--k-text-subtle)" : "var(--k-text)",
                }}
              >
                {isNew ? "자동 생성" : order.id}
              </div>
            </div>
            <div>
              <div style={labelStyle}>주문일</div>
              <input
                type="date"
                defaultValue={
                  order?.orderDate ?? new Date().toISOString().slice(0, 10)
                }
                style={inputStyle}
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
                  height: 36,
                }}
              >
                {order ? (
                  <Badge variant={statusBadgeVariant[order.status]}>
                    {order.status}
                  </Badge>
                ) : (
                  <Badge variant="pending">주문대기</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* 거래처 선택 */}
        <Card title="거래처 선택">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
            }}
          >
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
                }}
              >
                {order?.currency ?? "USD"}
              </div>
            </div>
          </div>
        </Card>

        {/* 품목 */}
        <Card
          title="품목"
          actions={
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm">
                + 품목 추가
              </Button>
              <Button variant="ghost" size="sm">
                + 수동 주문품목번호 생성
              </Button>
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
                        height: 40,
                        padding: "0 16px",
                        backgroundColor: "var(--k-bg-sub)",
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--k-text-muted)",
                        textAlign: i === 0 ? "left" : "right",
                        whiteSpace: "nowrap",
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
                            height: 44,
                            padding: "0 16px",
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: 15,
                            color: "var(--k-text)",
                          }}
                        >
                          {product?.name ?? item.productId}
                        </td>
                        <td
                          style={{
                            height: 44,
                            padding: "0 16px",
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: 15,
                            color: "var(--k-text)",
                            textAlign: "right",
                          }}
                        >
                          {formatNumber(item.unitPrice)}
                        </td>
                        <td
                          style={{
                            height: 44,
                            padding: "0 16px",
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: 15,
                            color: "var(--k-text)",
                            textAlign: "right",
                          }}
                        >
                          {formatNumber(item.quantity)}
                        </td>
                        <td
                          style={{
                            height: 44,
                            padding: "0 16px",
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: 15,
                            color: "var(--k-text)",
                            textAlign: "right",
                          }}
                        >
                          {(item.discountRate * 100).toFixed(0)}%
                        </td>
                        <td
                          style={{
                            height: 44,
                            padding: "0 16px",
                            borderBottom: "1px solid var(--k-border)",
                            fontSize: 15,
                            color: "var(--k-text)",
                            textAlign: "right",
                            fontWeight: 500,
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
                        height: 56,
                        padding: "0 16px",
                        borderBottom: "1px solid var(--k-border)",
                        fontSize: 15,
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

        {/* 금액 요약 */}
        <Card title="금액 요약">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 320,
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
                color: "var(--k-text)",
              }}
            >
              <span>품목 소계 합계</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatNumber(itemsSubtotal)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 15,
                color: "var(--k-text)",
              }}
            >
              <span>배송비</span>
              <input
                type="text"
                defaultValue={order ? formatNumber(order.shippingFee) : "0"}
                style={{
                  ...inputStyle,
                  width: 140,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 15,
                color: "var(--k-text)",
              }}
            >
              <span>송금수수료</span>
              <input
                type="text"
                defaultValue={
                  order ? formatNumber(order.remittanceFee) : "0"
                }
                style={{
                  ...inputStyle,
                  width: 140,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--k-text)",
                borderTop: "1px solid var(--k-border-strong)",
                paddingTop: 10,
                marginTop: 4,
              }}
            >
              <span>주문합계액</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatNumber(orderTotal)}
              </span>
            </div>
          </div>
        </Card>

        {/* Button row */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
        >
          <Button variant="secondary">취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>

      {/* Right 1/3 — Sidebar info panel */}
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
        {/* 선택된 거래처 잔액 */}
        <Card title="선택된 거래처 잔액">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {(["USD", "EUR", "RUB", "KRW"] as const).map((cur) => (
              <div
                key={cur}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 15,
                  color:
                    balance[cur] < 0
                      ? "var(--k-danger)"
                      : "var(--k-text)",
                }}
              >
                <span style={{ color: "var(--k-text-muted)" }}>{cur}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {formatCurrency(balance[cur], cur)}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 600,
                color:
                  balance.totalKRW < 0
                    ? "var(--k-danger)"
                    : "var(--k-text)",
                borderTop: "1px solid var(--k-border)",
                paddingTop: 10,
                marginTop: 4,
              }}
            >
              <span>원화 환산 합계</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(balance.totalKRW, "KRW")}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--k-text-subtle)",
                marginTop: 4,
                margin: 0,
              }}
            >
              마이너스는 선주문/미수금입니다
            </p>
          </div>
        </Card>

        {/* 최근 주문 3건 */}
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
                          height: 36,
                          padding: "0 12px",
                          backgroundColor: "var(--k-bg-sub)",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--k-text-muted)",
                          textAlign: i === 0 ? "left" : "right",
                          whiteSpace: "nowrap",
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
                          height: 40,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 14,
                          color: "var(--k-text)",
                        }}
                      >
                        {o.id}
                      </td>
                      <td
                        style={{
                          height: 40,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          fontSize: 14,
                          color: "var(--k-text)",
                          textAlign: "right",
                        }}
                      >
                        {o.orderDate}
                      </td>
                      <td
                        style={{
                          height: 40,
                          padding: "0 12px",
                          borderBottom: "1px solid var(--k-border)",
                          textAlign: "right",
                        }}
                      >
                        <Badge variant={statusBadgeVariant[o.status]}>
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p
              style={{
                fontSize: 14,
                color: "var(--k-text-subtle)",
                margin: 0,
              }}
            >
              이 거래처의 주문 내역이 없습니다
            </p>
          )}
        </Card>

        {/* 배송지 목록 */}
        <Card title="배송지 목록">
          {currentAccount.shippingAddresses.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {currentAccount.shippingAddresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 3,
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
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--k-text)",
                      }}
                    >
                      {addr.label}
                    </span>
                    {addr.isPrimary && (
                      <Badge variant="confirmed">주요</Badge>
                    )}
                    {addr.defaultIncoterm && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--k-text-muted)",
                        }}
                      >
                        {addr.defaultIncoterm}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--k-text-muted)",
                    }}
                  >
                    {addr.country} — {addr.fullAddress}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontSize: 14,
                color: "var(--k-text-subtle)",
                margin: 0,
              }}
            >
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
