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

const sizeMap: Record<ButtonSize, { height: number; fontSize: number; padding: string }> = {
  sm: { height: 24, fontSize: 12, padding: "0 8px" },
  md: { height: 28, fontSize: 13, padding: "0 12px" },
  lg: { height: 32, fontSize: 13, padding: "0 16px" },
};

const variantMap: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    color: string;
    border: string;
    hoverBg: string;
  }
> = {
  primary: {
    backgroundColor: "var(--k-brand)",
    color: "var(--k-text-invert)",
    border: "none",
    hoverBg: "var(--k-brand-hover)",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--k-text)",
    border: "1px solid var(--k-border-strong)",
    hoverBg: "var(--k-bg-hover)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--k-text)",
    border: "none",
    hoverBg: "var(--k-bg-hover)",
  },
  danger: {
    backgroundColor: "var(--k-danger)",
    color: "var(--k-text-invert)",
    border: "none",
    hoverBg: "var(--k-danger)",
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
        borderRadius: 6,
        border: v.border,
        backgroundColor: v.backgroundColor,
        color: v.color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 150ms ease-out",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = v.hoverBg;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = v.backgroundColor;
        }
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </button>
  );
}
