import { useRef, useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassSlider({ defaultValue = 50 }: { defaultValue?: number }) {
  const [value, setValue] = useState(defaultValue)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const W = 260
  const knob = 30

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
      {/* 轨道 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.18)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
        }}
      />
      {/* 已填充 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: `${value}%`,
          height: 6,
          borderRadius: 3,
          background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
        }}
      />
      {/* 滑块 */}
      <span
        style={{
          position: 'absolute',
          left: `calc(${value}% - ${knob / 2}px)`,
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={80}
          scale={24}
          blur={0}
          tint="rgba(255,255,255,0.3)"
          style={{ width: knob, height: knob }}
        />
      </span>
    </div>
  )
}
