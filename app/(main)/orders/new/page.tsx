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
              href="/orders"
              style={{ color: "var(--k-text-muted)", textDecoration: "none" }}
            >
              주문
            </Link>
            {" > "}
            새 주문
          </span>
        }
        title="새 주문"
        helperText="이 화면에서는 거래처를 선택하고 품목을 담아 새 주문을 작성합니다."
      />
      <OrderForm />
    </div>
  );
}
