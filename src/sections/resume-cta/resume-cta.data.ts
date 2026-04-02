import type { SiteLocale } from '@/shared/lib/site-content'

export type ResumeCtaContent = {
  eyebrow: string
  title: string
  lead: string
  primaryAction: {
    label: string
    href: string
    download: string
  }
  secondaryAction: {
    label: string
    href: string
    download: string
  }
  visual: {
    badge: string
    slipText: string
    chipText: string
  }
}

const resumeCtaContent: Record<SiteLocale, ResumeCtaContent> = {
  en: {
    eyebrow: 'Resume / PDF',
    title: 'Need the full resume?',
    lead:
      'Download the PDF version with experience, stack, key projects, and the scope I usually own end to end.',
    primaryAction: {
      label: 'Download Resume',
      href: '/files/resume/dmitry-tvardovsky-resume-en.pdf',
      download: 'dmitry-tvardovsky-resume-en.pdf',
    },
    secondaryAction: {
      label: 'RU PDF',
      href: '/files/resume/dmitry-tvardovsky-resume-ru.pdf',
      download: 'dmitry-tvardovsky-resume-ru.pdf',
    },
    visual: {
      badge: 'PDF / CV',
      slipText: '// Need a great employee ->',
      chipText: 'Dmitry Tvardovsky',
    },
  },
  ru: {
    eyebrow: 'CV / Резюме',
    title: 'Полное CV в PDF',
    lead:
      'Скачайте PDF-версию с опытом, стеком, ключевыми кейсами и зонами ответственности, которые я обычно закрываю end to end.',
    primaryAction: {
      label: 'Скачать CV',
      href: '/files/resume/dmitry-tvardovsky-resume-ru.pdf',
      download: 'dmitry-tvardovsky-resume-ru.pdf',
    },
    secondaryAction: {
      label: 'EN PDF',
      href: '/files/resume/dmitry-tvardovsky-resume-en.pdf',
      download: 'dmitry-tvardovsky-resume-en.pdf',
    },
    visual: {
      badge: 'PDF / CV',
      slipText: '// Хочу отличного сотрудника ->',
      chipText: 'Dmitry Tvardovsky',
    },
  },
}

export function getResumeCtaContent(locale: SiteLocale) {
  return resumeCtaContent[locale]
}
