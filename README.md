# Resume Site (React + TypeScript + Vite)

Профессиональный каркас резюме-сайта с Hero-блоком в стиле вашего референса:

- многослойный фон (GIF + зерно + цветофильтры + пересекающиеся круги + blur);
- плавное затухание Hero в черный фон следующих секций;
- модульная структура `app / sections / shared`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run seo:generate
```

## SEO Autogeneration

SEO-файлы и мета-теги генерируются автоматически перед `dev/build/preview`:

- `index.html` (из шаблона `index.template.html`);
- `public/robots.txt`;
- `public/sitemap.xml`;
- `public/site.webmanifest`.

Для настройки создайте `.env` на основе `.env.example` и измените:

- `SEO_SITE_URL` (обязательно ваш production URL);
- `SEO_TITLE`, `SEO_DESCRIPTION`, `SEO_OG_DESCRIPTION`, `SEO_TWITTER_DESCRIPTION`;
- `SEO_KEYWORDS`;
- verification-токены (`SEO_GOOGLE_SITE_VERIFICATION`, `SEO_YANDEX_VERIFICATION`, `SEO_BING_VERIFICATION`) при необходимости.

## GIF Optimization

1. Положите исходник в `public/media/hero/source/hero-original.gif`.
2. Запустите:

```powershell
npm run optimize:hero-media
```

Будут созданы:

- `public/media/hero/hero-bg.optimized.gif`
- `public/media/hero/hero-bg.webm`
- `public/media/hero/hero-bg.mp4`

## Architecture

Подробная схема и ответственность слоев:

- `docs/ARCHITECTURE.md`
