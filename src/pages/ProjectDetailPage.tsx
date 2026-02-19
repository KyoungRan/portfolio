// ProjectDetailPage: 프로젝트 콘텐츠를 slug로 로드해 상세를 렌더한다.
import { PageContent } from '@/components/layout/PageContent'
import { Section } from '@/components/layout/Section'
import type { ProjectSection } from '@/features/projects/model'
import { formatProjectPeriod, getProjectBySlug } from '@/features/projects/loader'

interface ProjectDetailPageProps {
  slug: string
}

const PROJECT_SECTION_TITLES: Record<ProjectSection['type'], string> = {
  problem: 'Problem',
  approach: 'Approach',
  architecture: 'Architecture',
  result: 'Result',
  lessons: 'Lessons',
  timeline: 'Timeline',
  responsibilities: 'Responsibilities',
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

  const periodText = formatProjectPeriod(project)

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
            <strong className="text-[var(--fg)]">기간</strong>: {periodText}
          </p>
          <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
            <strong className="text-[var(--fg)]">역할</strong>: {project.roles.join(', ')}
          </p>
          <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)] sm:col-span-2">
            <strong className="text-[var(--fg)]">스택</strong>: {project.stack.join(', ')}
          </p>
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={`${project.slug}-${link.label}-${link.href}`}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--text-sm)] no-underline hover:no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {project.kpis && project.kpis.length > 0 && (
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {project.kpis.map((kpi) => (
              <article
                key={`${project.slug}-${kpi.label}`}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-3"
              >
                <p className="mb-1 text-[var(--muted-fg)] text-[var(--text-sm)]">{kpi.label}</p>
                <p className="mb-0 text-[var(--fg)] font-semibold">{kpi.value}</p>
              </article>
            ))}
          </div>
        )}

        {project.visuals && project.visuals.length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {project.visuals.map((visual) => (
              <figure
                key={`${project.slug}-${visual.src}`}
                className="rounded-[var(--radius-md)] border border-[var(--border)] p-3"
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  className="w-full rounded-[var(--radius-sm)]"
                  loading="lazy"
                />
                {visual.caption && (
                  <figcaption className="mt-2 text-[var(--muted-fg)] text-[var(--text-sm)]">
                    {visual.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        <div className="space-y-5">
          {project.sections?.map((section) => (
            <article key={`${project.slug}-${section.type}`}>
              <h3 className="mb-2 text-[var(--text-xl)]">
                {section.title ?? PROJECT_SECTION_TITLES[section.type]}
              </h3>
              <ul className="space-y-2">
                {(section.body ?? section.bullets ?? []).map((line) => (
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
