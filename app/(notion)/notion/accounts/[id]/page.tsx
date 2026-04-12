import Link from "next/link";
import { getAccountById, getBalanceByAccount } from "@/lib/mock-data";
import PageHeader from "@/app/(notion)/_components/PageHeader";
import AccountDetailClient from "@/app/(notion)/_components/AccountDetailClient";

export default async function NotionAccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = getAccountById(id);

  if (!account) {
    return (
      <div>
        <PageHeader
          breadcrumb="거래처"
          title="거래처를 찾을 수 없습니다"
        />
        <p style={{ fontSize: 15, color: "var(--n-text-muted)" }}>
          거래처 ID &quot;{id}&quot;에 해당하는 거래처가 없습니다.
        </p>
      </div>
    );
  }

  const balance = getBalanceByAccount(id);

  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            <Link
              href="/notion/accounts"
              style={{ color: "var(--n-text-muted)", textDecoration: "none" }}
            >
              거래처
            </Link>
            {" / "}
            {account.name}
          </span>
        }
        title={account.name}
      />
      <AccountDetailClient account={account} balance={balance} />
    </div>
  );
}
