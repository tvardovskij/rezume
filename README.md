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
```

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
