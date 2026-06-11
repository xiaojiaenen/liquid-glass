import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

export function GlassCheckbox({ checked: controlled, onChange, label }: GlassCheckboxProps) {
  const [internal, setInternal] = useState(false)
  const checked = controlled ?? internal

  const toggle = () => {
    if (controlled === undefined) setInternal(!checked)
    onChange?.(!checked)
  }

  const size = 22

  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
      onClick={toggle}
    >
      <LiquidGlass
        radius={7}
        bezelWidth={8}
        glassThickness={40}
        refractionScale={0.8}
        blur={0.1}
        tint={checked ? 'rgba(10,132,255,0.5)' : 'rgba(255,255,255,0.06)'}
        style={{
          width: size,
          height: size,
          transition: `all 0.25s ${spring.default}`,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            opacity: checked ? 1 : 0,
            transform: `scale(${checked ? 1 : 0.5})`,
            transition: `all 0.2s ${spring.default}`,
            lineHeight: 1,
          }}
        >
          ✓
        </span>
      </LiquidGlass>
      {label && (
        <span style={{ fontSize: 14, fontFamily: fontStack, color: '#fff' }}>{label}</span>
      )}
    </label>
  )
}
