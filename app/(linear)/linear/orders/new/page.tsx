import Link from "next/link";
import PageHeader from "@/lib/components/PageHeader";
import OrderForm from "@/lib/components/OrderForm";

export default function NewOrderPage() {
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
            새 주문
          </span>
        }
        title="새 주문"
      />
      <OrderForm />
    </div>
  );
}
