import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassInputProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  width?: number | string
}

export function GlassInput({
  placeholder,
  value: controlledValue,
  onChange,
  type = 'text',
  prefix,
  suffix,
  width,
}: GlassInputProps) {
  const [internal, setInternal] = useState('')
  const value = controlledValue ?? internal

  const handleChange = (v: string) => {
    if (controlledValue === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <LiquidGlass
      radius={12}
      bezelWidth={16}
      glassThickness={65}
      refractionScale={0.9}
      blur={0.2}
      tint="rgba(255,255,255,0.06)"
      style={{ width: width || 260, padding: '0 16px', height: 44 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {prefix && <span style={{ opacity: 0.5, flexShrink: 0, display: 'flex', fontSize: 16 }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#fff',
            fontFamily: fontStack,
            fontSize: 17,
            letterSpacing: -0.4,
            lineHeight: 1,
          }}
        />
        {suffix && <span style={{ opacity: 0.5, flexShrink: 0, display: 'flex', fontSize: 16 }}>{suffix}</span>}
      </div>
    </LiquidGlass>
  )
}
