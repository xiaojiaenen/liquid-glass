import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassNotificationProps {
  icon?: string
  iconBg?: string
  app?: string
  time?: string
  title: string
  body: string
  onClick?: () => void
  width?: number | string
}

/**
 * GlassNotification — 液态玻璃通知横幅。
 * 对标 iOS 通知横幅 / UNNotification。
 */
export function GlassNotification({
  icon = '💬',
  iconBg = 'linear-gradient(160deg,#30d158,#34c759)',
  app = '信息',
  time = '现在',
  title,
  body,
  onClick,
  width,
}: GlassNotificationProps) {
  const { tints, textColors } = useGlassTheme()

  return (
    <div
      role="article"
      aria-label={`${app}: ${title}`}
      onClick={onClick}
      style={{
        transition: `filter 0.25s ${spring.default}, transform 0.2s ${spring.default}`,
        cursor: onClick ? 'pointer' : 'default',
        maxWidth: width ?? 380,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.06)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <LiquidGlass
        radius={22}
        bezelWidth={40}
        glassThickness={110}
        refractionScale={1.1}
        blur={0.2}
        tint={tints.default}
        style={{ width: '100%', padding: 14 }}
      >
        <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'flex-start', fontFamily: fontStack }}>
          <div
            aria-hidden="true"
            style={{
              width: 38, height: 38, borderRadius: 9, background: iconBg,
              display: 'grid', placeItems: 'center', fontSize: 19, flexShrink: 0,
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.35)',
            }}
          >
            {icon}
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.6, marginBottom: 3, letterSpacing: 0.2, textTransform: 'uppercase', color: textColors.secondary }}>
              <span>{app}</span>
              <span>{time}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2, color: textColors.primary }}>
              {title}
            </div>
            <div style={{ fontSize: 15, opacity: 0.82, lineHeight: 1.4, letterSpacing: -0.1, color: textColors.secondary }}>
              {body}
            </div>
          </div>
        </div>
      </LiquidGlass>
    </div>
  )
}
