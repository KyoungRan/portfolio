// Home의 AboutMe 섹션
// 노션 상단 구조(프로필/연락처/내비게이터 + 소개/요약)를 단일 섹션으로 구성한다.
import profile from '@/content/profile.json'
import site from '@/content/site.json'
import { Section } from '@/components/layout/Section'
import { scrollToSectionStart } from '@/lib/scrollToSectionStart'

interface Period {
  start: string
  end?: string | null
  display?: string
}

interface ProfileLink {
  label: string
  href: string
  external?: boolean
}

interface ProfileContent {
  name: string
  roleTitle: string
  headline: string
  profileImageSrc?: string
  contacts: {
    phone?: string
    email?: string
    links: ProfileLink[]
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

interface SiteContent {
  nav: {
    items: Array<{
      label: string
      sectionId: string
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

function getNavigatorLabel(sectionId: string, fallbackLabel: string): string {
  if (sectionId === 'projects') {
    return 'Projects'
  }

  if (sectionId === 'education-training') {
    return 'Education and Training'
  }

  return fallbackLabel
}

export function AboutMeSection() {
  const content = profile as ProfileContent
  const navContent = site as SiteContent
  const navigatorItems = navContent.nav.items.filter((item) => item.sectionId !== 'about-me')
  const aboutTitle = content.about.title === 'AboutMe' ? 'About Me' : content.about.title
  const profileImageSrc =
    content.profileImageSrc && content.profileImageSrc.trim().length > 0
      ? content.profileImageSrc
      : '/assets/profile/resume-photo.jpg'
  const displayName = content.name.trim().split('').join(' ')

  return (
    <Section id="about-me" className="w-full pt-3 pb-16">
      <div className="aboutme-shell w-full space-y-9">
        <header className="space-y-7">
          <h2 className="text-center !text-[clamp(1.45rem,3.2vw,1.85rem)] font-semibold text-[var(--fg)]">
            {content.roleTitle} {content.name} 포트폴리오
          </h2>
          <div className="mx-auto mt-2 w-full rounded-[8px] border border-[#e1dfdd] bg-white px-5 py-4">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-[#d7d4d1] text-[10px] leading-none text-[#a173bf]"
              >
                ✦
              </span>
              <p className="mb-0 text-left text-[12px] leading-[1.65] text-[#37352f]">
                {content.headline}
              </p>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-x-10 gap-y-9 md:grid-cols-[180px_minmax(0,1fr)]">
          <aside className="space-y-8 self-start">
            <div className="space-y-4.5">
              <img
                alt={`${content.name} 프로필 사진`}
                className="h-auto w-full max-w-[160px] rounded-[1px] border border-[#d9d6d3] object-cover"
                loading="lazy"
                src={profileImageSrc}
              />

              <div className="space-y-2">
                <h3 className="mb-0 text-[20px] leading-none font-semibold tracking-[0.15em] text-[#A173BF]">
                  {displayName}
                </h3>

                <div className="border-l-2 border-[#4d4d4d] pl-2.5 text-[11px] leading-[1.4] text-[#37352f]">
                  {content.contacts.phone && <p className="mb-0">{content.contacts.phone}</p>}
                  {content.contacts.email && (
                    <a
                      className="block break-words !text-[#0b6e99] hover:underline"
                      href={`mailto:${content.contacts.email}`}
                    >
                      {content.contacts.email}
                    </a>
                  )}
                  {content.contacts.links.map((link) => (
                    <a
                      className="block break-words !text-[#0b6e99] hover:underline"
                      href={link.href}
                      key={`${link.label}-${link.href}`}
                      rel={link.external ? 'noreferrer' : undefined}
                      target={link.external ? '_blank' : undefined}
                    >
                      {link.href}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#d9d6d3] pt-4">
              <h3 className="mb-1 text-[20px] leading-none font-semibold text-[#A173BF]">
                Navigator
              </h3>
              <ul className="list-none space-y-1 p-0 text-[11px] leading-6 text-[#6f6e69]">
                {navigatorItems.map((item, index) => (
                  <li key={item.sectionId}>
                    <button
                      className="inline-flex w-full items-center gap-2 text-left text-[#6f6e69] hover:text-[#37352f]"
                      onClick={() => scrollToSectionStart(item.sectionId)}
                      type="button"
                    >
                      <span aria-hidden="true">○</span>
                      <span>{getNavigatorLabel(item.sectionId, item.label)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-11 pt-1">
            <article className="space-y-3.5">
              <h3 className="text-[20px] leading-none font-semibold text-[#A173BF]">
                {aboutTitle}
              </h3>
              <div className="h-px w-full bg-[#e6e3e1]" />
              <p className="mb-0 text-[12px] font-semibold text-[#37352f]">
                {content.about.description}
              </p>
              <div className="space-y-3 text-[12px] leading-[1.95] text-[#37352f]">
                {content.about.body.map((paragraph) => (
                  <p className="mb-0" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <article className="space-y-3.5">
              <h3 className="text-[19px] leading-none font-semibold text-[#A173BF]">
                Experience Overview
              </h3>
              <div className="h-px w-full bg-[#e6e3e1]" />
              {content.overview.totalExperienceText && (
                <p className="mb-0 text-[12px] font-semibold text-[#37352f]">
                  {content.overview.totalExperienceText}
                </p>
              )}
              <ul className="list-disc space-y-2.5 pl-5 text-[12px] leading-6 text-[#37352f]">
                {content.overview.companies.map((company) => (
                  <li key={`${company.company}-${company.period.start}`}>
                    {company.company} {company.role} {formatPeriod(company.period)}
                  </li>
                ))}
              </ul>
            </article>

            <article className="space-y-3.5">
              <h3 className="text-[19px] leading-none font-semibold text-[#A173BF]">Education</h3>
              <div className="h-px w-full bg-[#e6e3e1]" />
              <ul className="list-disc space-y-2.5 pl-5 text-[12px] leading-6 text-[#37352f]">
                {content.educationSummary.items.map((item) => (
                  <li key={`${item.name}-${item.periodText}`}>
                    {item.name} {item.periodText}
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
