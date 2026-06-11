import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <LiquidGlass
      as="button"
      onClick={onClick}
      radius={26}
      bezelWidth={20}
      glassThickness={90}
      scale={30}
      blur={0}
      saturate={1.2}
      tint="rgba(255,255,255,0.1)"
      style={{ padding: '14px 30px', fontSize: 16, fontWeight: 600 }}
    >
      {children}
    </LiquidGlass>
  )
}
