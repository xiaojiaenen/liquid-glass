import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'

const apps = [
  { icon: '🧭', grad: 'linear-gradient(160deg,#5ac8fa,#0a84ff)' },
  { icon: '📷', grad: 'linear-gradient(160deg,#ff9f0a,#ff375f)' },
  { icon: '🎵', grad: 'linear-gradient(160deg,#ff375f,#bf5af2)' },
  { icon: '✉️', grad: 'linear-gradient(160deg,#64d2ff,#0a84ff)' },
  { icon: '🗓️', grad: 'linear-gradient(160deg,#ff453a,#ff9f0a)' },
  { icon: '⚙️', grad: 'linear-gradient(160deg,#8e8e93,#48484a)' },
]

export function Dock() {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <LiquidGlass
      radius={26}
      bezelWidth={20}
      glassThickness={90}
      refractionScale={1.1}
      blur={0.2}
      saturate={1.2}
      tint="rgba(255,255,255,0.04)"
      style={{ padding: '10px 14px' }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        {apps.map((app, i) => {
          const dist = hover === null ? 99 : Math.abs(hover - i)
          const lift = dist === 0 ? -14 : dist === 1 ? -6 : 0
          const sc = dist === 0 ? 1.32 : dist === 1 ? 1.12 : 1
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                width: 50,
                height: 50,
                display: 'grid',
                placeItems: 'center',
                fontSize: 26,
                borderRadius: 13,
                background: app.grad,
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.45), 0 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transform: `translateY(${lift}px) scale(${sc})`,
                transformOrigin: 'bottom center',
                transition: `transform 0.28s ${spring.default}`,
              }}
            >
              {app.icon}
            </div>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
