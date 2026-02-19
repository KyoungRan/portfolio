// ProjectDetailPage: 프로젝트 콘텐츠를 slug로 로드해 상세를 렌더한다.
import { PageContent } from '@/components/layout/PageContent'
import { Section } from '@/components/layout/Section'
import { getProjectBySlug } from '@/features/projects/loader'

interface ProjectDetailPageProps {
  slug: string
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <PageContent>
        <Section title="Project Not Found" description="요청한 프로젝트를 찾을 수 없습니다.">
          <a href="#/" className="text-[var(--accent)] underline">
            홈으로 돌아가기
          </a>
        </Section>
      </PageContent>
    )
  }

  return (
    <PageContent>
      <Section label="Project" title={project.title} description={project.summary}>
        {project.coverImageSrc && (
          <img
            src={project.coverImageSrc}
            alt={`${project.title} 대표 이미지`}
            className="mb-6 h-64 w-full rounded-[var(--radius-lg)] object-cover"
            loading="lazy"
          />
        )}

        <div className="mb-6 grid gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-4 sm:grid-cols-2">
          <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
            <strong className="text-[var(--fg)]">기간</strong>: {project.periodText}
          </p>
          <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
            <strong className="text-[var(--fg)]">역할</strong>: {project.roles.join(', ')}
          </p>
          <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)] sm:col-span-2">
            <strong className="text-[var(--fg)]">스택</strong>: {project.stack.join(', ')}
          </p>
        </div>

        <div className="space-y-5">
          {project.sections?.map((section) => (
            <article key={`${project.slug}-${section.type}`}>
              <h3 className="mb-2 text-[var(--text-xl)]">{section.title}</h3>
              <ul className="space-y-2">
                {section.body.map((line) => (
                  <li key={line} className="text-[var(--fg)]">
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </PageContent>
  )
}
