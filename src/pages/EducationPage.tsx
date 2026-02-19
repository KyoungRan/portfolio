// EducationPage: 교육/훈련 페이지 골격
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

export function EducationPage() {
  return (
    <Container as="main">
      <Section
        label="Education"
        title="교육 및 훈련"
        description="콜아웃 카드 기반 레이아웃을 다음 단계에서 연결합니다."
      >
        <p>교육 페이지 골격입니다.</p>
      </Section>
    </Container>
  )
}
