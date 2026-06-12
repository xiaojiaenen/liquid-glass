import { useState, useId } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassRadioOption {
  label: string
  value: string
}

export interface GlassRadioProps {
  options: GlassRadioOption[]
  value?: string
  onChange?: (value: string) => void
}

export function GlassRadio({ options, value: controlled, onChange }: GlassRadioProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const [internal, setInternal] = useState(options[0]?.value ?? '')
  const selected = controlled ?? internal
  const name = useId()
  const select = (v: string) => { if (controlled === undefined) setInternal(v); onChange?.(v) }
  const size = 24

  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {options.map((opt) => {
        const isActive = selected === opt.value
        return (
          <label key={opt.value} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
            <input type="radio" name={name} value={opt.value} checked={isActive} onChange={() => select(opt.value)}
              style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }} />
            <LiquidGlass role="radio" aria-checked={isActive} radius={size / 2} bezelWidth={14} glassThickness={50} refractionScale={0.8} blur={0.3}
              tint={isActive ? `${colors.blue}99` : tints.muted}
              style={{ width: size, height: size, transition: `all 0.2s ${spring.default}` }}>
              <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff', opacity: isActive ? 1 : 0, transform: `scale(${isActive ? 1 : 0.3})`, transition: `all 0.15s ${spring.default}` }} />
            </LiquidGlass>
            <span style={{ fontSize: 17, fontFamily: fontStack, color: textColors.primary, letterSpacing: -0.4 }}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}
