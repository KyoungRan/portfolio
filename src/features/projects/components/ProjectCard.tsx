// 프로젝트 카드 컴포넌트
// 카드 전체를 링크로 감싸 클릭 타겟을 넓혀 탐색 효율을 높인다.
import type { ProjectItem } from '@/features/projects/model'
import { formatProjectPeriod } from '@/features/projects/loader'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const periodText = formatProjectPeriod(project)

  return (
    <a
      href={`#/projects/${project.slug}`}
      className="block rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      {project.coverImageSrc && (
        <img
          src={project.coverImageSrc}
          alt={`${project.title} 커버 이미지`}
          className="mb-4 h-40 w-full rounded-[var(--radius-md)] object-cover"
          loading="lazy"
        />
      )}
      <h3 className="mb-2 text-[var(--text-xl)]">{project.title}</h3>
      <p className="mb-3 text-[var(--muted-fg)] text-[var(--text-sm)]">{periodText}</p>
      <p className="mb-4 text-[var(--fg)] text-[var(--text-base)]">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={`${project.slug}-${tag}`}
            className="rounded-full bg-[var(--tag-bg)] px-2.5 py-0.5 text-[var(--tag-fg)] text-[var(--text-xs)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}
