import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSwitchProps {
  defaultOn?: boolean
  value?: boolean
  onChange?: (on: boolean) => void
  'aria-label'?: string
}

/**
 * GlassSwitch — 液态玻璃开关。
 * 对标 UISwitch / SwiftUI Toggle。
 * Track 是液态玻璃 pill,Knob 是高光玻璃浮块。
 */
export function GlassSwitch({
  defaultOn = false,
  value: controlledValue,
  onChange,
  'aria-label': ariaLabel,
}: GlassSwitchProps) {
  const [internal, setInternal] = useState(defaultOn)
  const on = controlledValue ?? internal
  const { tints } = useGlassTheme()

  const W = 51
  const H = 31
  const pad = 2
  const knob = H - pad * 2

  const toggle = () => {
    if (controlledValue === undefined) setInternal(!on)
    onChange?.(!on)
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
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
      {/* Track — 液态玻璃 */}
      <LiquidGlass
        radius={H / 2}
        bezelWidth={18}
        glassThickness={80}
        refractionScale={0.9}
        blur={0.3}
        tint={on ? 'rgba(48,209,88,0.3)' : tints.muted}
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
