// Home의 Skills 섹션
// 표 구조를 유지해 Notion의 정보 스캔 흐름을 웹에서도 그대로 재현한다.
import skills from '@/content/skills.json'
import { Section } from '@/components/layout/Section'

interface SkillsRow {
  category: string
  skills: string[]
}

interface SkillsContent {
  title: string
  rows: SkillsRow[]
}

export function SkillsSection() {
  const content = skills as SkillsContent

  return (
    <Section id="skills" title={content.title} className="w-full">
      {/* 테이블을 감싸는 래퍼로 모바일 가로 스크롤을 허용한다. */}
      <div className="w-full overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--muted)] text-left">
              <th className="px-4 py-3 text-[var(--text-sm)]">Category</th>
              <th className="px-4 py-3 text-[var(--text-sm)]">Stack</th>
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.category} className="border-t border-[var(--border)]">
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.skills.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
