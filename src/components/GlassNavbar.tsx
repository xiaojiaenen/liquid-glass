import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassNavbarProps {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
  onBack?: () => void
}

export function GlassNavbar({ title, left, right, onBack }: GlassNavbarProps) {
  const { tints, textColors, colors } = useGlassTheme()

  return (
    <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
      style={{ width: '100%', padding: '0 16px', height: 44 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ minWidth: 60, display: 'flex', alignItems: 'center' }}>
          {left || (onBack && (
            <button onClick={onBack}
              style={{ border: 'none', background: 'none', color: colors.blue, fontSize: 17, cursor: 'pointer', padding: 0, fontFamily: fontStack, fontWeight: 400, letterSpacing: -0.4, transition: `opacity 0.2s ease, transform 0.15s ${spring.default}` }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
              ‹ 返回
            </button>
          ))}
        </div>
        <h1 style={{ margin: 0, fontSize: 17, fontWeight: 600, fontFamily: fontStack, letterSpacing: -0.4, textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: textColors.primary }}>{title}</h1>
        <div style={{ minWidth: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
      </div>
    </LiquidGlass>
  )
}
