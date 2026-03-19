// 이 파일은 현재 경로의 모듈을 정의한다.
// 주요 책임: 파일 내부에 선언된 컴포넌트/유틸을 구성한다.
// 변경 시 외부 의존성과 사용처를 함께 확인한다.
export const SECTION_TITLE_STYLE = {
  color: '#A173BF',
  fontSize: '26px',
  fontWeight: 800,
  letterSpacing: '-0.02em',
} as const

export const SECTION_DIVIDER_SPACING_STYLE = {
  paddingTop: '5px',
  paddingBottom: '10px',
} as const

export const SECTION_DIVIDER_LINE_CLASS_NAME = 'h-[1px] w-full bg-[#e1dfdd]'
