# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Email Digest MVP — a calm, newspaper-style daily email digest reader. Frontend for an n8n workflow that categorizes and AI-summarizes emails into 5 categories: Action Required, Delegate, FYI, Newsletters, Low Priority. Currently uses placeholder data; the POST `/api/digest` endpoint is ready for n8n webhook integration.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm start` — Serve production build

Note: Node.js is installed at `C:\Program Files\nodejs` and may need to be added to PATH in shell sessions: `export PATH="/c/Program Files/nodejs:$PATH"`

## Architecture

Single-page Next.js 15 App Router app. One page (`/`), one API route (`/api/digest`). Most components are Server Components; `DigestTabs` is the sole `"use client"` component (handles tab state).

**Data flow:** `mock-data.ts` → `page.tsx` calls `getMockDigest()` → groups items by category via `utils.ts` → renders through component tree. Future: n8n POSTs to `/api/digest`, GET serves stored data.

**Key files:**
- `src/lib/types.ts` — `DigestItem`, `DailyDigest`, `DigestCategory`, `CategoryMeta` interfaces. All other files depend on these.
- `src/lib/mock-data.ts` — 23 placeholder emails, `getMockDigest()` returns today's date
- `src/lib/categories.ts` — Display metadata per category (label, emoji, accent color, sort order)
- `src/lib/utils.ts` — `groupByCategory()`, `formatDigestDate()`, `formatRelativeTime()`
- `src/app/api/digest/route.ts` — GET (serve digest) + POST (receive n8n webhook, validates `date` + `items[]`)
- `src/app/page.tsx` — Main digest page, composes Masthead → Summary → Tabs → Footer

**Components:** `DigestMasthead` (date/stats header), `DigestSummary` (executive summary + category counts), `DigestTabs` (client component — tab bar + filtered sections), `DigestSection` (category block), `DigestItem` (single email summary), `DigestFooter` (end mark)

## Tech Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (CSS-first `@theme inline` config in `globals.css`)
- Fonts: Playfair Display (headlines), Lora (body), Inter (metadata) via `next/font/google`
- Color palette: Cream background (#FAF7F2), dark ink (#2C2C2C), warm rules (#E8E0D4)

## Conventions

- Tailwind dynamic classes must use full class names in source (no string interpolation like `` `border-${var}` ``). Store full class names in data (e.g., `"border-accent-red"` in `categories.ts`).
- Category accent colors are defined in both `globals.css` (@theme) and `categories.ts` (as full Tailwind classes).
- The `N8N_WEBHOOK_SECRET` env var (optional) enables Bearer token auth on the POST endpoint.
