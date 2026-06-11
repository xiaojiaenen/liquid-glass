import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'

export interface ContextMenuItem {
  label: string
  icon?: string
  onClick: () => void
  destructive?: boolean
  disabled?: boolean
}

export interface GlassContextMenuProps {
  /** 菜单项列表 */
  items: ContextMenuItem[]
  /** 触发区域（子元素） */
  children: ReactNode
}

/**
 * GlassContextMenu — 上下文菜单。
 * 对标 UIContextMenuInteraction / SwiftUI .contextMenu。
 * 右键（桌面）或长按（触屏）触发。
 */
export function GlassContextMenu({ items, children }: GlassContextMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<number>(0)

  // 点击外部关闭
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    // Escape 关闭
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // 清理长按定时器
  useEffect(() => {
    return () => clearTimeout(longPressTimer.current)
  }, [])

  const showMenu = (clientX: number, clientY: number) => {
    // 计算菜单位置，确保不超出视口
    const menuWidth = 220
    const menuHeight = items.length * 44 + 16
    const x = Math.min(clientX, window.innerWidth - menuWidth - 16)
    const y = Math.min(clientY, window.innerHeight - menuHeight - 16)
    setPos({ x: Math.max(8, x), y: Math.max(8, y) })
    setOpen(true)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    showMenu(e.clientX, e.clientY)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    // 长按检测（触屏）
    if (e.pointerType === 'touch') {
      longPressTimer.current = window.setTimeout(() => {
        showMenu(e.clientX, e.clientY)
      }, 500)
    }
  }

  const handlePointerUp = () => {
    clearTimeout(longPressTimer.current)
  }

  const handlePointerLeave = () => {
    clearTimeout(longPressTimer.current)
  }

  return (
    <div
      ref={triggerRef}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      style={{ display: 'inline-flex' }}
    >
      {children}

      {open && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            zIndex: 10000,
            opacity: open ? 1 : 0,
            transform: `scale(${open ? 1 : 0.95})`,
            transition: `opacity 0.18s ${spring.default}, transform 0.25s ${spring.default}`,
          }}
        >
          <LiquidGlass
            radius={radii.control}
            bezelWidth={14}
            glassThickness={80}
            refractionScale={0.7}
            blur={0.3}
            tint="rgba(50,50,60,0.9)"
            style={{
              minWidth: 200,
              padding: '6px 0',
              flexDirection: 'column',
              fontFamily: fontStack,
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick()
                    setOpen(false)
                  }
                }}
                style={{
                  border: 'none',
                  borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
                  background: 'none',
                  color: item.destructive
                    ? '#ff453a'
                    : item.disabled
                      ? 'rgba(255,255,255,0.25)'
                      : '#fff',
                  fontSize: 14,
                  fontWeight: 400,
                  padding: '10px 16px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: fontStack,
                  letterSpacing: -0.1,
                  transition: `background 0.2s ${spring.default}, transform 0.15s ${spring.snappy}`,
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
              >
                {item.icon && <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
