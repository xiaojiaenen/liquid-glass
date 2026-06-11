import { useRef, useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

/** 可拖动的玻璃块,浮在文字上;拖动时观察文字是否被边缘折射 */
export function DragGlass() {
  const [pos, setPos] = useState({ x: 40, y: 40 })
  const drag = useRef<{ dx: number; dy: number } | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

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
    <div ref={areaRef} className="drag-area">
      {/* 底层文字:玻璃会折射这些字 */}
      <div className="drag-text">
        {Array.from({ length: 14 }).map((_, i) => (
          <p key={i}>
            液态玻璃 LIQUID GLASS 折射测试 — 拖动上面的玻璃块,看文字边缘是否被弯曲放大。
            Refraction bends the text at the edges while the center stays clear. 1234567890
          </p>
        ))}
      </div>

      {/* 可拖动玻璃块 */}
      <div
        className="drag-handle"
        style={{ left: pos.x, top: pos.y }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        <LiquidGlass
          radius={28}
          bezelWidth={26}
          glassThickness={150}
          scale={45}
          blur={0.5}
          saturate={1.3}
          tint="rgba(255,255,255,0.04)"
          style={{ width: 220, height: 140 }}
        >
          <span style={{ fontSize: 13, opacity: 0.8 }}>拖我 →</span>
        </LiquidGlass>
      </div>
    </div>
  )
}
