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
  width?: number
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
      radius={14}
      bezelWidth={18}
      glassThickness={70}
      refractionScale={0.9}
      blur={0.2}
      tint="rgba(255,255,255,0.06)"
      style={{ width: width || 260, padding: '0 14px', height: 40 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {prefix && <span style={{ opacity: 0.6, flexShrink: 0, display: 'flex' }}>{prefix}</span>}
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
            fontSize: 14,
            letterSpacing: -0.1,
          }}
        />
        {suffix && <span style={{ opacity: 0.6, flexShrink: 0, display: 'flex' }}>{suffix}</span>}
      </div>
    </LiquidGlass>
  )
}
