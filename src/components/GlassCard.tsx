import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <LiquidGlass
      radius={40}
      bezelWidth={30}
      glassThickness={120}
      scale={45}
      blur={0.5}
      saturate={1.3}
      tint="rgba(255,255,255,0.06)"
      style={{ width: 320, padding: 28, flexDirection: 'column' }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
          {children}
        </p>
      </div>
    </LiquidGlass>
  )
}
