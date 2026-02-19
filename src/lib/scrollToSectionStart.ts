// 섹션 이동 시 "섹션 타이틀(h2) 시작점"이 헤더 아래에 보이도록 스크롤을 보정한다.
// section id를 받아 제목 요소가 있으면 제목을 기준으로, 없으면 섹션 자체를 기준으로 이동한다.

interface ScrollToSectionStartOptions {
  behavior?: ScrollBehavior
  offset?: number
}

export function scrollToSectionStart(
  sectionId: string,
  { behavior = 'smooth', offset = 12 }: ScrollToSectionStartOptions = {},
) {
  const section = document.getElementById(sectionId)

  if (!section) {
    return false
  }

  const title = section.querySelector('h2')
  const target = (title as HTMLElement | null) ?? section
  const header = document.querySelector('header')
  const headerHeight = (header as HTMLElement | null)?.getBoundingClientRect().height ?? 0
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - offset

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  })

  return true
}
