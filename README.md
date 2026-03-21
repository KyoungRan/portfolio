# 강경란 포트폴리오 웹

배포 주소: `https://kyoungran.github.io/portfolio/`

강경란의 AI 에이전트, 데이터 분석, 예측 모델링 프로젝트를 소개하는 React + Vite 기반 포트폴리오 웹사이트입니다.  
프로젝트 목록, 상세 페이지, 경력, 기술, 교육, 기타 활동 섹션으로 구성되며, 콘텐츠는 JSON 기반으로 관리합니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## 로컬 실행

```bash
npm install
npm run dev
```

기본 개발 서버:

- `http://localhost:5173/`
- 포트 충돌 시 Vite가 다른 포트로 자동 변경할 수 있습니다.

## 주요 스크립트

- `npm run dev` : 개발 서버 실행
- `npm run validate:content` : 콘텐츠 JSON 검증
- `npm run build` : 프로덕션 빌드
- `npm run preview` : 빌드 결과 미리보기
- `npm run lint` : ESLint 실행
- `npm run format` : Prettier 포맷
- `npm run format:check` : 포맷 검사
- `npm run typecheck` : TypeScript 타입 검사

## 페이지 구성

- `/#/` : Home
- `/#/projects` : 프로젝트 목록
- `/#/projects/:slug` : 프로젝트 상세
- `/#/experience` : Experience
- `/#/skills` : Skills
- `/#/education` : Education & Training
- `/#/others` : Others

이 프로젝트는 해시 라우팅을 사용합니다. GitHub Pages 같은 정적 호스팅 환경에서 새로고침 404 이슈를 줄이기 위한 선택입니다.

## 콘텐츠 관리

주요 콘텐츠 위치:

- `src/content/site.json`
- `src/content/profile.json`
- `src/content/experience.json`
- `src/content/skills.json`
- `src/content/education.json`
- `src/content/others.json`
- `src/content/projects/*.json`

프로젝트 이미지 위치:

- `public/assets/projects/<slug>/cover.*`
- `public/assets/projects/<slug>/visuals/*`

새 프로젝트를 추가할 때는 보통 아래 2가지를 같이 수정합니다.

1. `src/content/projects/<slug>.json`
2. `public/assets/projects/<slug>/...`

## 프로젝트 구조

```text
src/
  app/                  앱 셸, 라우터
  components/           공통 UI / 레이아웃 컴포넌트
  content/              사이트/프로필/프로젝트 콘텐츠 SSOT
  features/             도메인별 기능
  pages/                라우트 단위 페이지
  styles/               전역 스타일 / 토큰

public/assets/
  projects/             프로젝트별 커버/시각 자료
```

## 배포

이 저장소는 GitHub Pages 배포를 기준으로 운영합니다.

일반적인 흐름:

1. 작업 브랜치에서 수정
2. 검토 후 `main`에 머지
3. `main` 기준으로 GitHub Actions 배포

배포 전 확인할 것:

- `vite.config.ts`의 `base`가 저장소 경로와 일치하는지 확인
- `npm run build`가 정상 동작하는지 확인
- 이미지 경로와 해시 라우팅 링크가 깨지지 않는지 확인
