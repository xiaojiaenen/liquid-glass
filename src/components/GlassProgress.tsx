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
  height = 6,
  width = '100%',
  showText = false,
}: GlassProgressProps) {
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <div style={{ width, display: 'flex', alignItems: 'center', gap: 10 }}>
      <LiquidGlass
        radius={height / 2}
        bezelWidth={3}
        glassThickness={20}
        refractionScale={0.5}
        blur={0.05}
        tint="rgba(255,255,255,0.08)"
        style={{ flex: 1, height, overflow: 'hidden' }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: height / 2,
            background: color,
            transition: 'width 0.3s ease',
          }}
        />
      </LiquidGlass>
      {showText && (
        <span style={{ fontSize: 13, color: '#fff', opacity: 0.6, minWidth: 32, textAlign: 'right' }}>
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  )
}
