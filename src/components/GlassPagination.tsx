import { useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassPaginationProps {
  /** 总页数 */
  total: number
  /** 当前页（1-based） */
  current?: number
  /** 默认页 */
  defaultCurrent?: number
  /** 切换回调 */
  onChange?: (page: number) => void
  /** 上一页/下一页文字 */
  prevLabel?: ReactNode
  nextLabel?: ReactNode
}

/**
 * GlassPagination — 液态玻璃分页器。
 * 页码+上下翻页，选中态用液态玻璃块指示。
 */
export function GlassPagination({
  total,
  current: controlledCurrent,
  defaultCurrent = 1,
  onChange,
  prevLabel = '‹',
  nextLabel = '›',
}: GlassPaginationProps) {
  const [internal, setInternal] = useState(defaultCurrent)
  const current = Math.max(1, Math.min(total, controlledCurrent ?? internal))

  const go = (page: number) => {
    const p = Math.max(1, Math.min(total, page))
    if (controlledCurrent === undefined) setInternal(p)
    onChange?.(p)
  }

  // 显示页码策略：总页数少时全显示，多时显示首尾+两侧
  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (current > 3) pages.push('...')

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push('...')
    if (total > 1) pages.push(total)
    return pages
  }

  const pages = getPages()

  return (
    <LiquidGlass
      radius={12}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint="rgba(255,255,255,0.05)"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        padding: '4px 6px',
        fontFamily: fontStack,
      }}
    >
      {/* 上一页 */}
      <PageBtn onClick={() => go(current - 1)} disabled={current <= 1}>
        {prevLabel}
      </PageBtn>

      {/* 页码 */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`e${i}`} style={{ width: 32, textAlign: 'center', fontSize: 13, opacity: 0.3, userSelect: 'none' }}>
            …
          </span>
        ) : (
          <PageBtn
            key={page}
            active={page === current}
            onClick={() => go(page)}
          >
            {page}
          </PageBtn>
        ),
      )}

      {/* 下一页 */}
      <PageBtn onClick={() => go(current + 1)} disabled={current >= total}>
        {nextLabel}
      </PageBtn>
    </LiquidGlass>
  )
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
}: {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <div style={{ position: 'relative' }}>
      {active && (
        <LiquidGlass
          radius={8}
          bezelWidth={8}
          glassThickness={28}
          refractionScale={0.618}
          blur={0.15}
          tint="rgba(10,132,255,0.4)"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          position: 'relative',
          zIndex: 1,
          border: 'none',
          background: 'none',
          color: disabled ? 'rgba(255,255,255,0.2)' : active ? '#fff' : 'rgba(255,255,255,0.6)',
          cursor: disabled ? 'default' : 'pointer',
          width: 32,
          height: 32,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontStack,
          fontSize: 14,
          fontWeight: active ? 700 : 400,
          transition: `all 0.2s ${spring.default}`,
        }}
        onMouseEnter={(e) => { if (!disabled && !active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        onMouseLeave={(e) => { if (!disabled && !active) e.currentTarget.style.background = 'none' }}
      >
        {children}
      </button>
    </div>
  )
}
