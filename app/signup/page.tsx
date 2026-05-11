"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Button from "@/lib/components/Button";
import Toast from "@/lib/components/Toast";
import { getF1RouteMode } from "@/lib/auth/route-modes";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 36,
  padding: "0 12px",
  border: "1px solid var(--k-border, #d8dee4)",
  borderRadius: 6,
  fontSize: 13,
  color: "var(--k-text, #1f2328)",
  backgroundColor: "var(--k-bg, #ffffff)",
  boxSizing: "border-box",
};

const modeBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 500,
  color: "var(--k-text-muted, #6e7781)",
  backgroundColor: "var(--k-bg-sub, #f6f8fa)",
  border: "1px solid var(--k-border, #d8dee4)",
  letterSpacing: "0.04em",
};

function SignupContent() {
  const searchParams = useSearchParams();
  const [toastVisible, setToastVisible] = useState(false);
  const token = searchParams.get("token") ?? "";
  const routeMode = getF1RouteMode("/signup");
  const showMockToast = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToastVisible(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "var(--k-bg-sub, #f6f8fa)",
        color: "var(--k-text, #1f2328)",
        padding: 24,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          border: "1px solid var(--k-border, #d8dee4)",
          borderRadius: 8,
          backgroundColor: "var(--k-bg, #ffffff)",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={modeBadgeStyle}>F1 mode: mock-only</span>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            초대 가입
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "var(--k-text-muted, #6e7781)" }}>
            초대 토큰으로 Employee와 User를 연결하는 데모 화면
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--k-text-muted, #6e7781)" }}>
            {routeMode?.backendDependency
              ? `이후 ${routeMode.backendDependency} 와 연동될 예정 · 현재는 백엔드 호출 없음`
              : "백엔드 호출 없음"}
          </p>
        </div>

        <form onSubmit={showMockToast} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            초대 토큰 (데모 표시 전용)
            <input
              value={token}
              readOnly
              placeholder="초대 토큰 없음"
              style={{ ...inputStyle, backgroundColor: "var(--k-bg-sub, #f6f8fa)" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            표시 이름
            <input
              placeholder="이름 입력"
              autoComplete="name"
              style={inputStyle}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호 입력"
              autoComplete="new-password"
              style={inputStyle}
            />
          </label>

          <Button>계정 생성</Button>
        </form>

        <Link href="/login" style={{ fontSize: 12, color: "var(--k-brand, #5e6ad2)" }}>
          로그인으로 돌아가기
        </Link>
      </section>

      <Toast
        message="F1 mock-only 화면입니다 · 가입 처리는 아직 백엔드에 연결되지 않았습니다"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}
