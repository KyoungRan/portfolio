// Home의 AboutMe 섹션
// 텍스트 내용은 content/profile.json에서 읽어 UI와 콘텐츠 변경 지점을 분리한다.
import profile from '@/content/profile.json'
import { Section } from '@/components/layout/Section'

interface ProfileContent {
  about: {
    title: string
    description: string
    body: string[]
  }
}

export function AboutMeSection() {
  const content = profile as ProfileContent

  return (
    <Section
      id="about-me"
      title={content.about.title}
      description={content.about.description}
      className="w-full"
    >
      {/* 본문 폭을 한 단계 더 좁혀 긴 문장 가독성을 우선한다. */}
      <div className="w-full space-y-4">
        {content.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
