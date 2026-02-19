// 라우팅 골격: 메인은 단일 홈, 프로젝트만 상세 라우트로 이동한다.
import { useEffect, useMemo, useState } from 'react'
import { AppShell } from '@/app/AppShell'
import { DEFAULT_ROUTE, ROUTE_PATHS, isStaticRoutePath, type StaticRoutePath } from '@/app/routes'
import { HomePage } from '@/pages/HomePage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { SkillsPage } from '@/pages/SkillsPage'
import { EducationPage } from '@/pages/EducationPage'
import { OthersPage } from '@/pages/OthersPage'

type RouteMatch =
  | { kind: 'static'; path: StaticRoutePath }
  | { kind: 'project-detail'; slug: string }

const PROJECT_DETAIL_PREFIX = `${ROUTE_PATHS.projects}/`

function normalizeHashPath(hash: string): string {
  const trimmed = hash.replace(/^#/, '').trim()

  if (trimmed.length === 0) {
    return DEFAULT_ROUTE
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  return `/${trimmed}`
}

function ensureHashInitialized() {
  if (window.location.hash.trim().length === 0) {
    window.location.hash = `#${DEFAULT_ROUTE}`
  }
}

function matchRoute(pathname: string): RouteMatch {
  if (pathname.startsWith(PROJECT_DETAIL_PREFIX)) {
    const slug = pathname.slice(PROJECT_DETAIL_PREFIX.length).trim()

    if (slug.length > 0) {
      return { kind: 'project-detail', slug }
    }
  }

  if (isStaticRoutePath(pathname)) {
    return { kind: 'static', path: pathname }
  }

  return { kind: 'static', path: DEFAULT_ROUTE }
}

function renderRoute(match: RouteMatch) {
  if (match.kind === 'project-detail') {
    return <ProjectDetailPage slug={match.slug} />
  }

  switch (match.path) {
    case ROUTE_PATHS.projects:
      return <ProjectsPage />
    case ROUTE_PATHS.experience:
      return <ExperiencePage />
    case ROUTE_PATHS.skills:
      return <SkillsPage />
    case ROUTE_PATHS.education:
      return <EducationPage />
    case ROUTE_PATHS.others:
      return <OthersPage />
    case ROUTE_PATHS.home:
    default:
      return <HomePage />
  }
}

export function AppRouter() {
  const [pathname, setPathname] = useState(() => normalizeHashPath(window.location.hash))

  useEffect(() => {
    ensureHashInitialized()

    const handleHashChange = () => {
      setPathname(normalizeHashPath(window.location.hash))
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const routeMatch = useMemo(() => matchRoute(pathname), [pathname])
  const isProjectDetail = routeMatch.kind === 'project-detail'
  const currentPath = isProjectDetail
    ? ROUTE_PATHS.projects
    : routeMatch.kind === 'static'
      ? routeMatch.path
      : ROUTE_PATHS.home

  return (
    <AppShell currentPath={currentPath} isProjectDetail={isProjectDetail}>
      {renderRoute(routeMatch)}
    </AppShell>
  )
}
