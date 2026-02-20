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
    <Section id="education-training" className="w-full">
      <div className="projects-shell w-full space-y-6">
        <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">{content.title}</h2>
        <div className="h-px w-full bg-[#e6e3e1]" />
        <div className="divide-y divide-[#e7e5e3] rounded-[6px] border border-[#dfddda] bg-white">
          {content.items.map((item) => (
            <article
              key={`${item.name}-${item.periodText}`}
              className="education-card px-5 py-4.5"
            >
              <div className="mb-2.5 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  {item.iconSrc && (
                    <img
                      alt={`${item.name} 로고`}
                      className="h-10 w-10 border border-[#d8d5d2] object-cover"
                      loading="lazy"
                      src={item.iconSrc}
                    />
                  )}
                  <h3 className="mb-0 text-[12px] leading-[1.4] font-semibold text-[#37352f]">{item.name}</h3>
                </div>
                <p className="mb-0 text-[10.5px] text-[#787774]">{item.periodText}</p>
              </div>

              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc space-y-1.5 pl-5 text-[11px] leading-[1.55] text-[#37352f]">
                  {item.bullets.map((bullet) => (
                    <li key={`${item.name}-${bullet}`}>{bullet}</li>
                  ))}
                </ul>
              )}

              {item.keywords && item.keywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      className="rounded-[4px] bg-[#f1f1ef] px-1.5 py-0.5 text-[9.5px] leading-none text-[#6f6e69]"
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
