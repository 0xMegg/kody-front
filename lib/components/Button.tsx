"use client";

import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

const sizeMap: Record<ButtonSize, { height: string; fontSize: string; padding: string }> = {
  sm: { height: "var(--k-height-sm)", fontSize: "var(--k-font-size-sm)", padding: "0 var(--k-space-sm)" },
  md: { height: "var(--k-height-md)", fontSize: "var(--k-font-size-md)", padding: "0 var(--k-space-md)" },
  lg: { height: "var(--k-height-lg)", fontSize: "var(--k-font-size-md)", padding: "0 var(--k-space-lg)" },
};

const variantMap: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    color: string;
    border: string;
    hoverBg: string;
    hoverColor?: string;
    hoverShadow?: string;
  }
> = {
  primary: {
    backgroundColor: "var(--k-brand)",
    color: "var(--k-text-invert)",
    border: "none",
    hoverBg: "var(--k-brand-hover)",
    hoverShadow: "var(--k-btn-primary-hover-shadow)",
  },
  secondary: {
    backgroundColor: "var(--k-btn-secondary-bg)",
    color: "var(--k-text)",
    border: "1px solid var(--k-border-strong)",
    hoverBg: "var(--k-bg-hover)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--k-text)",
    border: "none",
    hoverBg: "var(--k-btn-ghost-hover)",
  },
  danger: {
    backgroundColor: "var(--k-btn-danger-bg)",
    color: "var(--k-btn-danger-text)",
    border: "var(--k-btn-danger-border)",
    hoverBg: "var(--k-btn-danger-hover-bg)",
    hoverColor: "var(--k-btn-danger-hover-text)",
  },
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  icon,
}: ButtonProps) {
  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 500,
        borderRadius: "var(--k-radius-sm)",
        border: v.border,
        backgroundColor: v.backgroundColor,
        color: v.color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: `all var(--k-transition-fast)`,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = v.hoverBg;
          if (v.hoverColor) e.currentTarget.style.color = v.hoverColor;
          if (v.hoverShadow) e.currentTarget.style.boxShadow = v.hoverShadow;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = v.backgroundColor;
          e.currentTarget.style.color = v.color;
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </button>
  );
}
