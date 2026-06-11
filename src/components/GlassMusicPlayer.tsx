import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(38)

  return (
    <LiquidGlass
      radius={28}
      bezelWidth={26}
      glassThickness={110}
      refractionScale={1}
      blur={1}
      saturate={1.3}
      tint="rgba(255,255,255,0.06)"
      style={{ width: 340, padding: 22, flexDirection: 'column' }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 封面 + 信息 */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #f472b6, #818cf8)',
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              fontSize: 26,
              boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
            }}
          >
            🎧
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Liquid Dreams
            </div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Glass Ensemble</div>
          </div>
        </div>

        {/* 进度条 */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress(((e.clientX - rect.left) / rect.width) * 100)
          }}
          style={{ cursor: 'pointer' }}
        >
          <div
            style={{
              height: 5,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.18)',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.85)',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              opacity: 0.6,
              marginTop: 6,
            }}
          >
            <span>1:24</span>
            <span>3:42</span>
          </div>
        </div>

        {/* 控制 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 28,
            fontSize: 22,
          }}
        >
          <button style={ctrlBtn}>⏮</button>
          <button
            onClick={() => setPlaying((v) => !v)}
            style={{ ...ctrlBtn, fontSize: 30 }}
          >
            {playing ? '⏸' : '▶️'}
          </button>
          <button style={ctrlBtn}>⏭</button>
        </div>
      </div>
    </LiquidGlass>
  )
}

const ctrlBtn: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  lineHeight: 1,
}
