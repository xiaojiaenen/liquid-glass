import { useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassInputProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  prefix?: ReactNode
  suffix?: ReactNode
  width?: number | string
  disabled?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
}

/**
 * GlassInput — 液态玻璃文本输入。
 * 主题感知文字颜色,亮色/暗色可读性一致。
 */
export function GlassInput({
  placeholder,
  value: controlledValue,
  onChange,
  type = 'text',
  prefix,
  suffix,
  width,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: GlassInputProps) {
  const { tints, textColors } = useGlassTheme()
  const [internal, setInternal] = useState('')
  const [focused, setFocused] = useState(false)
  const value = controlledValue ?? internal

  const handleChange = (v: string) => {
    if (controlledValue === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <LiquidGlass
      radius={radii.control}
      bezelWidth={16}
      glassThickness={62}
      refractionScale={0.618}
      blur={0.35}
      tint={focused ? 'rgba(255,255,255,0.1)' : tints.control}
      disabled={disabled}
      style={{
        width: width || 260,
        padding: '0 16px',
        height: 44,
        transition: `all 0.25s ${spring.default}`,
        outline: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {prefix && <span style={{ opacity: 0.5, flexShrink: 0, display: 'flex', fontSize: 16, color: textColors.secondary }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: textColors.primary,
            fontFamily: fontStack,
            fontSize: 17,
            letterSpacing: -0.4,
            lineHeight: 1,
            opacity: disabled ? 0.4 : 1,
          }}
        />
        {suffix && <span style={{ opacity: 0.5, flexShrink: 0, display: 'flex', fontSize: 16, color: textColors.secondary }}>{suffix}</span>}
      </div>
    </LiquidGlass>
  )
}
