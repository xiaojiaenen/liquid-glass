import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export function GlassSegmented({
  options = ['日', '周', '月'],
}: {
  options?: string[]
}) {
  const [active, setActive] = useState(0)
  const segW = 64
  const H = 36
  const pad = 3

  return (
    <LiquidGlass
      radius={H / 2}
      bezelWidth={14}
      glassThickness={60}
      refractionScale={0.9}
      blur={0.4}
      tint="rgba(120,120,128,0.24)"
      style={{ padding: pad, height: H }}
    >
      <div style={{ position: 'relative', display: 'flex' }}>
        {/* 选中指示器:玻璃质感小块 */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: active * segW,
            width: segW,
            height: H - pad * 2,
            borderRadius: (H - pad * 2) / 2,
            background: 'rgba(255,255,255,0.28)',
            boxShadow:
              'inset 0 1px 1px rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.2)',
            transition: `left 0.32s ${spring.default}`,
          }}
        />
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setActive(i)}
            style={{
              position: 'relative',
              width: segW,
              height: H - pad * 2,
              border: 'none',
              background: 'transparent',
              color: '#fff',
              fontFamily: fontStack,
              fontSize: 14,
              fontWeight: active === i ? 600 : 500,
              letterSpacing: -0.1,
              cursor: 'pointer',
              opacity: active === i ? 1 : 0.65,
              transition: 'opacity 0.2s ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </LiquidGlass>
  )
}
