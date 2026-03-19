// 프로젝트 도메인 타입 정의
// 카드/상세/내비에서 동일 스키마를 공유해 필드 불일치를 방지한다.
import type { TableColumnWidths } from '@/lib/tableColumnWidths'

export interface RichTextSegment {
  text: string
  bold?: boolean
  color?: 'purple' | 'gray' | 'muted'
}

export type RichText = string | RichTextSegment[]

export interface ProjectPeriod {
  start: string
  end?: string | null
  display?: string
  detailDisplay?: string
}

export interface ProjectLink {
  label: string
  href: string
  external?: boolean
}

export interface ProjectKpi {
  label: string
  value: string
  context?: string
  evidence?: string
}

export interface ProjectVisual {
  src: string
  alt: string
  caption?: RichText
  kind?: 'diagram' | 'screenshot' | 'chart' | 'other'
  widthPercent?: number
}

export interface ProjectSectionTable {
  headers?: RichText[]
  rows: RichText[][]
  columnWidths?: TableColumnWidths
}

export interface ProjectSection {
  type:
    | 'problem'
    | 'approach'
    | 'architecture'
    | 'result'
    | 'lessons'
    | 'timeline'
    | 'responsibilities'
    | 'quote'
    | 'separator'
    | 'callout'
  title?: RichText
  titleLevel?: 2 | 3 | 4
  source?: RichText
  labelPaletteOverrides?: Record<string, string>
  rightColumnAlign?: 'center'
  tableTopSpacing?: number
  tableBottomSpacing?: number
  body?: RichText[]
  tocColumns?: RichText[][]
  bullets?: RichText[]
  visuals?: ProjectVisual[]
  visualAlign?: 'left' | 'center'
  table?: ProjectSectionTable
  layout?: 'default' | 'split'
}

export interface ProjectItem {
  slug: string
  title: string
  type?: string
  subtitle?: string
  summary: string
  labelPalette?: Record<string, { bg: string; text: string; border?: string }>
  labelPaletteOverrides?: Record<string, string>
  period: ProjectPeriod
  tags: string[]
  stack: string[]
  roles: string[]
  coverImageSrc: string
  coverImageWidthPercent?: number
  order?: number
  links?: ProjectLink[]
  kpis?: ProjectKpi[]
  visuals?: ProjectVisual[]
  sections?: ProjectSection[]
}
