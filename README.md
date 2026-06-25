# Edwinfred Kamau — Personal Site

A studio-grade personal website for Edwinfred Kamau — software & AI engineer,
founder of Lobster Technologies.

The governing idea: **editorial calm is the rule (~80%), strategic wow is the
exception (~20%)**, and every bold moment is anchored to real work. The quality
of the site is itself the first proof of the work. See
[`edwinfred-website-design-spec.md`](./edwinfred-website-design-spec.md) for the
full, locked design specification — it is the source of truth.

---

## Stack

| Concern        | Choice                                                              |
| :------------- | :----------------------------------------------------------------- |
| Framework      | **Astro** — near-zero JS, static output, multi-page ready          |
| Styling        | **Plain CSS + design tokens** (no utility framework)               |
| Motion         | **GSAP** + ScrollTrigger + CustomEase (lazy-loaded per island)     |
| Type           | Self-hosted **Fraunces** (display serif) + **Inter Tight** (sans)  |
| Ink marks      | Hand-authored irregular **SVG paths**, drawn via `stroke-dashoffset` |
| Images / video | Astro `<Image>` (AVIF/WebP) · poster-first lazy `<video>` loops    |
| Hosting        | **Cloudflare Pages** (static, edge CDN)                            |

Design constraints (do not break): warm bone paper (`#F6F2E9`), warm near-black
text (`#1A1814`), one **scarce ink-blue** accent — **four colours, no fifth**.
Light theme only. Full-bleed sections. Mobile-first. All copy in **Shaan Puri's
voice** (short, punchy, conversational, warm — never talking down).

---

## Project structure

```text
edwinfred-site/
├─ public/
│  ├─ fonts/                  # self-hosted, subset woff2
│  ├─ ink/                    # hand-drawn SVG stroke artwork
│  ├─ video/                  # flagship demo loops (mp4 + webm + poster)
│  └─ img/                    # screenshots, portrait
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css           # color, type scale, spacing, easing — single source of truth
│  │  ├─ reset.css            # minimal modern reset
│  │  ├─ base.css             # element defaults, fluid type, fonts @font-face
│  │  └─ utilities.css        # the few shared helpers (hairline, measure, container)
│  ├─ lib/
│  │  └─ motion.ts            # GSAP setup, CustomEase curves, matchMedia helpers, reduced-motion gate
│  ├─ components/
│  │  ├─ InkStroke.astro      # reusable hand-drawn stroke (variant + trigger)
│  │  ├─ Hairline.astro       # ink-blue divider, optional draw-on
│  │  ├─ Nav.astro
│  │  ├─ Footer.astro
│  │  └─ sections/
│  │     ├─ Hero.astro
│  │     ├─ About.astro
│  │     ├─ Services.astro
│  │     ├─ Work.astro
│  │     ├─ Lobster.astro     # scaffold placeholder only
│  │     └─ Contact.astro
│  ├─ layouts/
│  │  └─ BaseLayout.astro     # <head>, font preload, nav, footer, slot
│  ├─ content/
│  │  ├─ projects/            # one file per project (content collection)
│  │  └─ blog/                # markdown posts (content collection)
│  └─ pages/
│     ├─ index.astro          # the single-narrative home page
│     ├─ blog/
│     │  ├─ index.astro       # blog index (its own page, per your call)
│     │  └─ [slug].astro      # post reading view
│     └─ 404.astro
└─ astro.config.mjs
```

> The tree above is the target structure from the build plan. Some pieces
> (e.g. `content/` collections, `blog/` routes, `404.astro`, `utilities.css`)
> are scaffolded as they're reached in the milestone sequence below.

---

## The design system (build it first, never skip)

Everything flows from a shared visual system, so sections stay consistent and
new ones are additive rather than bespoke:

- **`src/styles/tokens.css`** — the single source of truth. Colours, the fluid
  `clamp()` type scale (`--step--1` … `--step-5`), spacing rhythm, and the named
  easing curves (`--ease-settle`, `--ease-draw`, `--ease-hand`, `--ease-physical`).
  **Always use these tokens** — never hard-code a value that a token already
  defines.
- **`src/lib/motion.ts`** — registers GSAP once and defines CustomEase curves
  that mirror the CSS easings, plus a `responsive()` matchMedia helper and a
  single reduced-motion gate. Every animation degrades cleanly in one place.
- **`InkStroke.astro` / `Hairline.astro`** — the recurring signatures. Reuse
  these; do not re-implement hand marks or dividers per-section.

Visit **`/styleguide`** in dev to see the whole system live (colours, type,
ink marks in motion, hairlines) — the quality-bar reference.

---

## Heartbeat (home page order)

`Hero (WOW) → About (calm) → Services (calm) → Work (WOW) → Blog (calm) → Contact (calm)`

Lobster Technologies is intentionally **deferred** — scaffolded as a placeholder,
to be designed in a later pass.

---

## Commands

Run from the project root. This project uses **pnpm**.

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `pnpm install`    | Install dependencies                         |
| `pnpm dev`        | Start the dev server at `localhost:4321`     |
| `pnpm build`      | Build the production site to `./dist/`        |
| `pnpm preview`    | Preview the production build locally          |
| `pnpm astro ...`  | Run Astro CLI commands (`astro add`, `check`) |

---

## Outstanding assets (`[CONFIRM]`)

Tracked in the spec; placeholders are used until provided:

- Work section: 5 projects' screenshots/recordings, before/built/after stories,
  and concrete "after" results for the two flagships (Wendo, Grocery Supplier).
- The two flagship demo videos (real product, real data, one clean action).
- First blog post body (~600–900 words).
- Hero status-line wording.

Contact details are confirmed and live in `src/lib/site.ts`.

---

## Deploy

Cloudflare Pages, static output (`dist/`), config in `wrangler.toml`. Push to the
connected branch and Cloudflare builds + serves from the edge.
```sh
pnpm build      # produces ./dist
```
