import { useState, useRef } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassTooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function GlassTooltip({ content, children, position = 'top' }: GlassTooltipProps) {
  const [show, setShow] = useState(false)
  const timerRef = useRef<number>(0)

  const posMap = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => {
        timerRef.current = window.setTimeout(() => setShow(true), 300)
      }}
      onMouseLeave={() => {
        clearTimeout(timerRef.current)
        setShow(false)
      }}
    >
      {children}
      {show && (
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            ...posMap[position],
            opacity: show ? 1 : 0,
            transition: 'opacity 0.15s ease',
            pointerEvents: 'none',
          }}
        >
          <LiquidGlass
            radius={10}
            bezelWidth={16}
            glassThickness={60}
            refractionScale={0.8}
            blur={0.5}
            tint="rgba(50,50,50,0.85)"
            style={{ padding: '6px 12px' }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', fontFamily: fontStack, color: '#fff' }}>
              {content}
            </span>
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}
