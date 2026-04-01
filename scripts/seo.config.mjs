import fs from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_SITE_URL = 'https://tvardovsky.tech'
const DEFAULT_LOCALE = 'en'
const ROOT_OUTPUT = 'index.html'
const ROOT_PATH = '/'
const LOCALE_OUTPUTS = {
  en: 'en/index.html',
  ru: 'ru/index.html',
}
const LOCALE_PATHS = {
  en: '/en/',
  ru: '/ru/',
}

function toBoolean(value, fallback = false) {
  if (value == null || value === '') {
    return fallback
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase())
}

function normalizeSiteUrl(rawValue, fallback = DEFAULT_SITE_URL) {
  const candidate = (rawValue ?? fallback).trim()
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`
  const url = new URL(withProtocol)
  url.hash = ''
  url.search = ''
  return url.toString().replace(/\/+$/, '')
}

function normalizePath(pathValue, fallback) {
  const normalized = (pathValue ?? fallback).trim()

  if (!normalized) {
    return fallback
  }

  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

function toAbsoluteUrl(siteUrl, pathValue) {
  return new URL(pathValue.replace(/^\//, ''), `${siteUrl}/`).toString()
}

function getOutputDepth(outputPath) {
  return outputPath.split('/').slice(0, -1).filter(Boolean).length
}

function toRelativeOutputPath(outputPath, targetPath) {
  const prefix = getOutputDepth(outputPath) === 0 ? './' : '../'.repeat(getOutputDepth(outputPath))
  const normalizedTarget = targetPath.replace(/^\//, '')
  return `${prefix}${normalizedTarget}`
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function escapeJsonForHtml(value) {
  return value.replaceAll('<', '\\u003c').replaceAll('-->', '--\\>')
}

function buildOptionalMetaTags({
  googleSiteVerification,
  yandexVerification,
  bingVerification,
  twitterHandle,
}) {
  const lines = []

  if (googleSiteVerification) {
    lines.push(
      `<meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}" />`,
    )
  }

  if (yandexVerification) {
    lines.push(`<meta name="yandex-verification" content="${escapeHtml(yandexVerification)}" />`)
  }

  if (bingVerification) {
    lines.push(`<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />`)
  }

  if (twitterHandle) {
    lines.push(`<meta name="twitter:site" content="${escapeHtml(twitterHandle)}" />`)
    lines.push(`<meta name="twitter:creator" content="${escapeHtml(twitterHandle)}" />`)
  }

  return lines.join('\n    ')
}

function resolveRobotsMeta(noIndex) {
  if (noIndex) {
    return 'noindex,nofollow,noarchive,nosnippet'
  }

  return 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
}

function resolveRobotsTxt(noIndex, sitemapUrl) {
  if (noIndex) {
    return `User-agent: *\nDisallow: /\n\nSitemap: ${sitemapUrl}\n`
  }

  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
}

function buildLocaleStorageSyncScript(locale) {
  return `\n<script>\n(() => {\n  try {\n    window.localStorage.setItem('site-locale', '${locale}');\n  } catch {\n    // Ignore storage failures.\n  }\n})();\n</script>`
}

function buildRootRedirectScript() {
  return `\n<script>\n(() => {\n  const storageKey = 'site-locale';\n  const hash = window.location.hash || '';\n  const search = window.location.search || '';\n  let target = './en/';\n\n  try {\n    const savedLocale = window.localStorage.getItem(storageKey);\n\n    if (savedLocale === 'ru') {\n      target = './ru/';\n    } else if (savedLocale === 'en') {\n      target = './en/';\n    } else {\n      const browserLanguages = Array.isArray(window.navigator.languages) && window.navigator.languages.length > 0\n        ? window.navigator.languages\n        : [window.navigator.language].filter(Boolean);\n\n      const prefersRussian = browserLanguages.some((language) => /^ru\\b/i.test(language));\n      target = prefersRussian ? './ru/' : './en/';\n      window.localStorage.setItem(storageKey, prefersRussian ? 'ru' : 'en');\n    }\n  } catch {\n    const browserLanguages = Array.isArray(window.navigator.languages) && window.navigator.languages.length > 0\n      ? window.navigator.languages\n      : [window.navigator.language].filter(Boolean);\n\n    const prefersRussian = browserLanguages.some((language) => /^ru\\b/i.test(language));\n    target = prefersRussian ? './ru/' : './en/';\n  }\n\n  window.location.replace(target + search + hash);\n})();\n</script>`
}

function buildAlternateLinks(siteUrl) {
  const enUrl = toAbsoluteUrl(siteUrl, LOCALE_PATHS.en)
  const ruUrl = toAbsoluteUrl(siteUrl, LOCALE_PATHS.ru)
  const rootUrl = toAbsoluteUrl(siteUrl, ROOT_PATH)

  return [
    `<link rel="alternate" href="${escapeHtml(enUrl)}" hreflang="en" />`,
    `<link rel="alternate" href="${escapeHtml(ruUrl)}" hreflang="ru" />`,
    `<link rel="alternate" href="${escapeHtml(rootUrl)}" hreflang="x-default" />`,
  ].join('\n    ')
}

function buildJsonLd({ authorName, alternateName, canonicalUrl, localeContent, ogImageUrl, siteName, title }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${canonicalUrl}#person`,
        name: authorName,
        alternateName,
        jobTitle: 'E2E Lead Fullstack Engineer',
        url: canonicalUrl,
        image: ogImageUrl,
        description: localeContent.seo.description,
        sameAs: ['https://github.com/tvardovskij'],
        knowsAbout: [
          'React',
          'TypeScript',
          'Vite',
          'Next.js',
          'Django',
          'PostgreSQL',
          'Docker',
          'WebSocket',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: siteName,
        inLanguage: localeContent.langCode,
        publisher: {
          '@id': `${canonicalUrl}#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        inLanguage: localeContent.langCode,
        description: localeContent.seo.ogDescription,
        isPartOf: {
          '@id': `${canonicalUrl}#website`,
        },
        about: {
          '@id': `${canonicalUrl}#person`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      },
    ],
  }
}

export async function loadSiteContent(rootDir) {
  const contentPath = path.join(rootDir, 'src', 'content', 'site-content.json')
  const raw = await fs.readFile(contentPath, 'utf8')
  return JSON.parse(raw)
}

export function resolveSeoConfig(env, siteContent) {
  const siteUrl = normalizeSiteUrl(env.SEO_SITE_URL, DEFAULT_SITE_URL)
  const ogImagePath = normalizePath(env.SEO_OG_IMAGE_PATH, '/og-image.jpg')
  const icon192Path = normalizePath(env.SEO_ICON_192_PATH, '/icon-192.png')
  const icon512Path = normalizePath(env.SEO_ICON_512_PATH, '/icon-512.png')
  const iconSvgPath = normalizePath(env.SEO_ICON_SVG_PATH, '/logoMin.svg')
  const manifestPath = normalizePath(env.SEO_MANIFEST_PATH, '/site.webmanifest')
  const noIndex = toBoolean(env.SEO_NOINDEX, false)
  const buildDate = (env.SEO_LASTMOD ?? new Date().toISOString().slice(0, 10)).trim()
  const themeColor = (env.SEO_THEME_COLOR ?? '#050505').trim()
  const backgroundColor = (env.SEO_BACKGROUND_COLOR ?? themeColor).trim()
  const referrer = (env.SEO_REFERRER ?? 'strict-origin-when-cross-origin').trim()
  const siteName = (env.SEO_SITE_NAME ?? `${siteContent.brand.name} | Fullstack Engineer`).trim()
  const siteShortName = (env.SEO_SITE_SHORT_NAME ?? siteContent.brand.shortName).trim()
  const googleSiteVerification = (env.SEO_GOOGLE_SITE_VERIFICATION ?? '').trim()
  const yandexVerification = (env.SEO_YANDEX_VERIFICATION ?? '').trim()
  const bingVerification = (env.SEO_BING_VERIFICATION ?? '').trim()
  const twitterHandle = (env.SEO_TWITTER_HANDLE ?? '').trim()

  const ogImageUrl = toAbsoluteUrl(siteUrl, ogImagePath)
  const icon192Url = toAbsoluteUrl(siteUrl, icon192Path)
  const icon512Url = toAbsoluteUrl(siteUrl, icon512Path)
  const iconSvgUrl = toAbsoluteUrl(siteUrl, iconSvgPath)
  const manifestUrl = toAbsoluteUrl(siteUrl, manifestPath)
  const sitemapUrl = toAbsoluteUrl(siteUrl, '/sitemap.xml')
  const robotsMeta = resolveRobotsMeta(noIndex)
  const optionalMetaTags = buildOptionalMetaTags({
    googleSiteVerification,
    yandexVerification,
    bingVerification,
    twitterHandle,
  })
  const alternateLinks = buildAlternateLinks(siteUrl)

  const pages = Object.entries(siteContent.locales).map(([locale, localeContent]) => {
    const outputPath = LOCALE_OUTPUTS[locale]
    const canonicalPath = LOCALE_PATHS[locale]
    const canonicalUrl = toAbsoluteUrl(siteUrl, canonicalPath)
    const authorName = locale === 'ru' ? siteContent.brand.authorAltName : siteContent.brand.name
    const alternateName = locale === 'ru' ? siteContent.brand.name : siteContent.brand.authorAltName
    const ogImageAlt =
      env.SEO_OG_IMAGE_ALT ??
      `${authorName} — ${locale === 'ru' ? 'портфолио fullstack-разработчика' : 'fullstack engineer portfolio'}`
    const twitterImageAlt =
      env.SEO_TWITTER_IMAGE_ALT ?? `${authorName} — ${locale === 'ru' ? 'портфолио' : 'portfolio'}`
    const jsonLd = buildJsonLd({
      authorName,
      alternateName,
      canonicalUrl,
      localeContent,
      ogImageUrl,
      siteName,
      title: localeContent.seo.title,
    })

    return {
      locale,
      canonicalUrl,
      outputPath,
      replacements: {
        '%SEO_LANG%': escapeHtml(localeContent.lang),
        '%SEO_TITLE%': escapeHtml(localeContent.seo.title),
        '%SEO_SITE_NAME%': escapeHtml(siteName),
        '%SEO_SITE_SHORT_NAME%': escapeHtml(siteShortName),
        '%SEO_DESCRIPTION%': escapeHtml(localeContent.seo.description),
        '%SEO_KEYWORDS%': escapeHtml(localeContent.seo.keywords.join(', ')),
        '%SEO_AUTHOR%': escapeHtml(authorName),
        '%SEO_ROBOTS%': escapeHtml(robotsMeta),
        '%SEO_REFERRER%': escapeHtml(referrer),
        '%SEO_THEME_COLOR%': escapeHtml(themeColor),
        '%SEO_CANONICAL_URL%': escapeHtml(canonicalUrl),
        '%SEO_MANIFEST_PATH%': escapeHtml(toRelativeOutputPath(outputPath, manifestPath)),
        '%SEO_ICON_SVG_PATH%': escapeHtml(toRelativeOutputPath(outputPath, iconSvgPath)),
        '%SEO_APPLE_TOUCH_ICON_PATH%': escapeHtml(toRelativeOutputPath(outputPath, icon192Path)),
        '%SEO_OG_LOCALE%': escapeHtml(localeContent.ogLocale),
        '%SEO_OG_LOCALE_ALT%': escapeHtml(
          locale === 'ru' ? siteContent.locales.en.ogLocale : siteContent.locales.ru.ogLocale,
        ),
        '%SEO_OG_TITLE%': escapeHtml(localeContent.seo.title),
        '%SEO_OG_DESCRIPTION%': escapeHtml(localeContent.seo.ogDescription),
        '%SEO_OG_URL%': escapeHtml(canonicalUrl),
        '%SEO_OG_IMAGE_URL%': escapeHtml(ogImageUrl),
        '%SEO_OG_IMAGE_ALT%': escapeHtml(ogImageAlt),
        '%SEO_OG_UPDATED_TIME%': escapeHtml(`${buildDate}T00:00:00+00:00`),
        '%SEO_TWITTER_CARD%': escapeHtml(env.SEO_TWITTER_CARD ?? 'summary_large_image'),
        '%SEO_TWITTER_TITLE%': escapeHtml(localeContent.seo.title),
        '%SEO_TWITTER_DESCRIPTION%': escapeHtml(localeContent.seo.twitterDescription),
        '%SEO_TWITTER_URL%': escapeHtml(canonicalUrl),
        '%SEO_TWITTER_IMAGE_URL%': escapeHtml(ogImageUrl),
        '%SEO_TWITTER_IMAGE_ALT%': escapeHtml(twitterImageAlt),
        '%SEO_NOSCRIPT%': escapeHtml(localeContent.seo.noscript),
        '%SEO_OPTIONAL_META_TAGS%': optionalMetaTags,
        '%SEO_JSON_LD%': escapeJsonForHtml(JSON.stringify(jsonLd, null, 2)),
        '%SEO_ALTERNATE_LINKS%': alternateLinks,
        '%SEO_INITIAL_SCRIPT%': buildLocaleStorageSyncScript(locale),
        '%SEO_APP_ENTRY_PATH%': escapeHtml(toRelativeOutputPath(outputPath, 'src/main.tsx')),
      },
    }
  })

  const rootCanonicalUrl = toAbsoluteUrl(siteUrl, ROOT_PATH)
  const rootPage = {
    canonicalUrl: rootCanonicalUrl,
    outputPath: ROOT_OUTPUT,
    replacements: {
      '%SEO_SITE_NAME%': escapeHtml(siteName),
      '%SEO_DESCRIPTION%': escapeHtml(
        env.SEO_ROOT_DESCRIPTION ??
          'Choose portfolio language. The site automatically opens the best-matching locale.',
      ),
      '%SEO_CANONICAL_URL%': escapeHtml(rootCanonicalUrl),
      '%SEO_MANIFEST_PATH%': escapeHtml(toRelativeOutputPath(ROOT_OUTPUT, manifestPath)),
      '%SEO_ICON_SVG_PATH%': escapeHtml(toRelativeOutputPath(ROOT_OUTPUT, iconSvgPath)),
      '%SEO_APPLE_TOUCH_ICON_PATH%': escapeHtml(toRelativeOutputPath(ROOT_OUTPUT, icon192Path)),
      '%SEO_ALTERNATE_LINKS%': alternateLinks,
      '%SEO_OPTIONAL_META_TAGS%': optionalMetaTags,
      '%SEO_INITIAL_SCRIPT%': buildRootRedirectScript(),
      '%SEO_EN_PATH%': escapeHtml(toRelativeOutputPath(ROOT_OUTPUT, LOCALE_PATHS.en)),
      '%SEO_RU_PATH%': escapeHtml(toRelativeOutputPath(ROOT_OUTPUT, LOCALE_PATHS.ru)),
    },
  }

  return {
    backgroundColor,
    buildDate,
    icon192Url,
    icon512Url,
    iconSvgUrl,
    manifestUrl,
    noIndex,
    ogImageUrl,
    pages,
    robotsTxt: resolveRobotsTxt(noIndex, sitemapUrl),
    rootPage,
    sitemapUrl,
    siteName,
    siteShortName,
    siteUrl,
    themeColor,
  }
}

export function applyTemplate(template, replacements) {
  return Object.entries(replacements).reduce(
    (result, [placeholder, value]) => result.replaceAll(placeholder, value),
    template,
  )
}

export function buildSitemapXml(config) {
  const items = config.pages
    .map(
      (page) => `  <url>
    <loc>${escapeXml(page.canonicalUrl)}</loc>
    <lastmod>${escapeXml(config.buildDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.locale === DEFAULT_LOCALE ? '1.0' : '0.9'}</priority>
    <image:image>
      <image:loc>${escapeXml(config.ogImageUrl)}</image:loc>
      <image:title>${escapeXml(config.siteName)}</image:title>
    </image:image>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${items}
</urlset>
`
}

export function buildWebManifest(config) {
  return `${JSON.stringify(
    {
      id: './',
      name: config.siteName,
      short_name: config.siteShortName,
      description: 'Dmitry Tvardovsky portfolio',
      lang: 'en-US',
      start_url: './',
      scope: './',
      display: 'standalone',
      background_color: config.backgroundColor,
      theme_color: config.themeColor,
      icons: [
        {
          src: './icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: './logoMin.svg',
          sizes: '600x600',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    },
    null,
    2,
  )}
`
}
