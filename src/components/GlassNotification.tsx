import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack } from '../lib/tokens'

export function GlassNotification({
  icon = '💬',
  iconBg = 'linear-gradient(160deg,#30d158,#34c759)',
  app = '信息',
  time = '现在',
  title,
  body,
}: {
  icon?: string
  iconBg?: string
  app?: string
  time?: string
  title: string
  body: string
}) {
  return (
    <LiquidGlass
      radius={22}
      bezelWidth={20}
      glassThickness={90}
      refractionScale={1}
      blur={0.6}
      tint="rgba(255,255,255,0.06)"
      style={{ width: 340, padding: 14 }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          width: '100%',
          alignItems: 'flex-start',
          fontFamily: fontStack,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            background: iconBg,
            display: 'grid',
            placeItems: 'center',
            fontSize: 19,
            flexShrink: 0,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.35)',
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
              opacity: 0.6,
              marginBottom: 3,
              letterSpacing: 0.2,
              textTransform: 'uppercase',
            }}
          >
            <span>{app}</span>
            <span>{time}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>
            {title}
          </div>
          <div style={{ fontSize: 14, opacity: 0.82, lineHeight: 1.4, letterSpacing: -0.1 }}>
            {body}
          </div>
        </div>
      </div>
    </LiquidGlass>
  )
}
