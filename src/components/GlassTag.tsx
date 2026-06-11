import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassTagProps {
  children: React.ReactNode
  color?: string
  closable?: boolean
  onClose?: () => void
}

export function GlassTag({ children, color = 'rgba(255,255,255,0.1)', closable, onClose }: GlassTagProps) {
  return (
    <LiquidGlass
      radius={10}
      bezelWidth={8}
      glassThickness={35}
      refractionScale={0.7}
      blur={0.1}
      tint={color}
      style={{ padding: '4px 10px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontFamily: fontStack, fontWeight: 500, letterSpacing: -0.1 }}>{children}</span>
        {closable && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.() }}
            style={{
              border: 'none',
              background: 'none',
              color: '#fff',
              fontSize: 12,
              cursor: 'pointer',
              padding: 0,
              opacity: 0.6,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </LiquidGlass>
  )
}
