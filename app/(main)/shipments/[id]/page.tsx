import Link from "next/link";
import {
  getShipmentById,
  getAccountById,
  getProductById,
} from "@/lib/mock-data";
import PageHeader from "@/lib/components/PageHeader";
import Badge from "@/lib/components/Badge";
import ShipmentDetailClient, {
  type ItemRow,
} from "@/lib/components/ShipmentDetailClient";

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

  const itemRows: ItemRow[] = shipment.items.map((item) => {
    const product = getProductById(item.productId);
    const unitPrice = item.quantity > 0 ? item.subtotal / item.quantity : 0;
    return {
      orderItemId: item.orderItemId,
      productName: product?.name ?? item.productId,
      quantity: item.quantity,
      unitPrice,
      subtotal: item.subtotal,
      hsCode: item.hsCode,
      htsCode: item.htsCode,
    };
  });

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
        helperText="이 화면에서는 선택한 출고의 품목·수출 서류·송장번호를 확인하고 완료 처리합니다."
        actions={
          <Badge
            variant={shipment.status === "출고대기" ? "pending" : "confirmed"}
          >
            {shipment.status}
          </Badge>
        }
      />

      <ShipmentDetailClient
        shipment={shipment}
        account={account}
        shippingAddr={shippingAddr}
        itemRows={itemRows}
        totalAmount={totalAmount}
      />
    </div>
  );
}
