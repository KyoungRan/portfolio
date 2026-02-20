// ProjectsPage: 프로젝트 카드 목록 + 태그 필터
import { useMemo, useState } from 'react'
import { PageContent } from '@/components/layout/PageContent'
import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { getAllProjects, getAllProjectTags, getProjectsByTag } from '@/features/projects/loader'

export function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string>('ALL')
  const allTags = useMemo(() => getAllProjectTags(), [])
  const projects = useMemo(() => {
    if (activeTag === 'ALL') {
      return getAllProjects()
    }

    return getProjectsByTag(activeTag)
  }, [activeTag])

  return (
    <PageContent>
      <Section className="w-full">
        <div className="projects-shell w-full space-y-10">
          <header className="space-y-4">
            <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">Projects</h2>
            <p className="mb-0 text-[11px] leading-6 text-[#6f6e69]">
              프로젝트 카드를 태그별로 필터링해 확인할 수 있습니다.
            </p>
            <div className="h-px w-full bg-[#e6e3e1]" />
          </header>

          <div className="flex flex-wrap gap-1.5">
            <button
              className={`rounded-[999px] border px-2.5 py-1 text-[10.5px] ${
                activeTag === 'ALL'
                  ? 'border-[#cbbfe4] bg-[#f5f2ff] text-[#6f5aa8]'
                  : 'border-[#e3e2e0] bg-white text-[#6f6e69]'
              }`}
              onClick={() => setActiveTag('ALL')}
              type="button"
            >
              All
            </button>

            {allTags.map((tag) => (
              <button
                className={`rounded-[999px] border px-2.5 py-1 text-[10.5px] ${
                  activeTag === tag
                    ? 'border-[#cbbfe4] bg-[#f5f2ff] text-[#6f5aa8]'
                    : 'border-[#e3e2e0] bg-white text-[#6f6e69]'
                }`}
                key={tag}
                onClick={() => setActiveTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>

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

          {projects.length > 0 ? (
            <>
              <div className="flex items-center justify-between rounded-[6px] border border-[#e3e2e0] px-3 py-1.5">
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

              <div className="grid gap-5 sm:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          ) : (
            <p className="mb-0 text-[12px] text-[#6f6e69]">선택한 태그에 해당하는 프로젝트가 없습니다.</p>
          )}
        </div>
      </Section>
    </PageContent>
  )
}
