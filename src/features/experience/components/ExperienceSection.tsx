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

function renderCompanyName(name: string) {
  const teldaPrefix = '(주)텔다 - 신재생에너지'
  const webzenPrefix = '(주)웹젠 - 게임회사'

  if (name.startsWith(teldaPrefix)) {
    const rest = name.replace(teldaPrefix, '').trim()
    return (
      <>
        <span style={{ color: '#A173BF' }}>{teldaPrefix}</span>
        {rest ? <span style={{ color: '#2c2c2b' }}>{` ${rest}`}</span> : null}
      </>
    )
  }

  if (name.startsWith(webzenPrefix)) {
    const rest = name.replace(webzenPrefix, '').trim()
    return (
      <>
        <span style={{ color: '#A173BF' }}>{webzenPrefix}</span>
        {rest ? <span style={{ color: '#2c2c2b' }}>{` ${rest}`}</span> : null}
      </>
    )
  }

  return <span style={{ color: '#A173BF' }}>{name}</span>
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
      <div className="projects-shell w-full space-y-12 text-[#2c2c2b]">
        <header>
          {/* 타이틀 색상: #A173BF 적용 */}
          <h2 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {content.title}
          </h2>
          {/* 라인 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-[#e1dfdd]" />
          </div>
          {content.summary?.trim() && (
            <p className="mb-0 text-[15px] leading-[1.7] text-[#7d7a75]">
              {content.summary}
            </p>
          )}
        </header>

        <div className="space-y-[36px]">
          {content.companies.map((company, companyIdx) => (
            <article key={`${company.companyName}-${company.period.start}`}>
              <div className="grid gap-[40px] md:grid-cols-[160px_1fr]">
                {/* 좌측: 로고 & 기간 */}
                <aside className="space-y-2 pt-1 text-center">
                  {company.heroImageSrc && (
                    <div className="relative mx-auto w-full max-w-[160px] overflow-hidden">
                      <img
                        alt={`${company.companyName} 로고`}
                        className="block h-auto w-full object-contain"
                        loading="lazy"
                        src={company.heroImageSrc}
                      />
                    </div>
                  )}
                  <div className="space-y-1" style={{ marginTop: '8px' }}>
                    <p className="mb-0 text-[14px] font-medium text-[#7d7a75]">
                      {formatPeriod(company.period)}
                    </p>
                    {company.domain && (
                      <p className="mb-0 text-[14px] text-[#7d7a75]">
                        {company.domain}
                      </p>
                    )}
                  </div>
                </aside>

                {/* 우측: 상세 정보 */}
                <div className="space-y-[22px] pt-8 md:pl-2">
                  <header className="space-y-2 pb-6 pt-3">
                    <h3 className="mb-0 text-[20px] font-normal leading-[1.4]">
                      {renderCompanyName(company.companyName)}
                    </h3>
                    {company.roleTitle?.trim() && (
                      <p className="mb-0 text-[14px] font-medium text-[#7d7a75] leading-none">
                        {company.roleTitle}
                      </p>
                    )}
                  </header>

                  <div className="space-y-[36px]">
                    {company.entries.map((entry, entryIdx) => (
                      <section
                        key={`${company.companyName}-${entry.title}`}
                        className="space-y-[20px]"
                      >
                        <header
                          className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between"
                          style={{ paddingTop: '6px', paddingBottom: '10px' }}
                        >
                          <div className="flex items-center gap-2">
                            <h4 className="mb-1 text-[16px] font-semibold text-[#2c2c2b]">
                              {entry.title}
                            </h4>
                          </div>
                          {entry.periodText?.trim() && (
                            <span className="text-[12px] font-medium text-[#7d7a75]">
                              {entry.periodText}
                            </span>
                          )}
                        </header>

                        <ul className="list-outside list-disc space-y-[14px] pl-5 marker:text-[#7d7a75] marker:text-[0.9em]">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet} className="text-[14px] leading-[1.6] text-[#2c2c2b]">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        {entryIdx < company.entries.length - 1 && (
                          <div className="py-[12px]" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            <div className="h-[1px] w-full bg-[#D3D1CB]" style={{ marginTop: '4px', marginBottom: '4px' }} />
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              </div>
              {companyIdx < content.companies.length - 1 && (
                <div className="mt-[40px]">
                  <div className="h-[1px] w-full bg-[#D3D1CB]" style={{ marginTop: '14px', marginBottom: '14px' }} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
