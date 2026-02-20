export type HeroMetric = {
  value: string
  caption: string
}

export type HeroTech = {
  id: string
  label: string
  icon: string
}

export const heroMetrics: HeroMetric[] = [
  {
    value: '2+',
    caption: 'года коммерческой разработки интерфейсов',
  },
  {
    value: '25+',
    caption: 'реализованных продуктовых фич и лендингов',
  },
  {
    value: '12+',
    caption: 'проектов на React / TypeScript / Next.js',
  },
  {
    value: '95+',
    caption: 'оценка Lighthouse Performance на production',
  },
]

export const showHeroTech = true

export const heroTechIcons: HeroTech[] = [
  { id: 'react', label: 'React', icon: '/icons/stack/react.svg' },
  { id: 'ts', label: 'TypeScript', icon: '/icons/stack/typescript.svg' },
  { id: 'node', label: 'Node.js', icon: '/icons/stack/node.svg' },
  { id: 'postgres', label: 'PostgreSQL', icon: '/icons/stack/postgresql.svg' },
  { id: 'docker', label: 'Docker', icon: '/icons/stack/docker.svg' },
  { id: 'redis', label: 'Redis', icon: '/icons/stack/redis.svg' },
]
