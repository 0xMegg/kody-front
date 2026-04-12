import Link from "next/link";
import PageHeader from "@/app/(linear)/_components/PageHeader";
import OrderForm from "@/app/(linear)/_components/OrderForm";

export default function NewOrderPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/linear/orders"
              style={{ color: "var(--l-text-muted)", textDecoration: "none" }}
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
