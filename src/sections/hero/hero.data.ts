export type HeroTech = {
  id: string
  label: string
  icon: string
}

export const heroTechIcons: HeroTech[] = [
  { id: 'react', label: 'React', icon: '/icons/stack/react.svg' },
  { id: 'ts', label: 'TypeScript', icon: '/icons/stack/typescript.svg' },
  { id: 'node', label: 'Node.js', icon: '/icons/stack/node.svg' },
  { id: 'postgres', label: 'PostgreSQL', icon: '/icons/stack/postgresql.svg' },
  { id: 'docker', label: 'Docker', icon: '/icons/stack/docker.svg' },
  { id: 'redis', label: 'Redis', icon: '/icons/stack/redis.svg' },
]
