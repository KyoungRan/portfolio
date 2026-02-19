// Home의 AboutMe 섹션
// 노션 상단 구조(프로필/연락처/내비게이터 + 소개/요약)를 단일 섹션으로 구성한다.
import profile from '@/content/profile.json'
import site from '@/content/site.json'
import resumePhoto from '@/assets/profile/resume-photo.jpg'
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

export function AboutMeSection() {
  const content = profile as ProfileContent
  const navContent = site as SiteContent
  const navigatorItems = navContent.nav.items.filter((item) => item.sectionId !== 'about-me')
  const profileImageSrc =
    content.profileImageSrc && content.profileImageSrc.trim().length > 0
      ? content.profileImageSrc
      : resumePhoto

  return (
    <Section id="about-me" className="w-full">
      <div className="w-full space-y-6">
        <h2 className="text-[clamp(1.9rem,4vw,2.6rem)] text-[var(--fg)]">
          {content.roleTitle} {content.name} 포트폴리오
        </h2>

        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="mb-0 text-[var(--fg)]">{content.headline}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <img
              alt={`${content.name} 프로필 사진`}
              className="h-auto w-full rounded-[var(--radius-sm)] border border-[var(--border)] object-cover"
              loading="lazy"
              src={profileImageSrc}
            />

            <div className="space-y-2">
              <h3 className="mb-0 text-[var(--hero-gradient-1)] text-[var(--text-2xl)]">
                {content.name}
              </h3>

              {content.contacts.phone && (
                <p className="mb-0 text-[var(--fg)] text-[var(--text-base)]">
                  {content.contacts.phone}
                </p>
              )}

              {content.contacts.email && (
                <a
                  className="block text-[var(--fg)] text-[var(--text-base)] hover:text-[var(--accent)]"
                  href={`mailto:${content.contacts.email}`}
                >
                  {content.contacts.email}
                </a>
              )}

              {content.contacts.links.map((link) => (
                <a
                  className="block text-[var(--muted-fg)] text-[var(--text-base)] underline"
                  href={link.href}
                  key={`${link.label}-${link.href}`}
                  rel={link.external ? 'noreferrer' : undefined}
                  target={link.external ? '_blank' : undefined}
                >
                  {link.href}
                </a>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-5">
              <h3 className="mb-4 text-[var(--hero-gradient-1)] text-[var(--text-2xl)]">
                Navigator
              </h3>
              <ul className="list-none space-y-2 p-0">
                {navigatorItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      className="inline-flex items-center gap-2 text-[var(--muted-fg)] text-[var(--text-lg)] hover:text-[var(--accent)]"
                      onClick={() => scrollToSectionStart(item.sectionId)}
                      type="button"
                    >
                      <span aria-hidden="true">◎</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-7">
            <article>
              <h3 className="mb-3 text-[var(--hero-gradient-1)] text-[var(--text-3xl)]">
                {content.about.title}
              </h3>
              <p className="mb-4 font-semibold text-[var(--fg)]">{content.about.description}</p>
              <div className="space-y-3">
                {content.about.body.map((paragraph) => (
                  <p className="mb-0 text-[var(--fg)]" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <article>
              <h3 className="mb-3 text-[var(--hero-gradient-1)] text-[var(--text-3xl)]">
                Experience Overview
              </h3>
              {content.overview.totalExperienceText && (
                <p className="mb-3 font-semibold text-[var(--fg)]">
                  {content.overview.totalExperienceText}
                </p>
              )}
              <ul className="space-y-2">
                {content.overview.companies.map((company) => (
                  <li
                    key={`${company.company}-${company.period.start}`}
                    className="text-[var(--fg)]"
                  >
                    {company.company} {company.role} {formatPeriod(company.period)}
                  </li>
                ))}
              </ul>
            </article>

            <article>
              <h3 className="mb-3 text-[var(--hero-gradient-1)] text-[var(--text-3xl)]">
                Education
              </h3>
              <ul className="space-y-2">
                {content.educationSummary.items.map((item) => (
                  <li key={`${item.name}-${item.periodText}`} className="text-[var(--fg)]">
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
