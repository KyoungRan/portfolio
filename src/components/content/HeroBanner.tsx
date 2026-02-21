// Home Hero: 대문 영역 전용 컴포넌트
// 스타일은 styles/hero.css로 분리해 App/Page 코드의 인라인 스타일을 제거한다.
export function HeroBanner() {
  return (
    <section
      className="hero-banner flex w-full flex-col items-center justify-center bg-[linear-gradient(90deg,var(--hero-gradient-1)_0%,var(--hero-gradient-2)_33%,var(--hero-gradient-3)_66%,var(--hero-gradient-4)_100%)] px-4 py-20 text-center md:py-28"
      style={{ marginBottom: '20px' }}
      aria-label="포트폴리오 소개"
    >
      <h1 className="hero-title">AI 개발자 강경란 포트폴리오</h1>
      <p className="hero-subtitle">견고한 개발 경험 위에 AI의 가능성을 쌓아 올립니다.</p>
    </section>
  )
}
