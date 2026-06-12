import type { ReactNode, CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  time?: string
  icon?: string
  color?: string
  right?: ReactNode
}

export interface GlassTimelineProps {
  items: TimelineItem[]
  lineColor?: string
  compact?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassTimeline({ items, lineColor, compact = false, className = '', style }: GlassTimelineProps) {
  const { textColors, borderColors, colors } = useGlassTheme()
  const nodeSize = compact ? 8 : 12
  const separatorColor = lineColor ?? borderColors.separator

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', fontFamily: fontStack, ...style }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const color = item.color ?? colors.blue
        return (
          <div key={item.id} style={{ display: 'flex', gap: compact ? 12 : 16, position: 'relative', paddingBottom: isLast ? 0 : compact ? 16 : 24 }}>
            {item.time && <div style={{ width: 48, flexShrink: 0, textAlign: 'right', fontSize: compact ? 11 : 12, color: textColors.tertiary, paddingTop: compact ? 0 : 2 }}>{item.time}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: nodeSize, flexShrink: 0 }}>
              <LiquidGlass radius={nodeSize / 2} bezelWidth={6} glassThickness={20} refractionScale={0.618} blur={0.1} tint={`${color}66`}
                style={{ width: nodeSize, height: nodeSize, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                {item.icon && <span style={{ fontSize: compact ? 8 : 10 }}>{item.icon}</span>}
              </LiquidGlass>
              {!isLast && <div style={{ flex: 1, width: 1.5, background: separatorColor, marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingTop: compact ? 0 : 1 }}>
              <div style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: textColors.primary, letterSpacing: -0.2 }}>{item.title}</div>
              {item.description && <div style={{ fontSize: compact ? 12 : 13, color: textColors.secondary, marginTop: compact ? 2 : 4, lineHeight: 1.45 }}>{item.description}</div>}
              {item.right && <div style={{ marginTop: compact ? 4 : 8 }}>{item.right}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
