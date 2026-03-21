// Header: 홈 섹션 이동 + Project 드롭다운(프로젝트 상세 링크)
import { useEffect, useMemo, useRef, useState } from 'react'
import { ROUTE_PATHS, type StaticRoutePath } from '@/app/routes'
import { Container } from '@/components/layout/Container'
import site from '@/content/site.json'
import { getAllProjects } from '@/features/projects/loader'
import { assetPath } from '@/lib/assetPath'
import { cn } from '@/lib/cn'
import { scrollToSectionStart } from '@/lib/scrollToSectionStart'

interface HeaderProps {
  currentPath: StaticRoutePath
  isProjectDetail: boolean
}

interface SiteNavItem {
  label: string
  sectionId: string
}

interface ProjectIconProps {
  index: number
  className?: string
}

const PENDING_SCROLL_KEY = 'pending-home-section-id'
const PROJECT_ICON_COUNT = 5

const styles = {
  header: cn(
    'sticky top-0 z-40 border-b border-border',
    'bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/80',
  ),
  brand: 'shrink-0',
  brandLink: cn(
    'inline-flex items-center gap-3 font-bold tracking-tight text-[var(--gradient-start)]',
    'text-lg no-underline hover:no-underline',
  ),
  brandLogo: 'h-9 w-9',
  mobileToggle: cn(
    'ml-auto inline-flex min-h-10 min-w-[64px] items-center justify-center rounded-md border border-border p-[5px] text-sm text-foreground md:hidden',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  desktopNav: 'ml-auto hidden items-center justify-end gap-3 md:flex lg:gap-4',
  navButtonBase: cn(
    'group relative inline-flex items-center px-5 py-2.5 text-sm font-medium leading-none transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  // Notion 메뉴 기본 텍스트 톤
  navButtonIdle: 'text-[#787774]',
  // 활성 상태: 퍼플 계열
  navButtonActive: 'text-[var(--gradient-start)]',
  navContentBase: cn(
    'relative inline-flex items-center gap-2',
    "after:pointer-events-none after:absolute after:-bottom-2 after:left-[-1.5px] after:right-[-1.5px] after:h-1 after:rounded-full after:bg-transparent after:transition-colors after:content-['']",
  ),
  // hover는 라인만 표시(텍스트 색 변화 없음)
  navContentIdle: 'group-hover:after:bg-[var(--gradient-start)]',
  navContentActive: 'after:bg-[var(--gradient-start)]',
  dropdownWrapper: 'absolute right-0 top-full mt-3 w-88',
  dropdownArrow:
    'absolute -top-2 right-8 h-4 w-4 rotate-45 border-l border-t border-[#e5e7eb] bg-card',
  dropdownPanel: 'relative rounded-[18px] border border-[#e5e7eb] bg-card p-[15px] shadow-lg',
  dropdownList: 'overflow-hidden rounded-[14px] border border-[#e5e7eb] p-[15px]',
  dropdownItem: cn(
    'flex w-full items-center gap-3 border-b border-[#e5e7eb] p-[15px] text-base text-foreground/90 transition-colors last:border-b-0 !no-underline hover:!no-underline',
    'hover:bg-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  mobileNav: 'absolute top-full right-0 z-50 mt-3 w-[min(22rem,calc(100vw-3rem))] md:hidden',
  mobileItemButton: cn(
    'flex w-full items-center gap-2 rounded-md px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors',
    'hover:bg-muted hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  mobileNavPanel: 'relative rounded-[18px] border border-[#e5e7eb] bg-card p-[5px] shadow-lg',
  mobileNavList: 'overflow-hidden rounded-[14px] border border-[#e5e7eb] p-[5px]',
  mobileSubPanel: 'mt-2 rounded-[18px] border border-[#e5e7eb] bg-card p-[5px] shadow-lg',
  mobileSubList: 'overflow-hidden rounded-[14px] border border-[#e5e7eb] p-[5px]',
  mobileSubItem: cn(
    'block w-full rounded-sm border-b border-[#e5e7eb] p-[15px] text-left text-sm text-muted-foreground transition-colors last:border-b-0',
    'hover:bg-muted hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
}

function HeaderMenuIcon({ sectionId, className }: { sectionId: string; className?: string }) {
  if (sectionId === 'about-me') {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (sectionId === 'projects') {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 8h5l2 2h9v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (sectionId === 'experience') {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect height="12" rx="2" width="16" x="4" y="7" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (sectionId === 'skills') {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect height="10" rx="2" width="10" x="7" y="7" />
        <path
          d="M3 10h3m0 4H3m15-4h3m-3 4h3M10 3v3m4-3v3m-4 12v3m4-3v3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (sectionId === 'education-training') {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="m3 9 9-4 9 4-9 4-9-4Zm4 3.8V16c0 1.6 2.2 3 5 3s5-1.4 5-3v-3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3v18M3 12h18M5.8 5.8l12.4 12.4M18.2 5.8 5.8 18.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectIcon({ index, className }: ProjectIconProps) {
  const iconIndex = index % PROJECT_ICON_COUNT

  if (iconIndex === 0) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3v7m0 0-3-3m3 3 3-3m-9 9a6 6 0 0 1 12 0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (iconIndex === 1) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect height="10" rx="2" width="10" x="7" y="7" />
        <path
          d="M3 10h3m0 4H3m15-4h3m-3 4h3M10 3v3m4-3v3m-4 12v3m4-3v3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (iconIndex === 2) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="6" rx="6.5" ry="2.5" />
        <path
          d="M5.5 6v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V6M5.5 12v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (iconIndex === 3) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M4 18h16M6 18V9m6 9V5m6 13v-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 8h5l2 2h7v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 14h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function moveToHomeAndScroll(sectionId: string) {
  // 상세 페이지에서 홈으로 복귀한 뒤 섹션으로 이동하기 위한 임시 키
  sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId)
  window.location.hash = `#${ROUTE_PATHS.home}`
}

export function Header({ currentPath, isProjectDetail }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const clickLockSectionIdRef = useRef<string | null>(null)
  const clickLockTimerRef = useRef<number | null>(null)
  const navItems = useMemo(() => site.nav.items as SiteNavItem[], [])
  const projects = useMemo(() => getAllProjects(), [])
  const resolvedActiveSectionId = isProjectDetail ? 'projects' : activeSectionId

  useEffect(() => {
    if (isProjectDetail || currentPath !== ROUTE_PATHS.home) {
      return
    }

    const handleScroll = () => {
      if (clickLockSectionIdRef.current) {
        setActiveSectionId(clickLockSectionIdRef.current)
        return
      }

      const header = document.querySelector('header') as HTMLElement | null
      const anchorLine = (header?.offsetHeight ?? 0) + 24
      let nextActive: string | null = null

      for (const item of navItems) {
        const section = document.getElementById(item.sectionId)

        if (!section) {
          continue
        }

        const title = section.querySelector('h2') as HTMLElement | null
        const target = title ?? section

        if (target.getBoundingClientRect().top <= anchorLine) {
          nextActive = item.sectionId
          continue
        }

        break
      }

      setActiveSectionId(nextActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (clickLockTimerRef.current) {
        window.clearTimeout(clickLockTimerRef.current)
      }
    }
  }, [currentPath, isProjectDetail, navItems])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsProjectOpen(false)
  }

  const handleSectionClick = (sectionId: string) => {
    closeMenu()
    clickLockSectionIdRef.current = sectionId
    setActiveSectionId(sectionId)

    if (clickLockTimerRef.current) {
      window.clearTimeout(clickLockTimerRef.current)
    }

    clickLockTimerRef.current = window.setTimeout(() => {
      clickLockSectionIdRef.current = null
    }, 900)

    if (currentPath !== ROUTE_PATHS.home || isProjectDetail) {
      moveToHomeAndScroll(sectionId)
      return
    }

    scrollToSectionStart(sectionId)
  }

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
  }

  return (
    <header className={styles.header}>
      <Container className="relative px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            className={styles.brandLink}
            href="#/"
            onClick={(event) => {
              event.preventDefault()
              closeMenu()
              window.location.hash = `#${ROUTE_PATHS.home}`
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            }}
            style={{ color: 'var(--gradient-start)' }}
          >
            <img alt="Logo" className={styles.brandLogo} src={assetPath('/assets/logo.png')} />
            <span className="text-[var(--gradient-start)]">Home</span>
          </a>

          <button
            aria-controls="mobile-nav"
            aria-expanded={isMenuOpen}
            aria-label="메뉴 열기"
            className={styles.mobileToggle}
            onClick={toggleMenu}
            type="button"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          <nav aria-label="주요 메뉴" className={styles.desktopNav}>
            {navItems.map((item) => {
              const isProjectItem = item.label === 'Project'
              const isActive = resolvedActiveSectionId === item.sectionId

              if (!isProjectItem) {
                return (
                  <button
                    key={item.sectionId}
                    className={cn(
                      styles.navButtonBase,
                      isActive ? styles.navButtonActive : styles.navButtonIdle,
                    )}
                    onClick={() => handleSectionClick(item.sectionId)}
                    type="button"
                  >
                    <span
                      className={cn(
                        styles.navContentBase,
                        isActive ? styles.navContentActive : styles.navContentIdle,
                      )}
                    >
                      <HeaderMenuIcon className="h-4 w-4" sectionId={item.sectionId} />
                      <span>{item.label}</span>
                    </span>
                  </button>
                )
              }

              return (
                <div
                  className="group relative"
                  key={item.sectionId}
                  onMouseEnter={() => setIsProjectOpen(true)}
                  onMouseLeave={() => setIsProjectOpen(false)}
                >
                  <button
                    aria-expanded={isProjectOpen}
                    aria-haspopup="menu"
                    className={cn(
                      styles.navButtonBase,
                      isProjectDetail || isActive ? styles.navButtonActive : styles.navButtonIdle,
                    )}
                    onClick={() => handleSectionClick(item.sectionId)}
                    type="button"
                  >
                    <span
                      className={cn(
                        styles.navContentBase,
                        isProjectDetail || isActive
                          ? styles.navContentActive
                          : styles.navContentIdle,
                      )}
                    >
                      <HeaderMenuIcon className="h-4 w-4" sectionId={item.sectionId} />
                      <span>{item.label}</span>
                    </span>
                    <svg
                      aria-hidden="true"
                      className={cn('h-4 w-4 transition-transform', isProjectOpen && 'rotate-180')}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isProjectOpen && (
                    <div className={styles.dropdownWrapper}>
                      <div className={styles.dropdownArrow} />

                      <div className={styles.dropdownPanel} role="menu">
                        <div className={styles.dropdownList}>
                          {projects.map((project, index) => (
                            <a
                              className={styles.dropdownItem}
                              href={`#${ROUTE_PATHS.projects}/${project.slug}`}
                              key={project.slug}
                              role="menuitem"
                              style={{ padding: '15px', color: 'var(--fg)' }}
                            >
                              <ProjectIcon
                                className="text-muted-foreground h-5 w-5"
                                index={index + 2}
                              />
                              <span className="text-foreground/90 truncate font-medium">
                                {project.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {isMenuOpen && (
          <nav aria-label="모바일 메뉴" className={styles.mobileNav} id="mobile-nav">
            <div className={styles.mobileNavPanel}>
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => {
                  const isProjectItem = item.label === 'Project'

                  if (!isProjectItem) {
                    return (
                      <li className="list-none border-b border-[#e5e7eb] last:border-b-0" key={item.sectionId}>
                        <button
                          className={styles.mobileItemButton}
                          onClick={() => handleSectionClick(item.sectionId)}
                          type="button"
                        >
                          <HeaderMenuIcon className="h-4 w-4" sectionId={item.sectionId} />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    )
                  }

                  return (
                    <li className="list-none border-b border-[#e5e7eb] last:border-b-0" key={item.sectionId}>
                      <button
                        className={styles.mobileItemButton}
                        onClick={() => setIsProjectOpen((open) => !open)}
                        type="button"
                      >
                        <HeaderMenuIcon className="h-4 w-4" sectionId={item.sectionId} />
                        <span>{item.label}</span>
                      </button>

                      {isProjectOpen && (
                        <div className={styles.mobileSubPanel}>
                          <div className={styles.mobileSubList}>
                            <button
                              className={styles.mobileSubItem}
                              onClick={() => handleSectionClick(item.sectionId)}
                              type="button"
                            >
                              프로젝트 섹션으로 이동
                            </button>

                            {projects.map((project) => (
                              <a
                                className={styles.mobileSubItem}
                                href={`#${ROUTE_PATHS.projects}/${project.slug}`}
                                key={project.slug}
                                onClick={closeMenu}
                              >
                                {project.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}

export { PENDING_SCROLL_KEY }
