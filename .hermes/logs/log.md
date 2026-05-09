# Kody Frontend Hermes Log

## 2026-05-04 — Frontend Hermes Cutover

Decision:

- Added frontend Hermes under `AGENTS.md` and `.hermes/`.
- Preserved the Next.js version warning from the pre-cutover `AGENTS.md`.
- Kept `CLAUDE.md` as a thin pointer.

Pre-cutover state:

- Branch: `main`.
- HEAD: `ab839e2d02f5e1c3c7aa3a68d2b7e99f144541e2`.
- Worktree: clean.
- Stack from `package.json`: Next.js `16.2.3`, React `19.2.4`, TypeScript, Tailwind CSS v4.

Verification:

- Frontend `AGENTS.md` now restores `.hermes/` read order and frontend responsibility.
- Frontend wiki records conventions, state, and legacy entrypoint summary.

Verification update:

- `git diff --check` passed.
- `.claude/settings.json` JSON validation passed.
- `.claude/hooks/hermes-safety-adapter.sh` shell syntax check passed.
- `npm run lint` passed.
- `npx tsc --noEmit` passed.
- `npm run build` passed. Build printed a Node warning about `--localstorage-file` without a valid path, but completed successfully.

Review update:

- Claude broad file-inspection review was attempted and produced no output for two minutes, then was killed; recorded as a non-interactive review no-output/timeout issue rather than command-entry or auth failure.
- Claude summary review completed and returned `NO REQUIRED FIXES`.
- Codex final review accepted the scope as Hermes operating-layer cutover with no staged product source changes in child repos and backend pre-existing dirty files preserved.

Follow-up Claude check:

- User requested another Claude check after cutover.
- A broader review prompt again produced no output for two minutes and was killed.
- A shorter review prompt completed and returned `NO REQUIRED FIXES`.
- Claude confirmed frontend Hermes files and minimal `.claude` adapter were present in the cutover summary.

## 2026-05-05 — Phase 0 v3 Prototype Gap Pass

Decision:

- Continued root `Slice A` in `kody-frontend/` only.
- Kept the work in mock/prototype scope and did not change dependencies, lockfiles, environment, or Next.js config.
- Deferred backend M0 schema/auth because Prisma schema and dependency changes require a human gate.

Implemented:

- Expanded shipment UI from two states to four stages: `피킹대기`, `피킹완료`, `패킹완료`, `출고완료`.
- Added shipment detail stage board and completion fields for `박스수량`, `총무게`, and `비고`.
- Added order confirmation mock actions for `후결제 확정` and `결제완료 확정`.
- Added Product DB tabs for `상품등록`, `입고`, `재고`, and `발주`, plus SKU/barcode/average purchase price mock fields and inventory adjustment mock log.
- Added mock auth routes for `/login`, `/signup?token=...`, `/forgot-password`, and `/reset-password?token=...`.

Verification:

- `npx tsc --noEmit` passed.
- `npm run lint` passed.
- `npm run build` passed. Build printed the existing Node warning about `--localstorage-file` without a valid path, but completed successfully.
- `npm run dev` started after approval, but route `curl -I` checks exposed a dev-server-only Tailwind resolution issue looking from the workspace root. Production build remains successful; dev-server visual verification remains open.

## 2026-05-06 — Phase 0 Verification Closeout

Decision:

- Continued `Slice A` in `kody-frontend/` only.
- Kept changes within mock/prototype UI and layout verification scope.
- Added small-screen shell and shipment-pane layout fixes because mobile verification showed the fixed sidebar and split shipment panes clipping the changed prototype surfaces.

Implemented:

- Added explicit Next viewport metadata so mobile viewport width uses device width.
- Added responsive shell/sidebar CSS for small screens.
- Added responsive shipment split-pane stacking and horizontal table scroll containment.

Verification:

- `npx tsc --noEmit` passed.
- `npm run lint` passed.
- `npm run build` passed. Build printed the existing Node warning about `--localstorage-file` without a valid path, but completed successfully.
- Dev server route checks for `/inventory`, `/shipments`, and `/login` returned 200.
- Playwright screenshots verified `/inventory`, `/shipments`, `/shipments/SHIP-260403-01`, and `/login` at desktop/mobile-oriented viewports. Visual checks confirmed nonblank screens and no major clipping on the changed surfaces.

Residual:

- Playwright dev-server capture printed React hydration mismatch warnings showing attribute differences such as `caret-color` on form controls. The warning appears tied to the browser automation environment rather than app data or markup changes; production build completed successfully.

## 2026-05-07 — Phase 0 Reverification

Decision:

- Rechecked the existing Slice A prototype gap changes instead of expanding scope.
- Kept work in `kody-frontend/` mock/prototype scope; no dependency, lockfile, environment, or Next.js config changes.

Verification:

- `npx tsc --noEmit` passed.
- `npm run lint` passed.
- `npm run build` passed. Build again printed the existing Node warning about `--localstorage-file` without a valid path, but completed successfully.
- `npm run dev` started on `http://localhost:3000`.
- Route checks returned 200 for `/inventory`, `/shipments`, and `/login`.
- Playwright verified `/inventory`, `/shipments`, `/shipments/SHIP-260403-01`, and `/login` with desktop/mobile-oriented screenshots. Visual checks confirmed nonblank rendering and no major clipping on the changed surfaces.
- Dev console logs contained only React DevTools/HMR development messages during this verification pass.
