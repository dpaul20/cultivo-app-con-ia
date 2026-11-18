---
name: new-feature-page
description: Scaffold a new localized feature page (route, feature component, en/es messages, localized pathname). Usage: /new-feature-page <kebab-name> <spanish-slug>
disable-model-invocation: true
argument-hint: <kebab-name> <spanish-slug>
---

# New feature page

Arguments: `$ARGUMENTS` → `<kebab-name> <spanish-slug>` (e.g. `soil-analyzer analisis-de-suelo`).
Derive `<FeatureApp>` in PascalCase (e.g. `SoilAnalyzerApp`) and `<namespace>` in camelCase (e.g. `soilAnalyzer`).

Steps:

1. **Route** — create `src/app/[locale]/<kebab-name>/page.tsx`. Follow `src/app/[locale]/harvest-calendar/page.tsx`: `SiteHeader`, `SiteFooter`, a title/subtitle from `useTranslations("<namespace>")`, and the feature component.
2. **Component** — create `src/components/<FeatureApp>/<FeatureApp>.tsx` (`"use client"` only if it needs state or effects) and `src/components/<FeatureApp>/index.ts` re-exporting it. Use primitives from `src/components/ui/`.
3. **Messages** — add a `<namespace>` object with at least `title` and `subtitle` to BOTH `messages/en.json` and `messages/es.json`. Write real Spanish, not placeholders.
4. **Routing** — add `"/<kebab-name>": { es: "/<spanish-slug>" }` to `pathnames` in `src/i18n/routing.ts`.
5. **Navigation** — if the page should appear in the header, add it there with a translated label in both locales.
6. **Verify** — run `npm run lint` and `npm run build`; report the result.

No hardcoded user-facing strings anywhere.
