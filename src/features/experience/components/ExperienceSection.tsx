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
    <Section id="experience" className="w-full pt-8 pb-20">
      <div className="projects-shell w-full space-y-14">
        <header>
          {/* 타이틀 색상: #A173BF 적용 */}
          <h2 style={{ color: '#A173BF' }} className="text-[26px] font-bold tracking-tight">{content.title}</h2>
          {/* 라인 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-border" />
          </div>
          <p className="mb-0 text-[15px] leading-[1.6] text-foreground opacity-80">{content.summary}</p>
        </header>

        <div className="space-y-20">
          {content.companies.map((company) => (
            <article key={`${company.companyName}-${company.period.start}`}>
              <div className="grid gap-10 md:grid-cols-[160px_1fr]">
                {/* 좌측: 로고 & 기간 */}
                <aside className="space-y-4 pt-1">
                  {company.heroImageSrc && (
                    <div className="relative h-14 w-14 overflow-hidden rounded-[4px] border border-border bg-background shadow-sm">
                      <img
                        alt={`${company.companyName} 로고`}
                        className="h-full w-full object-contain p-1"
                        loading="lazy"
                        src={company.heroImageSrc}
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <p className="mb-0 text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground">
                      {formatPeriod(company.period)}
                    </p>
                    {company.domain && (
                      <p className="mb-0 text-[11px] font-medium text-muted-foreground">
                        {company.domain}
                      </p>
                    )}
                  </div>
                </aside>

                {/* 우측: 상세 정보 */}
                <div className="space-y-10">
                  <header className="border-b border-muted pb-3.5">
                    <h3 className="mb-1 text-[18px] font-bold text-foreground leading-[1.3]">
                      {company.companyName}
                    </h3>
                    <p className="mb-0 text-[14px] font-semibold text-accent leading-none">
                      {company.roleTitle}
                    </p>
                  </header>

                  <div className="space-y-12">
                    {company.entries.map((entry) => (
                      <section
                        key={`${company.companyName}-${entry.title}`}
                        className="space-y-5"
                      >
                        <header className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                          <h4 className="mb-0 text-[15px] font-bold text-foreground flex items-center gap-2.5">
                            <span className="w-1 h-4 bg-accent/60 rounded-full" />
                            {entry.title}
                          </h4>
                          <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-[3px] uppercase tracking-tight">
                            {entry.periodText}
                          </span>
                        </header>

                        <ul className="list-none space-y-2.5 p-0">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5 text-[14px] leading-[1.65] text-foreground pl-1">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
                              <span className="flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
