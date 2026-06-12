import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassAvatarProps {
  src?: string
  alt?: string
  size?: number
  fallback?: string
}

export function GlassAvatar({ src, alt, size = 40, fallback }: GlassAvatarProps) {
  const { tints, textColors } = useGlassTheme()
  const initials = fallback || alt?.charAt(0) || '?'

  return (
    <LiquidGlass radius={size / 2} bezelWidth={size / 2} glassThickness={80} refractionScale={0.85} blur={0.4} tint={tints.card}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: size * 0.4, fontWeight: 600, fontFamily: fontStack, color: textColors.primary, textTransform: 'uppercase' }}>{initials}</span>
      )}
    </LiquidGlass>
  )
}
