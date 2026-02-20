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
    <Section id="skills" className="w-full">
      <div className="projects-shell w-full space-y-6">
        <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">{content.title}</h2>
        <div className="h-px w-full bg-[#e6e3e1]" />
        <div className="w-full overflow-x-auto border border-[#dcd9d6]">
          <table className="w-full min-w-[640px] border-collapse text-[11px] text-[#37352f]">
            <thead>
              <tr className="bg-[#f8f7f6] text-left">
                <th className="w-40 border border-[#e3e2e0] px-3.5 py-2 font-medium">Category</th>
                <th className="border border-[#e3e2e0] px-3.5 py-2 font-medium">Stack</th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row.category}>
                  <td className="border border-[#eceae8] px-3.5 py-2 align-top">{row.category}</td>
                  <td className="border border-[#eceae8] px-3.5 py-2">{row.skills.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
