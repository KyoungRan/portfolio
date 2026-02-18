// 스타일 시스템 검증용 임시 화면
// 노션 포트폴리오 디자인(보라/라벤더 테마) 반영
// Phase 3에서 AppShell + 라우터로 교체 예정
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

function App() {
  return (
    <>
      {/* 히어로 배너 - 노션 상단 그라데이션 재현 */}
      <div
        className="flex flex-col items-center justify-center py-20 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
        }}
      >
        <h1
          className="mb-4 font-bold tracking-tight"
          style={{ fontSize: 'var(--text-display)' }}
        >
          AI Developer Portfolio
        </h1>
        <p className="text-lg opacity-90">
          견고한 개발 경험 위에 AI의 가능성을 쌓아 올립니다.
        </p>
      </div>

      <Container as="main">
        {/* 메인 타이틀 */}
        <Section>
          <h1 className="mb-4 text-center" style={{ fontSize: 'var(--text-4xl)' }}>
            AI Agent 개발자 강경란 포트폴리오
          </h1>
          {/* 콜아웃 */}
          <div
            className="mx-auto max-w-3xl rounded-[var(--radius-md)] p-5"
            style={{ backgroundColor: 'var(--callout-bg)' }}
          >
            <p style={{ color: 'var(--fg)' }}>
              복잡한 문제를 논리적인 시스템으로 설계하고 안정적으로 구현하는
              <strong> 견고한 시스템 설계 능력과 불확실한 환경에서의 문제 해결 능력</strong>을
              가진 강경란 입니다.
            </p>
          </div>
        </Section>

        {/* About Me - 보라색 섹션 제목 */}
        <Section
          title="About Me"
          description="'추상적인 목표'를 '동작하는 시스템'으로 만드는 아키텍트입니다."
        >
          <div className="space-y-4">
            <p>
              하드웨어 제어 시스템의 Perception-Action 루프 설계, 블록체인
              DApp의 복잡한 규칙 기반 아키텍처 구축, 동적인 게임 환경에서의 문제
              해결 경험은 저의 핵심 자산입니다.
            </p>
            <p>
              이러한 시스템 레벨의 통찰력을 바탕으로, <strong>LLM의 무한한 가능성을
                안정적이고 실용적인 AI 에이전트 서비스로 구현</strong>하고자 합니다.
            </p>
          </div>
        </Section>

        {/* 타이포 스케일 확인 */}
        <Section
          label="Typography"
          title="타이포그래피 스케일"
          description="각 레벨별 크기와 간격을 확인합니다."
        >
          <div className="space-y-4">
            <h1>H1 - 페이지 타이틀</h1>
            <h2>H2 - 섹션 타이틀</h2>
            <h3>H3 - 카드/서브섹션 타이틀</h3>
            <h4>H4 - 보조 타이틀</h4>
            <p>Body - 본문 텍스트입니다. 가독성과 정보 구조, 신뢰감을 우선합니다.</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-fg)' }}>
              Caption - 보조 텍스트 / 메타 정보
            </p>
          </div>
        </Section>

        {/* 카드 샘플 - 프로젝트 카드 */}
        <Section
          label="Projects"
          title="프로젝트"
          description="프로젝트 카드의 기본 스타일을 확인합니다."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Citrush AI', tags: ['AI Agent', 'RAG', 'Game'] },
              { name: 'Beauty Pulse AI', tags: ['AI', 'Data Pipeline', 'Web'] },
              { name: 'Portfolio Web', tags: ['React', 'TypeScript', 'Vite'] },
            ].map(({ name, tags }) => (
              <div
                key={name}
                className="cursor-pointer rounded-[var(--radius-lg)] border transition-all duration-[var(--transition-base)] hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: 'var(--space-lg)',
                }}
              >
                {/* 커버 이미지 플레이스홀더 */}
                <div
                  className="mb-4 rounded-[var(--radius-md)]"
                  style={{
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    height: '160px',
                    opacity: 0.15,
                  }}
                />
                <h3 className="mb-2" style={{ fontSize: 'var(--text-xl)' }}>
                  {name}
                </h3>
                <p style={{ color: 'var(--muted-fg)', fontSize: 'var(--text-sm)' }}>
                  프로젝트 요약 텍스트가 여기에 들어갑니다.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-0.5"
                      style={{
                        fontSize: 'var(--text-xs)',
                        backgroundColor: 'var(--tag-bg)',
                        color: 'var(--tag-fg)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 컬러 토큰 확인 */}
        <Section
          label="Tokens"
          title="컬러 토큰"
          description="노션 포트폴리오 기반 색상 토큰입니다."
        >
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'bg', var: '--bg' },
              { name: 'fg', var: '--fg' },
              { name: 'muted', var: '--muted' },
              { name: 'accent', var: '--accent' },
              { name: 'accent-light', var: '--accent-light' },
              { name: 'border', var: '--border' },
              { name: 'callout', var: '--callout-bg' },
              { name: 'tag-bg', var: '--tag-bg' },
              { name: 'tag-fg', var: '--tag-fg' },
              { name: 'gradient-start', var: '--gradient-start' },
              { name: 'gradient-mid', var: '--gradient-mid' },
              { name: 'gradient-end', var: '--gradient-end' },
            ].map(({ name, var: cssVar }) => (
              <div key={name} className="text-center">
                <div
                  className="mb-1 h-12 w-12 rounded-[var(--radius-md)] border"
                  style={{
                    backgroundColor: `var(${cssVar})`,
                    borderColor: 'var(--border)',
                  }}
                />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-fg)' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* 인터랙션 확인 */}
        <Section
          label="Interactive"
          title="인터랙션"
          description="호버, 포커스 링, 링크, 버튼 스타일을 확인합니다."
        >
          <div className="flex flex-wrap items-center gap-4">
            <a href="#sample">링크 스타일 예시</a>
            <button
              type="button"
              className="cursor-pointer rounded-[var(--radius-md)] border-none px-5 py-2.5 font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-fg)',
              }}
            >
              버튼 예시
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-[var(--radius-md)] border bg-transparent px-5 py-2.5 font-medium transition-colors"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
            >
              아웃라인 버튼
            </button>
          </div>
        </Section>

        {/* 푸터 */}
        <footer
          className="border-t py-8 text-center"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--muted-fg)',
            fontSize: 'var(--text-sm)',
          }}
        >
          2026 KyoungRan Kang. All rights reserved.
        </footer>
      </Container>
    </>
  )
}

export default App
