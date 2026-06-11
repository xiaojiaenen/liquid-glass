import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  /** regular = 通透玻璃,prominent = 蓝色强调 */
  variant?: 'regular' | 'prominent'
  /** default = 标准,small = 小号 */
  size?: 'default' | 'small'
}

export function GlassButton({
  children,
  onClick,
  variant = 'regular',
  size = 'default',
}: GlassButtonProps) {
  const prominent = variant === 'prominent'
  const isSmall = size === 'small'
  const h = isSmall ? 34 : 50
  const px = isSmall ? 18 : 24
  const fs = isSmall ? 14 : 17

  return (
    <LiquidGlass
      as="button"
      onClick={onClick}
      radius={h / 2}
      bezelWidth={isSmall ? 20 : 26}
      glassThickness={prominent ? 80 : 120}
      refractionScale={1}
      blur={0.5}
      saturate={1.3}
      tint={prominent ? 'rgba(10,132,255,0.45)' : 'rgba(255,255,255,0.04)'}
      style={{
        height: h,
        padding: `0 ${px}px`,
        fontFamily: fontStack,
        fontSize: fs,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: '#fff',
      }}
    >
      {children}
    </LiquidGlass>
  )
}
