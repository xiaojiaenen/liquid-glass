import { useEffect } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

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
        backdropFilter: open ? 'blur(20px)' : 'none',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: `all 0.25s ease`,
      }}
      onClick={onClose}
    >
      <div
        style={{
          transform: `scale(${open ? 1 : 0.95})`,
          opacity: open ? 1 : 0,
          transition: `all 0.3s ${spring.default}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={20}
          bezelWidth={24}
          glassThickness={120}
          refractionScale={0.95}
          blur={0.4}
          tint="rgba(255,255,255,0.08)"
          style={{ width, padding: '24px 24px 20px', flexDirection: 'column' }}
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
              }}
            >
              好的
            </button>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
