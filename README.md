# Uncle Shaan

**→ [uncle-shaan.vercel.app](https://uncle-shaan.vercel.app)**

An interactive content experience built around Shaan Puri's essays and newsletters — designed to give people in their 20s a more useful, more personal entry point into his writing than a blog archive.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

---

## The Brief

Shaan Puri has years of genuinely useful writing — essays on money, direction, risk, identity — scattered across a site with no filtering, no discovery layer, and no way to meet the reader where they are. The writing is good. The experience around it isn't built for the person who needs it most.

This project builds that experience: a fan-made, mobile-first web app that turns Shaan's content into something interactive, opinionated, and designed for a specific person at a specific moment in their life.

---

## Problem → Approach

Most content sites solve for volume. This one solves for relevance.

A 22-year-old in school and a 27-year-old stuck in a job they're good at but don't care about both need Shaan's writing — they just need different essays. The challenge was routing the right content to the right person without requiring them to read 40 posts to find it.

**Three things had to be true:**

1. The content had to be real — pulled directly from Shaan's actual writing, not paraphrased
2. The routing had to be fast — a loading spinner kills the magic
3. The design had to feel different — if it looked like another SaaS product, it wouldn't feel like advice from a person

---

## Data Pipeline

The content layer started with a full crawl of shaanpuri.com using [Firecrawl](https://firecrawl.dev) — 40 URLs scraped in parallel, producing ~14,000 lines of raw markdown.

From there, 45 entries were hand-curated into a typed content schema:

```ts
type ContentEntry = {
  id: string
  quote: string            // pull quote for oracle / scrollytelling
  full_excerpt: string     // full context
  source_url: string
  source_title: string
  date: string
  type: "essay" | "mailbag" | "email-series"
  themes: string[]         // ["career", "money", "identity", ...]
  life_situations: string[] // ["lost-in-20s", "corporate-job-bored", ...]
  oracle_eligible: boolean
  scrollytelling_eligible: boolean
}
```

No database. The full dataset ships as a flat JSON file committed to the repo. Every query is in-memory — fast, zero infrastructure cost, and easy to update by editing a single file.

---

## The Three Experiences

### 1. Scrollytelling Homepage

Full-viewport sections, each anchored to a real Shaan quote. Dark and light sections alternate, with staggered `IntersectionObserver` reveal animations. The masthead was designed to feel like the front page of a newsletter — editorial serif typography, double column rules, `Vol. I · Issue 1` dateline.

### 2. Oracle Card

A randomized pull from the curated content pool. The card renders face-down (a decorative dark back with a crosshatch grid pattern and inset borders), then auto-flips 350ms after mount using CSS `rotateY` and `preserve-3d`. Session-based deduplication means you won't pull the same card twice in one sitting. Tap the revealed card to flip it back.

### 3. Diagnostic Quiz → Archetype

Five questions map the reader to one of four archetypes:

| Archetype | Who it describes |
|---|---|
| **The Ramen Era** | In school or just graduated, figuring it out |
| **The Ambitious Employee** | Has the job, wants more, comfort is the trap |
| **The Stuck Starter** | Has the idea, keeps researching instead of shipping |
| **The Ready to Leap** | Already building, needs distribution not permission |

Each archetype has a custom diagnosis written in Shaan's voice, three prescriptions (a real quote from the content library, a concrete action, a mindset shift), and curated links into [MFM Vault](https://mfmvault.com) for deeper exploration.

**Why archetypes instead of AI?**
An early version routed quiz answers through `gpt-4o-mini` to generate personalized prescriptions. It worked — but it introduced a loading state, a monthly cost, and a failure mode. The archetype system is deterministic, instant, and produces a more focused result. Less impressive to describe; noticeably better to use.

---

## Design Direction

The brief here was explicit: don't make another startup-looking website.

Most content experiences built around internet thinkers default to the same visual language — Inter font, white background, amber accents, rounded cards. It's recognizable because it's been done a thousand times, not because it's right.

The analog newspaper direction came from the content itself. Shaan's essays read like letters — conversational, direct, a little handwritten in spirit. The design should feel like something printed and mailed, not something generated and deployed.

**The system:**

- **Playfair Display** — editorial serif for headings; the kind of type you'd find on a broadsheet masthead
- **Special Elite** — a typewriter face for labels, metadata, and buttons; adds tactility without being precious
- **Libre Baskerville** — body text; readable, warm, not corporate
- **Palette**: aged parchment `#F0E8D5`, dark ink `#1A1008`, rust `#B85C38` — no pure blacks or whites anywhere
- **Film grain** — a fixed SVG `feTurbulence` noise layer at 3.8% opacity; barely visible, but the page feels flat without it
- **Double column rules** — the recurring structural element; appear between every major section like a broadsheet
- **No rounded corners** — anywhere

The oracle card back is designed to look like the reverse of a physical oracle deck: dark crosshatch grid, inset double border, corner ornaments, centered monogram.

---

## Architecture Decisions

**Flat JSON over a database**
The content doesn't change often, and it doesn't need relational queries. A JSON file committed to the repo means the content layer is version-controlled, instantly readable, and deployable with zero infrastructure. If the dataset grew to thousands of entries, this changes — at 45, it's the right call.

**Client-side archetype routing**
The quiz result is computed entirely in the browser. No API call, no loading state, no server needed. The mapping function is ~30 lines of deterministic logic. This is only possible because the archetypes are intentionally designed — vague questions with fuzzy AI routing can't do this.

**Notion as email backend**
Email captures from the homepage and quiz result page post to a `/api/subscribe` route that writes directly to a Notion database via `@notionhq/client`. No third-party email tool required. The Notion DB schema includes source (`homepage` vs `quiz-result`) and archetype, so segmentation is built-in from day one.

**CSS-only card flip**
The oracle card uses `perspective`, `rotateY`, and `backface-visibility` — no animation library. The `preserve-3d` approach works across all modern browsers and keeps the bundle small. Framer Motion was installed; it wasn't needed.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + CSS custom properties |
| Fonts | Google Fonts via `next/font` |
| Content | Flat JSON (no database) |
| Scraping | Firecrawl CLI |
| Email capture | Notion API (`@notionhq/client`) |
| OG image | `next/og` (edge runtime) |
| Deployment | Vercel |

---

## Running Locally

```bash
git clone https://github.com/siddchauhan77/uncle-shaan
cd uncle-shaan
npm install
npm run dev
```

Open `http://localhost:3000`.

The quiz and oracle work without any environment variables. Email capture requires:

```env
NOTION_API_KEY=secret_...
```

---

*Fan-made project. Not affiliated with or endorsed by Shaan Puri.*
