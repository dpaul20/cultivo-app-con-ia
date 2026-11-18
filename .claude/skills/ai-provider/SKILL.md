---
name: ai-provider
description: How to call an LLM in this app — Gemini Flash as primary, Groq as fallback, server-side only, localized answers. Use when implementing or changing any AI feature (crop assistant, harvest/planting calendar, planner suggestions) or replacing a simulated AI response.
user-invocable: false
---

# AI provider pattern

All AI features go through ONE server-side module (planned: `src/lib/ai/`). Feature code never calls a provider SDK directly.

## Rules

1. **Server-only.** Import `server-only` in the AI module. Call it from route handlers (`src/app/api/**/route.ts`) or server actions. Keys come from `process.env` (`GEMINI_API_KEY`, `GROQ_API_KEY`) and never reach the client.
2. **Provider order.** Try Gemini Flash first (free tier). Fall back to Groq when Gemini throws, returns a 429/5xx, or exceeds the timeout. Log which provider answered.
3. **Timeouts.** Abort each provider call with an `AbortController` (about 8–10 s). Do not retry the same provider in a loop.
4. **Locale and region.** Pass the request locale (`en` | `es`) and the user's location. The system prompt must require the answer in that language and account for the hemisphere (southern hemisphere seasons are inverted).
5. **Structured output.** Ask for JSON matching a TypeScript type and validate it before returning. On invalid output, return a typed error, not raw model text.
6. **Bounded cost.** Short prompts, a `max tokens` cap, low temperature for factual answers.
7. **Graceful failure.** If both providers fail, return a clear localized error (message key in both `messages/en.json` and `messages/es.json`). Do not silently return mock data in production.

## Before writing code

Check current SDK docs with context7 (Google Gen AI SDK, Groq SDK, or the AI SDK if adopted). Model names and free-tier limits change often; do not rely on memory.

## Existing mocks to replace

- `src/app/api/harvest-calendar/route.ts`
- `src/components/CropAssistant.tsx`
