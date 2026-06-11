import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export function GlassSegmented({
  options = ['日', '周', '月'],
}: {
  options?: string[]
}) {
  const [active, setActive] = useState(0)
  const segW = 60
  const H = 32
  const pad = 3

  return (
    <LiquidGlass
      radius={H / 2}
      bezelWidth={20}
      glassThickness={70}
      refractionScale={0.85}
      blur={0.5}
      tint="rgba(255,255,255,0.06)"
      style={{ padding: pad, height: H }}
    >
      <div style={{ position: 'relative', display: 'flex' }}>
        {/* 选中指示器 */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: active * segW,
            width: segW,
            height: H - pad * 2,
            borderRadius: (H - pad * 2) / 2,
            background: 'rgba(255,255,255,0.18)',
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
              fontSize: 13,
              fontWeight: active === i ? 600 : 500,
              letterSpacing: -0.2,
              cursor: 'pointer',
              opacity: active === i ? 1 : 0.5,
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
