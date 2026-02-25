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
    <Section id="others" className="mb-20 w-full pt-8 pb-16">
      <div className="projects-shell w-full space-y-8">
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

        <div className="w-full overflow-x-auto overflow-y-hidden rounded-[3px] border border-border">
          <table className="w-full min-w-[600px] border-collapse text-left text-[13.5px] leading-relaxed text-[#37352f]">
            <thead className="bg-[#f7f6f3]/80 text-[11px] font-normal tracking-tight text-[#787774] border-b border-[rgba(55,53,47,0.09)]">
              <tr>
                <th
                  className="w-48 border-r border-[rgba(55,53,47,0.09)] font-normal text-center"
                  style={{ padding: '5px 9px' }}
                >
                  기간
                </th>
                <th className="font-normal text-center" style={{ padding: '5px 9px' }}>
                  활동 / 성과
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(55,53,47,0.09)]">
              {content.rows.map((row) => (
                <tr key={`${row.periodText}-${row.activity}`} className="group hover:bg-[rgba(55,53,47,0.02)] transition-colors">
                  <td
                    className="border-r border-[rgba(55,53,47,0.09)] align-top font-normal text-[#37352f]"
                    style={{ padding: '5px 9px' }}
                  >
                    {row.periodText}
                  </td>
                  <td className="font-normal text-[#37352f]/90 tracking-tight" style={{ padding: '5px 9px' }}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/60 group-hover:bg-accent-purple transition-colors" />
                      {row.activity}
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
