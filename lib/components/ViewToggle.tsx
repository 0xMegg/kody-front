"use client";

import { useThemeOptional } from "@/lib/theme/ThemeContext";

export interface ViewToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ViewToggleProps<T extends string> {
  options: readonly ViewToggleOption<T>[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel?: string;
}

export default function ViewToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = "보기 전환",
}: ViewToggleProps<T>) {
  const theme = useThemeOptional()?.theme ?? "linear";

  if (theme === "notion") {
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        style={{
          display: "flex",
          gap: "var(--k-space-md)",
          borderBottom: "1px solid var(--k-border)",
        }}
      >
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(opt.value)}
              style={{
                appearance: "none",
                background: "transparent",
                border: "none",
                padding: "8px 0",
                fontSize: "var(--k-font-size-sm)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color var(--k-transition-fast)",
                color: active ? "var(--k-text)" : "var(--k-text-muted)",
                borderBottom: active
                  ? "2px solid var(--k-brand)"
                  : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (theme === "supabase") {
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        style={{
          display: "inline-flex",
          padding: 2,
          backgroundColor: "var(--k-bg-raise)",
          border: "1px solid var(--k-border)",
          borderRadius: 6,
          gap: 2,
        }}
      >
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(opt.value)}
              style={{
                appearance: "none",
                height: 24,
                padding: "0 10px",
                border: "none",
                borderRadius: 4,
                fontSize: "var(--k-font-size-sm)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all var(--k-transition-fast)",
                backgroundColor: active ? "var(--k-brand-dim)" : "transparent",
                color: active ? "var(--k-brand)" : "var(--k-text-muted)",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Linear (default) — shared border button pair
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{ display: "flex", gap: 0 }}
    >
      {options.map((opt, idx) => {
        const active = value === opt.value;
        const isFirst = idx === 0;
        const isLast = idx === options.length - 1;
        return (
          <button
            key={opt.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            style={{
              height: 28,
              padding: "0 12px",
              fontSize: "var(--k-font-size-sm)",
              fontWeight: 500,
              border: "1px solid var(--k-border)",
              borderRadius: "var(--k-radius-sm)",
              cursor: "pointer",
              backgroundColor: active ? "var(--k-brand-subtle)" : "transparent",
              color: active ? "var(--k-brand)" : "var(--k-text-muted)",
              transition: "all var(--k-transition-fast)",
              ...(isFirst && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: "none",
              }),
              ...(isLast && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }),
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
