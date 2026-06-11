import { LiquidGlass } from '../lib/LiquidGlass'
import { systemColors } from '../lib/tokens'

export interface GlassProgressProps {
  percent: number
  color?: string
  height?: number
  width?: number | string
  showText?: boolean
}

export function GlassProgress({
  percent,
  color = systemColors.blue,
  height = 8,
  width = '100%',
  showText = false,
}: GlassProgressProps) {
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <div style={{ width, display: 'flex', alignItems: 'center', gap: 10 }}>
      <LiquidGlass
        radius={height / 2}
        bezelWidth={4}
        glassThickness={25}
        refractionScale={0.6}
        blur={0.1}
        tint="rgba(255,255,255,0.06)"
        style={{ flex: 1, height, overflow: 'hidden' }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: height / 2,
            background: color,
            transition: 'width 0.4s ease',
          }}
        />
      </LiquidGlass>
      {showText && (
        <span style={{ fontSize: 12, color: '#fff', opacity: 0.7, minWidth: 32, textAlign: 'right' }}>
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  )
}
