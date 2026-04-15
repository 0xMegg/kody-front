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

## Category 8 — Button

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-btn-secondary-bg` | Secondary button background | `transparent` | `var(--k-surface)` | `var(--k-bg-sub)` |
| `--k-btn-ghost-hover` | Ghost button hover background | `var(--k-bg-hover)` | `var(--k-bg-hover)` | `var(--k-bg-raise)` |
| `--k-btn-danger-bg` | Danger button background | `var(--k-danger)` | `var(--k-danger)` | `transparent` |
| `--k-btn-danger-text` | Danger button text color | `var(--k-text-invert)` | `var(--k-text-invert)` | `var(--k-danger)` |
| `--k-btn-danger-border` | Danger button border | `none` | `none` | `1px solid var(--k-danger)` |
| `--k-btn-danger-hover-bg` | Danger button hover background | `var(--k-danger)` | `var(--k-danger)` | `var(--k-danger)` |
| `--k-btn-danger-hover-text` | Danger button hover text | `var(--k-text-invert)` | `var(--k-text-invert)` | `var(--k-text-invert)` |

## Category 9 — Card

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-card-bg` | Card background | `var(--k-surface)` | `var(--k-surface)` | `var(--k-bg-sub)` |
| `--k-shadow-card` | Card box-shadow | `none` | `rgba(15,15,15,0.04) 0px 1px 2px` | `none` |
| `--k-card-title-size` | Card title font size | `var(--k-font-size-md)` | `var(--k-font-size-lg)` | `var(--k-font-size-md)` |

## Category 10 — StatCard

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-stat-label-size` | Stat label font size | `var(--k-font-size-xs)` | `var(--k-font-size-sm)` | `var(--k-font-size-xs)` |
| `--k-stat-label-transform` | Stat label text-transform | `uppercase` | `none` | `uppercase` |
| `--k-stat-label-tracking` | Stat label letter-spacing | `0.05em` | `normal` | `0.05em` |
| `--k-stat-value-size` | Stat value font size | `28px` | `26px` | `30px` |
| `--k-stat-value-font` | Stat value font family | `var(--k-font-body)` | `var(--k-font-body)` | `var(--k-font-mono)` |

## Category 11 — Toast

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-toast-bg` | Toast background | `var(--k-surface)` | `var(--k-surface)` | `var(--k-bg-raise)` |
| `--k-toast-shadow` | Toast box-shadow | `none` | `rgba(15,15,15,0.04) 0px 1px 2px` | `0 0 0 1px var(--k-brand-glow)` |

## Category 12 — Badge

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-badge-height` | Badge height | `20px` | `22px` | `22px` |
| `--k-badge-padding` | Badge horizontal padding | `8px` | `10px` | `8px` |
| `--k-badge-radius` | Badge border-radius | `4px` | `3px` | `4px` |
| `--k-badge-font-size` | Badge font size | `11px` | `13px` | `11px` |
| `--k-badge-text-transform` | Badge text-transform | `none` | `none` | `uppercase` |
| `--k-badge-letter-spacing` | Badge letter-spacing | `0` | `0` | `0.05em` |
| `--k-badge-info` | Badge info color | `var(--k-info)` | `var(--k-brand)` | `var(--k-info)` |
| `--k-badge-info-bg` | Badge info background | `var(--k-info-bg)` | `var(--k-highlight-blue-bg)` | `var(--k-info-bg)` |
| `--k-badge-neutral-bg` | Badge neutral background | `var(--k-bg-raise)` | `var(--k-highlight-gray-bg)` | `var(--k-bg-raise)` |
| `--k-badge-accent` | Badge accent text color | `var(--k-highlight-purple)` | `var(--k-highlight-purple)` | `var(--k-highlight-purple)` |
| `--k-badge-accent-bg` | Badge accent background | `var(--k-highlight-purple-bg)` | `var(--k-highlight-purple-bg)` | `var(--k-highlight-purple-bg)` |

## Category 13 — Table

| Token | Purpose | Linear | Notion | Supabase |
|---|---|---|---|---|
| `--k-table-head-height` | Table header row height | `32px` | `40px` | `36px` |
| `--k-table-head-padding` | Table header cell padding | `12px` | `16px` | `12px` |
| `--k-table-head-font-size` | Table header font size | `11px` | `13px` | `11px` |
| `--k-table-head-text-transform` | Table header text-transform | `uppercase` | `none` | `uppercase` |
| `--k-table-head-letter-spacing` | Table header letter-spacing | `0.05em` | `0` | `0.05em` |
| `--k-table-head-border-color` | Table header bottom border | `var(--k-border)` | `var(--k-border)` | `var(--k-border-strong)` |
| `--k-table-row-bg-alt` | Alternating row background | `transparent` | `var(--k-bg-sub)` | `transparent` |
| `--k-table-hover-bg` | Row hover background | `var(--k-bg-hover)` | `var(--k-bg-hover)` | `var(--k-bg-raise)` |
| `--k-table-hover-shadow` | Row hover shadow accent | `none` | `none` | `inset 2px 0 0 var(--k-brand)` |
