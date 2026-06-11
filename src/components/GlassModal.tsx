import { useEffect } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'

export interface GlassModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  width?: number
}

export function GlassModal({ open, onClose, title, children, width = 320 }: GlassModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: open ? 'rgba(0,0,0,0.5)' : 'transparent',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: `all 0.25s ease`,
      }}
      onClick={onClose}
    >
      <div
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity 0.3s ${spring.default}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={radii.card}
          bezelWidth={26}
          glassThickness={100}
          refractionScale={0.618}
          blur={0.5}
          tint="rgba(255,255,255,0.08)"
          style={{
            width,
            padding: '20px 20px 14px',
            flexDirection: 'column',
            transition: `opacity 0.3s ${spring.default}`,
          }}
        >
          {title && (
            <h3
              style={{
                margin: '0 0 8px',
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: -0.4,
                fontFamily: fontStack,
                textAlign: 'center',
              }}
            >
              {title}
            </h3>
          )}
          <div style={{ fontFamily: fontStack, fontSize: 13, lineHeight: 1.5, textAlign: 'center', opacity: 0.8 }}>
            {children}
          </div>
          <div
            style={{
              display: 'flex',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              marginTop: 16,
              paddingTop: 12,
            }}
          >
            <button
              onClick={onClose}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                color: '#0a84ff',
                fontSize: 17,
                fontWeight: 400,
                cursor: 'pointer',
                fontFamily: fontStack,
                padding: '4px 0',
                letterSpacing: -0.4,
                borderRadius: 8,
                transition: `background 0.2s ease, transform 0.15s ${spring.default}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(10,132,255,0.1)' }}
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
