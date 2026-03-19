// ProjectDetailPage: 프로젝트 콘텐츠를 slug로 로드해 상세를 렌더한다.
import { PageContent } from '@/components/layout/PageContent'
import { TableColumnGroup } from '@/components/table/TableColumnGroup'
import { getProjectBySlug } from '@/features/projects/loader'
import { TocGrid } from '@/features/projects/components/TocGrid'
import type { RichText, RichTextSegment } from '@/features/projects/model'
import { parseRichText } from '@/lib/parseRichText'

type LabelPalette = { bg: string; text: string }
const DEFAULT_LABEL_PALETTE: LabelPalette = { bg: 'rgba(211, 168, 0, 0.137)', text: '#2c2c2b' }

const listClassName = 'list-disc space-y-1 pl-6 text-[14px] leading-[26px]'
const listItemClassName = 'm-0 leading-[26px]'
const DEFAULT_TABLE_TOP_SPACING = 8
const DEFAULT_TABLE_BOTTOM_SPACING = 15

function getPlainText(value: RichText | undefined) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.map((segment) => segment.text).join('')
}

function getRomanSectionKey(value: string) {
  const match = value.trim().match(/^((?:I|II|III|IV|V|VI|VII|VIII|IX|X)\.\s+[A-Za-z]+)/)
  return match ? match[1] : null
}

function splitSegmentsAtIndex(segments: RichTextSegment[], index: number) {
  const before: RichTextSegment[] = []
  const after: RichTextSegment[] = []
  let cursor = 0

  segments.forEach((segment) => {
    const end = cursor + segment.text.length
    if (end <= index) {
      before.push(segment)
    } else if (cursor >= index) {
      after.push(segment)
    } else {
      const splitAt = index - cursor
      const left = segment.text.slice(0, splitAt)
      const right = segment.text.slice(splitAt)
      if (left) before.push({ ...segment, text: left })
      if (right) after.push({ ...segment, text: right })
    }
    cursor = end
  })

  return { before, after }
}

function trimLeadingSpaces(segments: RichTextSegment[]) {
  if (segments.length === 0) return segments
  const trimmed = [...segments]
  while (trimmed.length > 0) {
    const first = trimmed[0]
    const nextText = first.text.replace(/^\s+/, '')
    if (nextText === first.text) break
    if (nextText) {
      trimmed[0] = { ...first, text: nextText }
      break
    }
    trimmed.shift()
  }
  return trimmed
}

function resolvePaletteForLabel(
  labelText: string,
  palettes: Record<string, LabelPalette>,
  overrides?: Record<string, string>,
) {
  if (!overrides) return palettes.default ?? DEFAULT_LABEL_PALETTE
  const key = overrides[labelText]
  if (key && palettes[key]) return palettes[key]
  return palettes.default ?? DEFAULT_LABEL_PALETTE
}

function renderLineWithLabel(
  line: RichText,
  palettes: Record<string, LabelPalette>,
  overrides?: Record<string, string>,
) {
  const plainLine = getPlainText(line)
  const match = plainLine.match(/^(.+?):\s*([\s\S]*)$/)
  if (!match) return parseRichText(line)
  const labelText = match[1].trim()
  const circledMatch = labelText.match(/^([①②③④⑤⑥⑦⑧⑨⑩])\s*(.*)$/)
  const circledPrefix = circledMatch ? circledMatch[1] : null
  const circledLabel = circledMatch ? circledMatch[2] : labelText
  const isMiddleDotLabel = labelText.startsWith('·')
  const normalizedLabelText = labelText
    .replace(/^·\s?/, '')
    .replace(/^([①②③④⑤⑥⑦⑧⑨⑩])\s*/, '')
    .trim()
  const palette = resolvePaletteForLabel(normalizedLabelText, palettes, overrides)
  const colonIndex = plainLine.indexOf(':')

  let content: RichText = match[2]
  if (Array.isArray(line) && colonIndex !== -1) {
    const { after } = splitSegmentsAtIndex(line, colonIndex + 1)
    content = trimLeadingSpaces(after)
  }

  if (isMiddleDotLabel) {
    const plainLabel = normalizedLabelText
    return (
      <>
        <span>· </span>
        <span
          style={{
            display: 'inline-block',
            padding: '2.7px 5.4px',
            borderRadius: '4px',
            backgroundColor: palette.bg,
            color: palette.text,
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: 'normal',
          }}
        >
          {plainLabel}
        </span>
        <span style={{ marginRight: '4px' }}>:</span>
        {parseRichText(content)}
      </>
    )
  }

  return (
    <>
      {circledPrefix && <span>{`${circledPrefix} `}</span>}
      <span
        style={{
          display: 'inline-block',
          padding: '2.7px 5.4px',
          borderRadius: '4px',
          backgroundColor: palette.bg,
          color: palette.text,
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: 'normal',
        }}
      >
        {circledLabel.replace(/^·\s?/, '')}
      </span>
      <span style={{ marginRight: '4px' }}>:</span>
      {parseRichText(content)}
    </>
  )
}

function removeLeadingTabs(segments: RichTextSegment[], count: number) {
  let remaining = count
  return segments
    .map((segment) => {
      if (remaining <= 0) return segment
      const match = segment.text.match(/^\t+/)
      if (!match) return segment
      const removeCount = Math.min(match[0].length, remaining)
      remaining -= removeCount
      const nextText = segment.text.slice(removeCount)
      if (!nextText) return null
      return { ...segment, text: nextText }
    })
    .filter((segment): segment is RichTextSegment => Boolean(segment))
}

function extractIndentedLine(line: RichText) {
  const plainLine = getPlainText(line)
  const matched = plainLine.match(/^(\t+)(.*)$/)
  if (!matched) return { indent: 0, text: line }
  const indent = matched[1].length
  if (typeof line === 'string') {
    return { indent, text: matched[2] }
  }
  return { indent, text: removeLeadingTabs(line, indent) }
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
  const labelPalettes = project.labelPalette ?? { default: DEFAULT_LABEL_PALETTE }
  const labelOverrides = project.labelPaletteOverrides
  const sectionAnchorMap = new Map<string, string>()
  const sectionRomanAnchorMap = new Map<string, string>()
  project.sections?.forEach((section, idx) => {
    if (section.title) {
      const titleText = getPlainText(section.title).trim()
      if (titleText) {
        const anchorId = `section-${project.slug}-${idx}`
        sectionAnchorMap.set(titleText, anchorId)
        const romanKey = getRomanSectionKey(titleText)
        if (romanKey) {
          sectionRomanAnchorMap.set(romanKey, anchorId)
        }
      }
    }
  })

  function handleTocClick(anchorId: string) {
    const target = document.getElementById(anchorId)
    if (!target) return
    const headerOffset = 78
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function getSectionAnchorId(item: RichText) {
    const titleText = getPlainText(item).trim()
    const exactAnchorId = sectionAnchorMap.get(titleText)
    if (exactAnchorId) return exactAnchorId

    const romanKey = getRomanSectionKey(titleText)
    if (!romanKey) return undefined
    return sectionRomanAnchorMap.get(romanKey)
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
                className="flex w-full justify-center"
                style={{
                  width: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
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
                ? sectionAnchorMap.get(getPlainText(section.title).trim())
                : undefined
              const sectionLabelOverrides = section.labelPaletteOverrides ?? labelOverrides

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
                        .map((line, idx) => {
                          const { indent, text } = extractIndentedLine(line)
                          return (
                            <p
                              key={idx}
                              className="m-0 whitespace-pre-wrap"
                              style={{ margin: 0, marginLeft: `${indent * 20}px` }}
                            >
                              {renderLineWithLabel(text, labelPalettes, sectionLabelOverrides)}
                            </p>
                          )
                        })}
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
                          const trimmedTitle = getPlainText(section.title).trim()
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
                                {parseRichText(section.title)}
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
                                {parseRichText(section.title)}
                              </h4>
                            )
                          }
                          return (
                            <h3
                              id={sectionAnchorId}
                              style={{ ...resolvedStyle, marginBottom: resolvedMarginBottom }}
                              className={titleClassName}
                            >
                              {parseRichText(section.title)}
                            </h3>
                          )
                        })()}
                        {section.source && (
                          <p
                            className="mt-1 text-[14px] leading-[1.5] text-[#7d7a75]"
                            style={{ marginBottom: 0 }}
                          >
                            {parseRichText(section.source)}
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
                                <p key={idx} className="m-0">{renderLineWithLabel(line, labelPalettes, sectionLabelOverrides)}</p>
                              ))}
                            </div>
                          )}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul className={listClassName}>
                              {section.bullets.map((line, lineIdx) => {
                                const { indent, text } = extractIndentedLine(line)
                                return (
                                  <li
                                    key={lineIdx}
                                    className={listItemClassName}
                                    style={{ marginLeft: `${indent * 20}px` }}
                                  >
                                    {renderLineWithLabel(text, labelPalettes, sectionLabelOverrides)}
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {section.body && section.body.length > 0 && (
                          <div className="flex flex-col gap-[10px] text-[14px]" style={{ lineHeight: '21px' }}>
                            {section.body.map((line, idx) => (
                              <p key={idx} className="m-0">{renderLineWithLabel(line, labelPalettes, sectionLabelOverrides)}</p>
                            ))}
                          </div>
                        )}

                        {section.tocColumns && section.tocColumns.length > 0 && (
                          <TocGrid
                            columns={section.tocColumns}
                            getAnchorId={getSectionAnchorId}
                            onClick={handleTocClick}
                          />
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
                            {section.bullets.map((line, lineIdx) => {
                              const { indent, text } = extractIndentedLine(line)
                              return (
                                <li
                                  key={lineIdx}
                                  className={listItemClassName}
                                  style={{ marginLeft: `${indent * 20}px` }}
                                >
                                  {renderLineWithLabel(text, labelPalettes, sectionLabelOverrides)}
                                </li>
                              )
                            })}
                          </ul>
                        )}

                        {section.table && (
                          <div
                            className="overflow-x-auto"
                            style={{
                              marginTop: `${DEFAULT_TABLE_TOP_SPACING}px`,
                              marginBottom: `${DEFAULT_TABLE_BOTTOM_SPACING}px`,
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
