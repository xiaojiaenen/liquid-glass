import type { CSSProperties } from 'react'

export interface GlassDividerProps {
  /** inset 模式: 左右留白(类似 iOS 列表分隔线) */
  inset?: boolean | 'left' | 'right'
  /** 自定义颜色 */
  color?: string
  className?: string
  style?: CSSProperties
}

/**
 * GlassDivider — 液态玻璃风格分隔线。
 * 对标 iOS List Separator / SwiftUI Divider。
 * 半透明折射质感线条。
 */
export function GlassDivider({
  inset = false,
  color = 'rgba(255,255,255,0.08)',
  className = '',
  style,
}: GlassDividerProps) {
  const marginLeft = inset === true || inset === 'left' ? 16 : 0
  const marginRight = inset === true || inset === 'right' ? 16 : 0

  return (
    <div
      className={className}
      style={{
        height: 0.5,
        background: color,
        marginLeft,
        marginRight,
        flexShrink: 0,
        ...style,
      }}
      role="separator"
    />
  )
}
