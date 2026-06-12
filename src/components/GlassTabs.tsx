import { useState, useRef, useEffect, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassTab {
  label: string
  value: string
}

export interface GlassTabsProps {
  tabs: GlassTab[]
  value?: string
  onChange?: (value: string) => void
}

/**
 * GlassTabs — 顶部标签页。
 * 指示器用 transform: translateX 滑动 + CSS width 过渡,
 * 浏览器对 transform 有独立合成层,过渡丝滑。
 */
export function GlassTabs({ tabs, value: controlled, onChange }: GlassTabsProps) {
  const { tints, textColors } = useGlassTheme()
  const [internal, setInternal] = useState(tabs[0]?.value ?? '')
  const active = controlled ?? internal
  const containerRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [boxes, setBoxes] = useState<{ left: number; width: number }[]>([])
  const [ready, setReady] = useState(false)

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  const measure = useCallback(() => {
    const parent = containerRef.current
    if (!parent) return
    const parentRect = parent.getBoundingClientRect()
    const result = tabs.map((_, i) => {
      const btn = btnRefs.current[i]
      if (!btn) return { left: 0, width: 60 }
      const btnRect = btn.getBoundingClientRect()
      return { left: btnRect.left - parentRect.left, width: btnRect.width }
    })
    setBoxes(result)
  }, [tabs])

  useEffect(() => {
    measure()
    requestAnimationFrame(() => setReady(true))
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const activeIdx = tabs.findIndex((t) => t.value === active)
  const box = boxes[activeIdx]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); const next = tabs[(activeIdx + 1) % tabs.length]; if (next) select(next.value) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); const prev = tabs[(activeIdx - 1 + tabs.length) % tabs.length]; if (prev) select(prev.value) }
  }

  return (
    <LiquidGlass
      radius={12}
      bezelWidth={20}
      glassThickness={70}
      refractionScale={0.85}
      blur={0.5}
      tint={tints.control}
      style={{ padding: 3 }}
    >
      <style>{`
        .lg-tab-btn {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .lg-tab-btn::-moz-focus-inner { border: 0; }
      `}</style>
      <div
        ref={containerRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        style={{ display: 'flex', position: 'relative' }}
      >
        {tabs.map((tab, i) => {
          const isActive = active === tab.value
          return (
            <button
              key={tab.value}
              ref={(el) => { btnRefs.current[i] = el }}
              className="lg-tab-btn"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(tab.value)}
              style={{
                position: 'relative',
                border: 'none',
                background: 'none',
                color: textColors.primary,
                fontFamily: fontStack,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: -0.1,
                padding: '7px 16px',
                borderRadius: 9,
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.5,
                transition: `opacity 0.25s ${spring.default}`,
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}
        {/* 指示器 — transform 滑动 */}
        {box && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              borderRadius: 9,
              background: tints.selected,
              backdropFilter: 'blur(12px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.6)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
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
      </div>
    </LiquidGlass>
  )
}
