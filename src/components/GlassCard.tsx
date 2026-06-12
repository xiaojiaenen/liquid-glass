import type { ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassCardProps {
  title: string
  children: ReactNode
  icon?: string
  interactive?: boolean
  onClick?: () => void
  width?: number | string
}

export function GlassCard({ title, children, icon, interactive = false, onClick, width }: GlassCardProps) {
  const { tints, textColors } = useGlassTheme()
  const Tag = interactive ? 'button' : 'div'

  return (
    <Tag role={interactive ? 'button' : undefined} onClick={interactive ? onClick : undefined}
      style={{ transition: `filter 0.25s ${spring.default}, transform 0.2s ${spring.default}`, cursor: interactive ? 'pointer' : 'default', border: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', width: width ?? 'auto' }}>
      <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} saturate={1.3} tint={tints.card}
        style={{ width: width ? '100%' : 300, padding: 20, flexDirection: 'column' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: fontStack }}>
          {icon && <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 22 }}>{icon}</div>}
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.4, color: textColors.primary }}>{title}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, letterSpacing: -0.1, color: textColors.secondary }}>{children}</p>
        </div>
      </LiquidGlass>
    </Tag>
  )
}
