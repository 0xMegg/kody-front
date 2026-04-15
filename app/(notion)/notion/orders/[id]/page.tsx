import Link from "next/link";
import { getOrderById, getAccountById } from "@/lib/mock-data";
import PageHeader from "@/lib/components/PageHeader";
import OrderForm from "@/lib/components/OrderForm";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderById(id);
  const account = order ? getAccountById(order.accountId) : undefined;

  if (!order) {
    return (
      <div>
        <PageHeader
          breadcrumb={
            <span>
              <Link
                href="/notion/orders"
                style={{
                  color: "var(--k-text-muted)",
                  textDecoration: "none",
                }}
              >
                주문
              </Link>
              {" / "}
              알 수 없음
            </span>
          }
          title="주문을 찾을 수 없습니다"
        />
        <p style={{ fontSize: 15, color: "var(--k-text-muted)" }}>
          주문번호 &quot;{id}&quot;에 해당하는 주문이 없습니다.
        </p>
        <Link
          href="/notion/orders"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 12,
            fontSize: 15,
            color: "var(--k-brand)",
            textDecoration: "none",
          }}
        >
          &larr; 주문 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/notion/orders"
              style={{
                color: "var(--k-text-muted)",
                textDecoration: "none",
              }}
            >
              주문
            </Link>
            {" / "}
            {order.id}
          </span>
        }
        title={order.id}
      />
      <OrderForm order={order} account={account} />
    </div>
  );
}
