# Kody Frontend State

## Source Provenance

- Git status and package inspection on 2026-05-04.

## Current State

- Branch before cutover: `main`.
- HEAD before cutover: `ab839e2d02f5e1c3c7aa3a68d2b7e99f144541e2`.
- Worktree was clean before Hermes cutover.
- App source lives under `app/` and shared frontend code under `lib/`.
- Current app has main shell routes and landing route, with backend proxy/client modules present.

## Open Gates

- Dependency and lockfile changes require explicit approval.
- Next.js config and environment changes require explicit approval.
- UI library installation requires explicit approval.
