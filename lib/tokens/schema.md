# Token Schema — KODY OMS Design System

All variants share the same `--k-*` variable names. Each variant defines its own values.

## Category 1 — Color

### Common (all 3 variants must define)

| Token | Purpose |
|---|---|
| `--k-bg` | Page background |
| `--k-bg-sub` | Secondary/sidebar background |
| `--k-bg-hover` | Hover state background |
| `--k-surface` | Card/panel surface |
| `--k-border` | Default border |
| `--k-border-strong` | Emphasized border |
| `--k-text` | Primary text |
| `--k-text-muted` | Secondary text |
| `--k-text-subtle` | Tertiary/placeholder text |
| `--k-text-invert` | Text on brand/dark backgrounds |
| `--k-brand` | Primary brand color |
| `--k-brand-hover` | Brand hover state |
| `--k-brand-subtle` | Brand tinted background |
| `--k-success` | Success status |
| `--k-warning` | Warning status |
| `--k-danger` | Danger/error status |
| `--k-info` | Info status |
| `--k-success-bg` | Success background tint |
| `--k-warning-bg` | Warning background tint |
| `--k-danger-bg` | Danger background tint |
| `--k-info-bg` | Info background tint |

### Variant-specific (fallback values in non-owning variants)

| Token | Owner | Fallback strategy |
|---|---|---|
| `--k-bg-raise` | Supabase | `--k-bg-hover` value |
| `--k-bg-overlay` | Supabase | `rgba(0,0,0,0.5)` |
| `--k-brand-dim` | Supabase | `--k-brand-subtle` value |
| `--k-brand-glow` | Supabase | `transparent` |
| `--k-text-on-accent` | Notion | `--k-text-invert` value |
| `--k-highlight-yellow-bg` | Notion | neutral fallback |
| `--k-highlight-orange-bg` | Notion | neutral fallback |
| `--k-highlight-red-bg` | Notion | neutral fallback |
| `--k-highlight-green-bg` | Notion | neutral fallback |
| `--k-highlight-blue-bg` | Notion | neutral fallback |
| `--k-highlight-purple-bg` | Notion | neutral fallback |
| `--k-highlight-pink-bg` | Notion | neutral fallback |
| `--k-highlight-gray-bg` | Notion | neutral fallback |
| `--k-highlight-purple` | Notion | `--k-info` value |
| `--k-highlight-green` | Notion | `--k-success` value |
| `--k-highlight-red` | Notion | `--k-danger` value |
| `--k-highlight-orange` | Notion | `--k-warning` value |
| `--k-highlight-blue` | Notion | `--k-info` value |
| `--k-highlight-yellow` | Notion | `--k-warning` value |

## Category 2 — Radius

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-radius-sm` | 6px | 3px | 6px |
| `--k-radius-md` | 8px | 3px | 6px |
| `--k-radius-lg` | 8px | 6px | 8px |

## Category 3 — Height

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-height-sm` | 24px | 28px | 28px |
| `--k-height-md` | 28px | 32px | 32px |
| `--k-height-lg` | 32px | 36px | 36px |
| `--k-height-row` | 36px | 44px | 40px |
| `--k-height-header-row` | 32px | 40px | 36px |

## Category 4 — Spacing

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-space-xs` | 4px | 4px | 4px |
| `--k-space-sm` | 8px | 8px | 8px |
| `--k-space-md` | 12px | 16px | 12px |
| `--k-space-lg` | 16px | 20px | 16px |
| `--k-space-xl` | 24px | 24px | 24px |
| `--k-space-2xl` | 32px | 32px | 32px |
| `--k-pad-cell-x` | 12px | 16px | 12px |
| `--k-pad-card` | 16px | 20px | 16px |

## Category 5 — Typography

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-font-body` | Inter, -apple-system, system-ui, sans-serif | Inter, -apple-system, ui-sans-serif, sans-serif | Inter, -apple-system, ui-sans-serif, sans-serif |
| `--k-font-heading` | (same as body) | 'Source Serif 4', 'Iowan Old Style', ui-serif, Georgia, serif | (same as body) |
| `--k-font-mono` | ui-monospace, 'SF Mono', monospace | ui-monospace, 'SF Mono', monospace | 'JetBrains Mono', ui-monospace, 'SF Mono', monospace |
| `--k-font-size-xs` | 11px | 12px | 11px |
| `--k-font-size-sm` | 12px | 14px | 12px |
| `--k-font-size-md` | 13px | 15px | 13px |
| `--k-font-size-lg` | 16px | 17px | 16px |
| `--k-font-size-xl` | 20px | 20px | 20px |
| `--k-font-size-2xl` | 24px | 24px | 24px |
| `--k-line-height-tight` | 1.25 | 1.33 | 1.25 |
| `--k-line-height-normal` | 1.5 | 1.6 | 1.5 |
| `--k-letter-spacing-tight` | -0.01em | -0.005em | -0.01em |
| `--k-letter-spacing-wide` | 0.05em | 0em | 0.05em |

## Category 6 — Motion

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-transition-fast` | 150ms ease-out | 180ms ease | 120ms ease-out |
| `--k-transition-normal` | 200ms ease-out | 220ms ease | 200ms ease-out |

## Category 7 — Layout

| Token | Linear | Notion | Supabase |
|---|---|---|---|
| `--k-sidebar-width` | 220px | 240px | 256px |
| `--k-header-height` | 56px | 64px | 60px |
| `--k-content-max-width` | 1280px | 960px | none |
