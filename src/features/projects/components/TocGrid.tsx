// 프로젝트 상세의 목차(TOC) 섹션을 공통 렌더링하는 컴포넌트.
// 좌·우 컬럼을 행 기준으로 정렬해 줄 간격을 동일하게 맞춘다.
// 각 항목은 앵커 이동 여부에 따라 버튼/텍스트로 렌더링한다.
// 목차 스타일은 ProjectDetailPage와 동일한 토큰/클래스를 사용한다.
import type { RichText } from '@/features/projects/model'
import { parseRichText } from '@/lib/parseRichText'

type TocGridProps = {
  columns: RichText[][]
  getAnchorId: (item: RichText) => string | undefined
  onClick: (anchorId: string) => void
}

const tocTableClassName =
  'hidden w-full border-separate border-spacing-y-2 text-[14px] leading-[26px] min-[860px]:table'
const tocListClassName = 'flex flex-col gap-2 text-[14px] leading-[26px] min-[860px]:hidden'
const tocItemClassName = 'm-0 leading-[26px] min-[860px]:leading-[28px]'
const tocButtonClassName =
  'm-0 w-fit cursor-pointer border-0 border-b-2 border-transparent bg-transparent pb-[1px] text-left leading-[26px] text-[#2c2c2b] no-underline hover:border-[#b197fc] focus-visible:border-[#b197fc] focus-visible:outline-none min-[860px]:leading-[28px]'
const tocCellClassName = 'align-top'
const tocCellGapClassName = 'pr-12'

function toRowMatrix(columns: RichText[][]) {
  const rowCount = Math.max(...columns.map((column) => column.length))
  return Array.from({ length: rowCount }, (_, rowIdx) =>
    columns.map((column) => column[rowIdx] ?? null)
  )
}

export function TocGrid({ columns, getAnchorId, onClick }: TocGridProps) {
  const rows = toRowMatrix(columns)
  const flatItems = columns.flat()

  return (
    <>
      <div className={tocListClassName}>
        {flatItems.map((item, idx) => {
          const anchorId = getAnchorId(item)
          if (!anchorId) {
            return (
              <p key={`toc-item-mobile-${idx}`} className={tocItemClassName}>
                {parseRichText(item)}
              </p>
            )
          }

          return (
            <button
              key={`toc-item-mobile-${idx}`}
              type="button"
              onClick={() => onClick(anchorId)}
              className={tocButtonClassName}
            >
              {parseRichText(item)}
            </button>
          )
        })}
      </div>
      <table className={tocTableClassName}>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={`toc-row-${rowIdx}`}>
              {row.map((item, colIdx) => {
                if (!item) {
                  return <td key={`toc-empty-${rowIdx}-${colIdx}`} className={tocCellClassName} />
                }

                const anchorId = getAnchorId(item)
                if (!anchorId) {
                  return (
                    <td
                      key={`toc-item-${rowIdx}-${colIdx}`}
                      className={`${tocCellClassName} ${colIdx === 0 ? tocCellGapClassName : ''}`}
                    >
                      <p className={tocItemClassName}>{parseRichText(item)}</p>
                    </td>
                  )
                }

                return (
                  <td
                    key={`toc-item-${rowIdx}-${colIdx}`}
                    className={`${tocCellClassName} ${colIdx === 0 ? tocCellGapClassName : ''}`}
                  >
                    <button type="button" onClick={() => onClick(anchorId)} className={tocButtonClassName}>
                      {parseRichText(item)}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
