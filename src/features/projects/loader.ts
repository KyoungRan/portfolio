// 프로젝트 콘텐츠 로더
// JSON 파일을 자동 수집해 목록/드롭다운/상세에서 동일한 데이터 소스를 재사용한다.
import type { ProjectItem } from '@/features/projects/model'

type ProjectModule = {
  default: ProjectItem
}

const modules = import.meta.glob<ProjectModule>('/src/content/projects/*.json', {
  eager: true,
})

function byOrder(a: ProjectItem, b: ProjectItem) {
  // order가 없으면 뒤로 보내고, 동일 order는 제목 순으로 안정 정렬한다.
  const aOrder = a.order ?? 9999
  const bOrder = b.order ?? 9999

  if (aOrder !== bOrder) {
    return aOrder - bOrder
  }

  return a.title.localeCompare(b.title)
}

export function getAllProjects(): ProjectItem[] {
  return Object.values(modules)
    .map((module) => module.default)
    .sort(byOrder)
}

export function getProjectBySlug(slug: string): ProjectItem | null {
  // 상세 페이지에서 slug 매칭 실패 시 null을 반환해 not-found UI로 분기한다.
  const projects = getAllProjects()
  return projects.find((project) => project.slug === slug) ?? null
}
