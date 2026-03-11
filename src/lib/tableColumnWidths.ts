export type TableColumnWidth = number | string | null
export type TableColumnWidths = TableColumnWidth[]

export interface TableColumnWidthConfig {
  columnWidths?: TableColumnWidths
}

export function resolveTableColumnWidth(width: TableColumnWidth): string | undefined {
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
