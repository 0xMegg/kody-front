# Kody Frontend Hermes Entry

Read order for fresh agents:

1. `.hermes/SOUL.md` — judgment posture.
2. `.hermes/USER.md` — user and collaboration preferences.
3. `.hermes/NEXT.md` — active frontend handoff pointer.
4. `.hermes/MEMORY.md` — operational memory boundary.
5. `.hermes/policy/automation.md` — change classification and human-gate rules.
6. `.hermes/policy/promotion.md` — Core/project rule propagation.
7. `.hermes/policy/harness-review.md` — operating-layer review boundary.
8. `.hermes/policy/claude-cli.md` — Claude CLI invocation boundary.
9. `.hermes/wiki/pages/kody-frontend-conventions.md` — frontend implementation rules.
10. `.hermes/wiki/pages/kody-frontend-state.md` — current frontend state.
11. `.hermes/wiki/index.md` — knowledge index.

Precedence: `AGENTS.md` > `.hermes/policy/` > `.hermes/SOUL.md` > `.hermes/USER.md` > `.hermes/NEXT.md` > `.hermes/MEMORY.md` > `.hermes/wiki/`.

1. Verification is the completion condition. An unverified result is not done.
2. This is not the Next.js version in model memory. Read relevant docs in `node_modules/next/dist/docs/` before using uncertain Next.js APIs.
3. Keep the prototype mock-data discipline unless the user explicitly approves integration work.
4. Preserve UI-library restrictions and variant/theme isolation from `kody-frontend-conventions.md`.
5. Behavior, ownership, permission, execution-flow, dependency, config, or project-judgment changes require a human gate.
6. Record important decisions and verification results in `.hermes/logs/log.md`.
7. The legacy harness is retired. Use `.hermes/wiki/pages/kody-frontend-legacy-harness-summary.md` first; use root legacy summary or pre-cutover commits only as fallback reference.
