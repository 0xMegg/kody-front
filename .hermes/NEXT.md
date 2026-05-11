# Kody Frontend NEXT

Current mode: frontend Hermes active.

Next action:
- Return to root orchestration and plan the next post-F1 slice. Current product sequencing note says M3 Payment must precede M4 Order Confirmation.
- F1 Frontend M0 Shell and CP#2 demo readiness is complete in `kody-frontend/`.

F1 closeout result:
- All F1 membership/demo surfaces are explicitly `mock-only`.
- Hardened `/login`, `/signup?token=...`, `/forgot-password`, and `/reset-password?token=...` with visible F1 mode messaging and no default fake credentials.
- Added frontend-local route-mode declarations in `lib/auth/route-modes.ts`.
- Added frontend-local mock session helpers in `lib/auth/mock-session.ts`; no cookie, localStorage, env, or backend call is used.
- Added `/profile` under the main shell with mock current-user profile data and S7 dependency note.
- Added `/admin/users` under the main shell with mock user rows, mock invite action, ADMIN/FINANCE access behavior, and S6/S8/S10 dependency notes.
- Updated TopBar with mock current-user menu, role badges, profile/admin links, and mock logout.
- Updated main navigation to include `/profile` and role-filtered `/admin/users` from local mock roles.
- Removed dead API/proxy infrastructure: `lib/api-client.ts`, `lib/backend-proxy.ts`, and `app/api/health/route.ts`.

Verification:
- `npm run lint` passed.
- `npx tsc --noEmit` passed.
- `npm run build` passed.
- Frontend `git diff --check` / staged diff check passed.
- Root `git diff --check` passed after closeout docs.
- Search confirmed no F1 route imports `apiClient`, `proxyToBackend`, `backend-proxy`, `api-client`, `fetch(`, `process.env`, `NEXT_PUBLIC`, or `useRealApi`; only explanatory comments mention banned API/proxy terms.
- Independent review returned PASS with no blockers or important issues.

Scope held:
- Product implementation stayed in `kody-frontend/`.
- No backend edit, env edit, dependency/lockfile edit, Next/TypeScript/ESLint config change, UI library change, real backend binding, auth cookie/localStorage/session persistence, or new API proxy route was added.
- F1 remains demo/mock-only; real auth/profile/admin backend binding requires a future explicit plan and approval.

Workflow reminders:
- Opus/Claude remains primary for frontend `plan` and `develop`; Codex/Hermes invokes Claude, checks, records blockers, and owns closeout.
- Frontend implementation work belongs in `kody-frontend/`.
- Dependency, Next.js config, lockfile, environment, UI library, or real backend integration changes remain gated.
