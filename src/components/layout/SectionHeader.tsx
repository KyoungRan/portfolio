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
