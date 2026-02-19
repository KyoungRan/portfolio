// ProjectsPage: 카드 목록 영역 골격(Phase 4에서 콘텐츠 로더 연결 예정)
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

export function ProjectsPage() {
  return (
    <Container as="main">
      <Section
        label="Projects"
        title="프로젝트"
        description="카드 목록과 필터/정렬은 다음 단계에서 콘텐츠 모델과 연결됩니다."
      >
        <p>프로젝트 카드뷰 골격이 준비되었습니다.</p>
      </Section>
    </Container>
  )
}
