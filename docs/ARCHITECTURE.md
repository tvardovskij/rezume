# Project Architecture

## Goals

- Scalable structure for resume site growth (new sections, themes, animations).
- Strict separation between app shell, sections, and shared UI primitives.
- Fast iteration with predictable import paths through `@` alias.

## Directory Layout

```text
src/
  app/
    App.tsx
    styles/
      app.css
      base.css
      index.css
      tokens.css
  sections/
    hero/
      HeroSection.tsx
      hero.css
      hero.data.ts
    summary/
      SummarySection.tsx
      summary.css
  shared/
    lib/
      cx.ts
    ui/
      Container.tsx
```

## Layer Responsibilities

- `app`: application composition, global style tokens, reset/base rules.
- `sections`: isolated page slices with their own markup, styles, and section-local data.
- `shared`: reusable utilities and UI building blocks without business coupling.

## Hero Rendering Stack

1. Optimized GIF background (`hero-bg.optimized.gif`) rendered inside Hero only.
2. Grain layer for cinematic texture.
3. Blue full-frame color filter.
4. Intersecting color circles with blend mode for local tint zones.
5. Global blur layer for soft volumetric effect.
6. Content layer with nav, title, stack chips, and metrics.
7. Bottom fadeout mask to merge Hero into absolute black next sections.

## Media Pipeline

- Input: `public/media/hero/source/hero-original.gif`.
- Output: `public/media/hero/hero-bg.optimized.gif`, `hero-bg.webm`, `hero-bg.mp4`.
- Command: `npm run optimize:hero-media`.
