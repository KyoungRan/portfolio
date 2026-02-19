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
      <Section
        label="Projects"
        title="Project"
        description="프로젝트 카드를 태그별로 필터링해 확인할 수 있습니다."
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <button
            className={`rounded-full border px-3 py-1.5 text-[var(--text-sm)] ${
              activeTag === 'ALL'
                ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-fg)]'
            }`}
            onClick={() => setActiveTag('ALL')}
            type="button"
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              className={`rounded-full border px-3 py-1.5 text-[var(--text-sm)] ${
                activeTag === tag
                  ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-fg)]'
              }`}
              key={tag}
              onClick={() => setActiveTag(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mb-0 text-[var(--muted-fg)]">선택한 태그에 해당하는 프로젝트가 없습니다.</p>
        )}
      </Section>
    </PageContent>
  )
}
