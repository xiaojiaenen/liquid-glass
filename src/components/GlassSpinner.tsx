import { LiquidGlass } from '../lib/LiquidGlass'
import { spring, systemColors } from '../lib/tokens'

export interface GlassSpinnerProps {
  /** small | medium(default) | large */
  size?: 'small' | 'medium' | 'large'
  /** 颜色,默认 systemColors.blue */
  tint?: string
}

const sizeMap = {
  small: 18,
  medium: 28,
  large: 40,
}

const strokeMap = {
  small: 2.5,
  medium: 3,
  large: 4,
}

/**
 * GlassSpinner — 活动指示器。
 * 对标 UIActivityIndicatorView 的 circular style。
 * 使用旋转的 SVG 圆弧 + Apple spring 曲线做 easing。
 */
export function GlassSpinner({ size = 'medium', tint = systemColors.blue }: GlassSpinnerProps) {
  const px = sizeMap[size]
  const sw = strokeMap[size]

  return (
    <LiquidGlass
      radius={px / 2 + 2}
      bezelWidth={10}
      glassThickness={38}
      refractionScale={0.618}
      blur={0.2}
      tint="rgba(255,255,255,0.04)"
      style={{
        width: px + 8,
        height: px + 8,
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        style={{
          animation: 'lg-spinner-rotate 0.9s linear infinite',
        }}
      >
        <style>{`
          @keyframes lg-spinner-rotate {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <circle
          cx={px / 2}
          cy={px / 2}
          r={(px - sw) / 2}
          fill="none"
          stroke={tint}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${(Math.PI * (px - sw) * 0.7).toFixed(1)} ${(Math.PI * (px - sw) * 0.3).toFixed(1)}`}
          style={{
            animation: `lg-spinner-dash 1.1s ${spring.default} infinite`,
          }}
        />
        <style>{`
          @keyframes lg-spinner-dash {
            0% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: -${(Math.PI * (px - sw) * 0.5).toFixed(1)}; }
            100% { stroke-dashoffset: -${(Math.PI * (px - sw)).toFixed(1)}; }
          }
        `}</style>
      </svg>
    </LiquidGlass>
  )
}
