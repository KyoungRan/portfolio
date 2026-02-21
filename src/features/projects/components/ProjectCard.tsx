// 프로젝트 카드 컴포넌트
// 노션 갤러리 뷰의 정밀한 레이아웃을 재현한다.
import type { ProjectItem } from '@/features/projects/model'
import { formatProjectPeriod } from '@/features/projects/loader'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const periodText = formatProjectPeriod(project)

  return (
    <a
      href={`#/projects/${project.slug}`}
      style={{ padding: '15px' }}
      className="project-card group block h-full overflow-hidden rounded-[4px] border border-[rgba(55,53,47,0.16)] bg-transparent transition-all hover:bg-[rgba(55,53,47,0.03)] hover:no-underline shadow-sm hover:shadow-md"
    >
      {/* 노션 갤러리 이미지 표준 비율: 16:9 또는 고정 높이 */}
      {project.coverImageSrc ? (
        <div className="relative aspect-[1.7/1] w-full overflow-hidden border-b border-[rgba(55,53,47,0.09)] bg-[rgba(55,53,47,0.02)]">
          <img
            src={project.coverImageSrc}
            alt={`${project.title} 커버 이미지`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[1.7/1] w-full bg-[#f1f1ef] border-b border-[rgba(55,53,47,0.09)]" />
      )}
      
      {/* 텍스트 영역: 노션 표준 폰트 크기 및 색상 적용 */}
      <div className="flex flex-col space-y-2" style={{ paddingTop: '12px' }}>
        <div className="space-y-0.5">
          <h3 style={{ fontSize: '15px', color: '#37352f', fontWeight: 700, lineHeight: '1.3' }} className="group-hover:text-[#2383e2] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p style={{ fontSize: '11px', color: '#787774', fontWeight: 600 }} className="uppercase tracking-wider">
            {periodText}
          </p>
        </div>
        
        <p style={{ fontSize: '13px', color: '#37352f', lineHeight: '1.6' }} className="line-clamp-2 min-h-[3.2em] tracking-tight opacity-90">
          {project.summary}
        </p>
        
        <div className="mt-auto pt-1 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={`${project.slug}-${tag}`}
              style={{ backgroundColor: '#f1f1ef', color: '#787774', fontSize: '10.5px', fontWeight: 700 }}
              className="rounded-[3px] px-2 py-0.5 border border-transparent group-hover:border-[rgba(55,53,47,0.1)] transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
