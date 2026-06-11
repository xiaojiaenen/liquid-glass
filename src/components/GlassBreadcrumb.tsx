import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface GlassBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function GlassBreadcrumb({ items }: GlassBreadcrumbProps) {
  return (
    <LiquidGlass
      radius={10}
      bezelWidth={10}
      glassThickness={45}
      refractionScale={0.7}
      blur={0.15}
      tint="rgba(255,255,255,0.05)"
      style={{ padding: '6px 14px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: fontStack, fontSize: 13 }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <span style={{ opacity: 0.25, fontSize: 10 }}>›</span>}
            <span
              onClick={item.onClick}
              style={{
                color: '#fff',
                opacity: i === items.length - 1 ? 0.9 : 0.45,
                fontWeight: i === items.length - 1 ? 600 : 400,
                cursor: item.onClick ? 'pointer' : 'default',
                letterSpacing: -0.2,
              }}
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </LiquidGlass>
  )
}
