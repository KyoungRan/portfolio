export type TableColumnWidth = number | string | null

interface TableColumnGroupProps {
  widths?: TableColumnWidth[] | null
}

function resolveColumnWidth(width: TableColumnWidth): string | undefined {
  if (typeof width === 'number') {
    if (!Number.isFinite(width) || width <= 0) return undefined
    return `${width}%`
  }

  if (typeof width === 'string') {
    const trimmed = width.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }

  return undefined
}

export function TableColumnGroup({ widths }: TableColumnGroupProps) {
  if (!widths || widths.length === 0) return null

  return (
    <colgroup>
      {widths.map((width, index) => {
        const resolvedWidth = resolveColumnWidth(width)
        return <col key={index} style={resolvedWidth ? { width: resolvedWidth } : undefined} />
      })}
    </colgroup>
  )
}
