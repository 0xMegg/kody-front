# Kody Frontend NEXT

Current mode: frontend Hermes active.

Next action:
- Slice A Phase 0 frontend mock prototype is promoted to `main` and closed.
- Next frontend work should start with a Phase 1/F1 entry plan.
- `Slice A` is a root macro label. Frontend M0 shell work belongs to execution slice `F1`, and any F1 route plan must declare `mock-only`, `contract-first`, or `real binding`.
- For new UI work, run `plan` first, then read `kody-frontend-conventions.md` and the relevant source files before editing.
- Run lint/typecheck/build as appropriate for the changed surface.
- User reaffirmed on 2026-05-07 that Opus/Claude remains primary for frontend `plan` and `develop`; Codex invokes Claude, checks, records blockers, and owns closeout.
- Frontend Claude develop permission profile is active: ordinary `app/`, component/source, test, docs, `.hermes/logs/`, and `.hermes/NEXT.md` edits should be allowed for Claude, while `.env`, dependency/lockfile, Next/TypeScript config, generated output, destructive commands, UI-library/config changes, and ungated backend contract binding remain blocked/gated.

Open gates:
- Dependency, Next.js config, lockfile, environment, or UI library changes require explicit approval.
- If Claude develop stops on ordinary frontend source/test/docs edit permission, retry/fix the Claude permission profile first; do not convert to Codex develop unless the user explicitly approves fallback after seeing the blocker.
