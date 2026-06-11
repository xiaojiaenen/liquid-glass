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

export function GlassModal({ open, onClose, title, children, width = 360 }: GlassModalProps) {
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
        background: open ? 'rgba(0,0,0,0.4)' : 'transparent',
        backdropFilter: open ? 'blur(8px)' : 'none',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: `all 0.3s ${spring.default}`,
      }}
      onClick={onClose}
    >
      <div
        style={{
          transform: `scale(${open ? 1 : 0.9}) translateY(${open ? 0 : 20}px)`,
          opacity: open ? 1 : 0,
          transition: `all 0.35s ${spring.default}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={28}
          bezelWidth={32}
          glassThickness={140}
          refractionScale={1}
          blur={0.4}
          tint="rgba(255,255,255,0.06)"
          style={{ width, padding: 28, flexDirection: 'column' }}
        >
          {title && (
            <h3
              style={{
                margin: '0 0 16px',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: -0.3,
                fontFamily: fontStack,
              }}
            >
              {title}
            </h3>
          )}
          <div style={{ fontFamily: fontStack, fontSize: 14, lineHeight: 1.6 }}>{children}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: 14,
                padding: '8px 20px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: fontStack,
              }}
            >
              确定
            </button>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
