import type { ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'regular' | 'prominent'
  size?: 'default' | 'small'
  disabled?: boolean
  'aria-label'?: string
}

export function GlassButton({ children, onClick, variant = 'regular', size = 'default', disabled = false, 'aria-label': ariaLabel }: GlassButtonProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const prominent = variant === 'prominent'
  const isSmall = size === 'small'
  const h = isSmall ? 34 : 50
  const px = isSmall ? 18 : 24
  const fs = isSmall ? 15 : 17

  return (
    <LiquidGlass
      as="button" onClick={onClick} disabled={disabled}
      radius={h / 2} bezelWidth={prominent ? 14 : 16} glassThickness={prominent ? 50 : 62}
      refractionScale={0.618} blur={0.35} saturate={1.3}
      tint={prominent ? `${colors.blue}73` : tints.control}
      aria-label={ariaLabel}
      style={{ height: h, padding: `0 ${px}px`, fontFamily: fontStack, fontSize: fs, fontWeight: 600, letterSpacing: -0.2, color: textColors.primary }}
    >
      {children}
    </LiquidGlass>
  )
}
