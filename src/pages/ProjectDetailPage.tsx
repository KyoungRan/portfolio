// ProjectDetailPage: 프로젝트 콘텐츠를 slug로 로드해 상세를 렌더한다.
import { PageContent } from '@/components/layout/PageContent'
import { TableColumnGroup } from '@/components/table/TableColumnGroup'
import { getProjectBySlug } from '@/features/projects/loader'
import { parseRichText } from '@/lib/parseRichText'

type LabelPalette = { bg: string; text: string }

const listClassName = 'list-disc space-y-1 pl-6 text-[14px] leading-[26px]'
const listItemClassName = 'm-0 leading-[26px]'

function renderLineWithLabel(line: string, palette: LabelPalette) {
  const match = line.match(/^(.+?):\s*(.+)$/)
  if (!match) return parseRichText(line)
  const labelText = match[1].trim()
  const content = match[2]

  return (
    <>
      <span
        style={{
          display: 'inline-block',
          padding: '2.7px 5.4px',
          borderRadius: '4px',
          backgroundColor: palette.bg,
          color: palette.text,
          fontWeight: 400,
          fontSize: '13.6px',
          lineHeight: 'normal',
        }}
      >
        {labelText}
      </span>
      <span style={{ marginRight: '4px' }}>:</span>
      {parseRichText(content)}
    </>
  )
}

interface ProjectDetailPageProps {
  slug: string
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <PageContent>
        <div className="mx-auto max-w-[900px] px-12 py-20 text-[#37352f]">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-[#787774]">요청한 프로젝트를 찾을 수 없습니다.</p>
          <a href="#/" className="mt-8 inline-block text-[var(--accent)] underline">
            홈으로 돌아가기
          </a>
        </div>
      </PageContent>
    )
  }

  const headingStyleByLevel: Record<number, { fontSize: string; lineHeight: string; fontWeight: number; color: string }> = {
    2: { fontSize: '20px', lineHeight: '28px', fontWeight: 600, color: '#2c2c2b' },
    3: { fontSize: '20px', lineHeight: '28px', fontWeight: 600, color: '#2c2c2b' },
    4: { fontSize: '20px', lineHeight: '28px', fontWeight: 600, color: '#2c2c2b' },
  }
  const romanTitleStyle = { fontSize: '22px', lineHeight: '30px', fontWeight: 600, color: '#2c2c2b' }
  const labelPalette = project.labelPalette ?? {
    default: { bg: 'rgba(211, 168, 0, 0.137)', text: '#2c2c2b' },
  }
  const labelStyle = labelPalette.default
  const sectionAnchorMap = new Map<string, string>()
  project.sections?.forEach((section, idx) => {
    if (section.title) {
      sectionAnchorMap.set(section.title.trim(), `section-${project.slug}-${idx}`)
    }
  })

  function handleTocClick(anchorId: string) {
    const target = document.getElementById(anchorId)
    if (!target) return
    const headerOffset = 78
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <PageContent>
      <div className="flex w-full justify-center px-6 py-16 text-[#37352f] md:px-16 lg:px-28">
        <div className="w-full max-w-[710px]">
          <div className="flex flex-col" style={{ marginTop: '6px', marginBottom: '10px' }}>
          </div>

          {/* 1. Cover Image: 본문 폭에 맞춰 배치 */}
          {project.coverImageSrc && (
            <div className="w-full" style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                className="mx-auto"
                style={{
                  width: `${project.coverImageWidthPercent ?? 80}%`,
                }}
              >
                <img
                  src={project.coverImageSrc}
                  alt={`${project.title} 커버`}
                  className="block h-[30vh] w-full rounded-[1px] object-cover md:h-[35vh]"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* 2. Sections Loop */}
          <div className="space-y-1">
            {project.sections?.map((section, sectionIdx) => {
              const sectionAnchorId = section.title
                ? sectionAnchorMap.get(section.title.trim())
                : undefined

              return (
              <article
                key={`${project.slug}-${section.type}-${sectionIdx}`}
                className={section.type === 'quote' ? 'py-0' : 'py-1'}
              >
                {section.type === 'separator' ? (
                  <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                    <div className="h-[1px] w-full bg-[#D3D1CB]" />
                  </div>
                ) : section.type === 'quote' ? (
                  <blockquote
                    style={{
                      marginTop: '8px',
                      marginBottom: '8px',
                      paddingTop: '0px',
                      paddingBottom: '0px',
                      paddingLeft: '16px',
                      paddingRight: '15px',
                      borderLeft: '3px solid #37352f',
                      boxSizing: 'border-box',
                    }}
                    className="w-full text-[#2c2c2b]"
                  >
                    <div className="flex flex-col gap-1 text-[14px]" style={{ lineHeight: '21px' }}>
                      {(section.body ?? section.bullets ?? [])
                        .map((line) => (typeof line === 'string' ? line.replace(/\s+$/g, '') : line))
                        .filter((line) => (typeof line === 'string' ? line.trim() !== '' : true))
                        .map((line, idx) => (
                          <p key={idx} className="m-0 whitespace-pre-wrap" style={{ margin: 0 }}>
                            {renderLineWithLabel(line, labelStyle)}
                          </p>
                        ))}
                    </div>
                  </blockquote>
                ) : section.type === 'callout' ? (
                  <div className="my-4 flex w-full items-start gap-[10px] rounded-[4px] bg-[#f1f1ef] px-4 py-4">
                    <span className="mt-0.5 text-[18px]">💡</span>
                    <div className="flex flex-col gap-[10px] text-[14px] text-[#2c2c2b]" style={{ lineHeight: '21px' }}>
                      {(section.body ?? section.bullets ?? []).map((line, idx) => (
                        <p key={idx}>{parseRichText(line)}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[10px] py-2">
                    {section.title && (
                      <div className={`mt-6 ${section.source ? 'mb-1' : 'mb-2'}`}>
                        {(() => {
                          const trimmedTitle = section.title?.trim()
                          const isRomanTitle = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)\./.test(trimmedTitle ?? '')
                          const resolvedStyle = isRomanTitle ? romanTitleStyle : headingStyleByLevel[section.titleLevel === 4 ? 4 : section.titleLevel === 2 ? 2 : 3]
                          const titleClassName = 'tracking-tight'
                          const resolvedMarginBottom = isRomanTitle ? '10px' : '5px'

                          if (section.titleLevel === 2) {
                            return (
                              <h2
                                id={sectionAnchorId}
                                style={{ ...resolvedStyle, marginBottom: resolvedMarginBottom }}
                                className={titleClassName}
                              >
                                {section.title}
                              </h2>
                            )
                          }
                          if (section.titleLevel === 4) {
                            return (
                              <h4
                                id={sectionAnchorId}
                                style={{ ...resolvedStyle, marginBottom: resolvedMarginBottom }}
                                className={titleClassName}
                              >
                                {section.title}
                              </h4>
                            )
                          }
                          return (
                            <h3
                              id={sectionAnchorId}
                              style={{ ...resolvedStyle, marginBottom: resolvedMarginBottom }}
                              className={titleClassName}
                            >
                              {section.title}
                            </h3>
                          )
                        })()}
                        {section.source && (
                          <p
                            className="mt-1 text-[14px] leading-[1.5] text-[#7d7a75]"
                            style={{ marginBottom: 0 }}
                          >
                            {section.source}
                          </p>
                        )}
                      </div>
                    )}

                    {section.layout === 'split' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] items-start my-2">
                        {/* Left Column: Visuals */}
                        <div
                          className={`flex flex-col gap-[10px] ${
                            section.visualAlign === 'left' ? 'items-start' : 'items-center'
                          }`}
                        >
                          {section.visuals?.map((visual, visualIdx) => {
                            const widthPercent = visual.widthPercent ?? 80
                            return (
                              <figure
                                key={`${project.slug}-v-${sectionIdx}-${visualIdx}`}
                                className="flex flex-col"
                                style={{ width: `${widthPercent}%` }}
                              >
                                <img
                                  src={visual.src}
                                  alt={visual.alt}
                                  className="w-full rounded-[1px]"
                                  loading="lazy"
                                />
                                {visual.caption && (
                                  <figcaption className="mt-2 text-[14px] text-[#787774] leading-relaxed">
                                    {parseRichText(visual.caption)}
                                  </figcaption>
                                )}
                              </figure>
                            )
                          })}
                        </div>

                        {/* Right Column: Body + Bullets */}
                        <div
                          className={`flex h-full flex-col gap-[10px] ${
                            section.rightColumnAlign === 'center' ? 'justify-center' : ''
                          }`}
                        >
                          {section.body && section.body.length > 0 && (
                            <div className="flex flex-col gap-[10px] text-[14px]" style={{ marginTop: section.source ? 0 : undefined, lineHeight: '21px' }}>
                              {section.body.map((line, idx) => (
                                <p key={idx} className="m-0">{renderLineWithLabel(line, labelStyle)}</p>
                              ))}
                            </div>
                          )}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul className={listClassName}>
                              {section.bullets.map((line, lineIdx) => (
                                <li key={lineIdx} className={listItemClassName}>
                                  {renderLineWithLabel(line, labelStyle)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {section.body && section.body.length > 0 && (
                          <div className="flex flex-col gap-[10px] text-[14px]" style={{ lineHeight: '21px' }}>
                            {section.body.map((line, idx) => (
                              <p key={idx} className="m-0">{renderLineWithLabel(line, labelStyle)}</p>
                            ))}
                          </div>
                        )}

                        {section.tocColumns && section.tocColumns.length > 0 && (
                          <div className="grid grid-cols-1 gap-x-12 gap-y-1 text-[14px] leading-[26px] md:grid-cols-2">
                            {section.tocColumns.map((column, columnIdx) => (
                              <div key={`toc-col-${columnIdx}`} className="flex flex-col">
                                {column.map((item, itemIdx) => (
                                  (() => {
                                    const anchorId = sectionAnchorMap.get(item.trim())
                                    if (!anchorId) {
                                      return (
                                        <p key={`toc-item-${columnIdx}-${itemIdx}`} className="m-0">
                                          {parseRichText(item)}
                                        </p>
                                      )
                                    }

                                    return (
                                      <button
                                        key={`toc-item-${columnIdx}-${itemIdx}`}
                                        type="button"
                                        onClick={() => handleTocClick(anchorId)}
                                        className="m-0 w-fit cursor-pointer border-0 border-b-2 border-transparent bg-transparent p-0 pb-[1px] text-left text-[#2c2c2b] no-underline hover:border-[#b197fc] focus-visible:border-[#b197fc] focus-visible:outline-none"
                                      >
                                        {parseRichText(item)}
                                      </button>
                                    )
                                  })()
                                ))}
                              </div>
                            ))}
                          </div>
                        )}

                        {section.visuals && section.visuals.length > 0 && (
                          <div
                            className={`mt-4 flex flex-col gap-[10px] ${
                              section.visualAlign === 'left' ? 'items-start' : 'items-center'
                            }`}
                            style={{ marginBottom: '5px' }}
                          >
                            {section.visuals.map((visual, visualIdx) => {
                              const widthPercent = visual.widthPercent ?? 80
                              return (
                                <figure
                                  key={`${project.slug}-v-${sectionIdx}-${visualIdx}`}
                                  className="flex flex-col"
                                  style={{ width: `${widthPercent}%` }}
                                >
                                  <img
                                    src={visual.src}
                                    alt={visual.alt}
                                    className="w-full rounded-[1px]"
                                    loading="lazy"
                                  />
                                  {visual.caption && (
                                    <figcaption className="mt-2 text-[14px] text-[#787774] leading-relaxed">
                                      {parseRichText(visual.caption)}
                                    </figcaption>
                                  )}
                                </figure>
                              )
                            })}
                          </div>
                        )}

                        {section.bullets && section.bullets.length > 0 && (
                          <ul className={listClassName}>
                            {section.bullets.map((line, lineIdx) => (
                              <li key={lineIdx} className={listItemClassName}>
                                {renderLineWithLabel(line, labelStyle)}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.table && (
                          <div
                            className="overflow-x-auto"
                            style={{
                              marginTop: section.tableTopSpacing ?? 0,
                              marginBottom: section.tableBottomSpacing ?? 0,
                            }}
                          >
                            <table className="w-full border-collapse text-[14px] border border-[#e6e5e3]">
                              <TableColumnGroup widths={section.table.columnWidths} />
                              {section.table.headers && (
                                <thead>
                                  <tr className="border-b border-[#e6e5e3] bg-[#f7f6f3]">
                                    {section.table.headers.map((h, hIdx) => (
                                      <th
                                        key={hIdx}
                                        style={{
                                          paddingTop: '7px',
                                          paddingBottom: '7px',
                                          paddingLeft: '9px',
                                          paddingRight: '9px',
                                        }}
                                        className="border-r border-[#e6e5e3] text-left font-semibold text-[#787774] last:border-r-0"
                                      >
                                        {parseRichText(h)}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {section.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-[#e6e5e3] last:border-0">
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        style={{
                                          paddingTop: '7px',
                                          paddingBottom: '7px',
                                          paddingLeft: '9px',
                                          paddingRight: '9px',
                                          ...(section.table.headers
                                            ? {}
                                            : cIdx % 2 === 0
                                              ? { backgroundColor: '#f7f6f3', fontWeight: 600 }
                                              : {}),
                                        }}
                                        className="border-r border-[#e6e5e3] whitespace-pre-line last:border-r-0"
                                      >
                                        {parseRichText(cell)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </article>
              )
            })}
          </div>
        </div>
      </div>
    </PageContent>
  )
}
