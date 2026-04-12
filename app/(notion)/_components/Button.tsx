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
  sm: { height: 28, fontSize: 13, padding: "0 10px" },
  md: { height: 32, fontSize: 14, padding: "0 14px" },
  lg: { height: 36, fontSize: 14, padding: "0 18px" },
};

const variantMap: Record<
  ButtonVariant,
  { backgroundColor: string; color: string; border: string; hoverBg: string }
> = {
  primary: {
    backgroundColor: "var(--n-accent)",
    color: "var(--n-text-on-accent)",
    border: "none",
    hoverBg: "var(--n-accent-hover)",
  },
  secondary: {
    backgroundColor: "var(--n-surface)",
    color: "var(--n-text)",
    border: "1px solid var(--n-border-strong)",
    hoverBg: "var(--n-bg-hover)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--n-text)",
    border: "none",
    hoverBg: "var(--n-bg-hover)",
  },
  danger: {
    backgroundColor: "var(--n-danger)",
    color: "var(--n-text-on-accent)",
    border: "none",
    hoverBg: "var(--n-danger)",
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
        borderRadius: 3,
        border: v.border,
        backgroundColor: v.backgroundColor,
        color: v.color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 180ms ease",
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
