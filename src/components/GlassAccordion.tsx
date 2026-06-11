import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassAccordionItem {
  title: string
  content: React.ReactNode
}

export interface GlassAccordionProps {
  items: GlassAccordionItem[]
  width?: number | string
}

export function GlassAccordion({ items, width = 340 }: GlassAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <LiquidGlass
      radius={16}
      bezelWidth={24}
      glassThickness={90}
      refractionScale={0.9}
      blur={0.5}
      tint="rgba(255,255,255,0.05)"
      style={{ width, padding: 4, flexDirection: 'column' }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 12px',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 17, fontWeight: 400, fontFamily: fontStack, letterSpacing: -0.4 }}>
                {item.title}
              </span>
              <span
                style={{
                  fontSize: 12,
                  opacity: 0.3,
                  transform: `rotate(${isOpen ? 90 : 0}deg)`,
                  transition: `transform 0.2s ${spring.default}`,
                }}
              >
                ›
              </span>
            </div>
            <div
              style={{
                maxHeight: isOpen ? 200 : 0,
                overflow: 'hidden',
                opacity: isOpen ? 1 : 0,
                transition: `all 0.25s ${spring.default}`,
                padding: isOpen ? '0 12px 12px' : '0 12px',
              }}
            >
              <div style={{ fontSize: 15, lineHeight: 1.5, fontFamily: fontStack, opacity: 0.6 }}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </LiquidGlass>
  )
}
