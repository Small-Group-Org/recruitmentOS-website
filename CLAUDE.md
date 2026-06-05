# RecruitmentOS Landing Page — Claude Instructions

## Project overview
Next.js 16 (App Router) marketing site for RecruitmentOS — an AI-powered recruitment agency platform. Deployed at `recruitmentos.smallgrp.com`.

## Stack
- **Framework**: Next.js 16 App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 (no config file — uses `@import "tailwindcss"` in globals.css)
- **Fonts**: DM Serif Display (`--font-serif`), Outfit (`--font-outfit`), DM Mono (`--font-mono`) — loaded via `next/font/google`
- **Forms**: web3forms (`access_key: 0e7ac89b-a20a-4df5-a7b9-b5fc081df584`)
- **Analytics**: Custom via `src/lib/analytics.ts`

## Dev workflow
```bash
npm run dev        # starts on port 3000 (or 3001 if occupied)
npm run build      # production build — always run before saying something works
npm run lint       # eslint
```

**Important**: After code changes the dev server must be restarted if it doesn't hot-reload. Kill with `lsof -ti:3001 | xargs kill -9` then re-run `npm run dev`.

## Project structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — fonts, SiteHeader, Analytics, ConsultationPopup
│   ├── page.tsx                  # Home page
│   ├── tools/
│   │   ├── page.tsx              # /tools — renders ToolHub
│   │   └── [slug]/page.tsx       # /tools/[slug] — renders ToolPageClient
│   ├── case-studies/
│   ├── pricing/
│   ├── resources/
│   └── outreach/
│
├── components/
│   ├── tools/
│   │   ├── ToolHub.tsx           # Tools listing page (gate-aware)
│   │   ├── ToolPageClient.tsx    # Individual tool page (gate-aware)
│   │   ├── ToolCard.tsx          # Card used in the hub grid
│   │   └── ToolGateForm.tsx      # 2-step lead capture gate form
│   ├── Navbar.tsx                # Main nav — edit here to add nav links
│   ├── SiteHeader.tsx            # Sticky wrapper: AnnouncementBanner + Navbar
│   └── ConsultationPopup.tsx     # Corner popup with delay
│
├── hooks/
│   └── useToolGate.ts            # localStorage gate: key = "rOS_unlocked"
│
└── lib/
    ├── tools-data.ts             # ← ONLY place to add/edit tools
    ├── case-studies-data.ts
    └── analytics.ts
```

## Design system
All colours are defined as CSS variables in `src/app/globals.css`. **Use a token — do not hand-pick raw hex.** The palette was consolidated: one orange brand, one green success accent, and a single gray ramp (no slate).

| Variable | Value | Usage |
|---|---|---|
| `--brand` | `#FF6A00` | **Primary** — CTAs, headline accents, "New" badge |
| `--brand-hover` | `#E55F00` | Brand hover / pressed state |
| `--brand-tint` | `#FFF4EB` | Orange tint backgrounds |
| `--accent` | `#1A6B4A` | Success / active green — checkmarks, status badges, spinners |
| `--accent-light` | `#E8F5EF` | Green tint backgrounds |
| `--foreground` / `--ink` | `#0A0A0A` | Body text (the only near-black) |
| `--muted` / `--gray-500` | `#6B7280` | Secondary text |
| `--border` / `--gray-200` | `#E5E5E5` | Default borders |
| `--border-strong` / `--gray-300` | `#D1D5DB` | Stronger borders / dividers |
| `--surface` | `#FFFFFF` | Card backgrounds |
| `--gray-50…--gray-800` | ramp | Neutral scale — use these, never `slate-*` |
| `#FAFAFA` | — | Page background (body default) |

Brand/success colors are also exposed as Tailwind utilities via `@theme`: `bg-brand`, `text-brand`, `bg-brand-tint`, `text-success`, etc.

**Font wiring** (see `@theme` in `globals.css`): `font-sans` → **Outfit** (default body/UI), `font-serif` → **DM Serif Display** (400 only — headings auto-reset to 400, no faux-bold), `font-mono` → **DM Mono**.

**Font usage pattern** — class and inline-var forms are equivalent; prefer the class:
```tsx
className="font-sans"                          // body / UI (Outfit) — also the default
style={{ fontFamily: 'var(--font-serif)' }}   // display headings (DM Serif Display)
style={{ fontFamily: 'var(--font-mono)' }}    // labels, badges, tags (DM Mono)
```

**Border radius conventions**: `rounded-[4px]` buttons/inputs · `rounded-[10px]` cards

## Adding a new tool
Edit **only** `src/lib/tools-data.ts` — everything else generates automatically:

```ts
{
  slug: 'my-tool',              // → /tools/my-tool
  title: 'My Tool Name',
  description: 'One or two sentence description.',
  category: 'Outreach' | 'Assessment' | 'Strategy',
  badge: 'Tool' | 'Guide' | 'Template' | 'Scorecard',
  isNew: true,                  // optional — shows orange badge
  resourceUrl: 'https://...',   // Google Doc, Notion, Claude artifact, etc.
  communityUrl: 'https://chat.whatsapp.com/...', // optional WhatsApp link
  videoUrl: 'https://...',      // optional walkthrough video
  whatsInside: [
    'Bullet one',
    'Bullet two',
  ],
}
```

## Tools gate system
- **localStorage key**: `rOS_unlocked = "true"`
- **Flow**: spinner (hydrating) → gate form (first visit) → tools (unlocked)
- Gate form is 2 steps: name + email → headache multi-select → submits to web3forms → `unlock()` → redirect to `/tools`
- Gate is checked on both `/tools` and `/tools/[slug]` — same localStorage key covers both
- To reset gate for testing: `localStorage.removeItem('rOS_unlocked')` in browser console

## Key conventions
- All client components start with `'use client'`
- Server components (pages) are async and pass data as props to client components
- `generateStaticParams` is used on `tools/[slug]` and `case-studies/[slug]` for SSG
- No `useState`/`useEffect` in server components
- Do not use `any` type — use proper TypeScript types
- Inline `style` props are used alongside Tailwind (not instead of) for design-token values
- Never use `git add -A` — stage specific files only

## Contacts / external links
- **WhatsApp community**: `https://chat.whatsapp.com/I9PLSmDMJ06B6qYYVsRb0q?mode=gi_t`
- **LinkedIn**: `https://www.linkedin.com/in/tusharmanglatm/`
- **Cal.com booking**: `https://cal.com/tusharm/30min?user=tusharm`
- **web3forms key**: `0e7ac89b-a20a-4df5-a7b9-b5fc081df584`
