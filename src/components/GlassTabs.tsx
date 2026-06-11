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

/**
 * GlassTabs — 顶部标签页。
 * 选中项用液态玻璃滑块指示。
 */
export function GlassTabs({ tabs, value: controlled, onChange }: GlassTabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.value ?? '')
  const active = controlled ?? internal

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  const activeIdx = tabs.findIndex((t) => t.value === active)

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
                minWidth: 60,
              }}
            >
              {tab.label}
            </button>
          )
        })}
        {/* 选中指示器 — 液态玻璃滑块 */}
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
            left: `calc(${activeIdx} * 92px + 0px)`,
            width: 92,
            height: '100%',
            transition: `left 0.3s ${spring.default}`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </LiquidGlass>
  )
}
