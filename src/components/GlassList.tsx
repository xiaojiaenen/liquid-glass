import type { ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassListItem {
  icon?: string
  title: string
  subtitle?: string
  right?: ReactNode
  onClick?: () => void
}

export interface GlassListProps {
  items: GlassListItem[]
  width?: number | string
}

export function GlassList({ items, width = 320 }: GlassListProps) {
  const { tints, textColors, borderColors } = useGlassTheme()

  return (
    <LiquidGlass role="list" radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
      style={{ width, padding: 4, flexDirection: 'column' }}>
      {items.map((item, i) => (
        <div key={i} role="listitem" tabIndex={item.onClick ? 0 : undefined} onClick={item.onClick}
          onKeyDown={(e) => { if (item.onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); item.onClick() } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12,
            cursor: item.onClick ? 'pointer' : 'default',
            transition: `background 0.2s ${spring.default}`,
            borderBottom: i < items.length - 1 ? `1px solid ${borderColors.separator}` : 'none',
            outline: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          {item.icon && <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 400, fontFamily: fontStack, letterSpacing: -0.4, color: textColors.primary }}>{item.title}</div>
            {item.subtitle && <div style={{ fontSize: 15, fontFamily: fontStack, marginTop: 2, color: textColors.secondary }}>{item.subtitle}</div>}
          </div>
          {item.right && <div style={{ flexShrink: 0 }}>{item.right}</div>}
          {item.onClick && <span aria-hidden="true" style={{ opacity: 0.2, fontSize: 16, color: textColors.secondary }}>›</span>}
        </div>
      ))}
    </LiquidGlass>
  )
}
