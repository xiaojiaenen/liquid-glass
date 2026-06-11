import { LiquidGlass } from '../lib/LiquidGlass'

const apps = ['🧭', '📷', '🎵', '✉️', '🗓️', '⚙️']

export function Dock() {
  return (
    <LiquidGlass
      radius={28}
      bezel={16}
      strength={1.6}
      blur={0}
      tint="rgba(255,255,255,0.16)"
      style={{ padding: '12px 16px', gap: 14 }}
    >
      <div style={{ display: 'flex', gap: 14 }}>
        {apps.map((icon, i) => (
          <div
            key={i}
            style={{
              width: 52,
              height: 52,
              display: 'grid',
              placeItems: 'center',
              fontSize: 28,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.14)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            {icon}
          </div>
        ))}
      </div>
    </LiquidGlass>
  )
}
