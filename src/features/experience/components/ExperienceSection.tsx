// Home의 Experience 섹션
// 내용은 content/experience.json에서 읽어 텍스트 수정 시 코드 변경을 줄인다.
import experience from '@/content/experience.json'
import { Section } from '@/components/layout/Section'

interface ExperienceContent {
  title: string
  summary: string
}

export function ExperienceSection() {
  const content = experience as ExperienceContent

  return (
    <Section id="experience" title={content.title} className="w-full">
      <p className="w-full">{content.summary}</p>
    </Section>
  )
}
