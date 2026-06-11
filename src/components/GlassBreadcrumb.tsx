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
      radius={14}
      bezelWidth={12}
      glassThickness={55}
      refractionScale={0.8}
      blur={0.2}
      tint="rgba(255,255,255,0.05)"
      style={{ padding: '8px 16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: fontStack, fontSize: 13 }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ opacity: 0.3, fontSize: 11 }}>/</span>}
            <span
              onClick={item.onClick}
              style={{
                color: '#fff',
                opacity: i === items.length - 1 ? 1 : 0.6,
                fontWeight: i === items.length - 1 ? 600 : 400,
                cursor: item.onClick ? 'pointer' : 'default',
                letterSpacing: -0.1,
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
