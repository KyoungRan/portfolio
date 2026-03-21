// Home의 Education & Training 섹션
// 항목은 JSON 기반으로 렌더해 교육 내역 추가/수정 시 컴포넌트 변경을 피한다.
import { SectionHeader } from '@/components/layout/SectionHeader'
import education from '@/content/education.json'
import { Section } from '@/components/layout/Section'
import { assetPath } from '@/lib/assetPath'

interface EducationItem {
  name: string
  periodText: string
  iconSrc?: string
  bullets?: string[]
  keywords?: string[]
}

interface EducationContent {
  title: string
  items: EducationItem[]
}

export function EducationSection() {
  const content = education as EducationContent
  const bulletItemStyle = {
    paddingTop: '3px',
    paddingBottom: '5px',
    paddingLeft: '2px',
    paddingRight: '2px',
    lineHeight: '24px',
  } as const

  return (
    <Section id="education-training" className="w-full pt-8 pb-12">
      <div className="projects-shell w-full">
        <header>
          <SectionHeader
            title={content.title}
            dividerSpacingStyle={{ paddingTop: '11px', paddingBottom: '11px' }}
          />
        </header>

        <div className="flex flex-col gap-3">
          {content.items.map((item) => {
            const isCertificate = item.name === '자격증'
            const certificateMatch = isCertificate && item.bullets?.[0]
              ? item.bullets[0].match(/^(.*?)(\s+\d{4}\.\d{2})$/)
              : null
            return (
              <article
                key={`${item.name}-${item.periodText}`}
                className="rounded-[3px] border border-[#e1dfdd] bg-white"
                style={{ padding: isCertificate ? '16px 20px 16px 20px' : '16px 20px 16px 12px' }}
              >
                {!isCertificate ? (
                  <div className="grid grid-cols-[28px_1fr] items-start gap-[8px]">
                    {item.iconSrc && (
                      <div className="relative h-[28px] w-[28px] overflow-hidden rounded-[3px] border border-[rgba(55,53,47,0.09)] bg-background p-1">
                        <img
                          alt={`${item.name} 로고`}
                          className="h-full w-full object-contain"
                          loading="lazy"
                          src={assetPath(item.iconSrc)}
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-6">
                        <h3
                          className="mb-0 font-normal text-[#37352f]"
                          style={{ fontSize: '16px', lineHeight: '24px', paddingLeft: '0px', paddingRight: '0px' }}
                        >
                          {item.name}
                        </h3>
                        {item.periodText && (
                          <span
                            className="font-normal text-[#9b9a97] sm:whitespace-nowrap"
                            style={{ fontSize: '12px', lineHeight: '18px' }}
                          >
                            {item.periodText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3
                      className="mb-0 font-normal text-[#37352f]"
                      style={{ fontSize: '16px', lineHeight: '24px', paddingLeft: '2px', paddingRight: '2px' }}
                    >
                      {item.name}
                    </h3>
                  </div>
                )}

                {isCertificate && item.bullets && item.bullets[0] && (
                  <div
                    style={{
                      marginTop: '2px',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2" style={{ marginLeft: '35px' }}>
                      {item.iconSrc && (
                        <img
                          alt="oxford_logo"
                          className="shrink-0 object-contain"
                          loading="lazy"
                          src={assetPath(item.iconSrc)}
                          style={{ width: '19px', height: '19px' }}
                        />
                      )}
                      <div style={{ fontSize: '14px', lineHeight: '24px', color: '#37352f' }}>
                        {certificateMatch ? (
                          <>
                            <span>{certificateMatch[1]}</span>
                            <span style={{ color: '#9b9a97', paddingLeft: '30px', fontSize: '12px' }}>
                              {certificateMatch[2].trimStart()}
                            </span>
                          </>
                        ) : (
                          item.bullets[0]
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!isCertificate && item.bullets && item.bullets.length > 0 && (() => {
                  const items = [...item.bullets]
                  const labelIndex = items.indexOf('기술 키워드')
                  if (labelIndex >= 0 && items[labelIndex + 1]) {
                    const combined = `${items[labelIndex]}||${items[labelIndex + 1]}`
                    items.splice(labelIndex, 2, combined)
                  }

                  return (
                    <div className="grid grid-cols-[28px_1fr] gap-2" style={{ marginTop: '2px' }}>
                      <div />
                      <ul
                        className="m-0 list-disc list-outside text-[14px] text-[#37352f] marker:text-[#bdbab4]"
                        style={{ lineHeight: '24px', paddingLeft: '26px' }}
                      >
                        {items.map((bullet) => {
                          const isPlainContinuation = bullet.trim().startsWith('(')
                          if (bullet.includes('||')) {
                            const [label, rest] = bullet.split('||')
                            return (
                              <li key={`${item.name}-${bullet}`} style={bulletItemStyle}>
                                <span className="font-normal">{label}</span>
                                {rest ? ` ${rest}` : null}
                              </li>
                            )
                          }

                          const colonIndex = bullet.indexOf(':')
                          if (colonIndex > 0) {
                            const label = bullet.slice(0, colonIndex)
                            const rest = bullet.slice(colonIndex + 1)
                            return (
                              <li key={`${item.name}-${bullet}`} style={bulletItemStyle}>
                                <span className="font-normal">{label}</span>
                                {rest ? `:${rest}` : ':'}
                              </li>
                            )
                          }

                          if (isPlainContinuation) {
                            return (
                              <li
                                key={`${item.name}-${bullet}`}
                                className="list-none"
                                style={{ ...bulletItemStyle, marginLeft: '-26px' }}
                              >
                                {bullet}
                              </li>
                            )
                          }

                          return (
                            <li key={`${item.name}-${bullet}`} style={bulletItemStyle}>
                              {bullet}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })()}
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
