import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassListItem {
  icon?: string
  title: string
  subtitle?: string
  right?: React.ReactNode
  onClick?: () => void
}

export interface GlassListProps {
  items: GlassListItem[]
  width?: number
}

export function GlassList({ items, width = 320 }: GlassListProps) {
  return (
    <LiquidGlass
      radius={22}
      bezelWidth={24}
      glassThickness={100}
      refractionScale={0.95}
      blur={0.3}
      tint="rgba(255,255,255,0.05)"
      style={{ width, padding: 6, flexDirection: 'column' }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            borderRadius: 14,
            cursor: item.onClick ? 'pointer' : 'default',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {item.icon && <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 500, fontFamily: fontStack, letterSpacing: -0.2 }}>{item.title}</div>
            {item.subtitle && (
              <div style={{ fontSize: 12, opacity: 0.5, fontFamily: fontStack, marginTop: 2 }}>{item.subtitle}</div>
            )}
          </div>
          {item.right && <div style={{ flexShrink: 0 }}>{item.right}</div>}
          {item.onClick && <span style={{ opacity: 0.3, fontSize: 12 }}>›</span>}
        </div>
      ))}
    </LiquidGlass>
  )
}
