"use client";

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
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        gap: "var(--k-view-toggle-gap)",
        padding: "var(--k-view-toggle-padding)",
        backgroundColor: "var(--k-view-toggle-bg)",
        border: "var(--k-view-toggle-border)",
        borderBottom: "var(--k-view-toggle-border-bottom)",
        borderRadius: "var(--k-view-toggle-radius)",
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
              height: "var(--k-view-toggle-button-height)",
              padding: "var(--k-view-toggle-button-padding)",
              fontSize: "var(--k-font-size-sm)",
              fontWeight: 500,
              border: "var(--k-view-toggle-button-border)",
              borderRadius: "var(--k-view-toggle-button-radius)",
              cursor: "pointer",
              backgroundColor: active
                ? "var(--k-view-toggle-active-bg)"
                : "var(--k-view-toggle-inactive-bg)",
              color: active
                ? "var(--k-view-toggle-active-color)"
                : "var(--k-view-toggle-inactive-color)",
              borderBottom: active
                ? "var(--k-view-toggle-active-border-bottom)"
                : "var(--k-view-toggle-inactive-border-bottom)",
              marginBottom: "var(--k-view-toggle-button-margin-bottom)",
              transition: "all var(--k-transition-fast)",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
