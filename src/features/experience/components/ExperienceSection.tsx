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
    <Section id="experience" className="w-full pt-3 pb-16">
      <div className="projects-shell w-full space-y-12">
        <header className="space-y-3">
          <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">{content.title}</h2>
          <p className="mb-0 text-[11px] leading-5 text-[#6f6e69]">{content.summary}</p>
          <div className="h-px w-full bg-[#e6e3e1]" />
        </header>

        {content.companies.map((company) => (
          <article key={`${company.companyName}-${company.period.start}`}>
            <div className="grid gap-6 md:grid-cols-[120px_minmax(0,1fr)]">
              <aside className="space-y-1.5 text-[#5f5e5b]">
                {company.heroImageSrc && (
                  <img
                    alt={`${company.companyName} 로고`}
                    className="mb-1 h-16 w-16 border border-[#d8d5d2] object-cover"
                    loading="lazy"
                    src={company.heroImageSrc}
                  />
                )}
                <p className="mb-0 text-[10.5px] leading-[1.3]">{formatPeriod(company.period)}</p>
              </aside>

              <div className="space-y-5">
                <div className="border-b border-[#eceae8] pb-2">
                  <h3 className="mb-0 text-[13px] leading-5 font-semibold text-[#3f3e3a]">
                    {company.companyName} - {company.domain ?? company.roleTitle}
                  </h3>
                </div>

                <div className="space-y-5">
                  {company.entries.map((entry, index) => (
                    <section
                      key={`${company.companyName}-${entry.title}`}
                      className={
                        index === company.entries.length - 1
                          ? 'space-y-3'
                          : 'space-y-3 border-b border-[#eceae8] pb-4.5'
                      }
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <h4 className="mb-0 text-[12px] leading-5 font-semibold text-[#37352f]">
                          {entry.title}
                        </h4>
                        <p className="mb-0 text-[10.5px] text-[#787774]">{entry.periodText}</p>
                      </div>

                      <ul className="list-disc space-y-2.5 pl-5 text-[11px] leading-[1.6] text-[#37352f]">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
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
    </Section>
  )
}
