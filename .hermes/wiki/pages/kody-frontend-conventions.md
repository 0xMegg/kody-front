# Kody Frontend Conventions

## Source Provenance

- Frontend `package.json` at pre-cutover commit `ab839e2d02f5e1c3c7aa3a68d2b7e99f144541e2`.
- Pre-cutover frontend `AGENTS.md`.
- Root context documents listed in `.hermes/raw/source-manifest.md`.

## Stack

- Next.js `16.2.3` with App Router.
- React `19.2.4`.
- TypeScript strict.
- Tailwind CSS v4.

## Next.js Warning

This is not the Next.js version in model memory. Before writing code that depends on uncertain Next.js APIs, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.

## Product Rules

- KODY frontend is a Korean desktop web prototype.
- Use mock data/prototype discipline unless integration work is explicitly approved.
- Keep UI implementation local to the changed surface first.
- Do not add shadcn/ui, Radix, MUI, Chakra, or another UI component library without explicit approval.
- Do not change environment files, lockfiles, or Next.js config without explicit approval.

## Verification

- Lint: `npm run lint`.
- Typecheck: `npx tsc --noEmit`.
- Build: `npm run build`.
- Format command exists, but do not run rewriting formatters unless requested or scoped to the task.
