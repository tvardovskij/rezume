import type { ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cx('container', className)}>{children}</div>
}
