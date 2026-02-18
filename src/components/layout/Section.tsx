// 페이지 내 섹션 단위 래퍼: 섹션 간격 + 선택적 헤더(라벨/타이틀/설명)
// DESIGN_SYSTEM.md 1.2절: SectionHeader + SectionBody 구조
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionProps {
    children: ReactNode
    className?: string
    id?: string
    label?: string
    title?: string
    description?: string
}

export function Section({ children, className, id, label, title, description }: SectionProps) {
    return (
        <section
            id={id}
            className={cn('py-[var(--space-section)]', className)}
        >
            {/* 섹션 헤더: label, title, description 중 하나라도 있으면 렌더 */}
            {(label || title || description) && (
                <div className="mb-[var(--space-2xl)]">
                    {label && (
                        <span
                            className="mb-[var(--space-sm)] block text-[var(--text-sm)] font-medium tracking-wide uppercase"
                            style={{ color: 'var(--accent)' }}
                        >
                            {label}
                        </span>
                    )}
                    {title && (
                        <h2
                            className="mb-[var(--space-sm)]"
                            style={{ color: 'var(--accent)' }}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p
                            className="text-[var(--text-lg)]"
                            style={{ color: 'var(--muted-fg)' }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* 섹션 본문 */}
            {children}
        </section>
    )
}
