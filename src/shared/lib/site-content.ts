import rawSiteContent from '@/content/site-content.json'

export type SiteLocale = 'en' | 'ru'

export type ProjectImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type ProjectItem = {
  id: string
  category: string
  title: string
  description: string
  badges: string[]
  image: ProjectImage
}

export type LocaleContent = {
  lang: string
  langCode: string
  ogLocale: string
  nav: {
    homeLabel: string
    logoAlt: string
    projects: string
    stack: string
    contact: string
    github: string
    languageSwitchLabel: string
  }
  hero: {
    title: string
    leadStart: string
    leadEnd: string
    stackLabel: string
    metrics: {
      value: string
      caption: string
    }[]
  }
  projects: {
    eyebrow: string
    title: string
    lead: string
    items: ProjectItem[]
  }
  seo: {
    title: string
    description: string
    ogDescription: string
    twitterDescription: string
    keywords: string[]
    noscript: string
  }
}

export type SiteContent = {
  brand: {
    name: string
    shortName: string
    role: string
    authorAltName: string
    githubUrl: string
  }
  locales: Record<SiteLocale, LocaleContent>
}

export const siteContent = rawSiteContent as SiteContent

export const DEFAULT_LOCALE: SiteLocale = 'en'
export const LOCALE_STORAGE_KEY = 'site-locale'
export const LOCALE_ROUTE_SEGMENTS: Record<SiteLocale, string> = {
  en: 'en',
  ru: 'ru',
}

export function isSiteLocale(value: string | null | undefined): value is SiteLocale {
  return value === 'en' || value === 'ru'
}

export function resolveDocumentLocale(): SiteLocale {
  if (typeof document === 'undefined') {
    return DEFAULT_LOCALE
  }

  const lang = document.documentElement.lang.trim().toLowerCase()
  return lang.startsWith('ru') ? 'ru' : DEFAULT_LOCALE
}

export function resolveLocaleHref(locale: SiteLocale, hash = '') {
  const basePath = `../${LOCALE_ROUTE_SEGMENTS[locale]}/`
  return hash ? `${basePath}${hash}` : basePath
}
