// Home의 Others 섹션
// 기간/활동 표를 JSON 데이터로 렌더해 단순 업데이트 경로를 유지한다.
import others from '@/content/others.json'
import { Section } from '@/components/layout/Section'

interface OthersRow {
  periodText: string
  activity: string
}

interface OthersContent {
  title: string
  rows: OthersRow[]
}

export function OthersSection() {
  const content = others as OthersContent

  return (
    <Section id="others" title={content.title} className="mb-[30px] w-full">
      <div className="w-full overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--muted)] text-left">
              <th className="px-4 py-3 text-[var(--text-sm)]">Period</th>
              <th className="px-4 py-3 text-[var(--text-sm)]">Activity</th>
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr
                key={`${row.periodText}-${row.activity}`}
                className="border-t border-[var(--border)]"
              >
                <td className="px-4 py-3">{row.periodText}</td>
                <td className="px-4 py-3">{row.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
