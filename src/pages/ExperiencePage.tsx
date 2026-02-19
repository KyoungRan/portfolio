// ExperiencePage: 경력 페이지 골격
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

export function ExperiencePage() {
  return (
    <Container as="main">
      <Section
        label="Experience"
        title="경력"
        description="회사 단위 섹션과 성과 요약을 배치합니다."
      >
        <p>경력 페이지 골격입니다.</p>
      </Section>
    </Container>
  )
}
