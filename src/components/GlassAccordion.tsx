import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassAccordionItem {
  title: string
  content: React.ReactNode
}

export interface GlassAccordionProps {
  items: GlassAccordionItem[]
  width?: number
}

export function GlassAccordion({ items, width = 340 }: GlassAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <LiquidGlass
      radius={22}
      bezelWidth={24}
      glassThickness={100}
      refractionScale={0.95}
      blur={0.3}
      tint="rgba(255,255,255,0.05)"
      style={{ width, padding: 6, flexDirection: 'column' }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i}>
            <div
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 14px',
                borderRadius: 14,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 15, fontWeight: 600, fontFamily: fontStack, letterSpacing: -0.2 }}>
                {item.title}
              </span>
              <span
                style={{
                  fontSize: 12,
                  opacity: 0.4,
                  transform: `rotate(${isOpen ? 90 : 0}deg)`,
                  transition: `transform 0.25s ${spring.default}`,
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
                transition: `all 0.3s ${spring.default}`,
                padding: isOpen ? '0 14px 14px' : '0 14px',
              }}
            >
              <div style={{ fontSize: 13, lineHeight: 1.6, fontFamily: fontStack, opacity: 0.75 }}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </LiquidGlass>
  )
}
