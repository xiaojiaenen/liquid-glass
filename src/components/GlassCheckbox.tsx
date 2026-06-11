import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

/**
 * GlassCheckbox — macOS 风格圆角方形勾选框。
 * 选中时蓝色液态玻璃填充 + 白色勾号。
 */
export function GlassCheckbox({ checked: controlled, onChange, label }: GlassCheckboxProps) {
  const [internal, setInternal] = useState(false)
  const checked = controlled ?? internal

  const toggle = () => {
    if (controlled === undefined) setInternal(!checked)
    onChange?.(!checked)
  }

  const size = 20

  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
      onClick={toggle}
    >
      <LiquidGlass
        radius={5}
        bezelWidth={12}
        glassThickness={45}
        refractionScale={0.75}
        blur={0.25}
        tint={checked ? 'rgba(10,132,255,0.55)' : 'rgba(255,255,255,0.04)'}
        style={{
          width: size,
          height: size,
          transition: `all 0.2s ${spring.default}`,
        }}
      >
        <svg
          width="12"
          height="12"
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
