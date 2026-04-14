import Link from "next/link";
import PageHeader from "@/app/(supabase)/_components/PageHeader";
import OrderForm from "@/app/(supabase)/_components/OrderForm";

export default function NewOrderPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/supabase/orders"
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
