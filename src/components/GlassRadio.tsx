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

  // 苹果风格:圆形单选框
  const size = 24

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
              bezelWidth={14}
              glassThickness={50}
              refractionScale={0.8}
              blur={0.3}
              tint={isActive ? 'rgba(10,132,255,0.6)' : 'rgba(255,255,255,0.06)'}
              style={{
                width: size,
                height: size,
                transition: `all 0.2s ${spring.default}`,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0.3})`,
                  transition: `all 0.15s ${spring.default}`,
                }}
              />
            </LiquidGlass>
            <span style={{ fontSize: 17, fontFamily: fontStack, color: '#fff', letterSpacing: -0.4 }}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}
