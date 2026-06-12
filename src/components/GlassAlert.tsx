import { useEffect, useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassAlertAction {
  label: string
  onClick: () => void
  destructive?: boolean
  bold?: boolean
}

export interface GlassAlertProps {
  open: boolean
  onClose: () => void
  title: string
  message?: string
  actions?: GlassAlertAction[]
  showInput?: boolean
  inputPlaceholder?: string
  confirmText?: string
}

export function GlassAlert({ open, onClose, title, message, actions, showInput = false, inputPlaceholder = '', confirmText = 'delete' }: GlassAlertProps) {
  const { tints, textColors, borderColors, colors } = useGlassTheme()
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => { if (open) { setVisible(true); setInputValue('') } else { const timer = setTimeout(() => setVisible(false), 300); return () => clearTimeout(timer) } }, [open])
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [open, onClose])
  useEffect(() => { if (open) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => { document.body.style.overflow = '' } }, [open])

  if (!visible && !open) return null

  const defaultActions: GlassAlertAction[] = actions ?? [{ label: '取消', onClick: onClose }, { label: '确定', onClick: onClose, bold: true }]
  const inputConfirmed = showInput ? inputValue === confirmText : true

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: open ? 'rgba(0,0,0,0.5)' : 'transparent', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: `all 0.25s ease` }} onClick={onClose}>
      <div style={{ opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(1.1)', transition: `all 0.3s ${spring.default}` }} onClick={(e) => e.stopPropagation()}>
        <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.modal}
          style={{ width: 270, padding: 0, flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '20px 16px 8px', textAlign: 'center', fontFamily: fontStack }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: -0.4, color: textColors.primary }}>{title}</h3>
            {message && <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.45, letterSpacing: -0.1, color: textColors.secondary }}>{message}</p>}
          </div>
          {showInput && (
            <div style={{ padding: '8px 16px 4px' }}>
              <input type="text" placeholder={inputPlaceholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus
                style={{ width: '100%', height: 32, border: `1px solid ${borderColors.default}`, borderRadius: 8, background: 'rgba(255,255,255,0.06)', color: textColors.primary, fontSize: 14, fontFamily: fontStack, padding: '0 10px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          <div style={{ height: 0.5, background: borderColors.default, marginTop: 12 }} />
          <div style={{ display: 'flex' }}>
            {defaultActions.map((action, i) => (
              <button key={i} onClick={() => { if (showInput && !inputConfirmed && i === defaultActions.length - 1) return; action.onClick(); onClose() }}
                style={{
                  flex: 1, border: 'none', borderRight: i < defaultActions.length - 1 ? `0.5px solid ${borderColors.default}` : 'none', background: 'none',
                  color: action.destructive ? colors.red : showInput && !inputConfirmed && i === defaultActions.length - 1 ? textColors.tertiary : colors.blue,
                  fontSize: 17, fontWeight: action.bold ? 600 : 400, fontFamily: fontStack, letterSpacing: -0.4, padding: '12px 0',
                  cursor: showInput && !inputConfirmed && i === defaultActions.length - 1 ? 'default' : 'pointer',
                  transition: `background 0.2s ease, transform 0.15s ${spring.default}`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)' }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
                {action.label}
              </button>
            ))}
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
