import { createContext, useContext } from 'react'
import type { LocaleContent, SiteLocale } from '@/shared/lib/site-content'

export type SiteLocaleContextValue = {
  locale: SiteLocale
  content: LocaleContent
  githubUrl: string
  buildLocaleHref: (nextLocale: SiteLocale, hash?: string) => string
  switchLocale: (nextLocale: SiteLocale) => void
}

export const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null)

export function useSiteLocale() {
  const context = useContext(SiteLocaleContext)

  if (!context) {
    throw new Error('useSiteLocale must be used within SiteLocaleProvider')
  }

  return context
}
