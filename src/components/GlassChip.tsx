import { type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
  onClose?: () => void
  icon?: string
  color?: string
  size?: 'small' | 'medium'
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassChip({ label, selected = false, onClick, onClose, icon, color, size = 'medium', disabled = false, className = '', style }: GlassChipProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const chipColor = color ?? colors.blue
  const isSmall = size === 'small'
  const h = isSmall ? 28 : 34

  return (
    <LiquidGlass as="button" onClick={disabled ? undefined : onClick} radius={h / 2} bezelWidth={selected ? 12 : 10} glassThickness={selected ? 50 : 38} refractionScale={0.618} blur={0.2}
      tint={selected ? `${chipColor}55` : tints.muted} className={className}
      style={{ height: h, padding: `0 ${isSmall ? 12 : 16}px`, fontFamily: fontStack, fontSize: isSmall ? 13 : 14, fontWeight: selected ? 600 : 500, color: selected ? textColors.primary : textColors.secondary, letterSpacing: -0.2, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, transition: `all 0.25s ${spring.default}`, ...style }}>
      {icon && <span style={{ fontSize: isSmall ? 14 : 16 }}>{icon}</span>}
      {label}
      {onClose && (
        <span onClick={(e) => { e.stopPropagation(); onClose() }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: isSmall ? 16 : 18, height: isSmall ? 16 : 18, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', fontSize: isSmall ? 10 : 11, marginLeft: 2, cursor: 'pointer', transition: `background 0.2s ease` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}>✕</span>
      )}
    </LiquidGlass>
  )
}

export interface GlassChipGroupProps {
  chips: Array<{ label: string; value: string; icon?: string }>
  selected?: string[]
  onChange?: (values: string[]) => void
  single?: boolean
  onSingleChange?: (value: string) => void
  clearable?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassChipGroup({ chips, selected = [], onChange, single = false, onSingleChange, clearable = false, className = '', style }: GlassChipGroupProps) {
  const handleClick = (value: string) => { if (single) { onSingleChange?.(value); return }; const newSelected = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]; onChange?.(newSelected) }
  const handleClear = () => { onChange?.([]) }

  return (
    <div className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', ...style }}>
      {chips.map((chip) => (
        <GlassChip key={chip.value} label={chip.label} icon={chip.icon} selected={single ? selected[0] === chip.value : selected.includes(chip.value)} onClick={() => handleClick(chip.value)} />
      ))}
      {clearable && selected.length > 0 && <GlassChip label="清除" onClick={handleClear} icon="✕" color="rgba(255,255,255,0.3)" />}
    </div>
  )
}
