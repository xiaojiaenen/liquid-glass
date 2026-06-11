import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export function GlassButton({
  children,
  onClick,
  variant = 'regular',
}: {
  children: React.ReactNode
  onClick?: () => void
  /** regular = 通透玻璃,prominent = 蓝色强调 */
  variant?: 'regular' | 'prominent'
}) {
  const prominent = variant === 'prominent'
  return (
    <LiquidGlass
      as="button"
      onClick={onClick}
      radius={999}
      bezelWidth={22}
      glassThickness={prominent ? 70 : 110}
      refractionScale={1.1}
      blur={0.2}
      saturate={1.2}
      tint={prominent ? 'rgba(10,132,255,0.45)' : 'rgba(255,255,255,0.04)'}
      style={{
        padding: '13px 28px',
        fontFamily: fontStack,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: '#fff',
      }}
    >
      {children}
    </LiquidGlass>
  )
}
