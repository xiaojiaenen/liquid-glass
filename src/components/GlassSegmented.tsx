import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassSegmented({
  options = ['日', '周', '月'],
}: {
  options?: string[]
}) {
  const [active, setActive] = useState(0)
  const segW = 72
  const H = 44
  const pad = 4

  return (
    <LiquidGlass
      radius={H / 2}
      bezelWidth={16}
      glassThickness={70}
      scale={22}
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
            background: 'rgba(255,255,255,0.25)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)',
            transition: 'left 0.28s cubic-bezier(0.4, 1.1, 0.5, 1)',
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
              fontSize: 15,
              fontWeight: active === i ? 700 : 500,
              cursor: 'pointer',
              opacity: active === i ? 1 : 0.7,
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </LiquidGlass>
  )
}
