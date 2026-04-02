import type { SiteLocale } from '@/shared/lib/site-content'

export type ContactChannelGroup = 'direct' | 'social'

export type ContactChannel = {
  id: string
  title: string
  href: string | null
  iconPath: string
  fallback: string
  group: ContactChannelGroup
  featured: boolean
}

export type ContactFooterContent = {
  primaryContact: {
    label: string
    href: string | null
  }
  role: string
  lead: string
  socialAriaLabel: string
  columnLabels: {
    direct: string
    social: string
  }
  repository: {
    buttonLabel: string
    href: string
  }
  channels: ContactChannel[]
}

const PROJECT_REPOSITORY_URL = 'https://github.com/tvardovskij/rezume'

// Update profile URLs here when needed.
const contactProfileLinks = {
  telegram: '@dtvardovsky',
  linkedin: 'linkedin.com/in/tvardovsky',
  vk: 'vk.com/tvardovsky',
  instagram: 'instagram.com/tvardovsky',
  habr: 'habr.com/ru/users/tvardovsky/',
  email: 'dmitry@tvardovsky.tech',
}

function normalizeExternalUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (/^[a-z]+:/i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed.replace(/^\/+/, '')}`
}

function normalizeTelegramUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.slice(1)}`
  }

  return normalizeExternalUrl(trimmed)
}

function normalizeEmailUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.startsWith('mailto:')) {
    return trimmed
  }

  if (trimmed.includes('@')) {
    return `mailto:${trimmed}`
  }

  return trimmed
}

function resolvePrimaryContactLabel(emailValue: string) {
  const trimmed = emailValue.trim()

  if (trimmed) {
    return trimmed.replace(/^mailto:/i, '')
  }

  return 'Dmitry Tvardovsky'
}

export function getContactFooterContent(
  locale: SiteLocale,
  githubUrl: string,
): ContactFooterContent {
  const links = {
    telegram: normalizeTelegramUrl(contactProfileLinks.telegram),
    linkedin: normalizeExternalUrl(contactProfileLinks.linkedin),
    github: normalizeExternalUrl(githubUrl),
    vk: normalizeExternalUrl(contactProfileLinks.vk),
    instagram: normalizeExternalUrl(contactProfileLinks.instagram),
    habr: normalizeExternalUrl(contactProfileLinks.habr),
    email: normalizeEmailUrl(contactProfileLinks.email),
  }

  const channels: ContactChannel[] = [
    {
      id: 'telegram',
      title: 'Telegram',
      href: links.telegram,
      iconPath: '/icons/contact/telegram.svg',
      fallback: 'TG',
      group: 'direct',
      featured: true,
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      href: links.linkedin,
      iconPath: '/icons/contact/linkedin.svg',
      fallback: 'in',
      group: 'direct',
      featured: true,
    },
    {
      id: 'email',
      title: 'Email',
      href: links.email,
      iconPath: '/icons/contact/email.svg',
      fallback: '@',
      group: 'direct',
      featured: false,
    },
    {
      id: 'github',
      title: 'GitHub',
      href: links.github,
      iconPath: '/icons/contact/github.svg',
      fallback: 'GH',
      group: 'social',
      featured: true,
    },
    {
      id: 'vk',
      title: 'VK',
      href: links.vk,
      iconPath: '/icons/contact/vk.svg',
      fallback: 'VK',
      group: 'social',
      featured: false,
    },
    {
      id: 'instagram',
      title: 'Instagram',
      href: links.instagram,
      iconPath: '/icons/contact/instagram.svg',
      fallback: 'IG',
      group: 'social',
      featured: false,
    },
    {
      id: 'habr',
      title: 'Habr',
      href: links.habr,
      iconPath: '/icons/contact/habr.svg',
      fallback: 'Hb',
      group: 'social',
      featured: true,
    },
  ]

  const primaryContact = {
    label: resolvePrimaryContactLabel(contactProfileLinks.email),
    href: links.email,
  }

  if (locale === 'ru') {
    return {
      primaryContact,
      role: 'E2E Lead Fullstack Engineer',
      lead:
        'Если нужен инженер end to end, быстрее всего писать в Telegram или на email. Остальные площадки собраны ниже.',
      socialAriaLabel: 'Социальные сети и контактные площадки',
      columnLabels: {
        direct: 'Связь',
        social: 'Соцсети',
      },
      repository: {
        buttonLabel: 'Исходники сайта',
        href: PROJECT_REPOSITORY_URL,
      },
      channels,
    }
  }

  return {
    primaryContact,
    role: 'E2E Lead Fullstack Engineer',
    lead:
      'If you need an end-to-end engineer, the fastest way is Telegram or email. The rest of the platforms are below.',
    socialAriaLabel: 'Social networks and contact platforms',
    columnLabels: {
      direct: 'Contact',
      social: 'Socials',
    },
    repository: {
      buttonLabel: 'Source code',
      href: PROJECT_REPOSITORY_URL,
    },
    channels,
  }
}
