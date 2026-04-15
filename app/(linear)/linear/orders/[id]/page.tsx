import Link from "next/link";
import { getOrderById, getAccountById } from "@/lib/mock-data";
import PageHeader from "@/lib/components/PageHeader";
import OrderForm from "@/app/(linear)/_components/OrderForm";

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
          breadcrumb="주문"
          title="주문을 찾을 수 없습니다"
        />
        <p style={{ fontSize: 13, color: "var(--k-text-muted)" }}>
          주문번호 &quot;{id}&quot;에 해당하는 주문이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/linear/orders"
              style={{ color: "var(--k-text-muted)", textDecoration: "none" }}
            >
              주문
            </Link>
            {" > "}
            {order.id}
          </span>
        }
        title={order.id}
      />
      <OrderForm order={order} account={account} />
    </div>
  );
}
