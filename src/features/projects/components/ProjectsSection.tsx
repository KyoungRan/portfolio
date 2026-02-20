// Home의 Project 섹션
// 카드 목록은 프로젝트 로더를 통해 자동 확장되며, 섹션은 표시 역할만 담당한다.
import { Section } from '@/components/layout/Section'
import { getAllProjects } from '@/features/projects/loader'
import { ProjectCard } from '@/features/projects/components/ProjectCard'

export function ProjectsSection() {
  // 프로젝트 JSON 파일이 늘어나면 여기 목록도 자동으로 증가한다.
  const projects = getAllProjects()

  return (
    <Section id="projects" className="w-full">
      <div className="projects-shell w-full space-y-12">
        <header className="space-y-5">
          <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">Projects</h2>
          <p className="mb-0 text-[11px] leading-6 text-[#6f6e69]">
            AI 관련 프로젝트를 최신 순으로 구성했습니다. 주요 내용, 기간, 개발스택 등을 확인할 수
            있습니다.
          </p>
          <div className="h-px w-full bg-[#e6e3e1]" />
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border border-[#dcd9d6] text-left text-[11px] leading-[1.55] text-[#37352f]">
            <thead className="bg-[#f8f7f6]">
              <tr>
                <th className="w-10 border border-[#e3e2e0] px-3 py-2 font-medium">#</th>
                <th className="border border-[#e3e2e0] px-3 py-2 font-medium">제목</th>
                <th className="border border-[#e3e2e0] px-3 py-2 font-medium">설명</th>
                <th className="w-40 border border-[#e3e2e0] px-3 py-2 font-medium">기간</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr className="align-top" key={`summary-${project.slug}`}>
                  <td className="border border-[#e9e8e6] px-3 py-2.5">{index + 1}</td>
                  <td className="border border-[#e9e8e6] px-3 py-2.5 leading-5">{project.title}</td>
                  <td className="border border-[#e9e8e6] px-3 py-2.5 leading-5">{project.summary}</td>
                  <td className="border border-[#e9e8e6] px-3 py-2.5 text-[11px] leading-5">
                    {project.period.display}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between rounded-[6px] border border-[#e3e2e0] px-4 py-2">
          <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[#37352f]">
            <span aria-hidden="true">▦</span>
            <span>Projects</span>
          </div>
          <button
            aria-label="새 프로젝트"
            className="rounded bg-[#2f76c5] px-2.5 py-1 text-[11px] text-white"
            type="button"
          >
            New
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Section>
  )
}
