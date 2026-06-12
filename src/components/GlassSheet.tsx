import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSheetAction {
  label: string
  onClick: () => void
  destructive?: boolean
  cancel?: boolean
}

export interface GlassSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  actions?: GlassSheetAction[]
  detent?: 'auto' | 'half' | 'full'
}

/**
 * GlassSheet — 底部弹出面板 / Action Sheet。
 * 对标 UISheetPresentationController / .confirmationDialog。
 * iOS 风格: 从底部滑入 + 弹簧曲线 + 拖拽关闭。
 */
export function GlassSheet({
  open,
  onClose,
  title,
  children,
  actions,
  detent = 'auto',
}: GlassSheetProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const sheetRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const translateRef = useRef(0)
  const [visible, setVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      setTranslateY(0)
      translateRef.current = 0
    } else {
      setTranslateY(0)
      const timer = setTimeout(() => setVisible(false), 400)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!visible && !open) return null

  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dy = e.clientY - startYRef.current
    translateRef.current = Math.max(0, dy)
    setTranslateY(translateRef.current)
  }

  const handlePointerUp = () => {
    setDragging(false)
    if (translateRef.current > 120) {
      onClose()
    } else {
      translateRef.current = 0
      setTranslateY(0)
    }
  }

  const showActions = !children && actions && actions.length > 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: open ? tints.overlay : 'transparent',
          opacity: open ? 1 : 0,
          transition: `all 0.35s ${spring.gentle}`,
        }}
      />

      {/* sheet */}
      <div
        ref={sheetRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'relative',
          zIndex: 2,
          opacity: open ? 1 : 0,
          transform: open ? `translateY(${translateY}px)` : 'translateY(100%)',
          transition: dragging ? 'none' : `transform 0.4s ${spring.gentle}, opacity 0.3s ${spring.gentle}`,
          maxHeight: detent === 'full' ? '92vh' : detent === 'half' ? '55vh' : '75vh',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <LiquidGlass
          radius={radii.sheet}
          bezelWidth={26}
          glassThickness={100}
          refractionScale={0.618}
          blur={0.5}
          tint={tints.modal}
          style={{
            width: '100%',
            minWidth: 340,
            maxWidth: 500,
            margin: '0 auto',
            padding: '8px 0 28px',
            flexDirection: 'column',
            fontFamily: fontStack,
            color: textColors.primary,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          {/* 拖拽手柄 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0 4px',
              cursor: 'grab',
            }}
          >
            <span
              style={{
                width: 36,
                height: 5,
                borderRadius: 2.5,
                background: textColors.tertiary,
              }}
            />
          </div>

          {title && (
            <h3
              style={{
                margin: '8px 0 4px',
                padding: '0 20px',
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: -0.3,
                textAlign: 'center',
                color: textColors.primary,
              }}
            >
              {title}
            </h3>
          )}

          {children && (
            <div style={{ padding: '12px 20px 0' }}>{children}</div>
          )}

          {showActions && (
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: title ? 12 : 4 }}>
              {actions.map((action, i) => {
                const isCancel = action.cancel
                return (
                  <button
                    key={i}
                    onClick={() => { action.onClick(); onClose() }}
                    style={{
                      border: 'none',
                      borderTop: i > 0 ? `0.5px solid ${borderColors.separator}` : 'none',
                      background: 'none',
                      color: action.destructive ? textColors.destructive : textColors.primary,
                      fontSize: isCancel ? 17 : 15,
                      fontWeight: isCancel ? 700 : 400,
                      padding: '14px 20px',
                      cursor: 'pointer',
                      fontFamily: fontStack,
                      letterSpacing: -0.2,
                      transition: `background 0.2s ${spring.default}, transform 0.15s ${spring.snappy}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)' }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {action.label}
                  </button>
                )
              })}
            </div>
          )}
        </LiquidGlass>
      </div>
    </div>
  )
}
