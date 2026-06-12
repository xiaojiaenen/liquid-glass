import { useState, useEffect, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  presets?: string[]
  showInput?: boolean
  className?: string
  style?: CSSProperties
}

const defaultPresets = [
  '#ff453a', '#ff9f0a', '#ffd60a', '#30d158',
  '#40c8e0', '#0a84ff', '#5e5ce6', '#bf5af2',
  '#ff375f', '#8e8e93', '#636366', '#48484a',
]

export function GlassColorPicker({ value = '#0a84ff', onChange, presets = defaultPresets, showInput = true, className = '', style }: GlassColorPickerProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [hexInput, setHexInput] = useState(value)
  useEffect(() => { setHexInput(value) }, [value])
  const handlePresetClick = (color: string) => { onChange?.(color); setHexInput(color) }
  const handleHexChange = (v: string) => { setHexInput(v); if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange?.(v) }

  return (
    <LiquidGlass radius={radii.card} bezelWidth={22} glassThickness={80} refractionScale={0.618} blur={0.4} tint={tints.card}
      style={{ flexDirection: 'column', padding: 16, width: 240, fontFamily: fontStack, ...style }} className={className}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: value, border: `2px solid ${borderColors.default}`, flexShrink: 0, transition: `background 0.2s ease` }} />
        {showInput && (
          <input type="text" value={hexInput} onChange={(e) => handleHexChange(e.target.value)}
            style={{ flex: 1, height: 36, border: `1px solid ${borderColors.default}`, borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: textColors.primary, fontSize: 14, fontFamily: 'SF Mono, Menlo, monospace', padding: '0 10px', outline: 'none', letterSpacing: 0.5 }} />
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {presets.map((color) => {
          const isActive = value === color
          return (
            <button key={color} onClick={() => handlePresetClick(color)}
              style={{ width: 30, height: 30, borderRadius: 15, background: color, border: isActive ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer', transition: `all 0.15s ${spring.default}`, transform: isActive ? 'scale(1.15)' : 'scale(1)', boxShadow: isActive ? '0 0 0 2px rgba(10,132,255,0.5)' : 'none' }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = isActive ? 'scale(1.15)' : 'scale(1)' }} />
          )
        })}
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ width: '100%', height: 24, borderRadius: 12, background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)', position: 'relative', cursor: 'crosshair' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const hue = Math.round(x * 360)
            const color = hslToHex(hue, 100, 50)
            onChange?.(color); setHexInput(color)
          }}>
          <div style={{ position: 'absolute', top: -4, left: `calc(${hexToHsl(value).h / 360 * 100}% - 6px)`, width: 12, height: 32, borderRadius: 6, border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.5)', pointerEvents: 'none' }} />
        </div>
      </div>
    </LiquidGlass>
  )
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255; const g = parseInt(hex.slice(3, 5), 16) / 255; const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b); const min = Math.min(r, g, b); let h = 0; let s = 0; const l = (max + min) / 2
  if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break } }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100; const a = s * Math.min(l, 1 - l)
  const f = (n: number) => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0') }
  return `#${f(0)}${f(8)}${f(4)}`
}
