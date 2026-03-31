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

1. Centered SVG infinity ambient used instead of GIF/video.
2. Blue tint layer over the ambient to unify the palette.
3. Local color filters (including pink accents) above the animation so moving elements pass through tint zones.
4. Soft blur veil that pushes all animation visually behind the foreground content.
5. Grain layer for cinematic texture.
6. Content layer with nav, title, stack chips, and metrics.
7. Bottom fadeout mask to merge Hero into absolute black next sections.

## Hero Background Notes

- The Hero no longer depends on GIF/video playback for first paint.
- Infinite motion is achieved with SVG stroke offset animations plus soft ambient drift.
- The Hero keeps all animated layers under the color filters and blur veil.
