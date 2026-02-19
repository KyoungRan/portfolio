// 우측 하단 플로팅 버튼 2개: 왼쪽(Top), 오른쪽(메뉴)
// 메뉴 버튼을 누르면 상단으로 펼쳐지는(drop-up) 섹션 메뉴를 제공한다.
import { useEffect, useMemo, useState } from 'react'
import { ROUTE_PATHS } from '@/app/routes'
import { PENDING_SCROLL_KEY } from '@/components/layout/Header'
import site from '@/content/site.json'
import { scrollToSectionStart } from '@/lib/scrollToSectionStart'

interface SiteNavItem {
  label: string
  sectionId: string
}

function FloatingMenuIcon({ sectionId, className }: { sectionId: string; className?: string }) {
  if (sectionId === 'about-me') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0"
        />
      </svg>
    )
  }

  if (sectionId === 'projects') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 8h5l2 2h9v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
        />
      </svg>
    )
  }

  if (sectionId === 'experience') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    )
  }

  if (sectionId === 'skills') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h3m0 4H3m15-4h3m-3 4h3M10 3v3m4-3v3m-4 12v3m4-3v3"
        />
      </svg>
    )
  }

  if (sectionId === 'education-training') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 9 9-4 9 4-9 4-9-4Zm4 3.8V16c0 1.6 2.2 3 5 3s5-1.4 5-3v-3.2"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v18M3 12h18M5.8 5.8l12.4 12.4M18.2 5.8 5.8 18.2"
      />
    </svg>
  )
}

function normalizeHashPath(hash: string) {
  const trimmed = hash.replace(/^#/, '').trim()

  if (trimmed.length === 0) {
    return ROUTE_PATHS.home
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  return `/${trimmed}`
}

function moveToHomeAndScroll(sectionId: string) {
  sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId)
  window.location.hash = `#${ROUTE_PATHS.home}`
}

export function BackToTopFab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = useMemo(() => site.nav.items as SiteNavItem[], [])

  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('click', closeMenu)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('click', closeMenu)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleSectionClick = (sectionId: string) => {
    setIsMenuOpen(false)
    const currentPath = normalizeHashPath(window.location.hash)

    if (currentPath !== ROUTE_PATHS.home) {
      moveToHomeAndScroll(sectionId)
      return
    }

    scrollToSectionStart(sectionId)
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="relative flex items-center gap-3">
        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 bottom-[4.5rem] min-w-72"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-card absolute right-7 -bottom-2 h-4 w-4 rotate-45 border-r border-b border-[#e5e7eb]" />
            <div className="bg-card relative rounded-[18px] border border-[#e5e7eb] p-[15px] shadow-lg">
              <div className="overflow-hidden rounded-[14px] border border-[#e5e7eb] p-[15px]">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    type="button"
                    role="menuitem"
                    className="text-foreground/90 hover:bg-muted flex w-full items-center gap-3 border-b border-[#e5e7eb] p-[15px] text-left text-base transition-colors last:border-b-0"
                    style={{ padding: '15px' }}
                    onClick={() => handleSectionClick(item.sectionId)}
                  >
                    <FloatingMenuIcon
                      sectionId={item.sectionId}
                      className="text-muted-foreground h-5 w-5"
                    />
                    <span className="text-foreground/90 truncate font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="맨 위로 이동"
          className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-[#d8d0fb] bg-white p-3 text-[#5f54a8] shadow-[0_8px_24px_rgba(91,76,197,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(91,76,197,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b7cf6]"
          onClick={scrollToTopSmooth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="빠른 메뉴 열기"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-[#d8d0fb] bg-white p-3 text-[#5f54a8] shadow-[0_8px_24px_rgba(91,76,197,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(91,76,197,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b7cf6]"
          onClick={(event) => {
            event.stopPropagation()
            setIsMenuOpen((open) => !open)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
