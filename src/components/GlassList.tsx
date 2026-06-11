import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassListItem {
  icon?: string
  title: string
  subtitle?: string
  right?: React.ReactNode
  onClick?: () => void
}

export interface GlassListProps {
  items: GlassListItem[]
  width?: number | string
}

export function GlassList({ items, width = 320 }: GlassListProps) {
  return (
    <LiquidGlass
      radius={16}
      bezelWidth={24}
      glassThickness={90}
      refractionScale={0.9}
      blur={0.5}
      tint="rgba(255,255,255,0.05)"
      style={{ width, padding: 4, flexDirection: 'column' }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 12,
            cursor: item.onClick ? 'pointer' : 'default',
            transition: `background 0.2s ${spring.default}`,
            borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {item.icon && <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 400, fontFamily: fontStack, letterSpacing: -0.4 }}>{item.title}</div>
            {item.subtitle && (
              <div style={{ fontSize: 13, opacity: 0.4, fontFamily: fontStack, marginTop: 2 }}>{item.subtitle}</div>
            )}
          </div>
          {item.right && <div style={{ flexShrink: 0 }}>{item.right}</div>}
          {item.onClick && <span style={{ opacity: 0.2, fontSize: 16 }}>›</span>}
        </div>
      ))}
    </LiquidGlass>
  )
}
