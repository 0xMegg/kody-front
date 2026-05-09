"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/lib/components/Button";
import Toast from "@/lib/components/Toast";

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

export default function LoginPage() {
  const [toastVisible, setToastVisible] = useState(false);
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
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            KODY OMS
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--k-text-muted, #6e7781)" }}>
            사내 계정으로 로그인
          </p>
        </div>

        <form onSubmit={showMockToast} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            이메일
            <input type="email" defaultValue="admin@kody.local" autoComplete="email" style={inputStyle} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            비밀번호
            <input type="password" defaultValue="password1" autoComplete="current-password" style={inputStyle} />
          </label>

          <Button>로그인</Button>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <Link href="/signup?token=mock-invite-token" style={{ color: "var(--k-brand, #5e6ad2)" }}>
            초대 가입
          </Link>
          <Link href="/forgot-password" style={{ color: "var(--k-brand, #5e6ad2)" }}>
            비밀번호 찾기
          </Link>
        </div>
      </section>

      <Toast
        message="로그인은 M0 backend 연결 전 mock 화면입니다"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
}
