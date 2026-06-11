import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

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
  const [internal, setInternal] = useState(options[0]?.value ?? '')
  const selected = controlled ?? internal

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  const size = 22

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {options.map((opt) => {
        const isActive = selected === opt.value
        return (
          <label
            key={opt.value}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
            onClick={() => select(opt.value)}
          >
            <LiquidGlass
              radius={size / 2}
              bezelWidth={8}
              glassThickness={40}
              refractionScale={0.8}
              blur={0.1}
              tint={isActive ? 'rgba(10,132,255,0.5)' : 'rgba(255,255,255,0.06)'}
              style={{
                width: size,
                height: size,
                transition: `all 0.25s ${spring.default}`,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0.3})`,
                  transition: `all 0.2s ${spring.default}`,
                }}
              />
            </LiquidGlass>
            <span style={{ fontSize: 14, fontFamily: fontStack, color: '#fff' }}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}
