import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassAvatarProps {
  src?: string
  alt?: string
  size?: number
  fallback?: string
}

export function GlassAvatar({ src, alt, size = 44, fallback }: GlassAvatarProps) {
  const initials = fallback || alt?.charAt(0) || '?'

  return (
    <LiquidGlass
      radius={size / 2}
      bezelWidth={size / 2}
      glassThickness={50}
      refractionScale={0.8}
      blur={0.1}
      tint="rgba(255,255,255,0.1)"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <span
          style={{
            fontSize: size * 0.4,
            fontWeight: 600,
            fontFamily: fontStack,
            color: '#fff',
            textTransform: 'uppercase',
          }}
        >
          {initials}
        </span>
      )}
    </LiquidGlass>
  )
}
