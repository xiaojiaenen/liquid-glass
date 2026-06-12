import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassTagProps {
  children: React.ReactNode
  color?: string
  closable?: boolean
  onClose?: () => void
}

export function GlassTag({ children, color, closable, onClose }: GlassTagProps) {
  const { tints, textColors } = useGlassTheme()
  const tagColor = color ?? tints.control

  return (
    <LiquidGlass radius={8} bezelWidth={10} glassThickness={38} refractionScale={0.618} blur={0.2} tint={tagColor} style={{ padding: '4px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 13, fontFamily: fontStack, fontWeight: 500, letterSpacing: -0.2, color: textColors.primary }}>{children}</span>
        {closable && (
          <button onClick={(e) => { e.stopPropagation(); onClose?.() }}
            style={{ border: 'none', background: 'none', color: textColors.secondary, fontSize: 11, cursor: 'pointer', padding: 0, opacity: 0.5, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
