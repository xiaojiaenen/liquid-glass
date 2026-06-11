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
      radius={16}
      bezelWidth={16}
      glassThickness={50}
      refractionScale={0.85}
      blur={0.3}
      tint="rgba(255,255,255,0.05)"
      style={{ width: '100%', padding: '0 16px', height: 44 }}
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
                  color: '#0a84ff',
                  fontSize: 17,
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: fontStack,
                  fontWeight: 400,
                  letterSpacing: -0.4,
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
            letterSpacing: -0.4,
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
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
