// 프로젝트 도메인 타입 정의
// 카드/상세/내비에서 동일 스키마를 공유해 필드 불일치를 방지한다.
export interface ProjectSection {
  type: 'problem' | 'approach' | 'architecture' | 'result' | 'lessons'
  title: string
  body: string[]
}

export interface ProjectItem {
  slug: string
  title: string
  summary: string
  periodText: string
  tags: string[]
  stack: string[]
  roles: string[]
  coverImageSrc?: string
  order?: number
  sections?: ProjectSection[]
}
