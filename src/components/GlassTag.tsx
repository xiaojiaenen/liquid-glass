import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassTagProps {
  children: React.ReactNode
  color?: string
  closable?: boolean
  onClose?: () => void
}

export function GlassTag({ children, color = 'rgba(255,255,255,0.12)', closable, onClose }: GlassTagProps) {
  return (
    <LiquidGlass
      radius={8}
      bezelWidth={14}
      glassThickness={50}
      refractionScale={0.75}
      blur={0.3}
      tint={color}
      style={{ padding: '4px 10px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 13, fontFamily: fontStack, fontWeight: 500, letterSpacing: -0.2 }}>{children}</span>
        {closable && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.() }}
            style={{
              border: 'none',
              background: 'none',
              color: '#fff',
              fontSize: 11,
              cursor: 'pointer',
              padding: 0,
              opacity: 0.5,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
