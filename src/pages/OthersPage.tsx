// OthersPage: 기타 활동 페이지 골격
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

export function OthersPage() {
  return (
    <Container as="main">
      <Section
        label="Others"
        title="기타 활동"
        description="기간/활동 표 렌더를 연결할 예정입니다."
        className="mb-[30px]"
      >
        <p>기타 활동 페이지 골격입니다.</p>
      </Section>
    </Container>
  )
}
