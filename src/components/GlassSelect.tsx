import { useState, useRef, useEffect, useId } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSelectOption {
  label: string
  value: string
}

export interface GlassSelectProps {
  options: GlassSelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  width?: number | string
}

/**
 * GlassSelect — 液态玻璃下拉选择器。
 * 全局统一使用 LiquidGlass。
 */
export function GlassSelect({
  options, value: controlled, onChange, placeholder = '请选择', width = 200,
}: GlassSelectProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const [internal, setInternal] = useState('')
  const selected = controlled ?? internal
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open) }
    else if (e.key === 'ArrowDown' && open) {
      e.preventDefault()
      const idx = options.findIndex((o) => o.value === selected)
      const next = options[(idx + 1) % options.length]
      if (next) select(next.value)
    } else if (e.key === 'ArrowUp' && open) {
      e.preventDefault()
      const idx = options.findIndex((o) => o.value === selected)
      const prev = options[(idx - 1 + options.length) % options.length]
      if (prev) select(prev.value)
    }
  }

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
    setOpen(false)
  }

  const selectedLabel = options.find((o) => o.value === selected)?.label

  return (
    <div ref={ref} style={{ position: 'relative', width }}>
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        style={{ cursor: 'pointer', outline: 'none' }}
      >
        <LiquidGlass
          radius={radii.control}
          bezelWidth={16}
          glassThickness={62}
          refractionScale={0.618}
          blur={0.35}
          tint={tints.control}
          style={{ width: '100%', padding: '0 16px', height: 44 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 17, fontFamily: fontStack, color: selectedLabel ? textColors.primary : textColors.tertiary, letterSpacing: -0.4 }}>
              {selectedLabel || placeholder}
            </span>
            <span
              aria-hidden="true"
              style={{
                fontSize: 10, opacity: 0.4,
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: `transform 0.25s ${spring.default}`,
              }}
            >
              ▼
            </span>
          </div>
        </LiquidGlass>
      </div>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, marginTop: 6,
            animation: `lg-select-open 0.25s ${spring.default} forwards`,
          }}
        >
          <style>{`@keyframes lg-select-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
          <LiquidGlass
            radius={radii.control}
            bezelWidth={16}
            glassThickness={62}
            refractionScale={0.618}
            blur={0.35}
            tint={tints.modal}
            style={{ padding: 6, flexDirection: 'column', fontFamily: fontStack }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                role="option"
                aria-selected={selected === opt.value}
                onClick={() => select(opt.value)}
                style={{
                  padding: '10px 12px', borderRadius: 10, fontSize: 17, fontFamily: fontStack,
                  color: textColors.primary, cursor: 'pointer',
                  background: selected === opt.value ? `${colors.blue}33` : 'transparent',
                  transition: `background 0.2s ${spring.default}`, letterSpacing: -0.4,
                }}
                onMouseEnter={(e) => {
                  if (selected !== opt.value) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  if (selected !== opt.value) (e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                {opt.label}
              </div>
            ))}
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
