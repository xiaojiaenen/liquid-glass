import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface GlassPopoverProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  content: ReactNode
  placement?: PopoverPlacement
  offset?: number
  width?: number | string
  arrow?: boolean
  style?: CSSProperties
}

/**
 * GlassPopover — 液态玻璃弹出层。
 * 全局统一使用 LiquidGlass。
 */
export function GlassPopover({
  open, onClose, children, content,
  placement = 'bottom', offset = 8, width = 'auto', arrow = true, style,
}: GlassPopoverProps) {
  const { tints } = useGlassTheme()
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [actualPlacement, setActualPlacement] = useState(placement)

  useEffect(() => {
    if (open) {
      setVisible(true)
      requestAnimationFrame(() => {
        const trigger = triggerRef.current
        const popover = popoverRef.current
        if (!trigger || !popover) return
        const triggerRect = trigger.getBoundingClientRect()
        const popoverRect = popover.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight
        let x = 0, y = 0, arrowX = 0, arrowY = 0
        let finalPlacement = placement
        const calcPos = (p: PopoverPlacement) => {
          switch (p) {
            case 'bottom': x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2; y = triggerRect.bottom + offset; arrowX = triggerRect.left + triggerRect.width / 2 - (x || 0); arrowY = -6; break
            case 'top': x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2; y = triggerRect.top - popoverRect.height - offset; arrowX = triggerRect.left + triggerRect.width / 2 - (x || 0); arrowY = popoverRect.height + 6; break
            case 'left': x = triggerRect.left - popoverRect.width - offset; y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2; arrowX = popoverRect.width + 6; arrowY = triggerRect.top + triggerRect.height / 2 - (y || 0); break
            case 'right': x = triggerRect.right + offset; y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2; arrowX = -6; arrowY = triggerRect.top + triggerRect.height / 2 - (y || 0); break
          }
        }
        calcPos(placement)
        if (placement === 'bottom' && y + popoverRect.height > vh - 16) { finalPlacement = 'top'; calcPos('top') }
        else if (placement === 'top' && y < 16) { finalPlacement = 'bottom'; calcPos('bottom') }
        else if (placement === 'left' && x < 16) { finalPlacement = 'right'; calcPos('right') }
        else if (placement === 'right' && x + popoverRect.width > vw - 16) { finalPlacement = 'left'; calcPos('left') }
        x = Math.max(8, Math.min(x, vw - popoverRect.width - 8))
        y = Math.max(8, Math.min(y, vh - popoverRect.height - 8))
        setPos({ x, y }); setArrowPos({ x: arrowX, y: arrowY }); setActualPlacement(finalPlacement)
      })
    } else {
      const timer = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [open, placement, offset])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) && triggerRef.current && !triggerRef.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-flex' }}>{children}</div>
      {visible && (
        <div
          ref={popoverRef}
          style={{
            position: 'fixed', left: pos.x, top: pos.y, zIndex: 10001,
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.9)',
            transition: `all 0.2s ${spring.default}`,
            transformOrigin: actualPlacement === 'bottom' ? 'top center' : actualPlacement === 'top' ? 'bottom center' : actualPlacement === 'left' ? 'right center' : 'left center',
            ...style,
          }}
        >
          <LiquidGlass
            radius={radii.control}
            bezelWidth={20}
            glassThickness={80}
            refractionScale={0.618}
            blur={0.35}
            tint={tints.modal}
            style={{ width, padding: 8, flexDirection: 'column', fontFamily: fontStack }}
          >
            {content}
          </LiquidGlass>
          {arrow && (
            <div style={{
              position: 'absolute',
              ...(actualPlacement === 'bottom' ? { top: -6, left: arrowPos.x, transform: 'translateX(-50%) rotate(45deg)' } : {}),
              ...(actualPlacement === 'top' ? { bottom: -6, left: arrowPos.x, transform: 'translateX(-50%) rotate(45deg)' } : {}),
              ...(actualPlacement === 'left' ? { right: -6, top: arrowPos.y, transform: 'translateY(-50%) rotate(45deg)' } : {}),
              ...(actualPlacement === 'right' ? { left: -6, top: arrowPos.y, transform: 'translateY(-50%) rotate(45deg)' } : {}),
              width: 12, height: 12, background: tints.modal, zIndex: -1,
            }} />
          )}
        </div>
      )}
    </>
  )
}
