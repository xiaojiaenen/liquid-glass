import { useRef, useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

/** 参数滑块行 */
function Param({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <label className="param">
      <span className="param__label">
        {label} <b>{value}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

/** 可拖动的玻璃块 + 实时参数面板;拖动观察文字是否被边缘折射 */
export function DragGlass() {
  const [pos, setPos] = useState({ x: 40, y: 40 })
  const [p, setP] = useState({
    radius: 28,
    bezelWidth: 26,
    glassThickness: 150,
    refractionScale: 1,
    blur: 0.5,
    saturate: 1.3,
  })
  const drag = useRef<{ dx: number; dy: number } | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)
  const set = (k: keyof typeof p) => (v: number) => setP((s) => ({ ...s, [k]: v }))

  const onDown = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !areaRef.current) return
    const a = areaRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - a.left - drag.current.dx,
      y: e.clientY - a.top - drag.current.dy,
    })
  }
  const onUp = () => (drag.current = null)

  return (
    <div className="drag-wrap">
      {/* 参数面板 */}
      <div className="param-panel">
        <Param label="圆角 radius" value={p.radius} min={0} max={70} onChange={set('radius')} />
        <Param label="棱镜 bezelWidth" value={p.bezelWidth} min={4} max={60} onChange={set('bezelWidth')} />
        <Param label="厚度 glassThickness" value={p.glassThickness} min={20} max={500} onChange={set('glassThickness')} />
        <Param label="折射 refractionScale" value={p.refractionScale} min={0} max={3} step={0.05} onChange={set('refractionScale')} />
        <Param label="模糊 blur" value={p.blur} min={0} max={6} step={0.1} onChange={set('blur')} />
        <Param label="饱和 saturate" value={p.saturate} min={1} max={4} step={0.1} onChange={set('saturate')} />
      </div>

      {/* 拖动区 */}
      <div ref={areaRef} className="drag-area">
        <div className="drag-text">
          {Array.from({ length: 14 }).map((_, i) => (
            <p key={i}>
              液态玻璃 LIQUID GLASS 折射测试 — 拖动玻璃块,看文字边缘是否被弯曲放大。
              Refraction bends the text at the edges. 1234567890
            </p>
          ))}
        </div>

        <div
          className="drag-handle"
          style={{ left: pos.x, top: pos.y }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          <LiquidGlass
            radius={p.radius}
            bezelWidth={p.bezelWidth}
            glassThickness={p.glassThickness}
            refractionScale={p.refractionScale}
            blur={p.blur}
            saturate={p.saturate}
            tint="rgba(255,255,255,0.04)"
            style={{ width: 220, height: 140 }}
          >
            <span style={{ fontSize: 13, opacity: 0.8 }}>拖我 →</span>
          </LiquidGlass>
        </div>
      </div>
    </div>
  )
}
