import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export function GlassMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(38)

  return (
    <LiquidGlass
      radius={30}
      bezelWidth={28}
      glassThickness={110}
      refractionScale={1}
      blur={0.6}
      saturate={1.3}
      tint="rgba(255,255,255,0.05)"
      style={{ width: 320, padding: 22, flexDirection: 'column' }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          fontFamily: fontStack,
        }}
      >
        {/* 封面 + 信息 */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 14,
              background: 'linear-gradient(145deg, #ff375f, #bf5af2)',
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              fontSize: 28,
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.4), 0 8px 20px rgba(0,0,0,0.4)',
            }}
          >
            🎧
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>
              Liquid Dreams
            </div>
            <div style={{ fontSize: 14, opacity: 0.65, letterSpacing: -0.1 }}>
              Glass Ensemble
            </div>
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
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: 2,
                background: '#fff',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              opacity: 0.55,
              marginTop: 7,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>1:24</span>
            <span>-2:18</span>
          </div>
        </div>

        {/* 控制 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 36,
          }}
        >
          <button style={ctrlBtn} aria-label="上一首">
            <Backward />
          </button>
          <button
            onClick={() => setPlaying((v) => !v)}
            style={ctrlBtn}
            aria-label={playing ? '暂停' : '播放'}
          >
            {playing ? <Pause /> : <Play />}
          </button>
          <button style={ctrlBtn} aria-label="下一首">
            <Forward />
          </button>
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
  display: 'grid',
  placeItems: 'center',
  padding: 0,
}

const Play = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
    <path d="M7 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 7 5.5Z" />
  </svg>
)
const Pause = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
    <rect x="6" y="5" width="4" height="14" rx="1.3" />
    <rect x="14" y="5" width="4" height="14" rx="1.3" />
  </svg>
)
const Backward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
    <path d="M11 6.5 3.5 11.2a1 1 0 0 0 0 1.6L11 17.5V13l7.5 4.5a1 1 0 0 0 1.5-.86V7.36a1 1 0 0 0-1.5-.86L11 11V6.5Z" />
  </svg>
)
const Forward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
    <path d="M13 6.5 20.5 11.2a1 1 0 0 1 0 1.6L13 17.5V13l-7.5 4.5A1 1 0 0 1 4 16.64V7.36a1 1 0 0 1 1.5-.86L13 11V6.5Z" />
  </svg>
)
