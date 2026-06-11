import { useState, useRef, useEffect, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

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
 * 选中指示器为液态玻璃滑块，位置/宽度跟随实际 tab 尺寸。
 */
export function GlassTabs({ tabs, value: controlled, onChange }: GlassTabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.value ?? '')
  const active = controlled ?? internal
  const [tabBBoxes, setTabBBoxes] = useState<{ left: number; width: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  const measure = useCallback(() => {
    const parent = containerRef.current
    if (!parent) return
    const boxes = tabs.map((_, i) => {
      const btn = btnRefs.current[i]
      if (!btn) return { left: 0, width: 60 }
      const parentRect = parent.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      return {
        left: btnRect.left - parentRect.left,
        width: btnRect.width,
      }
    })
    setTabBBoxes(boxes)
  }, [tabs])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const activeIdx = tabs.findIndex((t) => t.value === active)
  const indicatorBox = tabBBoxes[activeIdx]

  return (
    <LiquidGlass
      radius={12}
      bezelWidth={20}
      glassThickness={70}
      refractionScale={0.85}
      blur={0.5}
      tint="rgba(255,255,255,0.06)"
      style={{ padding: 3 }}
    >
      <div ref={containerRef} style={{ display: 'flex', position: 'relative' }}>
        {tabs.map((tab, i) => {
          const isActive = active === tab.value
          return (
            <button
              key={tab.value}
              ref={(el) => { btnRefs.current[i] = el }}
              onClick={() => select(tab.value)}
              style={{
                position: 'relative',
                border: 'none',
                background: 'none',
                color: '#fff',
                fontFamily: fontStack,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: -0.1,
                padding: '7px 16px',
                borderRadius: 9,
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.5,
                transition: `all 0.2s ${spring.default}`,
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}
        {/* 选中指示器 — 液态玻璃滑块，跟随实际 tab 宽度/位置 */}
        {indicatorBox && (
          <LiquidGlass
            radius={9}
            bezelWidth={8}
            glassThickness={30}
            refractionScale={0.618}
            blur={0.15}
            tint="rgba(255,255,255,0.15)"
            style={{
              position: 'absolute',
              top: 0,
              left: indicatorBox.left,
              width: indicatorBox.width,
              height: '100%',
              transition: `left 0.35s ${spring.default}, width 0.35s ${spring.default}`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </div>
    </LiquidGlass>
  )
}
