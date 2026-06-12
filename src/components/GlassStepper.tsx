import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassStepperProps {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export function GlassStepper({ min = 0, max = 100, step = 1, value: controlledValue, defaultValue = 0, onChange }: GlassStepperProps) {
  const { tints, textColors } = useGlassTheme()
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const current = isControlled ? controlledValue : internalValue
  const clamp = (v: number) => Math.max(min, Math.min(max, v))
  const change = (delta: number) => { const next = clamp(current + delta); if (isControlled) onChange?.(next); else { setInternalValue(next); onChange?.(next) } }

  const btnStyle: React.CSSProperties = { width: 36, height: 36, border: 'none', background: 'none', color: textColors.primary, fontSize: 20, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1, fontFamily: fontStack }

  return (
    <LiquidGlass radius={radii.control} bezelWidth={16} glassThickness={62} refractionScale={0.618} blur={0.35} tint={tints.control}
      style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: 0, padding: 2, fontFamily: fontStack }}>
      <button onClick={() => change(-step)} disabled={current <= min} aria-label="减少"
        style={{ ...btnStyle, opacity: current <= min ? 0.3 : 0.85, transition: `all 0.2s ${spring.default}`, borderRadius: 10 }}
        onMouseEnter={(e) => { if (current > min) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
        onMouseDown={(e) => { if (current > min) e.currentTarget.style.transform = 'scale(0.9)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>−</button>
      <span style={{ minWidth: 48, textAlign: 'center', fontSize: 16, fontWeight: 600, letterSpacing: -0.3, fontVariantNumeric: 'tabular-nums', color: textColors.primary, userSelect: 'none' }}>{current}</span>
      <button onClick={() => change(step)} disabled={current >= max} aria-label="增加"
        style={{ ...btnStyle, opacity: current >= max ? 0.3 : 0.85, transition: `all 0.2s ${spring.default}`, borderRadius: 10 }}
        onMouseEnter={(e) => { if (current < max) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
        onMouseDown={(e) => { if (current < max) e.currentTarget.style.transform = 'scale(0.9)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>+</button>
    </LiquidGlass>
  )
}
