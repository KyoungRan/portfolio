// 이 파일은 현재 경로의 모듈을 정의한다.
// 주요 책임: 파일 내부에 선언된 컴포넌트/유틸을 구성한다.
// 변경 시 외부 의존성과 사용처를 함께 확인한다.
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
