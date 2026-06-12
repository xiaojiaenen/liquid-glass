import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface ContextMenuItem {
  label: string
  icon?: string
  onClick: () => void
  destructive?: boolean
  disabled?: boolean
}

export interface GlassContextMenuProps {
  items: ContextMenuItem[]
  children: ReactNode
}

/**
 * GlassContextMenu — 液态玻璃上下文菜单。
 * 全局统一使用 LiquidGlass。
 */
export function GlassContextMenu({ items, children }: GlassContextMenuProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<number>(0)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && triggerRef.current && !triggerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  useEffect(() => { return () => clearTimeout(longPressTimer.current) }, [])

  const showMenu = (clientX: number, clientY: number) => {
    const menuWidth = 220
    const menuHeight = items.length * 44 + 12
    const x = Math.min(clientX, window.innerWidth - menuWidth - 16)
    const y = Math.min(clientY, window.innerHeight - menuHeight - 16)
    setPos({ x: Math.max(8, x), y: Math.max(8, y) })
    setOpen(true)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    showMenu(e.clientX, e.clientY)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') longPressTimer.current = window.setTimeout(() => showMenu(e.clientX, e.clientY), 500)
  }

  return (
    <div ref={triggerRef} onContextMenu={handleContextMenu} onPointerDown={handlePointerDown} onPointerUp={() => clearTimeout(longPressTimer.current)} onPointerLeave={() => clearTimeout(longPressTimer.current)} style={{ display: 'inline-flex' }}>
      {children}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Context menu"
          style={{
            position: 'fixed', left: pos.x, top: pos.y, zIndex: 10000,
            transformOrigin: 'top left',
            animation: `lg-ctx-open 0.2s ${spring.default} forwards`,
          }}
        >
          <style>{`@keyframes lg-ctx-open { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }`}</style>
          <LiquidGlass
            radius={radii.control}
            bezelWidth={14}
            glassThickness={80}
            refractionScale={0.7}
            blur={0.3}
            tint={tints.modal}
            style={{ minWidth: 200, padding: '6px 0', flexDirection: 'column', fontFamily: fontStack }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { if (!item.disabled) { item.onClick(); setOpen(false) } }}
                style={{
                  border: 'none',
                  borderTop: i > 0 ? `0.5px solid ${borderColors.separator}` : 'none',
                  background: 'none',
                  color: item.destructive ? textColors.destructive : item.disabled ? textColors.tertiary : textColors.primary,
                  fontSize: 15, fontWeight: 400, padding: '10px 16px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: fontStack, letterSpacing: -0.2,
                  transition: `background 0.2s ${spring.default}`,
                  width: '100%',
                }}
                onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
              >
                {item.icon && <span aria-hidden="true" style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
