// Home의 Project 섹션
// 카드 목록은 프로젝트 로더를 통해 자동 확장되며, 섹션은 표시 역할만 담당한다.
import { Section } from '@/components/layout/Section'
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
          <h2 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Projects
          </h2>
          
          {/* 라인(선) 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-[#e1dfdd]" />
          </div>
          
          <p className="mb-0 text-[14.5px] leading-relaxed text-foreground/80">
            AI 관련 프로젝트를 최신 순으로 구성했습니다. 주요 내용, 기간, 개발스택 등을 확인할 수
            있습니다.
          </p>
        </header>

        {/* Project Summary 영역: 하단 padding 5px 적용 */}
        {/*
        <div className="space-y-3">
          <div style={{ paddingBottom: '5px' }} className="flex items-center justify-between border-b border-border">
            <div className="inline-flex items-center gap-2 text-[14.5px] font-bold text-foreground">
              <span aria-hidden="true" className="text-[16px]">▦</span>
              <span>Project Summary</span>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden rounded-[3px] border border-border">
            <table className="w-full min-w-[600px] border-collapse text-left text-[13px] leading-tight text-foreground">
              <thead className="bg-muted/50 text-muted-foreground font-semibold text-[11px] uppercase tracking-tight">
                <tr>
                  <th style={{ width: '32px', padding: '6px 8px' }} className="border-r border-border text-center font-bold">#</th>
                  <th style={{ padding: '6px 10px' }} className="border-r border-border">Project Name</th>
                  <th style={{ padding: '6px 10px' }} className="border-r border-border">Summary</th>
                  <th style={{ width: '130px', padding: '6px 10px' }} className="font-bold">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((project, index) => (
                  <tr className="group hover:bg-muted/30 transition-colors" key={`summary-${project.slug}`}>
                    <td style={{ padding: '6px 8px' }} className="border-r border-border text-muted-foreground text-center font-medium text-[11px]">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td style={{ padding: '6px 10px' }} className="border-r border-border font-bold text-foreground group-hover:text-accent group-hover:underline text-[13.5px]">
                      {project.title}
                    </td>
                    <td style={{ padding: '6px 10px' }} className="border-r border-border font-medium text-foreground/90 leading-relaxed text-[13px]">
                      {project.summary}
                    </td>
                    <td style={{ padding: '6px 10px' }} className="text-[11.5px] font-bold text-muted-foreground whitespace-nowrap">
                      {project.period.display}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        */}
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
