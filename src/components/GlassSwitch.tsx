import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  const W = 64
  const H = 36
  const pad = 4
  const knob = H - pad * 2

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      style={{
        width: W,
        height: H,
        borderRadius: H,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        background: on
          ? 'linear-gradient(135deg, #34d399, #059669)'
          : 'rgba(255,255,255,0.18)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
        transition: 'background 0.25s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: pad,
          left: on ? W - knob - pad : pad,
          transition: 'left 0.25s cubic-bezier(0.4, 1.3, 0.6, 1)',
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={70}
          refractionScale={1}
          blur={0.2}
          tint="rgba(255,255,255,0.35)"
          style={{ width: knob, height: knob }}
        />
      </span>
    </button>
  )
}
