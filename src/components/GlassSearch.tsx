import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

/**
 * GlassSearch — 液态玻璃搜索框。
 * 主题感知文字颜色,亮色/暗色可读性一致。
 */
export function GlassSearch() {
  const { tints, textColors } = useGlassTheme()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <LiquidGlass
      radius={radii.control}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint={focused ? 'rgba(255,255,255,0.1)' : tints.control}
      style={{
        width: 300,
        padding: '0 14px',
        height: 44,
        transition: `all 0.25s ${spring.default}`,
      }}
    >
      <div role="search" style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
          <circle cx="7" cy="7" r="5" stroke={textColors.secondary} strokeWidth="1.6" />
          <path d="M11 11L14 14" stroke={textColors.secondary} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="搜索"
          aria-label="Search"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: textColors.primary,
            fontFamily: fontStack,
            fontSize: 17,
            letterSpacing: -0.3,
          }}
        />
        {value && (
          <button
            onClick={() => setValue('')}
            aria-label="Clear search"
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: textColors.primary,
              borderRadius: '50%',
              width: 16,
              height: 16,
              cursor: 'pointer',
              fontSize: 10,
              lineHeight: 1,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              transition: `background 0.2s ${spring.default}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
          >
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
