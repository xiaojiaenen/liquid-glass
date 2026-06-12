import { useState, useId } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function GlassCheckbox({ checked: controlled, onChange, label, disabled = false }: GlassCheckboxProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const [internal, setInternal] = useState(false)
  const checked = controlled ?? internal
  const inputId = useId()
  const toggle = () => { if (disabled) return; if (controlled === undefined) setInternal(!checked); onChange?.(!checked) }
  const size = 20

  return (
    <label htmlFor={inputId} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'default' : 'pointer', userSelect: 'none', opacity: disabled ? 0.4 : 1 }}>
      <input id={inputId} type="checkbox" checked={checked} disabled={disabled} onChange={toggle}
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }} />
      <LiquidGlass role="checkbox" aria-checked={checked} radius={5} bezelWidth={12} glassThickness={45} refractionScale={0.75} blur={0.25}
        tint={checked ? `${colors.blue}8c` : tints.muted}
        style={{ width: size, height: size, transition: `all 0.2s ${spring.default}` }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"
          style={{ opacity: checked ? 1 : 0, transform: `scale(${checked ? 1 : 0.5})`, transition: `all 0.15s ${spring.default}` }}>
          <path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </LiquidGlass>
      {label && <span style={{ fontSize: 17, fontFamily: fontStack, color: textColors.primary, letterSpacing: -0.4 }}>{label}</span>}
    </label>
  )
}
