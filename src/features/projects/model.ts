// 프로젝트 도메인 타입 정의
// 카드/상세/내비에서 동일 스키마를 공유해 필드 불일치를 방지한다.
export interface ProjectPeriod {
  start: string
  end?: string | null
  display?: string
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
  caption?: string
  kind?: 'diagram' | 'screenshot' | 'chart' | 'other'
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
  title?: string
  body?: string[]
  bullets?: string[]
  visuals?: ProjectVisual[]
}

export interface ProjectItem {
  slug: string
  title: string
  subtitle?: string
  summary: string
  period: ProjectPeriod
  tags: string[]
  stack: string[]
  roles: string[]
  coverImageSrc: string
  order?: number
  links?: ProjectLink[]
  kpis?: ProjectKpi[]
  visuals?: ProjectVisual[]
  sections?: ProjectSection[]
}
