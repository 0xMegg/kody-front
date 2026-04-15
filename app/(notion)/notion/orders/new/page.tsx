import Link from "next/link";
import PageHeader from "@/lib/components/PageHeader";
import OrderForm from "@/app/(notion)/_components/OrderForm";

export default function NewOrderPage() {
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
            새 주문
          </span>
        }
        title="새 주문"
        helperText="새로운 주문을 작성합니다"
      />
      <OrderForm />
    </div>
  );
}
