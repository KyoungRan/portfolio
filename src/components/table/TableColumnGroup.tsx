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
