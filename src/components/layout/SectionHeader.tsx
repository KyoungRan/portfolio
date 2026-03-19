// 이 파일은 현재 경로의 모듈을 정의한다.
// 주요 책임: 파일 내부에 선언된 컴포넌트/유틸을 구성한다.
// 변경 시 외부 의존성과 사용처를 함께 확인한다.
import type { CSSProperties, ReactNode } from 'react'
import {
  SECTION_DIVIDER_LINE_CLASS_NAME,
  SECTION_DIVIDER_SPACING_STYLE,
  SECTION_TITLE_STYLE,
} from '@/components/layout/sectionHeaderTokens'

type SectionHeaderTag = 'h2' | 'h3' | 'h4'

interface SectionHeaderProps {
  as?: SectionHeaderTag
  title: ReactNode
  titleStyle?: CSSProperties
  dividerSpacingStyle?: CSSProperties
  hideDivider?: boolean
  children?: ReactNode
}

export function SectionHeader({
  as = 'h2',
  title,
  titleStyle,
  dividerSpacingStyle,
  hideDivider = false,
  children,
}: SectionHeaderProps) {
  const HeadingTag = as

  return (
    <>
      <HeadingTag style={titleStyle ?? SECTION_TITLE_STYLE}>{title}</HeadingTag>
      {!hideDivider && (
        <div style={dividerSpacingStyle ?? SECTION_DIVIDER_SPACING_STYLE}>
          <div className={SECTION_DIVIDER_LINE_CLASS_NAME} />
        </div>
      )}
      {children}
    </>
  )
}
