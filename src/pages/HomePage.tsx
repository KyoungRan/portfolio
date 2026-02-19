// HomePage: 노션 정보 흐름을 단일 페이지 섹션으로 구성한다.
import { useEffect } from 'react'
import { PENDING_SCROLL_KEY } from '@/components/layout/Header'
import { PageContent } from '@/components/layout/PageContent'
import { HeroBanner } from '@/components/content/HeroBanner'
import { AboutMeSection } from '@/features/home/components/AboutMeSection'
import { ProjectsSection } from '@/features/projects/components/ProjectsSection'
import { ExperienceSection } from '@/features/experience/components/ExperienceSection'
import { SkillsSection } from '@/features/skills/components/SkillsSection'
import { EducationSection } from '@/features/education/components/EducationSection'
import { OthersSection } from '@/features/others/components/OthersSection'
import { scrollToSectionStart } from '@/lib/scrollToSectionStart'

export function HomePage() {
  useEffect(() => {
    // Header에서 저장한 섹션 키를 읽어 홈 진입 직후 원하는 위치로 이동한다.
    const targetId = sessionStorage.getItem(PENDING_SCROLL_KEY)

    if (!targetId) {
      return
    }

    sessionStorage.removeItem(PENDING_SCROLL_KEY)

    window.setTimeout(() => {
      scrollToSectionStart(targetId)
    }, 40)
  }, [])

  return (
    <>
      <HeroBanner />
      <PageContent>
        <AboutMeSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <OthersSection />
      </PageContent>
    </>
  )
}
