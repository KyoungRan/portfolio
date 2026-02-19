// 프로젝트 콘텐츠 로더
// JSON 파일을 자동 수집해 목록/드롭다운/상세에서 동일한 데이터 소스를 재사용한다.
import type { ProjectItem } from '@/features/projects/model'

type ProjectModule = {
  default: ProjectItem
}

const modules = import.meta.glob<ProjectModule>('/src/content/projects/*.json', {
  eager: true,
})

function toTimestamp(value?: string | null): number {
  if (!value) {
    return 0
  }

  const normalized = value.trim()

  if (/^\d{4}-\d{2}$/.test(normalized)) {
    return Date.parse(`${normalized}-01T00:00:00Z`)
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return Date.parse(`${normalized}T00:00:00Z`)
  }

  return 0
}

function getLatestPeriodTimestamp(project: ProjectItem): number {
  return Math.max(toTimestamp(project.period.end), toTimestamp(project.period.start))
}

function formatPeriodToken(value?: string | null): string {
  if (!value) {
    return ''
  }

  const normalized = value.trim()

  if (/^\d{4}-\d{2}$/.test(normalized)) {
    return normalized.replace('-', '.')
  }

  return normalized.replace(/-/g, '.')
}

export function formatProjectPeriod(project: ProjectItem): string {
  const { period } = project

  if (period.display && period.display.trim().length > 0) {
    return period.display.trim()
  }

  const start = formatPeriodToken(period.start)
  const end = period.end ? formatPeriodToken(period.end) : 'Present'
  return `${start} - ${end}`
}

function compareProjects(a: ProjectItem, b: ProjectItem) {
  // order를 명시한 프로젝트는 우선순위를 강제한다.
  if (typeof a.order === 'number' && typeof b.order === 'number' && a.order !== b.order) {
    return a.order - b.order
  }

  if (typeof a.order === 'number' && typeof b.order !== 'number') {
    return -1
  }

  if (typeof b.order === 'number' && typeof a.order !== 'number') {
    return 1
  }

  // 기본 정렬은 최신순(종료일/시작일 기준)이다.
  const dateGap = getLatestPeriodTimestamp(b) - getLatestPeriodTimestamp(a)

  if (dateGap !== 0) {
    return dateGap
  }

  return a.title.localeCompare(b.title)
}

export function getAllProjects(): ProjectItem[] {
  return Object.values(modules)
    .map((module) => module.default)
    .sort(compareProjects)
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>()

  for (const project of getAllProjects()) {
    for (const tag of project.tags) {
      tags.add(tag)
    }
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
}

export function getProjectsByTag(tag: string): ProjectItem[] {
  const normalized = tag.trim().toLowerCase()

  if (normalized.length === 0) {
    return getAllProjects()
  }

  return getAllProjects().filter((project) =>
    project.tags.some((item) => item.toLowerCase() === normalized),
  )
}

export function getProjectBySlug(slug: string): ProjectItem | null {
  // 상세 페이지에서 slug 매칭 실패 시 null을 반환해 not-found UI로 분기한다.
  const projects = getAllProjects()
  return projects.find((project) => project.slug === slug) ?? null
}
