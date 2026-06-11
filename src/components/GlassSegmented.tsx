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
  const indicatorH = H - pad * 2

  return (
    <LiquidGlass
      radius={H / 2}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint="rgba(255,255,255,0.06)"
      style={{ padding: pad, height: H }}
    >
      <div style={{ position: 'relative', display: 'flex' }}>
        {/* 选中指示器 — 液态玻璃滑块 */}
        <LiquidGlass
          radius={indicatorH / 2}
          bezelWidth={10}
          glassThickness={50}
          refractionScale={0.7}
          blur={0.2}
          tint="rgba(255,255,255,0.22)"
          style={{
            position: 'absolute',
            top: 0,
            left: active * segW,
            width: segW,
            height: indicatorH,
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
              height: indicatorH,
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
