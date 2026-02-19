// Home의 Education & Training 섹션
// 항목은 JSON 기반으로 렌더해 교육 내역 추가/수정 시 컴포넌트 변경을 피한다.
import education from '@/content/education.json'
import { Section } from '@/components/layout/Section'

interface EducationItem {
  name: string
  periodText: string
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
            <h3 className="mb-1 text-[var(--text-lg)]">{item.name}</h3>
            <p className="mb-0 text-[var(--muted-fg)] text-[var(--text-sm)]">{item.periodText}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
