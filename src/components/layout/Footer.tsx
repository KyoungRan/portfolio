// Footer: 사이트 하단 공통 정보 영역
// Thank you 배너 + Contact 안내를 하단에 표시한다.
import { Container } from '@/components/layout/Container'

export function Footer() {
  return (
    <footer
      className="mt-16 bg-[linear-gradient(90deg,var(--hero-gradient-4)_0%,var(--hero-gradient-3)_33%,var(--hero-gradient-2)_66%,var(--hero-gradient-1)_100%)] text-(--hero-fg)"
      id="contact"
    >
      <Container>
        <span className="pb-7.5 pt-7.5 text-6xl block text-center leading-none font-display font-bold" style={{ paddingTop: "30px", marginTop: "50px" }}>
          Thank you
        </span>

        <div className="mt-7.5 flex w-full items-center justify-end text-[18px]">
          <p className="mb-0 text-[14px] tracking-tight">
            Copyright &copy; 2026. KANG KYOUNGRAN. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
