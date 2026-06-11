import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassSearch() {
  const [value, setValue] = useState('')
  return (
    <LiquidGlass
      radius={26}
      bezelWidth={20}
      glassThickness={90}
      refractionScale={1}
      blur={1}
      tint="rgba(255,255,255,0.08)"
      style={{ width: 300, padding: '0 18px', height: 52 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
        <span style={{ fontSize: 18, opacity: 0.7 }}>🔍</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="搜索…"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#fff',
            fontSize: 15,
          }}
        />
        {value && (
          <button
            onClick={() => setValue('')}
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '50%',
              width: 20,
              height: 20,
              cursor: 'pointer',
              fontSize: 12,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
