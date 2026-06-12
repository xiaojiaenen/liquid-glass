import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassEmptyStateProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export function GlassEmptyState({ icon, title, subtitle, actionLabel, onAction }: GlassEmptyStateProps) {
  const { tints, textColors, colors } = useGlassTheme()

  return (
    <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
      style={{ width: 320, padding: '48px 28px', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontFamily: fontStack }}>
      {icon && <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 16, opacity: 0.8 }}>{icon}</div>}
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.3, color: textColors.primary }}>{title}</h3>
      {subtitle && <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.5, color: textColors.secondary, maxWidth: 240 }}>{subtitle}</p>}
      {actionLabel && onAction && (
        <div style={{ marginTop: 24, transition: `transform 0.2s ${spring.default}` }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
          <button onClick={onAction}
            style={{
              border: 'none', borderRadius: radii.pill, padding: '10px 24px',
              background: `${colors.blue}40`, color: textColors.primary, fontSize: 15,
              fontWeight: 600, fontFamily: fontStack, letterSpacing: -0.2, cursor: 'pointer',
              transition: `background 0.25s ${spring.default}, transform 0.2s ${spring.default}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.blue}60` }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${colors.blue}40` }}>
            {actionLabel}
          </button>
        </div>
      )}
    </LiquidGlass>
  )
}
