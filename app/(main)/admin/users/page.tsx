"use client";

import { useState } from "react";
import PageHeader from "@/lib/components/PageHeader";
import Card from "@/lib/components/Card";
import Badge from "@/lib/components/Badge";
import Button from "@/lib/components/Button";
import Table, { type TableColumn } from "@/lib/components/Table";
import Toast from "@/lib/components/Toast";
import {
  mockCurrentUser,
  canSeeAdminUsers,
  roleLabels,
  accountStatusLabels,
  type Role,
  type AccountStatus,
} from "@/lib/auth/mock-session";
import { getF1RouteMode } from "@/lib/auth/route-modes";

const modeBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 500,
  color: "var(--k-text-muted)",
  backgroundColor: "var(--k-bg-sub)",
  border: "1px solid var(--k-border)",
  letterSpacing: "0.04em",
};

interface AdminUserRow extends Record<string, unknown> {
  id: string;
  displayName: string;
  email: string;
  department: string;
  roles: Role[];
  status: AccountStatus;
  invitedAt: string;
}

const mockAdminUsers: AdminUserRow[] = [
  {
    id: "u_mock_001",
    displayName: "데모 관리자",
    email: "demo.admin@kody.local",
    department: "경영관리",
    roles: ["ADMIN", "FINANCE"],
    status: "ACTIVE",
    invitedAt: "2025-12-01",
  },
  {
    id: "u_mock_002",
    displayName: "이수영",
    email: "sales.lead@kody.local",
    department: "영업",
    roles: ["SALES"],
    status: "ACTIVE",
    invitedAt: "2026-01-15",
  },
  {
    id: "u_mock_003",
    displayName: "박지훈",
    email: "logistics@kody.local",
    department: "물류",
    roles: ["LOGISTICS"],
    status: "ACTIVE",
    invitedAt: "2026-02-03",
  },
  {
    id: "u_mock_004",
    displayName: "최예나",
    email: "inventory@kody.local",
    department: "재고",
    roles: ["INVENTORY"],
    status: "ACTIVE",
    invitedAt: "2026-02-21",
  },
  {
    id: "u_mock_005",
    displayName: "신규 직원",
    email: "newbie@kody.local",
    department: "영업",
    roles: ["SALES"],
    status: "INVITED",
    invitedAt: "2026-05-08",
  },
  {
    id: "u_mock_006",
    displayName: "퇴사자",
    email: "former@kody.local",
    department: "물류",
    roles: ["LOGISTICS"],
    status: "DISABLED",
    invitedAt: "2025-10-12",
  },
];

const columns: TableColumn<AdminUserRow>[] = [
  { key: "displayName", label: "이름" },
  { key: "email", label: "이메일" },
  { key: "department", label: "부서" },
  { key: "roles", label: "권한" },
  { key: "status", label: "상태" },
  { key: "invitedAt", label: "초대일자", mono: true },
];

export default function AdminUsersPage() {
  const routeMode = getF1RouteMode("/admin/users");
  const allowed = canSeeAdminUsers(mockCurrentUser);
  const [toastVisible, setToastVisible] = useState(false);

  const renderCell = (
    key: keyof AdminUserRow & string,
    value: unknown,
  ): React.ReactNode => {
    if (key === "roles") {
      const roles = value as Role[];
      return (
        <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
          {roles.map((r) => (
            <Badge key={r} variant="info">
              {roleLabels[r]}
            </Badge>
          ))}
        </span>
      );
    }
    if (key === "status") {
      const status = value as AccountStatus;
      const variant =
        status === "ACTIVE"
          ? "success"
          : status === "INVITED"
            ? "warning"
            : "neutral";
      return <Badge variant={variant}>{accountStatusLabels[status]}</Badge>;
    }
    return String(value ?? "");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <PageHeader
        title="사용자 관리"
        helperText="관리자/경영관리 권한 사용자만 접근할 수 있는 데모 화면입니다."
        actions={
          <span style={modeBadgeStyle}>
            F1 mode: {routeMode?.mode ?? "mock-only"}
          </span>
        }
      />

      {!allowed ? (
        <Card title="접근 권한 없음">
          <p style={{ margin: 0, fontSize: 13, color: "var(--k-text-muted)" }}>
            현재 데모 사용자는 사용자 관리 화면을 볼 권한이 없습니다.
            (필요 권한: 관리자 또는 경영관리)
          </p>
        </Card>
      ) : (
        <>
          <Card
            title="사용자 목록"
            actions={
              <Button onClick={() => setToastVisible(true)}>초대 발송</Button>
            }
          >
            <Table<AdminUserRow>
              columns={columns}
              data={mockAdminUsers}
              renderCell={renderCell}
            />
          </Card>

          <Card title="연결 예정 백엔드 슬라이스">
            <p style={{ margin: 0, fontSize: 13, color: "var(--k-text-muted)" }}>
              이 화면은 F1 단계에서 <strong>mock-only</strong> 로 동작합니다.
              향후 <strong>{routeMode?.backendDependency ?? "S6 Admin Users, S8 Invite, S10 Logs"}</strong> 와
              연결될 때 실제 사용자 목록·초대·감사 로그를 표시하도록 별도 슬라이스로
              바인딩됩니다.
            </p>
          </Card>
        </>
      )}

      <Toast
        message="F1 mock-only 화면입니다 · 초대 발송은 아직 백엔드에 연결되지 않았습니다"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
