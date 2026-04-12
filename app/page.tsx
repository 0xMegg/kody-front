import Link from "next/link";

const variants = [
  {
    name: "Linear",
    href: "/linear",
    description: "Minimal & precise. Purple accent, compact tables, keyboard-first feel.",
    color: "#5e6ad2",
    bg: "#f9f9fb",
  },
  {
    name: "Notion",
    href: "/notion",
    description: "Warm & readable. Serif typography, soft neutrals, document-like layout.",
    color: "#2383e2",
    bg: "#fbfbfa",
  },
  {
    name: "Supabase",
    href: "/supabase",
    description: "Dark & modern. Emerald glow, mono numerals, developer-grade density.",
    color: "#3ecf8e",
    bg: "#171717",
  },
] as const;

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        backgroundColor: "#fafafa",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#888",
            backgroundColor: "#f0f0f0",
            padding: "3px 10px",
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          Prototype
        </span>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#111",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          KODY OMS
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#666",
            margin: 0,
            maxWidth: 420,
            lineHeight: 1.5,
          }}
        >
          주문 & 물류 관리 시스템 UI 프로토타입.
          <br />
          아래 3가지 디자인 변형 중 하나를 선택하세요.
        </p>
      </div>

      {/* Variant Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 900,
          width: "100%",
        }}
      >
        {variants.map((v) => (
          <Link
            key={v.name}
            href={v.href}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 24,
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              backgroundColor: "#fff",
              textDecoration: "none",
              transition: "all 200ms ease",
              cursor: "pointer",
            }}
          >
            {/* Color preview strip */}
            <div
              style={{
                width: "100%",
                height: 48,
                borderRadius: 8,
                backgroundColor: v.bg,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: v.bg === "#171717" ? "1px solid #333" : "1px solid #eee",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: v.color,
                }}
              />
            </div>

            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#111",
                margin: "0 0 6px",
              }}
            >
              {v.name}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#777",
                margin: 0,
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {v.description}
            </p>

            <div
              style={{
                marginTop: 16,
                fontSize: 13,
                fontWeight: 500,
                color: v.color,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              둘러보기 &rarr;
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: 48,
          fontSize: 12,
          color: "#aaa",
        }}
      >
        이 프로토타입은 비기능적 UI 시안입니다. 데이터는 저장되지 않습니다.
      </p>
    </div>
  );
}
