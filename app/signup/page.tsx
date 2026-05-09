"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
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

function SignupContent() {
  const searchParams = useSearchParams();
  const [toastVisible, setToastVisible] = useState(false);
  const token = searchParams.get("token") ?? "";
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
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            초대 가입
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--k-text-muted, #6e7781)" }}>
            초대 토큰으로 Employee와 User를 연결하는 M0 mock 화면
          </p>
        </div>

        <form onSubmit={showMockToast} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            초대 토큰
            <input value={token} readOnly style={{ ...inputStyle, backgroundColor: "var(--k-bg-sub, #f6f8fa)" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            표시 이름
            <input defaultValue="정민수" autoComplete="name" style={inputStyle} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
            비밀번호
            <input type="password" defaultValue="password1" autoComplete="new-password" style={inputStyle} />
          </label>

          <Button>계정 생성</Button>
        </form>

        <Link href="/login" style={{ fontSize: 12, color: "var(--k-brand, #5e6ad2)" }}>
          로그인으로 돌아가기
        </Link>
      </section>

      <Toast
        message="가입은 M0 backend 연결 전 mock 화면입니다"
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
