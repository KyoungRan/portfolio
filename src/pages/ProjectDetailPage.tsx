// ProjectDetailPage: 프로젝트 콘텐츠를 slug로 로드해 상세를 렌더한다.
import { PageContent } from '@/components/layout/PageContent'
import { formatProjectPeriod, getProjectBySlug } from '@/features/projects/loader'
import { parseRichText } from '@/lib/parseRichText'

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

  const periodText = formatProjectPeriod(project)
  const splitQuoteSentences = (lines: string[]) =>
    lines
      .flatMap((line) => line.split(/\r?\n/))
      .flatMap((segment) =>
        segment
          .split(/(?<=[.!?]|[。！？])\s+/u)
          .map((sentence) => sentence.trim())
          .filter(Boolean)
      )

  return (
    <PageContent>
      <div className="flex w-full justify-center px-6 py-16 text-[#37352f] md:px-16 lg:px-28">
        <div className="w-full max-w-[710px]">
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
            {project.sections?.map((section, sectionIdx) => (
              <article key={`${project.slug}-${section.type}-${sectionIdx}`} className="py-1">
                {section.type === 'separator' ? (
                  <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                    <div className="h-[1px] w-full bg-[#D3D1CB]" />
                  </div>
                ) : section.type === 'quote' ? (
                  <blockquote
                    style={{
                      marginTop: '16px',
                      marginBottom: '16px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      paddingLeft: '16px',
                      paddingRight: '15px',
                      borderLeft: '3px solid #37352f',
                      boxSizing: 'border-box',
                    }}
                    className="w-full text-[18px] font-medium leading-relaxed text-[#37352f]"
                  >
                    <ul className="list-disc space-y-1 pl-4 pr-[15px]">
                      {splitQuoteSentences(section.body ?? section.bullets ?? []).map((sentence, idx) => (
                        <li key={idx} className="m-0 whitespace-pre-wrap">{parseRichText(sentence)}</li>
                      ))}
                    </ul>
                  </blockquote>
                ) : section.type === 'callout' ? (
                  <div className="my-4 flex w-full items-start gap-[10px] rounded-[4px] bg-[#f1f1ef] px-4 py-4">
                    <span className="mt-0.5 text-[18px]">💡</span>
                    <div className="flex flex-col gap-[10px] text-[16px] leading-[1.6] text-[#37352f]">
                      {(section.body ?? section.bullets ?? []).map((line, idx) => (
                        <p key={idx}>{parseRichText(line)}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[10px] py-2">
                    {section.title && (
                      <div className={`mt-6 ${section.source ? 'mb-1' : 'mb-2'}`}>
                        <h3 className="text-[24px] font-bold tracking-tight text-[#37352f]">
                          {section.title}
                        </h3>
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
                        <div className="flex flex-col items-center gap-[10px]">
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
                            <div className="flex flex-col gap-[10px] text-[16px] leading-[1.6]" style={{ marginTop: section.source ? 0 : undefined }}>
                              {section.body.map((line, idx) => (
                                <p key={idx} className="m-0">{parseRichText(line)}</p>
                              ))}
                            </div>
                          )}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.6]">
                              {section.bullets.map((line, lineIdx) => (
                                <li key={lineIdx} className="m-0">{parseRichText(line)}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {section.body && section.body.length > 0 && (
                          <div className="flex flex-col gap-[10px] text-[16px] leading-[1.6]">
                            {section.body.map((line, idx) => (
                              <p key={idx} className="m-0">{parseRichText(line)}</p>
                            ))}
                          </div>
                        )}

                        {section.visuals && section.visuals.length > 0 && (
                          <div className="my-4 flex flex-col items-center gap-[10px]">
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
                          <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.6]">
                            {section.bullets.map((line, lineIdx) => (
                              <li key={lineIdx}>{parseRichText(line)}</li>
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
                            <table className="w-full border-collapse text-[14px] border border-[#D3D1CB]">
                              {section.table.headers && (
                                <thead>
                                  <tr className="border-b border-[#D3D1CB] bg-[#f7f6f3]">
                                    {section.table.headers.map((h, hIdx) => (
                                      <th
                                        key={hIdx}
                                        style={{
                                          paddingTop: '7px',
                                          paddingBottom: '7px',
                                          paddingLeft: '9px',
                                          paddingRight: '9px',
                                          width: section.table.columnWidths?.[hIdx]
                                            ? `${section.table.columnWidths[hIdx]}%`
                                            : undefined,
                                        }}
                                        className="border-r border-[#D3D1CB] text-left font-semibold text-[#787774] last:border-r-0"
                                      >
                                        {parseRichText(h)}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {section.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-[#D3D1CB] last:border-0">
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
                                            : cIdx === 0
                                              ? { backgroundColor: '#f7f6f3' }
                                              : {}),
                                          width: section.table.columnWidths?.[cIdx]
                                            ? `${section.table.columnWidths[cIdx]}%`
                                            : undefined,
                                        }}
                                        className="border-r border-[#D3D1CB] leading-relaxed whitespace-pre-line last:border-r-0"
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
            ))}
          </div>
        </div>
      </div>
    </PageContent>
  )
}
