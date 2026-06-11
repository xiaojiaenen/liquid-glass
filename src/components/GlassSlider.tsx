import { useRef, useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { systemColors } from '../lib/tokens'

export interface GlassSliderProps {
  defaultValue?: number
  accent?: string
}

/**
 * GlassSlider — 液态玻璃滑块。
 * 轨道和已填充条都是薄液态玻璃层，旋钮是高光玻璃圆。
 */
export function GlassSlider({
  defaultValue = 50,
  accent = systemColors.blue,
}: GlassSliderProps) {
  const [value, setValue] = useState(defaultValue)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const W = 260
  const knob = 28
  const trackH = 4

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setValue(Math.round(p * 100))
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setFromClientX(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      style={{
        position: 'relative',
        width: W,
        height: knob,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        touchAction: 'none',
      }}
    >
      {/* 轨道 — 薄液态玻璃 */}
      <LiquidGlass
        radius={trackH / 2}
        bezelWidth={6}
        glassThickness={25}
        refractionScale={0.5}
        blur={0.15}
        tint="rgba(120,120,128,0.25)"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: trackH,
        }}
      />

      {/* 已填充 — 液态玻璃条 */}
      <LiquidGlass
        radius={trackH / 2}
        bezelWidth={6}
        glassThickness={25}
        refractionScale={0.5}
        blur={0.15}
        tint={`${accent}80`} // accent with 50% alpha
        style={{
          position: 'absolute',
          left: 0,
          width: `${value}%`,
          height: trackH,
        }}
      />

      {/* 滑块旋钮 — 玻璃圆点 */}
      <span
        style={{
          position: 'absolute',
          left: `calc(${value}% - ${knob / 2}px)`,
          zIndex: 1,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={55}
          refractionScale={0.85}
          blur={0.15}
          tint="rgba(255,255,255,0.65)"
          style={{
            width: knob,
            height: knob,
            transition: `transform 0.2s, filter 0.2s`,
          }}
        />
      </span>
    </div>
  )
}
