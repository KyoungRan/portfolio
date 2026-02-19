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
    <Section id="education-training" title={content.title} className="w-full">
      <div className="w-full space-y-3">
        {content.items.map((item) => (
          <article
            key={`${item.name}-${item.periodText}`}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--callout-bg)] p-4"
          >
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                {item.iconSrc && (
                  <img
                    alt={`${item.name} 로고`}
                    className="h-10 w-10 rounded-[var(--radius-sm)] border border-[var(--border)] object-cover"
                    loading="lazy"
                    src={item.iconSrc}
                  />
                )}
                <h3 className="mb-0 text-[var(--text-lg)]">{item.name}</h3>
              </div>
              <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">{item.periodText}</p>
            </div>

            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc space-y-1 pl-5">
                {item.bullets.map((bullet) => (
                  <li
                    className="text-[var(--fg)] text-[var(--text-sm)]"
                    key={`${item.name}-${bullet}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {item.keywords && item.keywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span
                    className="rounded-full bg-[var(--tag-bg)] px-2.5 py-0.5 text-[var(--tag-fg)] text-[var(--text-xs)]"
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
    </Section>
  )
}
