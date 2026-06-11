import { useState, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'

export interface GlassSwitchProps {
  defaultOn?: boolean
}

/**
 * GlassSwitch — iOS 风格液态玻璃开关。
 * Track 整体是液态玻璃容器，点击时产生玻璃涟漪扩散效果。
 */
export function GlassSwitch({ defaultOn = false }: GlassSwitchProps) {
  const [on, setOn] = useState(defaultOn)
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null)

  // iOS 开关比例 51:31
  const W = 51
  const H = 31
  const pad = 2
  const knob = H - pad * 2

  const handleClick = useCallback((e: React.MouseEvent) => {
    setOn((v) => !v)
    // 记录点击位置，触发玻璃涟漪
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      key: Date.now(),
    })
    // 涟漪自动消失
    setTimeout(() => setRipple(null), 500)
  }, [])

  return (
    <button
      onClick={handleClick}
      role="switch"
      aria-checked={on}
      style={{
        width: W,
        height: H,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        background: 'transparent',
        overflow: 'visible',
      }}
    >
      {/* Track — 液态玻璃容器 */}
      <LiquidGlass
        radius={H / 2}
        bezelWidth={18}
        glassThickness={60}
        refractionScale={0.8}
        blur={0.2}
        tint={on ? `rgba(48,209,88,0.35)` : 'rgba(120,120,128,0.2)'}
        style={{
          width: W,
          height: H,
          position: 'absolute',
          inset: 0,
          transition: `all 0.3s ${spring.gentle}`,
        }}
      />

      {/* 玻璃涟漪 — 点击时扩散 */}
      {ripple && (
        <span
          key={ripple.key}
          style={{
            position: 'absolute',
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'lg-ripple 0.5s ease-out forwards',
          }}
        >
          <LiquidGlass
            radius={20}
            bezelWidth={10}
            glassThickness={30}
            refractionScale={0.5}
            blur={0.1}
            tint="rgba(255,255,255,0.15)"
            style={{ width: 40, height: 40, background: 'transparent' }}
          />
          <style>{`
            @keyframes lg-ripple {
              0% { transform: scale(0.5); opacity: 1; }
              100% { transform: scale(2); opacity: 0; }
            }
          `}</style>
        </span>
      )}

      {/* Knob — 白色玻璃圆钮 */}
      <span
        style={{
          position: 'absolute',
          top: pad,
          left: on ? W - knob - pad : pad,
          transition: `left 0.35s ${spring.default}`,
          zIndex: 1,
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={55}
          refractionScale={0.85}
          blur={0.15}
          tint="rgba(255,255,255,0.6)"
          style={{
            width: knob,
            height: knob,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
          }}
        />
      </span>
    </button>
  )
}
