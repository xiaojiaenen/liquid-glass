import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface DockItem {
  icon: string
  label: string
  grad: string
  onClick?: () => void
}

export interface DockProps {
  items?: DockItem[]
  onItemClick?: (item: DockItem, index: number) => void
}

const defaultItems: DockItem[] = [
  { icon: '🧭', label: 'Safari', grad: 'linear-gradient(160deg,#5ac8fa,#0a84ff)' },
  { icon: '📷', label: '照片', grad: 'linear-gradient(160deg,#ff9f0a,#ff375f)' },
  { icon: '🎵', label: '音乐', grad: 'linear-gradient(160deg,#ff375f,#bf5af2)' },
  { icon: '✉️', label: '邮件', grad: 'linear-gradient(160deg,#64d2ff,#0a84ff)' },
  { icon: '🗓️', label: '日历', grad: 'linear-gradient(160deg,#ff453a,#ff9f0a)' },
  { icon: '⚙️', label: '设置', grad: 'linear-gradient(160deg,#8e8e93,#48484a)' },
]

/**
 * Dock — macOS 风格 Dock。
 * 悬停放大效果 + 点击回调 + 主题感知。
 */
export function Dock({ items = defaultItems, onItemClick }: DockProps) {
  const { tints } = useGlassTheme()
  const [hover, setHover] = useState<number | null>(null)

  return (
    <LiquidGlass
      radius={26}
      bezelWidth={20}
      glassThickness={90}
      refractionScale={1.1}
      blur={0.2}
      saturate={1.2}
      tint={tints.control}
      style={{ padding: '10px 14px' }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        {items.map((app, i) => {
          const dist = hover === null ? 99 : Math.abs(hover - i)
          const lift = dist === 0 ? -14 : dist === 1 ? -6 : 0
          const sc = dist === 0 ? 1.32 : dist === 1 ? 1.12 : 1
          return (
            <div
              key={i}
              role="button"
              aria-label={app.label}
              tabIndex={0}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => { app.onClick?.(); onItemClick?.(app, i) }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); app.onClick?.(); onItemClick?.(app, i) } }}
              style={{
                width: 50,
                height: 50,
                display: 'grid',
                placeItems: 'center',
                fontSize: 26,
                borderRadius: 13,
                background: app.grad,
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.45), 0 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transform: `translateY(${lift}px) scale(${sc})`,
                transformOrigin: 'bottom center',
                transition: `transform 0.28s ${spring.default}`,
                outline: 'none',
              }}
            >
              {app.icon}
            </div>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
