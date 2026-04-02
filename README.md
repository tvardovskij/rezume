# Dmitry Tvardovsky Portfolio

Portfolio / resume landing built with React, TypeScript, and Vite.

The project is a localized static site with separate English and Russian entries, custom section-based UI, and build-time SEO generation.

## Stack

- React 19
- TypeScript 5
- Vite 7
- Plain CSS with section-scoped files

## Project Structure

```text
src/
  app/        app composition, providers, global styles
  sections/   page sections with local markup, data, and CSS
  shared/     shared utilities and UI primitives
  content/    localized site content
scripts/      SEO and asset-related scripts
public/       static assets
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run seo:generate
```

## SEO Workflow

SEO files are generated from templates plus `src/content/site-content.json`.

`npm run seo:generate` updates:

- `index.html`
- `en/index.html`
- `ru/index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`

The generator writes files only when content has actually changed, so routine local runs do not dirty the repo without a real diff.

## Resume PDFs

Place localized resume files in `public/files/resume/`:

- `dmitry-tvardovsky-resume-en.pdf`
- `dmitry-tvardovsky-resume-ru.pdf`

## Deployment Notes

- Production is configured for deployment from the domain root.
- Localized pages live at `/en/` and `/ru/`.
- Static assets are served from root-relative paths.
