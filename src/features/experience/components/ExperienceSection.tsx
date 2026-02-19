// Home의 Experience 섹션
// 회사 단위 데이터와 엔트리(성과/기술)를 모두 렌더해 노션의 컬럼형 읽기 흐름을 유지한다.
import experience from '@/content/experience.json'
import { Section } from '@/components/layout/Section'

interface Period {
  start: string
  end?: string | null
  display?: string
}

interface ExperienceEntry {
  title: string
  periodText: string
  bullets: string[]
  result?: string
  tech?: string[]
}

interface ExperienceCompany {
  companyName: string
  domain?: string
  roleTitle: string
  heroImageSrc?: string
  period: Period
  entries: ExperienceEntry[]
}

interface ExperienceContent {
  title: string
  summary: string
  companies: ExperienceCompany[]
}

function formatPeriod(period: Period): string {
  if (period.display && period.display.trim().length > 0) {
    return period.display.trim()
  }

  const start = period.start.replace('-', '.')
  const end = period.end ? period.end.replace('-', '.') : 'Present'
  return `${start} - ${end}`
}

export function ExperienceSection() {
  const content = experience as ExperienceContent

  return (
    <Section id="experience" title={content.title} description={content.summary} className="w-full">
      <div className="w-full space-y-6">
        {content.companies.map((company) => (
          <article
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-5"
            key={`${company.companyName}-${company.period.start}`}
          >
            <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
              <aside className="space-y-2">
                {company.heroImageSrc && (
                  <img
                    alt={`${company.companyName} 로고`}
                    className="mb-2 h-12 w-12 rounded-[var(--radius-sm)] border border-[var(--border)] object-cover"
                    loading="lazy"
                    src={company.heroImageSrc}
                  />
                )}
                <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
                  {formatPeriod(company.period)}
                </p>
                <h3 className="mb-0 text-[var(--hero-gradient-1)] text-[var(--text-lg)]">
                  {company.companyName}
                </h3>
                <p className="mb-0 text-[var(--fg)] text-[var(--text-sm)]">{company.roleTitle}</p>
                {company.domain && (
                  <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
                    {company.domain}
                  </p>
                )}
              </aside>

              <div className="space-y-6">
                {company.entries.map((entry) => (
                  <section key={`${company.companyName}-${entry.title}`}>
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="mb-0 text-[var(--fg)] text-[var(--text-base)]">
                        {entry.title}
                      </h4>
                      <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">
                        {entry.periodText}
                      </p>
                    </div>

                    <ul className="list-disc space-y-1 pl-5">
                      {entry.bullets.map((bullet) => (
                        <li className="text-[var(--fg)] text-[var(--text-sm)]" key={bullet}>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {entry.result && (
                      <p className="mt-3 mb-0 rounded-[var(--radius-sm)] bg-[var(--muted)] px-3 py-2 text-[var(--fg)] text-[var(--text-sm)]">
                        {entry.result}
                      </p>
                    )}

                    {entry.tech && entry.tech.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.tech.map((tech) => (
                          <span
                            className="rounded-full bg-[var(--tag-bg)] px-2.5 py-0.5 text-[var(--tag-fg)] text-[var(--text-xs)]"
                            key={`${entry.title}-${tech}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
