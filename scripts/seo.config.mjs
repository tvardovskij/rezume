const DEFAULT_KEYWORDS = [
  'Дмитрий Твардовский',
  'Dmitry Tvardovsky',
  'Fullstack Engineer',
  'E2E Lead',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'резюме разработчика',
  'портфолио разработчика',
]

function toBoolean(value, fallback = false) {
  if (value == null || value === '') {
    return fallback
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase())
}

function normalizeSiteUrl(rawValue, fallback) {
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

function splitCsv(value, fallback) {
  if (!value) {
    return fallback
  }

  const list = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  return list.length > 0 ? list : fallback
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function escapeJsonForHtml(value) {
  return value.replaceAll('<', '\\u003c').replaceAll('-->', '--\\>')
}

function buildOptionalMetaTags(config) {
  const lines = []

  if (config.googleSiteVerification) {
    lines.push(
      `<meta name="google-site-verification" content="${escapeHtml(config.googleSiteVerification)}" />`,
    )
  }

  if (config.yandexVerification) {
    lines.push(
      `<meta name="yandex-verification" content="${escapeHtml(config.yandexVerification)}" />`,
    )
  }

  if (config.bingVerification) {
    lines.push(`<meta name="msvalidate.01" content="${escapeHtml(config.bingVerification)}" />`)
  }

  if (config.twitterHandle) {
    lines.push(`<meta name="twitter:site" content="${escapeHtml(config.twitterHandle)}" />`)
    lines.push(`<meta name="twitter:creator" content="${escapeHtml(config.twitterHandle)}" />`)
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

export function resolveSeoConfig(env = process.env) {
  const siteUrl = normalizeSiteUrl(env.SEO_SITE_URL, 'https://sdhgwow.github.io/rezume')
  const canonicalUrl = `${siteUrl}/`
  const ogImagePath = normalizePath(env.SEO_OG_IMAGE_PATH, '/og-image.jpg')
  const icon192Path = normalizePath(env.SEO_ICON_192_PATH, '/icon-192.png')
  const icon512Path = normalizePath(env.SEO_ICON_512_PATH, '/icon-512.png')
  const iconSvgPath = normalizePath(env.SEO_ICON_SVG_PATH, '/logoMin.svg')
  const manifestPath = normalizePath(env.SEO_MANIFEST_PATH, '/site.webmanifest')
  const locale = (env.SEO_OG_LOCALE ?? 'ru_RU').trim()
  const localeAlt = (env.SEO_OG_LOCALE_ALT ?? 'en_US').trim()
  const language = (env.SEO_LANG ?? 'ru').trim()
  const languageCode = (env.SEO_LANG_CODE ?? 'ru-RU').trim()
  const noIndex = toBoolean(env.SEO_NOINDEX, false)
  const buildDate = (env.SEO_LASTMOD ?? new Date().toISOString().slice(0, 10)).trim()
  const themeColor = (env.SEO_THEME_COLOR ?? '#050505').trim()
  const backgroundColor = (env.SEO_BACKGROUND_COLOR ?? themeColor).trim()
  const referrer = (env.SEO_REFERRER ?? 'strict-origin-when-cross-origin').trim()

  const title = (
    env.SEO_TITLE ?? 'Дмитрий Твардовский | E2E Lead Fullstack Engineer'
  ).trim()
  const siteName = (env.SEO_SITE_NAME ?? 'Dmitry Tvardovsky | Fullstack Engineer').trim()
  const siteShortName = (env.SEO_SITE_SHORT_NAME ?? 'Tvardovsky').trim()
  const authorName = (env.SEO_AUTHOR ?? 'Dmitry Tvardovsky').trim()
  const authorAltName = (env.SEO_AUTHOR_ALT ?? 'Дмитрий Твардовский').trim()
  const profession = (env.SEO_PROFESSION ?? 'E2E Lead Fullstack Engineer').trim()

  const description = (
    env.SEO_DESCRIPTION ??
    'Делаю продукты от идеи до продакшена: проектирую архитектуру, пишу frontend и backend, запускаю и сопровождаю.'
  ).trim()
  const ogDescription = (
    env.SEO_OG_DESCRIPTION ??
    'Fullstack с вниманием к деталям: архитектура, скорость, стабильность и фичи, которые реально приносят результат.'
  ).trim()
  const twitterDescription = (
    env.SEO_TWITTER_DESCRIPTION ??
    'Frontend + backend под ключ: React, TypeScript, Node.js, PostgreSQL, Docker.'
  ).trim()

  const keywords = splitCsv(env.SEO_KEYWORDS, DEFAULT_KEYWORDS)

  const ogImageUrl = toAbsoluteUrl(siteUrl, ogImagePath)
  const icon192Url = toAbsoluteUrl(siteUrl, icon192Path)
  const icon512Url = toAbsoluteUrl(siteUrl, icon512Path)
  const iconSvgUrl = toAbsoluteUrl(siteUrl, iconSvgPath)
  const manifestUrl = toAbsoluteUrl(siteUrl, manifestPath)
  const sitemapUrl = toAbsoluteUrl(siteUrl, '/sitemap.xml')

  const googleSiteVerification = (env.SEO_GOOGLE_SITE_VERIFICATION ?? '').trim()
  const yandexVerification = (env.SEO_YANDEX_VERIFICATION ?? '').trim()
  const bingVerification = (env.SEO_BING_VERIFICATION ?? '').trim()
  const twitterHandle = (env.SEO_TWITTER_HANDLE ?? '').trim()

  const robotsMeta = resolveRobotsMeta(noIndex)
  const optionalMetaTags = buildOptionalMetaTags({
    googleSiteVerification,
    yandexVerification,
    bingVerification,
    twitterHandle,
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${canonicalUrl}#person`,
        name: authorName,
        alternateName: authorAltName,
        jobTitle: profession,
        url: canonicalUrl,
        image: ogImageUrl,
        description,
        knowsAbout: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Web Performance', 'System Architecture'],
      },
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: siteName,
        inLanguage: languageCode,
        publisher: {
          '@id': `${canonicalUrl}#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        inLanguage: languageCode,
        description: ogDescription,
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

  const replacements = {
    '%SEO_LANG%': escapeHtml(language),
    '%SEO_TITLE%': escapeHtml(title),
    '%SEO_SITE_NAME%': escapeHtml(siteName),
    '%SEO_SITE_SHORT_NAME%': escapeHtml(siteShortName),
    '%SEO_DESCRIPTION%': escapeHtml(description),
    '%SEO_KEYWORDS%': escapeHtml(keywords.join(', ')),
    '%SEO_AUTHOR%': escapeHtml(authorName),
    '%SEO_ROBOTS%': escapeHtml(robotsMeta),
    '%SEO_REFERRER%': escapeHtml(referrer),
    '%SEO_THEME_COLOR%': escapeHtml(themeColor),
    '%SEO_CANONICAL_URL%': escapeHtml(canonicalUrl),
    '%SEO_HREFLANG%': escapeHtml(language),
    '%SEO_MANIFEST_PATH%': escapeHtml(manifestPath),
    '%SEO_ICON_SVG_PATH%': escapeHtml(iconSvgPath),
    '%SEO_APPLE_TOUCH_ICON_PATH%': escapeHtml(icon192Path),
    '%SEO_OG_LOCALE%': escapeHtml(locale),
    '%SEO_OG_LOCALE_ALT%': escapeHtml(localeAlt),
    '%SEO_OG_TITLE%': escapeHtml(title),
    '%SEO_OG_DESCRIPTION%': escapeHtml(ogDescription),
    '%SEO_OG_URL%': escapeHtml(canonicalUrl),
    '%SEO_OG_IMAGE_URL%': escapeHtml(ogImageUrl),
    '%SEO_OG_IMAGE_ALT%': escapeHtml(env.SEO_OG_IMAGE_ALT ?? `${authorAltName} — ${profession}`),
    '%SEO_OG_UPDATED_TIME%': escapeHtml(`${buildDate}T00:00:00+00:00`),
    '%SEO_TWITTER_CARD%': escapeHtml(env.SEO_TWITTER_CARD ?? 'summary_large_image'),
    '%SEO_TWITTER_TITLE%': escapeHtml(title),
    '%SEO_TWITTER_DESCRIPTION%': escapeHtml(twitterDescription),
    '%SEO_TWITTER_URL%': escapeHtml(canonicalUrl),
    '%SEO_TWITTER_IMAGE_URL%': escapeHtml(ogImageUrl),
    '%SEO_TWITTER_IMAGE_ALT%': escapeHtml(
      env.SEO_TWITTER_IMAGE_ALT ?? `${authorAltName} — портфолио`,
    ),
    '%SEO_NOSCRIPT%': escapeHtml(
      env.SEO_NOSCRIPT_MESSAGE ??
        `Для корректной работы сайта включите JavaScript. ${title}.`,
    ),
    '%SEO_OPTIONAL_META_TAGS%': optionalMetaTags,
    '%SEO_JSON_LD%': escapeJsonForHtml(JSON.stringify(jsonLd, null, 2)),
  }

  return {
    canonicalUrl,
    buildDate,
    description,
    icon192Path,
    icon512Path,
    iconSvgPath,
    icon192Url,
    icon512Url,
    iconSvgUrl,
    keywords,
    manifestPath,
    manifestUrl,
    noIndex,
    ogImagePath,
    ogImageUrl,
    backgroundColor,
    robotsMeta,
    robotsTxt: resolveRobotsTxt(noIndex, sitemapUrl),
    siteName,
    siteShortName,
    sitemapUrl,
    themeColor,
    title,
    languageCode,
    replacements,
  }
}

export function applyTemplate(template, replacements) {
  return Object.entries(replacements).reduce(
    (accumulator, [placeholder, value]) => accumulator.replaceAll(placeholder, value),
    template,
  )
}

export function buildSitemapXml(config) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${escapeXml(config.canonicalUrl)}</loc>
    <lastmod>${escapeXml(config.buildDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${escapeXml(config.ogImageUrl)}</image:loc>
      <image:title>${escapeXml(config.title)}</image:title>
    </image:image>
  </url>
</urlset>
`
}

export function buildWebManifest(config) {
  return `${JSON.stringify(
    {
      id: '/',
      name: config.siteName,
      short_name: config.siteShortName,
      description: config.description,
      lang: config.languageCode,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: config.backgroundColor,
      theme_color: config.themeColor,
      icons: [
        {
          src: config.icon192Path,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: config.icon512Path,
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: config.iconSvgPath,
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
