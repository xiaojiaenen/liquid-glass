import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassMusicPlayerProps {
  title?: string
  artist?: string
  albumArt?: string
  duration?: number
  currentTime?: number
  onPlay?: () => void
  onPause?: () => void
  onNext?: () => void
  onPrev?: () => void
  onSeek?: (percent: number) => void
}

/**
 * GlassMusicPlayer — 液态玻璃音乐播放器。
 * 对标 Apple Music mini player。主题感知。
 */
export function GlassMusicPlayer({
  title = 'Liquid Dreams',
  artist = 'Glass Ensemble',
  albumArt,
  duration = 222,
  currentTime: controlledTime,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeek,
}: GlassMusicPlayerProps) {
  const { tints, textColors } = useGlassTheme()
  const [playing, setPlaying] = useState(false)
  const [internalProgress, setInternalProgress] = useState(38)
  const progress = controlledTime !== undefined ? (controlledTime / duration) * 100 : internalProgress

  const togglePlay = () => {
    const next = !playing
    setPlaying(next)
    if (next) onPlay?.()
    else onPause?.()
  }

  const handleSeek = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    if (controlledTime === undefined) setInternalProgress(pct)
    onSeek?.(pct)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const elapsed = (progress / 100) * duration
  const remaining = duration - elapsed

  return (
    <LiquidGlass
      radius={30}
      bezelWidth={55}
      glassThickness={130}
      refractionScale={1.1}
      blur={0.2}
      saturate={1.3}
      tint={tints.card}
      style={{ width: 320, padding: 22, flexDirection: 'column' }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18, fontFamily: fontStack }}>
        {/* 封面 + 信息 */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div
            style={{
              width: 62, height: 62, borderRadius: 14,
              background: albumArt ? `url(${albumArt}) center/cover` : 'linear-gradient(145deg, #ff375f, #bf5af2)',
              flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 28,
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            }}
          >
            {!albumArt && '🎧'}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: textColors.primary }}>{title}</div>
            <div style={{ fontSize: 14, color: textColors.secondary, letterSpacing: -0.1 }}>{artist}</div>
          </div>
        </div>

        {/* 进度条 */}
        <div onClick={handleSeek} style={{ cursor: 'pointer' }}>
          <div style={{ height: 3, borderRadius: 1.5, background: 'rgba(255,255,255,0.15)' }}>
            <div style={{ width: `${progress}%`, height: '100%', borderRadius: 1.5, background: textColors.primary, transition: `width 0.1s linear` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: textColors.tertiary, marginTop: 7, fontVariantNumeric: 'tabular-nums' }}>
            <span>{formatTime(elapsed)}</span>
            <span>-{formatTime(remaining)}</span>
          </div>
        </div>

        {/* 控制 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36 }}>
          <button style={{ ...ctrlBtn, color: textColors.primary }} aria-label="上一首"
            onClick={onPrev}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            <Backward />
          </button>
          <button style={{ ...ctrlBtn, color: textColors.primary }} aria-label={playing ? '暂停' : '播放'}
            onClick={togglePlay}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            {playing ? <Pause /> : <Play />}
          </button>
          <button style={{ ...ctrlBtn, color: textColors.primary }} aria-label="下一首"
            onClick={onNext}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
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
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  padding: 0,
  transition: `transform 0.2s ${spring.default}, opacity 0.2s ease`,
}

const Play = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 7 5.5Z" />
  </svg>
)
const Pause = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1.3" />
    <rect x="14" y="5" width="4" height="14" rx="1.3" />
  </svg>
)
const Backward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 6.5 3.5 11.2a1 1 0 0 0 0 1.6L11 17.5V13l7.5 4.5a1 1 0 0 0 1.5-.86V7.36a1 1 0 0 0-1.5-.86L11 11V6.5Z" />
  </svg>
)
const Forward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 6.5 20.5 11.2a1 1 0 0 1 0 1.6L13 17.5V13l-7.5 4.5A1 1 0 0 1 4 16.64V7.36a1 1 0 0 1 1.5-.86L13 11V6.5Z" />
  </svg>
)
