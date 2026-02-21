// Home의 AboutMe 섹션
// 노션 상단 구조(프로필/연락처 + 소개/요약)를 단일 섹션으로 구성한다.
import profile from '@/content/profile.json'
import { Section } from '@/components/layout/Section'

interface Period {
  start: string
  end?: string | null
  display?: string
}

interface ProfileContent {
  name: string
  roleTitle: string
  headline: string
  profileImageSrc?: string
  contacts: {
    phone?: string
    email?: string
    links: Array<{
      label: string
      href: string
      external?: boolean
    }>
  }
  about: {
    title: string
    description: string
    body: string[]
  }
  overview: {
    totalExperienceText?: string
    companies: Array<{
      company: string
      role: string
      period: Period
    }>
  }
  educationSummary: {
    items: Array<{
      name: string
      periodText: string
    }>
  }
}

function formatPeriod(period: Period): string {
  if (period.display && period.display.trim().length > 0) {
    return period.display.trim()
  }

  const start = period.start.replace('-', '.')
  const end = period.end ? period.end.replace('-', '.') : 'Present'
  return `${start} - ${end}`
}

/**
 * JSON의 텍스트에서 **Bold** 및 <purple>Color</purple> 마크업을 해석하여 React 노드로 반환합니다.
 */
function parseRichText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|<purple>.*?<\/purple>)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('<purple>') && part.endsWith('</purple>')) {
      return <span key={i} style={{ color: '#A173BF', fontWeight: 700 }}>{part.slice(8, -9)}</span>;
    }
    return part;
  });
}

export function AboutMeSection() {
  const content = profile as ProfileContent
  const aboutTitle = content.about.title === 'AboutMe' ? 'About Me' : content.about.title
  const profileImageSrc =
    content.profileImageSrc && content.profileImageSrc.trim().length > 0
      ? content.profileImageSrc
      : '/assets/profile/resume-photo.jpg'
  const displayName = content.name.trim().split('').join(' ')

  return (
    <Section id="about-me" className="w-full">
      {/* 배너와 박스 사이 간격 20px (배너의 margin-bottom 20px 활용) */}
      <div className="aboutme-shell w-full" style={{ paddingTop: '0px', paddingBottom: '80px' }}>
        
        <header style={{ marginBottom: '0px', marginTop: '0px', paddingTop: '0px' }}>
          {/* 헤드라인 콜아웃: 아래 공백 30px 적용, 라인 없음 */}
          <div 
            style={{ 
              marginTop: '0px', 
              marginBottom: '30px', 
              padding: '24px',
              border: '2px solid var(--hero-gradient-4)',
              borderRadius: '4px',
              background: 'transparent'
            }}
            className="flex w-full items-start gap-5 shadow-sm"
          >
            <div className="flex-shrink-0 mt-1">
              <div 
                style={{ border: '1px solid rgba(55, 53, 47, 0.09)', width: '32px', height: '32px' }}
                className="flex items-center justify-center rounded-[3px] bg-background shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#37352f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '20px', height: '20px' }}
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-[17px] leading-[1.6] text-[#37352f] font-medium pt-0.5 tracking-tight">
              {parseRichText(content.headline)}
            </div>
          </div>
        </header>

        {/* 본문 영역: 박스 아래 라인 삭제, 30px 공백 유지 */}
        <div 
          style={{ paddingTop: '0px' }}
          className="grid items-start gap-x-12 md:grid-cols-[260px_1fr]"
        >
          
          <aside style={{ gap: '32px' }} className="flex flex-col self-start">
            <div 
              style={{ border: '1px solid rgba(55, 53, 47, 0.09)' }}
              className="w-full overflow-hidden rounded-[1px]"
            >
              <img
                alt={`${content.name} 프로필 사진`}
                className="h-auto w-full object-cover transition-opacity hover:opacity-95"
                loading="lazy"
                src={profileImageSrc}
              />
            </div>

            <div style={{ gap: '24px' }} className="flex flex-col">
              <h3 
                style={{ color: '#A173BF', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', paddingLeft: '4px' }}
              >
                {displayName}
              </h3>

              <div 
                style={{ borderLeft: '5px solid #37352f', paddingLeft: '14px' }}
                className="flex flex-col gap-3 py-1"
              >
                <p className="text-[16px] font-bold text-[#787774] uppercase tracking-[0.2em] mb-4">
                  AI Agent Developer
                </p>

                <div style={{ gap: '28px' }} className="flex flex-col text-[#37352f]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-extrabold text-[#9b9a97] uppercase tracking-widest">PHONE</span>
                    <div className="font-bold text-[16px] tracking-tight" style={{ paddingBottom: '8px' }}>
                      {content.contacts.phone}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-extrabold text-[#9b9a97] uppercase tracking-widest">EMAIL</span>
                    <div style={{ paddingBottom: '8px' }}>
                      <a
                        className="truncate font-bold text-[16px] text-[#37352f] hover:text-[#A173BF] underline decoration-[rgba(55,53,47,0.3)] underline-offset-4 tracking-tight"
                        href={`mailto:${content.contacts.email}`}
                      >
                        {content.contacts.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-extrabold text-[#9b9a97] uppercase tracking-widest">LINKS</span>
                    <div className="flex flex-col gap-3 pt-1">
                      {content.contacts.links.map((link) => (
                        <a
                          className="block truncate font-bold text-[15px] text-[#37352f] hover:text-[#A173BF] underline decoration-[rgba(55,53,47,0.3)] underline-offset-4 tracking-tight"
                          href={link.href}
                          key={`${link.label}-${link.href}`}
                          rel={link.external ? 'noreferrer' : undefined}
                          target={link.external ? '_blank' : undefined}
                        >
                          {link.label}: {link.href.replace(/^https?:\/\//, '')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div style={{ gap: '60px', marginLeft: '40px' }} className="flex flex-col">
            <article className="flex flex-col">
              <h3 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {aboutTitle}
              </h3>
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <div className="h-[1px] w-full bg-[#e1dfdd]" />
              </div>
              <div className="flex flex-col gap-8 pt-4">
                <p className="text-[20px] font-bold leading-[1.5] text-[#37352f] tracking-tight">
                  {parseRichText(content.about.description)}
                </p>
                <div className="flex flex-col gap-5 text-[16.5px] leading-[1.7] text-[#37352f] tracking-[-0.01em]">
                  {content.about.body.map((paragraph, idx) => (
                    <p className="mb-0" key={idx}>
                      {parseRichText(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </article>

            <article className="flex flex-col">
              <h3 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800 }}>
                Experience Overview
              </h3>
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <div className="h-[1px] w-full bg-[#e1dfdd]" />
              </div>
              <div className="flex flex-col gap-8 pt-4">
                {content.overview.totalExperienceText && (
                  <p className="text-[18px] font-bold text-[#37352f] tracking-tight mb-2">
                    {parseRichText(content.overview.totalExperienceText)}
                  </p>
                )}
                <ul className="list-disc flex flex-col gap-6 pl-6 text-[#37352f]">
                  {content.overview.companies.map((company) => (
                    <li key={`${company.company}-${company.period.start}`} className="text-[18px] leading-none tracking-tight">
                      <div className="flex flex-row items-center flex-nowrap whitespace-nowrap gap-3">
                        <span className="font-bold">{company.company}</span>
                        <span className="text-[#9b9a97] font-normal">/</span>
                        <span className="font-semibold opacity-80">{company.role}</span>
                        <span className="ml-4 text-[13.5px] font-bold text-[#787774] bg-[#f1f1ef] px-2.5 py-1 rounded-[3px] uppercase tracking-tight">
                          {formatPeriod(company.period)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="flex flex-col">
              <h3 style={{ color: '#A173BF', fontSize: '26px', fontWeight: 800 }}>
                Education
              </h3>
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <div className="h-[1px] w-full bg-[#e1dfdd]" />
              </div>
              <ul className="list-disc flex flex-col gap-6 pl-6 pt-6 text-[#37352f]">
                {content.educationSummary.items.map((item) => (
                  <li key={`${item.name}-${item.periodText}`} className="text-[18px] leading-none tracking-tight">
                    <div className="flex flex-row items-center flex-nowrap whitespace-nowrap gap-4">
                      <span className="font-bold">{item.name}</span>
                      <span className="ml-4 text-[13.5px] font-bold text-[#787774] bg-[#f1f1ef] px-2.5 py-1 rounded-[3px] uppercase tracking-tight">
                        {item.periodText}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </Section>
  )
}
