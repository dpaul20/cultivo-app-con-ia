# Cultivo App con IA

Gardening assistant (planting/harvest calendars, garden planner, growth tracker, crop assistant) for home growers, primarily in Latin America.

## Stack

- Next.js 15 (App Router, Turbopack dev) + React 19 + TypeScript
- Tailwind CSS 3 + shadcn/ui (Radix) — reusable primitives in `src/components/ui/`
- i18n: `next-intl` with locales `en` (default) and `es`
- No database, auth, or tests yet

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (run before declaring a change done)
- `npm run lint` — ESLint (`next lint`)

## Structure

- `src/app/[locale]/<feature>/page.tsx` — localized pages; thin wrappers around a feature component
- `src/app/api/<feature>/route.ts` — API routes (currently mocked)
- `src/components/<FeatureApp>/<FeatureApp>.tsx` + `index.ts` — feature components (PascalCase folders)
- `src/components/Layout/` — `SiteHeader`, `SiteFooter`, page layout
- `src/i18n/routing.ts` — locales and localized pathnames (e.g. `/harvest-calendar` → `es: /calendario-de-cosecha`)
- `src/i18n/request.ts` — loads `messages/<locale>.json`
- `messages/en.json`, `messages/es.json` — the ONLY message files loaded at runtime. Other `messages/*.json` files are not wired in.

## Conventions

- TypeScript everywhere; components in PascalCase.
- Never hardcode user-facing text: use `useTranslations("<namespace>")` (or `getTranslations` on the server).
- Every new message key goes into BOTH `messages/en.json` and `messages/es.json` with the same structure. A hook warns on mismatch.
- New routes must be added to `pathnames` in `src/i18n/routing.ts` with their Spanish slug.
- Local state with `useState`/`useContext`; no global store.
- Do not edit `.env*` or `package-lock.json` directly (blocked by hook). Change dependencies through `npm`.

## AI (planned)

AI responses are currently simulated (e.g. `src/app/api/harvest-calendar/route.ts`, `CropAssistant.tsx`). The planned design:

- Primary: Google Gemini Flash (free tier). Fallback: Groq when Gemini fails, times out, or hits quota.
- Calls happen server-side only (route handlers / server actions); API keys never reach the client.
- Answers must be in the request locale and adapted to the user's region and hemisphere (Latin America: seasons are inverted vs. the northern hemisphere).
- Keep cost and latency low: short prompts, bounded output, timeouts.

Use the `ai-provider` skill when implementing any AI feature.
