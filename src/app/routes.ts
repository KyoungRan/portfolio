// 앱 라우트 상수/타입 정의
// 라우트 문자열 오타를 줄이고 Header/Router가 같은 기준을 사용하도록 고정한다.
export const ROUTE_PATHS = {
  home: '/',
  projects: '/projects',
  experience: '/experience',
  skills: '/skills',
  education: '/education',
  others: '/others',
} as const

export type StaticRoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS]

export const DEFAULT_ROUTE: StaticRoutePath = ROUTE_PATHS.home

const STATIC_ROUTE_SET = new Set<StaticRoutePath>(Object.values(ROUTE_PATHS))

export function isStaticRoutePath(pathname: string): pathname is StaticRoutePath {
  // 런타임 경로 문자열을 정적 라우트 유니온으로 안전하게 좁힌다.
  return STATIC_ROUTE_SET.has(pathname as StaticRoutePath)
}
