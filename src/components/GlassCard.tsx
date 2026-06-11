import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii } from '../lib/tokens'

export interface GlassCardProps {
  title: string
  children: React.ReactNode
  icon?: string
}

export function GlassCard({
  title,
  children,
  icon,
}: GlassCardProps) {
  return (
    <div
      style={{
        transition: `filter 0.25s ease`,
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)'
      }}
    >
    <LiquidGlass
      radius={radii.card}
      bezelWidth={26}
      glassThickness={100}
      refractionScale={0.618}
      blur={0.5}
      saturate={1.3}
      tint="rgba(255,255,255,0.03)"
      style={{ width: 300, padding: 20, flexDirection: 'column' }}
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
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
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
    </div>
  )
}
