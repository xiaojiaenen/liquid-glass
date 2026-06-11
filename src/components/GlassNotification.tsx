import { LiquidGlass } from '../lib/LiquidGlass'

export function GlassNotification({
  icon = '💬',
  app = '信息',
  time = '现在',
  title,
  body,
}: {
  icon?: string
  app?: string
  time?: string
  title: string
  body: string
}) {
  return (
    <LiquidGlass
      radius={26}
      bezelWidth={22}
      glassThickness={100}
      scale={34}
      blur={1}
      tint="rgba(255,255,255,0.07)"
      style={{ width: 340, padding: 16 }}
    >
      <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.16)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 2,
            }}
          >
            <span>{app}</span>
            <span>{time}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.4 }}>{body}</div>
        </div>
      </div>
    </LiquidGlass>
  )
}
