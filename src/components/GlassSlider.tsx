import { useRef, useState, useCallback, useId } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSliderProps {
  value?: number
  onChange?: (value: number) => void
  defaultValue?: number
  accent?: string
  min?: number
  max?: number
  disabled?: boolean
  'aria-label'?: string
}

/**
 * GlassSlider — 液态玻璃滑块。
 * 对标 UISlider / SwiftUI Slider。
 * 拖拽时禁用 transition 实时跟随手指,松手后弹簧归位。
 */
export function GlassSlider({
  value: controlledValue,
  onChange,
  defaultValue = 50,
  accent,
  min = 0,
  max = 100,
  disabled = false,
  'aria-label': ariaLabel,
}: GlassSliderProps) {
  const { colors } = useGlassTheme()
  const accentColor = accent ?? colors.blue
  const [internal, setInternal] = useState(defaultValue)
  const value = controlledValue ?? internal
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const knobId = useId()
  const W = 260
  const knob = 28
  const trackH = 4

  const percent = ((value - min) / (max - min)) * 100

  const setValue = useCallback((v: number) => {
    const clamped = Math.max(min, Math.min(max, Math.round(v)))
    if (controlledValue === undefined) setInternal(clamped)
    onChange?.(clamped)
  }, [min, max, controlledValue, onChange])

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el || disabled) return
    const rect = el.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setValue(min + p * (max - min))
  }, [min, max, disabled, setValue])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return
    const step = (max - min) / 100
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp': e.preventDefault(); setValue(value + step); break
      case 'ArrowLeft': case 'ArrowDown': e.preventDefault(); setValue(value - step); break
      case 'Home': e.preventDefault(); setValue(min); break
      case 'End': e.preventDefault(); setValue(max); break
    }
  }, [value, min, max, disabled, setValue])

  // 拖拽时禁用 transition,松手后恢复
  const transitionValue = isDragging ? 'none' : `left 0.15s ${spring.default}, width 0.15s ${spring.default}`

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onPointerDown={(e) => {
        if (disabled) return
        setIsDragging(true)
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setFromClientX(e.clientX)
      }}
      onPointerMove={(e) => isDragging && setFromClientX(e.clientX)}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      style={{
        position: 'relative',
        width: W,
        height: knob,
        display: 'flex',
        alignItems: 'center',
        cursor: disabled ? 'default' : isDragging ? 'grabbing' : 'pointer',
        touchAction: 'none',
        outline: 'none',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {/* 轨道 — 纯 CSS 背景,轻量 */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0,
          height: trackH,
          borderRadius: trackH / 2,
          background: 'rgba(120,120,128,0.25)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* 已填充 — 纯 CSS,实时跟随 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: `${percent}%`,
          height: trackH,
          borderRadius: trackH / 2,
          background: accentColor,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: transitionValue,
          willChange: 'width',
        }}
      />

      {/* 滑块旋钮 */}
      <span
        id={knobId}
        style={{
          position: 'absolute',
          left: `calc(${percent}% - ${knob / 2}px)`,
          zIndex: 1,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
          transition: transitionValue,
          willChange: 'left',
        }}
      >
        <LiquidGlass
          radius={knob / 2}
          bezelWidth={knob / 2}
          glassThickness={55}
          refractionScale={0.85}
          blur={0.15}
          tint="rgba(255,255,255,0.65)"
          parallax
          style={{
            width: knob,
            height: knob,
            transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            transition: `transform 0.2s ${spring.default}`,
          }}
        />
      </span>
    </div>
  )
}
