import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii } from '../lib/tokens'

export function GlassSearch() {
  const [value, setValue] = useState('')
  return (
    <LiquidGlass
      radius={radii.control}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint="rgba(255,255,255,0.06)"
      style={{ width: 300, padding: '0 14px', height: 36 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
          <circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.6" />
          <path d="M11 11L14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="搜索"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#fff',
            fontFamily: fontStack,
            fontSize: 15,
            letterSpacing: -0.3,
          }}
        />
        {value && (
          <button
            onClick={() => setValue('')}
            aria-label="清除"
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '50%',
              width: 16,
              height: 16,
              cursor: 'pointer',
              fontSize: 10,
              lineHeight: 1,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
