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
      radius={22}
      bezel={11}
      strength={1.1}
      blur={1}
      tint="rgba(255,255,255,0.14)"
      style={{ padding: '12px 26px', fontSize: 16, fontWeight: 600 }}
    >
      {children}
    </LiquidGlass>
  )
}
