import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'

export interface GlassSwitchProps {
  defaultOn?: boolean
}

/**
 * GlassSwitch — 液态玻璃开关。
 * Track 是一整块液态玻璃 pill，on 时绿玻璃 tint，off 时灰玻璃 tint。
 * Knob 是高光玻璃浮块，在 track 内部滑动。
 */
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
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        background: 'transparent',
      }}
    >
      {/* Track — 液态玻璃容器 */}
      <LiquidGlass
        radius={H / 2}
        bezelWidth={18}
        glassThickness={80}
        refractionScale={0.9}
        blur={0.3}
        tint={on ? 'rgba(48,209,88,0.3)' : 'rgba(120,120,128,0.2)'}
        style={{
          width: W,
          height: H,
          position: 'absolute',
          inset: 0,
          transition: `all 0.3s ${spring.gentle}`,
        }}
      />

      {/* Knob — 玻璃浮块 */}
      <span
        style={{
          position: 'absolute',
          top: pad,
          left: on ? W - knob - pad : pad,
          transition: `left 0.35s ${spring.default}`,
          zIndex: 1,
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={55}
          refractionScale={0.8}
          blur={0.15}
          tint="rgba(255,255,255,0.7)"
          style={{
            width: knob,
            height: knob,
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))',
          }}
        />
      </span>
    </button>
  )
}
