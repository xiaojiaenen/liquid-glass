import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export function GlassCard({
  title,
  children,
  icon,
}: {
  title: string
  children: React.ReactNode
  icon?: string
}) {
  return (
    <LiquidGlass
      radius={28}
      bezelWidth={28}
      glassThickness={110}
      refractionScale={1}
      blur={0.5}
      saturate={1.25}
      tint="rgba(255,255,255,0.05)"
      style={{ width: 300, padding: 26, flexDirection: 'column' }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          fontFamily: fontStack,
        }}
      >
        {icon && (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.16)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3)',
            }}
          >
            {icon}
          </div>
        )}
        <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700, letterSpacing: -0.4 }}>
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.55,
            letterSpacing: -0.1,
            opacity: 0.82,
          }}
        >
          {children}
        </p>
      </div>
    </LiquidGlass>
  )
}
