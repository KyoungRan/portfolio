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

  return (
    <PageContent>
      {/* 1. Cover Image: 가장 최상단 배치 */}
      {project.coverImageSrc && (
        <div className="w-full">
          <img
            src={project.coverImageSrc}
            alt={`${project.title} 커버`}
            className="h-[30vh] w-full object-cover md:h-[35vh]"
            loading="lazy"
          />
        </div>
      )}

      <div className="mx-auto max-w-[900px] px-4 py-12 text-[#37352f] md:px-12 lg:px-24">
        {/* 2. Title & Subtitle */}
        <header className="mb-8">
          <h1 className="mb-2 text-[40px] font-bold leading-tight tracking-tight">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-[20px] font-medium text-[#787774] leading-snug">
              {parseRichText(project.subtitle)}
            </p>
          )}
        </header>

        {/* 3. Properties Table */}
        <div className="mb-10 overflow-hidden">
          <table className="w-full text-[14px]">
            <tbody>
              {project.type && (
                <tr className="group">
                  <td className="w-[120px] py-1 text-[#9b9a97] font-normal">유형</td>
                  <td className="py-1 font-normal">{project.type}</td>
                </tr>
              )}
              <tr className="group">
                <td className="w-[120px] py-1 text-[#9b9a97] font-normal">한 줄 요약</td>
                <td className="py-1 leading-relaxed">{parseRichText(project.summary)}</td>
              </tr>
              <tr className="group">
                <td className="w-[120px] py-1 text-[#9b9a97] font-normal">대표기술스택</td>
                <td className="py-1">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span key={s} className="rounded-[3px] bg-[#f1f1ef] px-1.5 py-0.5 text-[#37352f] text-[12px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr className="group">
                <td className="w-[120px] py-1 text-[#9b9a97] font-normal">작업기간</td>
                <td className="py-1 font-normal">{periodText}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Sections Loop */}
        <div className="space-y-1">
          {project.sections?.map((section, sectionIdx) => (
            <article key={`${project.slug}-${section.type}-${sectionIdx}`} className="py-1">
              {section.type === 'separator' ? (
                <div className="my-6 h-[1px] w-full bg-[rgba(55,53,47,0.09)]" />
              ) : section.type === 'quote' ? (
                <blockquote className="my-4 border-l-[3px] border-[#37352f] py-1 pl-4 text-[18px] font-medium leading-relaxed text-[#37352f]">
                  {(section.body ?? section.bullets ?? []).map((line, idx) => (
                    <p key={idx} className="whitespace-pre-wrap">{parseRichText(line)}</p>
                  ))}
                </blockquote>
              ) : section.type === 'callout' ? (
                <div className="my-4 flex w-full items-start gap-3 rounded-[4px] bg-[#f1f1ef] px-4 py-4">
                  <span className="mt-0.5 text-[18px]">💡</span>
                  <div className="flex flex-col gap-1.5 text-[16px] leading-[1.6] text-[#37352f]">
                    {(section.body ?? section.bullets ?? []).map((line, idx) => (
                      <p key={idx}>{parseRichText(line)}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 py-2">
                  {section.title && (
                    <h3 className="mt-6 mb-2 text-[24px] font-bold tracking-tight text-[#37352f]">
                      {section.title}
                    </h3>
                  )}

                  {section.layout === 'split' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-2">
                      {/* Left Column: Visuals */}
                      <div className="space-y-4">
                        {section.visuals?.map((visual, visualIdx) => (
                          <figure
                            key={`${project.slug}-v-${sectionIdx}-${visualIdx}`}
                            className="flex flex-col"
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
                        ))}
                      </div>

                      {/* Right Column: Body + Bullets */}
                      <div className="space-y-4">
                        {section.body && section.body.length > 0 && (
                          <div className="flex flex-col gap-2 text-[16px] leading-[1.6]">
                            {section.body.map((line, idx) => (
                              <p key={idx}>{parseRichText(line)}</p>
                            ))}
                          </div>
                        )}
                        {section.bullets && section.bullets.length > 0 && (
                          <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.6]">
                            {section.bullets.map((line, lineIdx) => (
                              <li key={lineIdx}>{parseRichText(line)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {section.body && section.body.length > 0 && (
                        <div className="flex flex-col gap-2 text-[16px] leading-[1.6]">
                          {section.body.map((line, idx) => (
                            <p key={idx}>{parseRichText(line)}</p>
                          ))}
                        </div>
                      )}

                      {section.visuals && section.visuals.length > 0 && (
                        <div className="my-4 space-y-6">
                          {section.visuals.map((visual, visualIdx) => (
                            <figure
                              key={`${project.slug}-v-${sectionIdx}-${visualIdx}`}
                              className="flex flex-col"
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
                          ))}
                        </div>
                      )}

                      {section.table && (
                        <div className="my-2 overflow-x-auto">
                          <table className="w-full border-collapse text-[14px]">
                            {section.table.headers && (
                              <thead>
                                <tr className="border-b border-[rgba(55,53,47,0.09)]">
                                  {section.table.headers.map((h, hIdx) => (
                                    <th
                                      key={hIdx}
                                      className="py-2 px-1 text-left font-semibold text-[#787774]"
                                    >
                                      {parseRichText(h)}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody>
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-[rgba(55,53,47,0.09)] last:border-0">
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className="py-2 px-1 leading-relaxed"
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

                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.6]">
                          {section.bullets.map((line, lineIdx) => (
                            <li key={lineIdx}>{parseRichText(line)}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </PageContent>
  )
}
