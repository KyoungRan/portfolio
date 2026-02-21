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
    <Section id="skills" className="w-full pt-8 pb-12">
      <div className="projects-shell w-full space-y-8">
        <header>
          {/* 타이틀 색상: #A173BF 적용 */}
          <h2 style={{ color: '#A173BF' }} className="text-[26px] font-bold tracking-tight">{content.title}</h2>
          {/* 라인 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-border" />
          </div>
        </header>

        <div className="w-full overflow-x-auto overflow-y-hidden rounded-[3px] border border-border">
          <table className="w-full min-w-[600px] border-collapse text-left text-[13px] leading-relaxed text-foreground">
            <thead className="bg-muted/50 text-[11px] font-bold uppercase tracking-tight text-muted-foreground border-b border-border">
              <tr>
                <th className="w-48 px-3 py-1.5 border-r border-border font-bold text-center">Category</th>
                <th className="px-3 py-1.5 font-bold">Technologies & Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {content.rows.map((row) => (
                <tr key={row.category} className="group hover:bg-muted/30 transition-colors">
                  <td className="border-r border-border bg-muted/20 px-3 py-2 align-top font-bold text-foreground">
                    {row.category}
                  </td>
                  <td className="px-3 py-2 font-medium text-foreground">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {row.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
