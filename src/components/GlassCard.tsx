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
      radius={32}
      bezel={20}
      strength={1.4}
      blur={0.5}
      tint="rgba(255,255,255,0.1)"
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
