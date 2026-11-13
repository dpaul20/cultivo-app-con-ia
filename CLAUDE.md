# CultivAI

Asistente de asociación de cultivos (huerta) en Next.js. Bilingüe español/inglés, español por defecto.

## Comandos

- `npm run dev`: servidor de desarrollo (Turbopack) en http://localhost:3000
- `npm run build`: build de producción
- `npm run lint`: ESLint (config plana en `eslint.config.mjs`; `.eslintrc.json` es legado y ESLint 9 lo ignora)
- `npm run typecheck`: `tsc --noEmit`

`next.config.ts` hoy ignora los errores de TypeScript y ESLint durante el build, así que un build verde no prueba nada: corré `lint` y `typecheck` antes de dar algo por terminado.

No hay tests todavía.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, shadcn/ui (estilo new-york, Radix) e íconos lucide-react. Deploy en Vercel. No hay backend, base de datos ni variables de entorno.

## Estructura

- `app/[lang]/`: todas las páginas, con `lang` igual a `es` o `en`. Rutas: inicio, `garden-planner`, `growth-tracker`, `planting-calendar`, `ai-info`.
- `app/[lang]/dictionaries.ts` + `dictionaries/{es,en}.json`: textos de la interfaz. Server-only; las páginas cargan el diccionario y lo pasan por props a los componentes cliente.
- `middleware.ts`: redirige a `/<lang>` según `Accept-Language`.
- `components/ui/`: componentes shadcn generados. Agregar con `npx shadcn@latest add <componente>` y no editarlos a mano salvo que haga falta.
- `components/<módulo>/`: una carpeta por funcionalidad (planificador, seguimiento, calendario).
- `lib/utils.ts`: helper `cn()` para clases.
- Alias de imports: `@/` apunta a la raíz del repo.

## Convenciones

- Todo texto visible va en los dos diccionarios (`es.json` y `en.json`) y en el tipo `Dictionary`. No agregar textos de respaldo hardcodeados en los componentes.
- `params` en páginas y layouts: tratarlo como Promise (`const { lang } = await params`). El código actual lo lee de forma síncrona y eso rompe en Next 16.
- Componentes de servidor por defecto; `"use client"` solo donde hay estado o eventos.
- El asistente de cultivos (`components/crop-assistant.tsx`) es simulado por palabras clave; no llama a ningún modelo.
- Los datos de cultivos están duplicados en cada componente. Si tocás datos de plantas, revisá todos los módulos.

## Deuda conocida

Hay un plan de modernización acordado por fases (Next 16, CI, catálogo único de cultivos, IA real, Tailwind 4). Antes de cambios grandes de stack, preguntar.
