"use client";

import { useThemeOptional } from "@/lib/theme/ThemeContext";
import type { ThemeName } from "@/lib/theme/types";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "accent";

type BadgeAlias =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "shipped"
  | "주문대기"
  | "주문완료"
  | "주문중지"
  | "출고대기"
  | "출고완료"
  | "음수재고";

interface BadgeProps {
  variant: BadgeVariant | BadgeAlias;
  children: React.ReactNode;
}

const colorMap: Record<BadgeVariant, { color: string; backgroundColor: string }> = {
  success: { color: "var(--k-success)", backgroundColor: "var(--k-success-bg)" },
  warning: { color: "var(--k-warning)", backgroundColor: "var(--k-warning-bg)" },
  danger: { color: "var(--k-danger)", backgroundColor: "var(--k-danger-bg)" },
  info: { color: "var(--k-badge-info)", backgroundColor: "var(--k-badge-info-bg)" },
  neutral: { color: "var(--k-text-muted)", backgroundColor: "var(--k-badge-neutral-bg)" },
  accent: { color: "var(--k-badge-accent)", backgroundColor: "var(--k-badge-accent-bg)" },
};

const themeAliases: Record<ThemeName, Record<BadgeAlias, BadgeVariant>> = {
  linear: {
    pending: "warning",
    confirmed: "success",
    cancelled: "neutral",
    shipped: "info",
    주문대기: "warning",
    주문완료: "success",
    주문중지: "neutral",
    출고대기: "info",
    출고완료: "success",
    음수재고: "danger",
  },
  notion: {
    pending: "warning",
    confirmed: "success",
    cancelled: "neutral",
    shipped: "info",
    주문대기: "warning",
    주문완료: "success",
    주문중지: "neutral",
    출고대기: "info",
    출고완료: "accent",
    음수재고: "danger",
  },
  supabase: {
    pending: "warning",
    confirmed: "success",
    cancelled: "neutral",
    shipped: "info",
    주문대기: "warning",
    주문완료: "success",
    주문중지: "neutral",
    출고대기: "info",
    출고완료: "success",
    음수재고: "danger",
  },
};

function resolveVariant(variant: BadgeVariant | BadgeAlias, theme: ThemeName): BadgeVariant {
  const aliases = themeAliases[theme];
  return (aliases as Record<string, BadgeVariant>)[variant] ?? (variant as BadgeVariant);
}

export default function Badge({ variant, children }: BadgeProps) {
  const ctx = useThemeOptional();
  const theme: ThemeName = ctx?.theme ?? "linear";
  const resolved = resolveVariant(variant, theme);
  const c = colorMap[resolved];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "var(--k-badge-height)",
        padding: "0 var(--k-badge-padding)",
        borderRadius: "var(--k-badge-radius)",
        fontSize: "var(--k-badge-font-size)",
        fontWeight: 500,
        textTransform: "var(--k-badge-text-transform)" as React.CSSProperties["textTransform"],
        letterSpacing: "var(--k-badge-letter-spacing)",
        lineHeight: 1,
        color: c.color,
        backgroundColor: c.backgroundColor,
      }}
    >
      {children}
    </span>
  );
}
