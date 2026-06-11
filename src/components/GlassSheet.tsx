import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'

export interface GlassSheetAction {
  label: string
  onClick: () => void
  /** 销毁性操作（红色文字） */
  destructive?: boolean
  /** 取消按钮（加粗） */
  cancel?: boolean
}

export interface GlassSheetProps {
  /** 是否显示 */
  open: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 标题 */
  title?: string
  /** 自定义内容（当有 children 时 action 列表隐藏） */
  children?: ReactNode
  /** 操作按钮列表（iOS Action Sheet 风格） */
  actions?: GlassSheetAction[]
  /** 弹起高度：'auto'(默认半屏) | 'half'(刚好半屏) | 'full'(几乎全屏) */
  detent?: 'auto' | 'half' | 'full'
}

/**
 * GlassSheet — 底部弹出面板 / Action Sheet。
 * 对标 UISheetPresentationController / .confirmationDialog。
 * 支持 detent 切换、touch drag 拖拽关闭、action 按钮列表。
 */
export function GlassSheet({
  open,
  onClose,
  title,
  children,
  actions,
  detent = 'auto',
}: GlassSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const translateRef = useRef(0)
  const [visible, setVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const [dragging, setDragging] = useState(false)

  // 打开/关闭动画
  useEffect(() => {
    if (open) {
      setVisible(true)
      // 下一个 tick 触发入场动画
      requestAnimationFrame(() => {
        setTranslateY(0)
      })
    } else {
      setTranslateY(300)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setTranslateY(300)
    } else {
      // 重置拖拽偏移
      translateRef.current = 0
      setTranslateY(0)
    }
  }, [open])

  // Escape 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 禁止背景滚动
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
          background: open ? 'rgba(0,0,0,0.4)' : 'transparent',
          backdropFilter: open ? 'blur(10px)' : 'none',
          opacity: open ? 1 : 0,
          transition: `all 0.3s ease`,
          WebkitBackdropFilter: open ? 'blur(10px)' : 'none',
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
          transform: `translateY(${translateY}px)`,
          transition: dragging
            ? 'none'
            : `transform 0.4s ${spring.gentle}, opacity 0.3s ease`,
          opacity: open ? 1 : 0,
          touchAction: 'none',
          userSelect: 'none',
          maxHeight: detent === 'full' ? '92vh' : detent === 'half' ? '55vh' : '75vh',
        }}
      >
        <LiquidGlass
          radius={radii.sheet}
          bezelWidth={28}
          glassThickness={120}
          refractionScale={0.9}
          blur={0.4}
          tint="rgba(30,30,40,0.85)"
          style={{
            width: '100%',
            minWidth: 340,
            maxWidth: 500,
            margin: '0 auto',
            padding: '8px 0 28px',
            flexDirection: 'column',
            fontFamily: fontStack,
            color: '#fff',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
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
                background: 'rgba(255,255,255,0.3)',
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
                color: '#fff',
              }}
            >
              {title}
            </h3>
          )}

          {/* 自定义内容 */}
          {children && (
            <div style={{ padding: '12px 20px 0' }}>{children}</div>
          )}

          {/* Action 列表（iOS Action Sheet 风格） */}
          {showActions && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: title ? 12 : 4,
              }}
            >
              {actions.map((action, i) => {
                const isCancel = action.cancel
                return (
                  <button
                    key={i}
                    onClick={() => {
                      action.onClick()
                      onClose()
                    }}
                    style={{
                      border: 'none',
                      borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
                      background: 'none',
                      color: action.destructive ? '#ff453a' : '#fff',
                      fontSize: isCancel ? 17 : 15,
                      fontWeight: isCancel ? 700 : 400,
                      padding: '14px 20px',
                      cursor: 'pointer',
                      fontFamily: fontStack,
                      letterSpacing: -0.2,
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
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
