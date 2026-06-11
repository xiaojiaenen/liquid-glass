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

  // 苹果风格:圆形勾选框
  const size = 24

  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
      onClick={toggle}
    >
      <LiquidGlass
        radius={size / 2}
        bezelWidth={8}
        glassThickness={35}
        refractionScale={0.7}
        blur={0.1}
        tint={checked ? 'rgba(10,132,255,0.6)' : 'rgba(255,255,255,0.06)'}
        style={{
          width: size,
          height: size,
          transition: `all 0.2s ${spring.default}`,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            opacity: checked ? 1 : 0,
            transform: `scale(${checked ? 1 : 0.5})`,
            transition: `all 0.15s ${spring.default}`,
          }}
        >
          <path
            d="M3 7L6 10L11 4"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </LiquidGlass>
      {label && (
        <span style={{ fontSize: 17, fontFamily: fontStack, color: '#fff', letterSpacing: -0.4 }}>{label}</span>
      )}
    </label>
  )
}
