import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassBadgeProps {
  count?: number
  dot?: boolean
  children?: React.ReactNode
  color?: string
}

export function GlassBadge({ count, dot, children, color = 'rgba(255,59,48,0.95)' }: GlassBadgeProps) {
  const showBadge = dot || (count !== undefined && count > 0)

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      {showBadge && (
        <div style={{ position: 'absolute', top: -4, right: -4, zIndex: 1 }}>
          <LiquidGlass radius={dot ? 5 : count! > 9 ? 12 : 10} bezelWidth={10} glassThickness={38} refractionScale={0.618} blur={0.2} tint={color}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: dot ? 10 : 20, height: dot ? 10 : 20, padding: dot ? 0 : '0 6px' }}>
            {!dot && <span style={{ fontSize: 12, fontWeight: 600, fontFamily: fontStack, color: '#fff', lineHeight: 1 }}>{count! > 99 ? '99+' : count}</span>}
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
