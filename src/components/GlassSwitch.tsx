import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring, systemColors } from '../lib/tokens'

export interface GlassSwitchProps {
  defaultOn?: boolean
}

export function GlassSwitch({ defaultOn = false }: GlassSwitchProps) {
  const [on, setOn] = useState(defaultOn)
  // iOS 开关比例 51:31
  const W = 51
  const H = 31
  const pad = 2
  const knob = H - pad * 2

  return (
    <button
      onClick={() => setOn((v) => !v)}
      role="switch"
      aria-checked={on}
      style={{
        width: W,
        height: H,
        borderRadius: H,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        background: on ? systemColors.green : 'rgba(120,120,128,0.32)',
        boxShadow: on
          ? `0 0 0 1px ${systemColors.green}, inset 0 0 2px rgba(0,0,0,0.15)`
          : 'inset 0 0 3px rgba(0,0,0,0.18)',
        transition: `background 0.3s ${spring.gentle}`,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: pad,
          left: on ? W - knob - pad : pad,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
          transition: `left 0.32s ${spring.default}`,
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={60}
          refractionScale={0.9}
          blur={0.2}
          tint="rgba(255,255,255,0.55)"
          style={{ width: knob, height: knob }}
        />
      </span>
    </button>
  )
}
