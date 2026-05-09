"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Button from "@/lib/components/Button";
import Toast from "@/lib/components/Toast";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
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
            비밀번호 재설정
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--k-text-muted, #6e7781)" }}>
            token: {searchParams.get("token") ?? "없음"}
          </p>
        </div>

        <form onSubmit={showMockToast} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <input
            type="password"
            defaultValue="password1"
            autoComplete="new-password"
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

          <Button>새 비밀번호 저장</Button>
        </form>

        <Link href="/login" style={{ fontSize: 12, color: "var(--k-brand, #5e6ad2)" }}>
          로그인으로 돌아가기
        </Link>
      </section>

      <Toast
        message="비밀번호 저장은 M0 backend 연결 전 mock 동작입니다"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
