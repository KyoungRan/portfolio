// 페이지 본문 래퍼
// 히어로(풀폭)와 본문(중앙 컬럼)의 폭을 분리해 노션형 가독성을 유지한다.
import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'

interface PageContentProps {
  children: ReactNode
  className?: string
}

export function PageContent({ children, className }: PageContentProps) {
  return <Container className={className}>{children}</Container>
}
