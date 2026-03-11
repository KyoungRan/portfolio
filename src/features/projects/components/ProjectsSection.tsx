// Home의 Project 섹션
// 카드 목록은 프로젝트 로더를 통해 자동 확장되며, 섹션은 표시 역할만 담당한다.
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { getAllProjects } from '@/features/projects/loader'
import { ProjectCard } from '@/features/projects/components/ProjectCard'

export function ProjectsSection() {
  // 프로젝트 JSON 파일이 늘어나면 여기 목록도 자동으로 증가한다.
  const projects = getAllProjects()

  return (
    <Section id="projects" className="w-full pt-12 pb-16">
      <div className="projects-shell w-full space-y-8">
        <header>
          {/* Project 타이틀 색상: #A173BF */}
          <SectionHeader title="Projects">
            <p className="mb-0 text-[14.5px] leading-relaxed text-foreground/80">
              AI 관련 프로젝트를 최신 순으로 구성했습니다. 주요 내용, 기간, 개발스택 등을 확인할 수
              있습니다.
            </p>
          </SectionHeader>
        </header>

        {/* 비활성 Legacy 요약 테이블 블록 제거: 스타일 드리프트 방지.
            다시 복구할 경우 `TableColumnGroup` + `SectionHeader` 패턴으로 재구성한다. */}
        {/* Project Summary View: 위 padding 15px, 아래 padding 5px 적용 */}
        <div className="space-y-6 pt-4">
          <div style={{ paddingTop: '15px', paddingBottom: '5px' }} className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-[14.5px] font-bold text-foreground">
              <span aria-hidden="true" className="text-[16px]">田</span>
              <span>Project Summary View</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
