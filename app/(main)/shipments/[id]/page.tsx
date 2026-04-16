import Link from "next/link";
import {
  getShipmentById,
  getAccountById,
  getProductById,
  salesRepNames,
} from "@/lib/mock-data";
import PageHeader from "@/lib/components/PageHeader";
import Card from "@/lib/components/Card";
import Badge from "@/lib/components/Badge";

function fmt(n: number): string {
  return n.toLocaleString("ko-KR");
}

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = getShipmentById(id);
  const account = shipment ? getAccountById(shipment.accountId) : undefined;
  const shippingAddr = account?.shippingAddresses.find(
    (a) => a.id === shipment?.shippingAddressId
  );

  if (!shipment) {
    return (
      <div>
        <PageHeader breadcrumb="출고" title="출고를 찾을 수 없습니다" />
        <p style={{ fontSize: 13, color: "var(--k-text-muted)" }}>
          출고번호 &quot;{id}&quot;에 해당하는 출고가 없습니다.
        </p>
      </div>
    );
  }

  const totalAmount = shipment.items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/shipments"
              style={{ color: "var(--k-text-muted)", textDecoration: "none" }}
            >
              출고
            </Link>
            {" > "}
            {shipment.id}
          </span>
        }
        title={shipment.id}
        actions={
          <Badge
            variant={shipment.status === "출고대기" ? "pending" : "confirmed"}
          >
            {shipment.status}
          </Badge>
        }
      />

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
              value={
                <Badge variant="shipped">{shipment.incoterm}</Badge>
              }
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
                  {[
                    { label: "주문품목번호", align: "left" as const },
                    { label: "품목명", align: "left" as const },
                    { label: "수량", align: "right" as const },
                    { label: "단가", align: "right" as const },
                    { label: "소계", align: "right" as const },
                    { label: "HS코드", align: "left" as const },
                    { label: "HTS코드", align: "left" as const },
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
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipment.items.map((item) => {
                  const product = getProductById(item.productId);
                  const unitPrice =
                    item.quantity > 0
                      ? item.subtotal / item.quantity
                      : 0;
                  return (
                    <tr key={item.orderItemId}>
                      {[
                        {
                          value: item.orderItemId,
                          align: "left" as const,
                        },
                        {
                          value: product?.name ?? item.productId,
                          align: "left" as const,
                        },
                        {
                          value: fmt(item.quantity),
                          align: "right" as const,
                        },
                        {
                          value: fmt(Math.round(unitPrice * 100) / 100),
                          align: "right" as const,
                        },
                        {
                          value: fmt(Math.round(item.subtotal * 100) / 100),
                          align: "right" as const,
                        },
                        { value: item.hsCode, align: "left" as const },
                        { value: item.htsCode, align: "left" as const },
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
                          }}
                        >
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {/* Footer row: total */}
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      height: 36,
                      padding: "0 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--k-text)",
                      textAlign: "right",
                    }}
                  >
                    합계 (수출신고액)
                  </td>
                  <td
                    style={{
                      height: 36,
                      padding: "0 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--k-text)",
                      textAlign: "right",
                    }}
                  >
                    {fmt(Math.round(totalAmount * 100) / 100)}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tbody>
            </table>
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
            {/* 인코템즈 */}
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

            {/* 언더벨류 파일 */}
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
                    shipment.status === "출고완료"
                      ? "not-allowed"
                      : "pointer",
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
    </div>
  );
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
