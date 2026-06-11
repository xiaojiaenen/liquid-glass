import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'

export interface GlassEmptyStateProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

/**
 * GlassEmptyState — 空状态视图。
 * 图标 + 标题 + 副标题 + 可选液态玻璃操作按钮。
 */
export function GlassEmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: GlassEmptyStateProps) {
  return (
    <LiquidGlass
      radius={radii.card}
      bezelWidth={26}
      glassThickness={100}
      refractionScale={0.618}
      blur={0.5}
      tint="rgba(255,255,255,0.03)"
      style={{
        width: 320,
        padding: '48px 28px',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: fontStack,
      }}
    >
      {icon && (
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 16, opacity: 0.8 }}>
          {icon}
        </div>
      )}

      <h3
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -0.3,
          color: '#fff',
        }}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          style={{
            margin: '8px 0 0',
            fontSize: 14,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 240,
          }}
        >
          {subtitle}
        </p>
      )}

      {actionLabel && onAction && (
        <div style={{ marginTop: 24, transition: `transform 0.2s ${spring.default}` }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <LiquidGlass
            as="button"
            onClick={onAction}
            radius={radii.pill}
            bezelWidth={16}
            glassThickness={62}
            refractionScale={0.618}
            blur={0.35}
            tint="rgba(10,132,255,0.25)"
            style={{
              padding: '10px 24px',
              fontFamily: fontStack,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: -0.2,
              color: '#fff',
            }}
          >
            {actionLabel}
          </LiquidGlass>
        </div>
      )}
    </LiquidGlass>
  )
}
