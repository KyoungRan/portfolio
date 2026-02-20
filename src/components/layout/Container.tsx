// 콘텐츠 최대 폭 제한 + 좌우 패딩을 담당하는 레이아웃 래퍼
// DESIGN_SYSTEM.md 1.1절: Desktop 최대 폭 1100~1200px + 좌우 패딩
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'main' | 'section' | 'article'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={cn(
        // container + mx-auto 조합으로 중앙 정렬 축을 고정하고, 좌우 패딩을 명시한다.
        'container mx-auto w-full max-w-screen-lg px-5 md:px-10',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
