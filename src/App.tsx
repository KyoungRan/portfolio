// 앱 루트 컴포넌트: 실제 화면 구성은 app/router.tsx로 위임한다.
import { AppRouter } from '@/app/router'

function App() {
  return <AppRouter />
}

export default App
