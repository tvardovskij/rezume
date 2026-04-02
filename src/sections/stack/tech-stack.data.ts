import type { SiteLocale } from '@/shared/lib/site-content'

export type TechStackCategoryId =
  | 'core'
  | 'all'
  | 'frontend'
  | 'backend'
  | 'infra'
  | 'quality'
  | 'delivery'

type PrimaryTechStackCategoryId = Exclude<TechStackCategoryId, 'all' | 'core'>

export type TechStackCategory = {
  id: TechStackCategoryId
  label: string
}

export type TechStackItem = {
  id: string
  label: string
  short: string
  icon?: string
  accent: string
  accentSoft: string
  groups: PrimaryTechStackCategoryId[]
}

type TechStackSectionCopy = {
  eyebrow: string
  title: string
  lead: string
  filterAriaLabel: string
  filters: Record<TechStackCategoryId, string>
}

const techStackCategoryOrder: TechStackCategoryId[] = [
  'core',
  'frontend',
  'backend',
  'infra',
  'quality',
  'delivery',
  'all',
]

const techStackSectionContent: Record<SiteLocale, TechStackSectionCopy> = {
  en: {
    eyebrow: 'Stack I use to ship products',
    title: 'My working stack',
    lead:
      'From interfaces and state to APIs, infrastructure, and final production performance. Only the tools I actually use in real delivery.',
    filterAriaLabel: 'Technology stack filters',
    filters: {
      core: 'Core',
      all: 'All',
      frontend: 'Frontend',
      backend: 'Backend',
      infra: 'Infra',
      quality: 'Quality',
      delivery: 'Delivery',
    },
  },
  ru: {
    eyebrow: 'Стек, которым я закрываю продукт',
    title: 'Мой рабочий стек',
    lead:
      'От интерфейса и состояния до API, инфраструктуры и финального performance в production. Здесь только те инструменты, которыми я реально пользуюсь в работе.',
    filterAriaLabel: 'Фильтр стека технологий',
    filters: {
      core: 'Основное',
      all: 'Все',
      frontend: 'Frontend',
      backend: 'Backend',
      infra: 'Infra',
      quality: 'Quality',
      delivery: 'Delivery',
    },
  },
}

export const techStackItems: TechStackItem[] = [
  {
    id: 'react',
    label: 'React',
    short: 'R',
    icon: '/icons/tech-stack/react.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend'],
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    short: 'TS',
    icon: '/icons/tech-stack/typescript.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend', 'backend'],
  },
  {
    id: 'next-js',
    label: 'Next.js',
    short: 'Next',
    icon: '/icons/tech-stack/nextjs.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend'],
  },
  {
    id: 'node-js',
    label: 'Node.js',
    short: 'Node',
    icon: '/icons/tech-stack/node.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    short: 'SQL',
    icon: '/icons/tech-stack/postgresql.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'docker',
    label: 'Docker',
    short: 'DK',
    icon: '/icons/tech-stack/docker.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['infra', 'delivery'],
  },
  {
    id: 'lighthouse',
    label: 'Lighthouse',
    short: 'LH',
    icon: '/icons/tech-stack/lighthouse.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['quality'],
  },
  {
    id: 'vite',
    label: 'Vite',
    short: 'V',
    icon: '/icons/tech-stack/vite.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend', 'delivery'],
  },
  {
    id: 'django',
    label: 'Django',
    short: 'DJ',
    icon: '/icons/tech-stack/django.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'redis',
    label: 'Redis',
    short: 'RD',
    icon: '/icons/tech-stack/redis.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'nginx',
    label: 'Nginx',
    short: 'NG',
    icon: '/icons/tech-stack/nginx.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['infra'],
  },
  {
    id: 'seo',
    label: 'SEO',
    short: 'SEO',
    icon: '/icons/tech-stack/seo.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['quality'],
  },
  {
    id: 'css-scss',
    label: 'CSS / SCSS',
    short: 'CSS',
    icon: '/icons/tech-stack/css.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend'],
  },
  {
    id: 'python',
    label: 'Python',
    short: 'Py',
    icon: '/icons/tech-stack/python.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'linux',
    label: 'Linux',
    short: 'LX',
    icon: '/icons/tech-stack/linux.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['infra'],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    short: 'A11Y',
    icon: '/icons/tech-stack/accessibility.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['quality'],
  },
  {
    id: 'fsd',
    label: 'FSD',
    short: 'FSD',
    icon: '/icons/tech-stack/fsd.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['frontend', 'delivery'],
  },
  {
    id: 'rest-api',
    label: 'REST API',
    short: 'API',
    icon: '/icons/tech-stack/rest.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'ci-cd',
    label: 'CI / CD',
    short: 'CI',
    icon: '/icons/tech-stack/cicd.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['infra', 'delivery'],
  },
  {
    id: 'git',
    label: 'Git',
    short: 'Git',
    icon: '/icons/tech-stack/git.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['delivery'],
  },
  {
    id: 'websocket',
    label: 'WebSocket',
    short: 'WS',
    icon: '/icons/tech-stack/websocket.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['backend'],
  },
  {
    id: 'performance',
    label: 'Performance',
    short: 'Perf',
    icon: '/icons/tech-stack/performance.svg',
    accent: '#8659ff',
    accentSoft: 'rgba(134, 89, 255, 0.11)',
    groups: ['quality', 'delivery'],
  },
]

const coreTechStackItemIds = [
  'react',
  'typescript',
  'next-js',
  'node-js',
  'django',
  'postgresql',
  'docker',
  'websocket',
] as const

const techStackItemsMap = new Map(techStackItems.map((item) => [item.id, item]))

// Put custom SVGs into public/icons/tech-stack and reference them as /icons/tech-stack/<name>.svg.

export function getTechStackSectionCopy(locale: SiteLocale) {
  const copy = techStackSectionContent[locale]

  return {
    ...copy,
    categories: techStackCategoryOrder.map((id) => ({
      id,
      label: copy.filters[id],
    })),
  }
}

export function getTechStackItems(categoryId: TechStackCategoryId) {
  if (categoryId === 'core') {
    return coreTechStackItemIds
      .map((id) => techStackItemsMap.get(id))
      .filter((item): item is TechStackItem => Boolean(item))
  }

  if (categoryId === 'all') {
    return techStackItems
  }

  return techStackItems.filter((item) => item.groups.includes(categoryId))
}
