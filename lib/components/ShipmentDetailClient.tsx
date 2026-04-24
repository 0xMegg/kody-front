"use client";

import Card from "@/lib/components/Card";
import Badge from "@/lib/components/Badge";
import Table, { type TableColumn } from "@/lib/components/Table";
import { salesRepNames } from "@/lib/mock-data";
import type { Account, Shipment, ShippingAddress } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export type ItemRow = Record<string, unknown> & {
  orderItemId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  hsCode: string;
  htsCode: string;
};

const itemColumns: TableColumn<ItemRow>[] = [
  { key: "orderItemId", label: "주문품목번호" },
  { key: "productName", label: "품목명" },
  { key: "quantity", label: "수량", align: "right", mono: true },
  { key: "unitPrice", label: "단가", align: "right", mono: true },
  { key: "subtotal", label: "소계", align: "right", mono: true },
  { key: "hsCode", label: "HS코드" },
  { key: "htsCode", label: "HTS코드" },
];

interface ShipmentDetailClientProps {
  shipment: Shipment;
  account: Account | undefined;
  shippingAddr: ShippingAddress | undefined;
  itemRows: ItemRow[];
  totalAmount: number;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "var(--k-text-muted)" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: "var(--k-text)" }}>{value}</span>
    </div>
  );
}

export default function ShipmentDetailClient({
  shipment,
  account,
  shippingAddr,
  itemRows,
  totalAmount,
}: ShipmentDetailClientProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Section 1: 기본 정보 */}
      <Card title="기본 정보">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px 32px",
          }}
        >
          <InfoRow label="거래처" value={account?.name ?? "-"} />
          <InfoRow
            label="배송지"
            value={
              shippingAddr
                ? `${shippingAddr.label} — ${shippingAddr.fullAddress}`
                : "-"
            }
          />
          <InfoRow
            label="인코템즈"
            value={<Badge variant="shipped">{shipment.incoterm}</Badge>}
          />
          <InfoRow label="출고일" value={shipment.shipDate ?? "미정"} />
          <InfoRow
            label="내부 담당자"
            value={
              account?.salesRepId
                ? salesRepNames[account.salesRepId] ?? account.salesRepId
                : "-"
            }
          />
        </div>
      </Card>

      {/* Section 2: 품목 목록 */}
      <Card title="품목 목록">
        <Table<ItemRow>
          columns={itemColumns}
          data={itemRows}
          renderCell={(key, value) => {
            if (key === "quantity") return formatNumber(value as number, 0);
            if (key === "unitPrice" || key === "subtotal")
              return formatNumber(Math.round((value as number) * 100) / 100);
            return String(value ?? "");
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16,
            padding: "0 var(--k-table-head-padding)",
            height: "var(--k-height-row)",
            borderTop: "1px solid var(--k-border)",
            fontSize: "var(--k-font-size-md)",
            fontWeight: 600,
            color: "var(--k-text)",
          }}
        >
          <span>합계 (수출신고액)</span>
          <span
            style={{
              fontFamily: "var(--k-summary-row-value-font)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatNumber(Math.round(totalAmount * 100) / 100)}
          </span>
        </div>
      </Card>

      {/* Section 3: 수출 서류 */}
      <Card title="수출 서류">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "var(--k-text-muted)",
                minWidth: 80,
              }}
            >
              인코템즈
            </span>
            <Badge variant="shipped">{shipment.incoterm}</Badge>
            <button
              style={{
                fontSize: 12,
                color: "var(--k-brand)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              수정
            </button>
          </div>

          <div>
            <span
              style={{
                fontSize: 12,
                color: "var(--k-text-muted)",
                display: "block",
                marginBottom: 8,
              }}
            >
              언더벨류 파일
            </span>
            {shipment.undervalueFile ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  border: "1px solid var(--k-border)",
                  borderRadius: 6,
                  backgroundColor: "var(--k-bg-sub)",
                }}
              >
                <span style={{ fontSize: 14 }}>📄</span>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--k-text)",
                    fontWeight: 500,
                  }}
                >
                  {shipment.undervalueFile}
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 16px",
                  border: "1px dashed var(--k-border-strong)",
                  borderRadius: 6,
                  backgroundColor: "var(--k-bg-sub)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--k-text-muted)",
                  }}
                >
                  파일 드래그 또는 클릭하여 업로드
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Section 4: 출고 완료 */}
      <Card title="출고 완료">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div>
            <label
              style={{
                fontSize: 12,
                color: "var(--k-text-muted)",
                display: "block",
                marginBottom: 6,
              }}
            >
              송장번호
            </label>
            <input
              type="text"
              placeholder="10~12자리 숫자"
              defaultValue={shipment.trackingNumber ?? ""}
              readOnly={shipment.status === "출고완료"}
              style={{
                width: "100%",
                maxWidth: 280,
                height: 32,
                padding: "0 10px",
                fontSize: 13,
                border: "1px solid var(--k-border)",
                borderRadius: 6,
                backgroundColor:
                  shipment.status === "출고완료"
                    ? "var(--k-bg-sub)"
                    : "var(--k-bg)",
                color: "var(--k-text)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <button
              disabled={shipment.status === "출고완료"}
              style={{
                height: 32,
                padding: "0 16px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                border: "none",
                backgroundColor: "var(--k-brand)",
                color: "var(--k-text-invert)",
                cursor:
                  shipment.status === "출고완료" ? "not-allowed" : "pointer",
                opacity: shipment.status === "출고완료" ? 0.5 : 1,
              }}
            >
              출고 완료 처리
            </button>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--k-text-muted)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            송장번호 입력 시 재고가 차감되고 출고일이 확정됩니다
          </p>
        </div>
      </Card>
    </div>
  );
}
