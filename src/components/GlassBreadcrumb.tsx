import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface GlassBreadcrumbProps {
  items: BreadcrumbItem[]
}

/**
 * GlassBreadcrumb — 液态玻璃面包屑导航。
 * 对标 macOS Finder 路径栏 / SwiftUI .navigationTitle。
 * 使用 GlassIcon chevron + 主题感知。
 */
export function GlassBreadcrumb({ items }: GlassBreadcrumbProps) {
  const { tints, textColors } = useGlassTheme()

  return (
    <LiquidGlass
      role="navigation"
      aria-label="Breadcrumb"
      radius={radii.control}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint={tints.control}
      style={{ padding: '6px 14px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: fontStack, fontSize: 15 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && (
                <span aria-hidden="true">
                  <GlassIcon name="chevron_right" size="small" color={textColors.tertiary} />
                </span>
              )}
              <span
                onClick={isLast ? undefined : item.onClick}
                role={isLast ? undefined : 'link'}
                tabIndex={isLast || !item.onClick ? undefined : 0}
                onKeyDown={(e) => {
                  if (!isLast && item.onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    item.onClick()
                  }
                }}
                style={{
                  color: textColors.primary,
                  opacity: isLast ? 0.9 : 0.55,
                  fontWeight: isLast ? 600 : 400,
                  cursor: isLast || !item.onClick ? 'default' : 'pointer',
                  letterSpacing: -0.2,
                  transition: `opacity 0.2s ${spring.default}, transform 0.15s ${spring.default}`,
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  if (!isLast && item.onClick) e.currentTarget.style.opacity = '0.85'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = isLast ? '0.9' : '0.55'
                }}
                onMouseDown={(e) => {
                  if (!isLast && item.onClick) e.currentTarget.style.transform = 'scale(0.95)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {item.label}
              </span>
            </span>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
