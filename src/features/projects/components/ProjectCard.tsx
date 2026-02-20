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
      className="project-card block rounded-[6px] border border-[#e3e2e0] bg-white p-4 transition-colors hover:bg-[#fafaf9] hover:no-underline"
    >
      {project.coverImageSrc && (
        <img
          src={project.coverImageSrc}
          alt={`${project.title} 커버 이미지`}
          className="mb-3 h-32 w-full rounded-[4px] border border-[#ecebe9] object-cover"
          loading="lazy"
        />
      )}
      <h3 className="mb-1.5 text-[12.5px] leading-[1.45] font-semibold text-[#37352f]">{project.title}</h3>
      <p className="mb-1.5 text-[10.5px] text-[#787774]">{periodText}</p>
      <p className="mb-3 text-[11px] leading-[1.6] text-[#5f5e5b]">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={`${project.slug}-${tag}`}
            className="rounded-[4px] bg-[#f1f1ef] px-1.5 py-0.5 text-[9px] leading-none text-[#6f6e69]"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}
