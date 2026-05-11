"use client";

import PageHeader from "@/lib/components/PageHeader";
import Card from "@/lib/components/Card";
import Badge from "@/lib/components/Badge";
import {
  mockCurrentUser,
  roleLabels,
  accountStatusLabels,
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

const fieldRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  alignItems: "center",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid var(--k-border)",
  fontSize: 13,
};

const fieldLabelStyle: React.CSSProperties = {
  color: "var(--k-text-muted)",
  fontSize: 12,
};

const fieldValueStyle: React.CSSProperties = {
  color: "var(--k-text)",
  fontSize: 13,
};

export default function ProfilePage() {
  const routeMode = getF1RouteMode("/profile");
  const user = mockCurrentUser;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <PageHeader
        title="내 프로필"
        helperText="현재 로그인한 사용자 정보를 표시합니다. (데모 mock 사용자)"
        actions={
          <span style={modeBadgeStyle}>
            F1 mode: {routeMode?.mode ?? "mock-only"}
          </span>
        }
      />

      <Card title="기본 정보">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={fieldRowStyle}>
            <span style={fieldLabelStyle}>표시 이름</span>
            <span style={fieldValueStyle}>{user.displayName}</span>
          </div>
          <div style={fieldRowStyle}>
            <span style={fieldLabelStyle}>이메일</span>
            <span style={fieldValueStyle}>{user.email}</span>
          </div>
          <div style={fieldRowStyle}>
            <span style={fieldLabelStyle}>직원 이름</span>
            <span style={fieldValueStyle}>{user.employeeName}</span>
          </div>
          <div style={fieldRowStyle}>
            <span style={fieldLabelStyle}>부서</span>
            <span style={fieldValueStyle}>{user.department}</span>
          </div>
          <div style={fieldRowStyle}>
            <span style={fieldLabelStyle}>연락처</span>
            <span style={fieldValueStyle}>{user.phone}</span>
          </div>
          <div style={{ ...fieldRowStyle, borderBottom: "none" }}>
            <span style={fieldLabelStyle}>계정 상태</span>
            <span style={fieldValueStyle}>
              <Badge variant={user.status === "ACTIVE" ? "success" : "neutral"}>
                {accountStatusLabels[user.status]}
              </Badge>
            </span>
          </div>
        </div>
      </Card>

      <Card title="권한">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {user.roles.map((role) => (
            <Badge key={role} variant="info">
              {roleLabels[role]}
            </Badge>
          ))}
        </div>
      </Card>

      <Card title="연결 예정 백엔드 슬라이스">
        <p style={{ margin: 0, fontSize: 13, color: "var(--k-text-muted)" }}>
          이 화면은 F1 단계에서 <strong>mock-only</strong> 로 동작합니다.
          향후 <strong>{routeMode?.backendDependency ?? "S7 Profile API"}</strong> 와 연결될 때
          실제 사용자 정보를 표시하도록 별도 슬라이스로 바인딩됩니다.
        </p>
      </Card>
    </div>
  );
}
