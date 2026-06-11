import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'

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
      radius={radii.control}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
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
                transition: `opacity 0.2s ease, transform 0.2s ${spring.default}`,
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                if (!item.onClick) return
                e.currentTarget.style.opacity = '0.8'
              }}
              onMouseLeave={(e) => {
                if (!item.onClick) return
                e.currentTarget.style.opacity = i === items.length - 1 ? '0.9' : '0.45'
              }}
              onMouseDown={(e) => {
                if (!item.onClick) return
                e.currentTarget.style.transform = 'scale(0.95)'
              }}
              onMouseUp={(e) => {
                if (!item.onClick) return
                e.currentTarget.style.transform = 'scale(1)'
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
