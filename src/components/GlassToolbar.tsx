import type { ReactNode, CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassToolbarProps {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  glass?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassToolbar({ left, center, right, glass = true, className = '', style }: GlassToolbarProps) {
  const { tints } = useGlassTheme()

  const content = (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, padding: '0 12px', fontFamily: fontStack, gap: 8, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, flex: 1 }}>{left}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{center}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, flex: 1, justifyContent: 'flex-end' }}>{right}</div>
    </div>
  )

  if (!glass) return content

  return (
    <LiquidGlass radius={radii.control} bezelWidth={16} glassThickness={62} refractionScale={0.618} blur={0.35} tint={tints.control} style={{ width: '100%' }}>
      {content}
    </LiquidGlass>
  )
}

export interface GlassToolbarButtonProps {
  children?: ReactNode
  icon?: string
  label?: string
  onClick?: () => void
  bold?: boolean
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassToolbarButton({ children, icon, label, onClick, bold = false, disabled = false, className = '', style }: GlassToolbarButtonProps) {
  const { textColors } = useGlassTheme()
  return (
    <button onClick={onClick} disabled={disabled} className={className}
      style={{ border: 'none', background: 'none', color: disabled ? textColors.tertiary : textColors.primary, fontSize: 15, fontWeight: bold ? 600 : 400, fontFamily: fontStack, letterSpacing: -0.2, padding: '6px 10px', borderRadius: 8, cursor: disabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: `background 0.2s ease, transform 0.15s ${spring.default}`, ...style }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      {children ?? label}
    </button>
  )
}
