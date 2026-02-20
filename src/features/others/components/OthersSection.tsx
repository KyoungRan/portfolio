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
    <Section id="others" className="mb-[30px] w-full">
      <div className="projects-shell w-full space-y-6">
        <h2 className="text-[28px] leading-none font-semibold text-[#A173BF] md:text-[30px]">{content.title}</h2>
        <div className="h-px w-full bg-[#e6e3e1]" />
        <div className="w-full overflow-x-auto border border-[#dcd9d6]">
          <table className="w-full min-w-[640px] border-collapse text-[11px] text-[#37352f]">
            <thead>
              <tr className="bg-[#f8f7f6] text-left">
                <th className="w-44 border border-[#e3e2e0] px-3.5 py-2 font-medium">Period</th>
                <th className="border border-[#e3e2e0] px-3.5 py-2 font-medium">Activity</th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={`${row.periodText}-${row.activity}`}>
                  <td className="border border-[#eceae8] px-3.5 py-2 align-top text-[#5f5e5b]">
                    {row.periodText}
                  </td>
                  <td className="border border-[#eceae8] px-3.5 py-2">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
