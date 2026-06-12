import { spring } from '../lib/tokens'
import { LiquidGlass } from '../lib/LiquidGlass'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassProgressProps {
  percent: number
  color?: string
  height?: number
  width?: number | string
  showText?: boolean
}

export function GlassProgress({ percent, color, height = 6, width = '100%', showText = false }: GlassProgressProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const accentColor = color ?? colors.blue
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <div role="progressbar" aria-valuenow={Math.round(clamped)} aria-valuemin={0} aria-valuemax={100}
      style={{ width, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height, position: 'relative', borderRadius: height / 2, overflow: 'hidden' }}>
        <LiquidGlass radius={height / 2} bezelWidth={6} glassThickness={22} refractionScale={0.5} blur={0.15} tint={tints.muted}
          style={{ position: 'absolute', inset: 0, height }} />
        <LiquidGlass radius={height / 2} bezelWidth={6} glassThickness={22} refractionScale={0.5} blur={0.15} tint={`${accentColor}99`}
          style={{ position: 'absolute', left: 0, top: 0, width: `${clamped}%`, height, transition: `width 0.4s ${spring.gentle}` }} />
      </div>
      {showText && <span aria-hidden="true" style={{ fontSize: 13, color: textColors.secondary, minWidth: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{Math.round(clamped)}%</span>}
    </div>
  )
}
