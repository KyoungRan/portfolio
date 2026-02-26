// Home의 Skills 섹션
// 표 구조를 유지해 Notion의 정보 스캔 흐름을 웹에서도 그대로 재현한다.
import { TableColumnGroup } from '@/components/table/TableColumnGroup'
import skills from '@/content/skills.json'
import { Section } from '@/components/layout/Section'

interface SkillsRow {
  category: string
  skills: string[]
}

interface SkillsContent {
  title: string
  table?: {
    columnWidths?: Array<number | string | null>
  }
  rows: SkillsRow[]
}

export function SkillsSection() {
  const content = skills as SkillsContent

  return (
    <Section id="skills" className="w-full pt-8 pb-12">
      <div className="projects-shell w-full space-y-7">
        <header>
          {/* 타이틀 색상: #A173BF 적용 */}
          <h2 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {content.title}
          </h2>
          {/* 라인 아래 padding 10px 적용 */}
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className="h-[1px] w-full bg-[#e1dfdd]" />
          </div>
        </header>

        <div className="w-full overflow-x-auto overflow-y-hidden border border-[#D3D1CB]">
          <table className="w-full min-w-[620px] border-collapse text-[14px] leading-[1.6] text-[#2c2c2b]">
            <TableColumnGroup widths={content.table?.columnWidths} />
            <thead className="border-b border-[#D3D1CB] bg-[#f8f8f7] text-[13px] font-semibold text-[#6f6c67]">
              <tr>
                <th
                  className="border-r border-[#D3D1CB] text-center font-semibold"
                  style={{ padding: '5px 9px' }}
                >
                  범주
                </th>
                <th className="text-center font-semibold" style={{ padding: '5px 9px' }}>
                  기술
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3D1CB]">
              {content.rows.map((row) => (
                <tr key={row.category}>
                  <td
                    className="border-r border-[#D3D1CB] text-left align-top font-semibold text-[#2c2c2b]"
                    style={{ padding: '5px 9px' }}
                  >
                    {row.category}
                  </td>
                  <td className="text-left font-normal text-[#2c2c2b]" style={{ padding: '5px 9px' }}>
                    {row.skills.join(', ')}
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
