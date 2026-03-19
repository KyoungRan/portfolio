// 이 파일은 현재 경로의 모듈을 정의한다.
// 주요 책임: 파일 내부에 선언된 컴포넌트/유틸을 구성한다.
// 변경 시 외부 의존성과 사용처를 함께 확인한다.
import type { TableColumnWidths } from '@/lib/tableColumnWidths'
import { resolveTableColumnWidth } from '@/lib/tableColumnWidths'

interface TableColumnGroupProps {
  widths?: TableColumnWidths | null
}

export function TableColumnGroup({ widths }: TableColumnGroupProps) {
  if (!widths || widths.length === 0) return null

  return (
    <colgroup>
      {widths.map((width, index) => {
        const resolvedWidth = resolveTableColumnWidth(width)
        return <col key={index} style={resolvedWidth ? { width: resolvedWidth } : undefined} />
      })}
    </colgroup>
  )
}
