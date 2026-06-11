import { useState, useRef, useEffect } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassSelectOption {
  label: string
  value: string
}

export interface GlassSelectProps {
  options: GlassSelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  width?: number
}

export function GlassSelect({
  options,
  value: controlled,
  onChange,
  placeholder = '请选择',
  width = 200,
}: GlassSelectProps) {
  const [internal, setInternal] = useState('')
  const selected = controlled ?? internal
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const select = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
    setOpen(false)
  }

  const selectedLabel = options.find((o) => o.value === selected)?.label

  return (
    <div ref={ref} style={{ position: 'relative', width }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <LiquidGlass
          radius={14}
          bezelWidth={16}
          glassThickness={65}
          refractionScale={0.85}
          blur={0.2}
          tint="rgba(255,255,255,0.06)"
          style={{ width: '100%', padding: '0 14px', height: 40 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span
              style={{
                fontSize: 14,
                fontFamily: fontStack,
                color: selectedLabel ? '#fff' : 'rgba(255,255,255,0.4)',
                letterSpacing: -0.1,
              }}
            >
              {selectedLabel || placeholder}
            </span>
            <span
              style={{
                fontSize: 10,
                opacity: 0.5,
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: `transform 0.2s ${spring.default}`,
              }}
            >
              ▼
            </span>
          </div>
        </LiquidGlass>
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 6,
            zIndex: 100,
            opacity: open ? 1 : 0,
            transform: `translateY(${open ? 0 : -8}px)`,
            transition: `all 0.2s ${spring.default}`,
          }}
        >
          <LiquidGlass
            radius={16}
            bezelWidth={18}
            glassThickness={80}
            refractionScale={0.9}
            blur={0.3}
            tint="rgba(255,255,255,0.08)"
            style={{ padding: 6, flexDirection: 'column' }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => select(opt.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontFamily: fontStack,
                  color: '#fff',
                  cursor: 'pointer',
                  background: selected === opt.value ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'background 0.15s ease',
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
