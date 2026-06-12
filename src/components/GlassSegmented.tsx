import { useState, useRef, useEffect, useCallback } from 'react'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSegmentedProps {
  options?: string[]
  value?: number
  onChange?: (index: number) => void
}

/**
 * GlassSegmented — 分段控制。
 * 指示器用 transform: translateX 滑动 + CSS width 过渡。
 */
export function GlassSegmented({
  options = ['日', '周', '月'],
  value: controlledValue,
  onChange,
}: GlassSegmentedProps) {
  const [internal, setInternal] = useState(0)
  const active = controlledValue ?? internal
  const { tints, textColors } = useGlassTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [boxes, setBoxes] = useState<{ left: number; width: number }[]>([])
  const [ready, setReady] = useState(false)

  const select = (i: number) => {
    if (controlledValue === undefined) setInternal(i)
    onChange?.(i)
  }

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const result = options.map((_, i) => {
      const btn = btnRefs.current[i]
      if (!btn) return { left: 0, width: 60 }
      const btnRect = btn.getBoundingClientRect()
      return { left: btnRect.left - containerRect.left, width: btnRect.width }
    })
    setBoxes(result)
  }, [options])

  useEffect(() => {
    measure()
    requestAnimationFrame(() => setReady(true))
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const box = boxes[active]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select((active + 1) % options.length) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); select((active - 1 + options.length) % options.length) }
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        borderRadius: 16,
        padding: 3,
        background: tints.control,
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border: '0.5px solid rgba(255,255,255,0.18)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12), 0 6px 18px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.3)',
      }}
    >
      <style>{`
        .lg-seg-btn {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .lg-seg-btn::-moz-focus-inner { border: 0; }
      `}</style>
      <div
        ref={containerRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        style={{ position: 'relative', display: 'flex' }}
      >
        {/* 指示器 — transform 滑动 */}
        {box && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              borderRadius: 13,
              background: tints.selected,
              backdropFilter: 'blur(12px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.6)',
              border: '0.5px solid rgba(255,255,255,0.2)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.25)',
              transform: `translateX(${box.left}px)`,
              width: box.width,
              transition: ready
                ? `transform 0.35s ${spring.default}, width 0.35s ${spring.default}`
                : 'none',
              pointerEvents: 'none',
              zIndex: 1,
              willChange: 'transform',
            }}
          />
        )}
        {options.map((opt, i) => (
          <button
            key={opt}
            ref={(el) => { btnRefs.current[i] = el }}
            className="lg-seg-btn"
            role="tab"
            aria-selected={active === i}
            onClick={() => select(i)}
            style={{
              position: 'relative',
              flex: 1,
              height: 28,
              border: 'none',
              background: 'transparent',
              color: textColors.primary,
              fontFamily: fontStack,
              fontSize: 13,
              fontWeight: active === i ? 600 : 500,
              letterSpacing: -0.2,
              cursor: 'pointer',
              opacity: active === i ? 1 : 0.5,
              transition: `opacity 0.25s ${spring.default}`,
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
