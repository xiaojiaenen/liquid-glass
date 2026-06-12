import { useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassPaginationProps {
  total: number
  current?: number
  defaultCurrent?: number
  onChange?: (page: number) => void
  prevLabel?: ReactNode
  nextLabel?: ReactNode
}

export function GlassPagination({ total, current: controlledCurrent, defaultCurrent = 1, onChange, prevLabel = '‹', nextLabel = '›' }: GlassPaginationProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const [internal, setInternal] = useState(defaultCurrent)
  const current = Math.max(1, Math.min(total, controlledCurrent ?? internal))
  const go = (page: number) => { const p = Math.max(1, Math.min(total, page)); if (controlledCurrent === undefined) setInternal(p); onChange?.(p) }

  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (current > 3) pages.push('...')
    const start = Math.max(2, current - 1); const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    if (total > 1) pages.push(total)
    return pages
  }

  return (
    <LiquidGlass radius={12} bezelWidth={16} glassThickness={62} refractionScale={0.618} blur={0.35} tint={tints.control}
      style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: 2, padding: '4px 6px', fontFamily: fontStack }}>
      <PageBtn onClick={() => go(current - 1)} disabled={current <= 1} tints={tints} textColors={textColors} colors={colors}>{prevLabel}</PageBtn>
      {getPages().map((page, i) => page === '...' ? (
        <span key={`e${i}`} style={{ width: 32, textAlign: 'center', fontSize: 13, opacity: 0.3, userSelect: 'none', color: textColors.tertiary }}>…</span>
      ) : (
        <PageBtn key={page} active={page === current} onClick={() => go(page)} tints={tints} textColors={textColors} colors={colors}>{page}</PageBtn>
      ))}
      <PageBtn onClick={() => go(current + 1)} disabled={current >= total} tints={tints} textColors={textColors} colors={colors}>{nextLabel}</PageBtn>
    </LiquidGlass>
  )
}

function PageBtn({ children, active, disabled, onClick, textColors, colors }: { children: ReactNode; active?: boolean; disabled?: boolean; onClick?: () => void; tints: any; textColors: any; colors: any }) {
  return (
    <div style={{ position: 'relative' }}>
      {active && <LiquidGlass radius={8} bezelWidth={8} glassThickness={28} refractionScale={0.618} blur={0.15} tint={`${colors.blue}66`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />}
      <button onClick={onClick} disabled={disabled}
        style={{
          position: 'relative', zIndex: 1, border: 'none', background: 'none',
          color: disabled ? textColors.tertiary : active ? textColors.primary : textColors.secondary,
          cursor: disabled ? 'default' : 'pointer', width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontStack, fontSize: 15,
          fontWeight: active ? 700 : 400, transition: `all 0.2s ${spring.default}`,
        }}
        onMouseEnter={(e) => { if (!disabled && !active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}>
        {children}
      </button>
    </div>
  )
}
