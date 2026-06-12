import { useEffect, useRef, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  width?: number
}

/**
 * GlassModal — 液态玻璃模态框。
 * 对标 iOS sheet presentation / .alert。
 * iOS 风格: 从底部滑入 + 弹簧曲线 + 焦点管理。
 */
export function GlassModal({ open, onClose, title, children, width = 320 }: GlassModalProps) {
  const { tints, textColors, borderColors, colors } = useGlassTheme()
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => modalRef.current?.focus(), 50)
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const el = modalRef.current
    if (!el) return
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [open])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'lg-modal-title' : undefined}
      ref={modalRef}
      tabIndex={-1}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: open ? tints.overlay : 'transparent',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: `all 0.25s ${spring.gentle}`,
        outline: 'none',
      }}
      onClick={onClose}
    >
      <div
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: `all 0.35s ${spring.default}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={radii.card}
          bezelWidth={26}
          glassThickness={100}
          refractionScale={0.618}
          blur={0.5}
          tint={tints.modal}
          style={{ width, padding: '20px 20px 14px', flexDirection: 'column' }}
        >
          {title && (
            <h3 id="lg-modal-title" style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 600, letterSpacing: -0.4, fontFamily: fontStack, textAlign: 'center', color: textColors.primary }}>
              {title}
            </h3>
          )}
          <div style={{ fontFamily: fontStack, fontSize: 15, lineHeight: 1.5, textAlign: 'center', color: textColors.secondary }}>
            {children}
          </div>
          <div style={{ display: 'flex', borderTop: `1px solid ${borderColors.default}`, marginTop: 16, paddingTop: 12 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, border: 'none', background: 'none',
                color: colors.blue, fontSize: 17, fontWeight: 400,
                cursor: 'pointer', fontFamily: fontStack, padding: '4px 0',
                letterSpacing: -0.4, borderRadius: 8,
                transition: `background 0.2s ${spring.default}, transform 0.15s ${spring.default}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.blue}1a` }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              好的
            </button>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
