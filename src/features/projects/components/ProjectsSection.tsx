// Home의 Project 섹션
// 카드 목록은 프로젝트 로더를 통해 자동 확장되며, 섹션은 표시 역할만 담당한다.
import { Section } from '@/components/layout/Section'
import { getAllProjects } from '@/features/projects/loader'
import { ProjectCard } from '@/features/projects/components/ProjectCard'

export function ProjectsSection() {
  // 프로젝트 JSON 파일이 늘어나면 여기 목록도 자동으로 증가한다.
  const projects = getAllProjects()

  return (
    <Section
      id="projects"
      title="Project"
      description="카드를 누르면 상세 페이지로 이동합니다."
      className="w-full"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
