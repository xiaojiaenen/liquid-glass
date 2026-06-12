import { useState, useRef, useEffect, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface GlassAccordionItem {
  title: string
  content: ReactNode
}

export interface GlassAccordionProps {
  items: GlassAccordionItem[]
  width?: number | string
}

export function GlassAccordion({ items, width = 340 }: GlassAccordionProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    const h = contentRefs.current.map((el) => el?.scrollHeight ?? 0)
    setHeights(h)
  }, [items])

  const toggle = (i: number) => { setOpenIndex(openIndex === i ? null : i) }

  return (
    <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
      style={{ width, padding: 4, flexDirection: 'column' }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const contentHeight = heights[i] ?? 200
        return (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${borderColors.separator}` : 'none' }}>
            <button onClick={() => toggle(i)} aria-expanded={isOpen}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                padding: '12px 12px', borderRadius: 12, cursor: 'pointer', border: 'none', background: 'none',
                color: textColors.primary, fontFamily: fontStack, transition: `background 0.2s ${spring.default}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
              <span style={{ fontSize: 17, fontWeight: 400, letterSpacing: -0.4 }}>{item.title}</span>
              <span style={{ transform: `rotate(${isOpen ? 90 : 0}deg)`, transition: `transform 0.25s ${spring.default}`, display: 'inline-flex', opacity: 0.3 }}>
                <GlassIcon name="chevron_right" size="small" color={textColors.secondary} />
              </span>
            </button>
            <div ref={(el) => { contentRefs.current[i] = el }}
              style={{ maxHeight: isOpen ? contentHeight : 0, overflow: 'hidden', opacity: isOpen ? 1 : 0, transition: `max-height 0.3s ${spring.gentle}, opacity 0.25s ${spring.default}`, padding: isOpen ? '0 12px 12px' : '0 12px' }}>
              <div style={{ fontSize: 15, lineHeight: 1.5, fontFamily: fontStack, color: textColors.secondary }}>{item.content}</div>
            </div>
          </div>
        )
      })}
    </LiquidGlass>
  )
}
