import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii, spring } from '../lib/tokens'

export interface GlassEmptyStateProps {
  /** 图标（emoji 或 SVG） */
  icon?: React.ReactNode
  /** 主标题 */
  title: string
  /** 副标题（可选） */
  subtitle?: string
  /** 操作按钮文本（可选） */
  actionLabel?: string
  /** 操作回调 */
  onAction?: () => void
}

/**
 * GlassEmptyState — 空状态视图。
 * 对标 ContentUnavailableView (iOS 17+)。
 * 图标 + 标题 + 副标题 + 可选操作按钮，居中布局。
 * 按钮复用 LiquidGlass 风格。
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
      bezelWidth={22}
      glassThickness={100}
      refractionScale={0.8}
      blur={0.4}
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
        <button
          onClick={onAction}
          style={{
            marginTop: 24,
            border: 'none',
            borderRadius: radii.pill,
            padding: '10px 24px',
            background: 'rgba(10,132,255,0.3)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: fontStack,
            letterSpacing: -0.2,
            transition: `background 0.25s ${spring.default}, transform 0.2s ${spring.default}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(10,132,255,0.45)'
            e.currentTarget.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(10,132,255,0.3)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
        >
          {actionLabel}
        </button>
      )}
    </LiquidGlass>
  )
}
