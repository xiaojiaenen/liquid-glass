import { LiquidGlass } from '../lib/LiquidGlass'
import { systemColors } from '../lib/tokens'

export interface GlassProgressProps {
  percent: number
  color?: string
  height?: number
  width?: number | string
  showText?: boolean
}

/**
 * GlassProgress — 液态玻璃进度条。
 * 轨道是液态玻璃容器，填充条也是液态玻璃。
 */
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
      <div style={{ flex: 1, height, position: 'relative', borderRadius: height / 2, overflow: 'hidden' }}>
        {/* 轨道 */}
        <LiquidGlass
          radius={height / 2}
          bezelWidth={6}
          glassThickness={22}
          refractionScale={0.5}
          blur={0.15}
          tint="rgba(255,255,255,0.06)"
          style={{
            position: 'absolute',
            inset: 0,
            height,
          }}
        />
        {/* 填充条 — 液态玻璃 */}
        <LiquidGlass
          radius={height / 2}
          bezelWidth={6}
          glassThickness={22}
          refractionScale={0.5}
          blur={0.15}
          tint={`${color}99`}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${clamped}%`,
            height,
            transition: `width 0.4s ${'cubic-bezier(0.34, 1.56, 0.64, 1)'}`,
          }}
        />
      </div>
      {showText && (
        <span style={{ fontSize: 13, color: '#fff', opacity: 0.6, minWidth: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  )
}
