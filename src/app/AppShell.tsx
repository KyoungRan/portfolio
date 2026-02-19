// AppShell: 사이트 공통 프레임(Header/Main/Footer)
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { BackToTopFab } from '@/components/layout/BackToTopFab'
import type { StaticRoutePath } from '@/app/routes'

interface AppShellProps {
  children: ReactNode
  currentPath: StaticRoutePath
  isProjectDetail: boolean
}

export function AppShell({ children, currentPath, isProjectDetail }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header currentPath={currentPath} isProjectDetail={isProjectDetail} />
      <main>{children}</main>
      <Footer />
      <BackToTopFab />
    </div>
  )
}
