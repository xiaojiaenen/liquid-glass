import { useState, useRef } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassTooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function GlassTooltip({ content, children, position = 'top' }: GlassTooltipProps) {
  const [show, setShow] = useState(false)
  const timerRef = useRef<number>(0)

  // 用 margin 做定位偏移,避免 transform(会创建合成层破坏 backdrop-filter)
  const posMap: Record<string, React.CSSProperties> = {
    top:    { bottom: '100%', left: 0, right: 0, display: 'flex', justifyContent: 'center', marginBottom: 8 },
    bottom: { top: '100%',    left: 0, right: 0, display: 'flex', justifyContent: 'center', marginTop: 8 },
    left:   { right: '100%',  top: '50%', display: 'flex', alignItems: 'center', marginRight: 8, marginTop: '-0.6em' },
    right:  { left: '100%',   top: '50%', display: 'flex', alignItems: 'center', marginLeft: 8, marginTop: '-0.6em' },
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
            transition: `opacity 0.18s ${spring.default}`,
            pointerEvents: 'none',
          }}
        >
          <LiquidGlass
            radius={10}
            bezelWidth={10}
            glassThickness={38}
            refractionScale={0.618}
            blur={0.2}
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
