import { useState, useRef, useId, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassTooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

/**
 * GlassTooltip — 液态玻璃工具提示。
 * 对标 macOS tooltip / SwiftUI .help()。
 * 液态玻璃容器 + 弹簧动画 + ARIA tooltip 语义。
 */
export function GlassTooltip({ content, children, position = 'top' }: GlassTooltipProps) {
  const { tints, textColors } = useGlassTheme()
  const [show, setShow] = useState(false)
  const timerRef = useRef<number>(0)
  const tooltipId = useId()

  const posMap: Record<string, React.CSSProperties> = {
    top:    { bottom: '100%', left: 0, right: 0, display: 'flex', justifyContent: 'center', marginBottom: 8 },
    bottom: { top: '100%',    left: 0, right: 0, display: 'flex', justifyContent: 'center', marginTop: 8 },
    left:   { right: '100%',  top: '50%', display: 'flex', alignItems: 'center', marginRight: 8, marginTop: '-0.6em' },
    right:  { left: '100%',   top: '50%', display: 'flex', alignItems: 'center', marginLeft: 8, marginTop: '-0.6em' },
  }

  const handleShow = () => {
    timerRef.current = window.setTimeout(() => setShow(true), 300)
  }

  const handleHide = () => {
    clearTimeout(timerRef.current)
    setShow(false)
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
    >
      <div aria-describedby={show ? tooltipId : undefined}>
        {children}
      </div>
      {show && (
        <div
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 9999,
            ...posMap[position],
            opacity: show ? 1 : 0,
            transform: show ? 'scale(1)' : 'scale(0.95)',
            transition: `all 0.2s ${spring.default}`,
            pointerEvents: 'none',
          }}
        >
          <LiquidGlass
            radius={10}
            bezelWidth={10}
            glassThickness={38}
            refractionScale={0.618}
            blur={0.2}
            tint={tints.modal}
            style={{ padding: '6px 12px' }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', fontFamily: fontStack, color: textColors.primary }}>
              {content}
            </span>
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
