import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export interface GlassNavbarProps {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
  onBack?: () => void
}

export function GlassNavbar({ title, left, right, onBack }: GlassNavbarProps) {
  return (
    <LiquidGlass
      radius={20}
      bezelWidth={18}
      glassThickness={80}
      refractionScale={0.9}
      blur={0.3}
      tint="rgba(255,255,255,0.05)"
      style={{ width: '100%', padding: '0 16px', height: 52 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ minWidth: 60, display: 'flex', alignItems: 'center' }}>
          {left || (
            onBack && (
              <button
                onClick={onBack}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#fff',
                  fontSize: 18,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  opacity: 0.8,
                }}
              >
                ‹ 返回
              </button>
            )
          )}
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 600,
            fontFamily: fontStack,
            letterSpacing: -0.3,
            textAlign: 'center',
          }}
        >
          {title}
        </h1>
        <div style={{ minWidth: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {right}
        </div>
      </div>
    </LiquidGlass>
  )
}
