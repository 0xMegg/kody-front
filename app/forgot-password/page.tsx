"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/lib/components/Button";
import Toast from "@/lib/components/Toast";
import { getF1RouteMode } from "@/lib/auth/route-modes";

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

export default function ForgotPasswordPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const routeMode = getF1RouteMode("/forgot-password");
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
          maxWidth: 380,
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
            비밀번호 찾기
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "var(--k-text-muted, #6e7781)" }}>
            reset token 발급 전 데모 화면
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--k-text-muted, #6e7781)" }}>
            {routeMode?.backendDependency
              ? `이후 ${routeMode.backendDependency} 와 연동될 예정 · 현재는 백엔드 호출 없음`
              : "백엔드 호출 없음"}
          </p>
        </div>

        <form onSubmit={showMockToast} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <input
            type="email"
            placeholder="name@kody.local"
            autoComplete="email"
            style={{
              width: "100%",
              height: 36,
              padding: "0 12px",
              border: "1px solid var(--k-border, #d8dee4)",
              borderRadius: 6,
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />

          <Button>재설정 링크 발송</Button>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <Link href="/login" style={{ color: "var(--k-brand, #5e6ad2)" }}>
            로그인으로 돌아가기
          </Link>
          <Link href="/reset-password?token=mock-reset-token" style={{ color: "var(--k-brand, #5e6ad2)" }}>
            reset 데모 열기
          </Link>
        </div>
      </section>

      <Toast
        message="F1 mock-only 화면입니다 · 재설정 메일 발송은 백엔드에 연결되지 않았습니다"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
}
