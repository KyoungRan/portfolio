// Home의 Education & Training 섹션
// 항목은 JSON 기반으로 렌더해 교육 내역 추가/수정 시 컴포넌트 변경을 피한다.
import education from '@/content/education.json'
import { Section } from '@/components/layout/Section'

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

  return (
    <Section id="education-training" className="w-full pt-8 pb-12">
      <div className="projects-shell w-full space-y-10">
        <header>
          <h2 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {content.title}
          </h2>
          {/* 라인 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-[#e1dfdd]" />
          </div>
        </header>

        <div className="grid gap-6">
          {content.items.map((item) => (
            <article
              key={`${item.name}-${item.periodText}`}
              className="group relative rounded-[4px] border border-[rgba(55,53,47,0.16)] bg-transparent px-6 py-5 transition-all hover:bg-[rgba(55,53,47,0.02)]"
            >
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {item.iconSrc && (
                    <div className="relative h-12 w-14 flex-shrink-0 overflow-hidden rounded-[3px] border border-[rgba(55,53,47,0.09)] bg-background p-1.5 shadow-sm">
                      <img
                        alt={`${item.name} 로고`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        src={item.iconSrc}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="mb-0 text-[17px] font-bold leading-tight text-[#37352f] group-hover:text-[#2383e2] transition-colors tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mb-0 text-[12px] font-bold uppercase tracking-wider text-[#787774] opacity-80">
                      {item.periodText}
                    </p>
                  </div>
                </div>
              </div>

              {item.bullets && item.bullets.length > 0 && (
                <ul className="mb-5 list-none space-y-2.5 p-0">
                  {item.bullets.map((bullet) => (
                    <li key={`${item.name}-${bullet}`} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[#37352f] pl-1 tracking-tight">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-[rgba(55,53,47,0.2)] flex-shrink-0" />
                      <span className="flex-1 opacity-90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.keywords && item.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.keywords.map((keyword) => (
                    <span
                      className="rounded-[3px] bg-[#f1f1ef] px-2.5 py-0.5 text-[11px] font-bold text-[#787774] border border-transparent group-hover:border-[rgba(55,53,47,0.1)] transition-all"
                      key={`${item.name}-${keyword}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
