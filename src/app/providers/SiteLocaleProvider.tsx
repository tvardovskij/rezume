import { useEffect, type ReactNode } from 'react'
import {
  LOCALE_STORAGE_KEY,
  resolveDocumentLocale,
  resolveLocaleHref,
  siteContent,
  type SiteLocale,
} from '@/shared/lib/site-content'
import { SiteLocaleContext } from '@/app/providers/site-locale-context'

type SiteLocaleProviderProps = {
  children: ReactNode
}

export function SiteLocaleProvider({ children }: SiteLocaleProviderProps) {
  const locale = resolveDocumentLocale()
  const content = siteContent.locales[locale]

  useEffect(() => {
    document.documentElement.lang = content.lang
    document.documentElement.dataset.locale = locale

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // Ignore storage failures and keep the current page locale.
    }
  }, [content.lang, locale])

  function buildLocaleHref(nextLocale: SiteLocale, hash = window.location.hash) {
    const search = typeof window !== 'undefined' ? window.location.search : ''
    const target = resolveLocaleHref(nextLocale)
    return `${target}${search}${hash}`
  }

  function switchLocale(nextLocale: SiteLocale) {
    if (nextLocale === locale) {
      return
    }

    const nextHref = buildLocaleHref(nextLocale)

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    } catch {
      // Ignore storage failures and still navigate to the localized page.
    }

    window.location.assign(nextHref)
  }

  return (
    <SiteLocaleContext.Provider
      value={{
        locale,
        content,
        githubUrl: siteContent.brand.githubUrl,
        buildLocaleHref,
        switchLocale,
      }}
    >
      {children}
    </SiteLocaleContext.Provider>
  )
}
