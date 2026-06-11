import { useState } from 'react'
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

export function GlassTabs({ tabs, value: controlled, onChange }: GlassTabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.value ?? '')
  const active = controlled ?? internal

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <LiquidGlass
      radius={12}
      bezelWidth={12}
      glassThickness={35}
      refractionScale={0.8}
      blur={0.2}
      tint="rgba(255,255,255,0.06)"
      style={{ padding: 3 }}
    >
      <div style={{ display: 'flex', position: 'relative' }}>
        {tabs.map((tab) => {
          const isActive = active === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => select(tab.value)}
              style={{
                position: 'relative',
                border: 'none',
                background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
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
                zIndex: 1,
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
