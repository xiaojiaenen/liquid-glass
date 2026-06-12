import { useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface SidebarItem {
  icon: string
  label: string
  value: string
  badge?: number
}

export interface GlassSidebarProps {
  items: SidebarItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  side?: 'left' | 'right'
  defaultCollapsed?: boolean
  expandedWidth?: number
  collapsedWidth?: number
  footer?: ReactNode
}

/**
 * GlassSidebar — 液态玻璃侧边栏。
 * 主题感知 + 展开/折叠动画。
 */
export function GlassSidebar({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  side = 'left',
  defaultCollapsed = false,
  expandedWidth = 240,
  collapsedWidth = 64,
  footer,
}: GlassSidebarProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [internal, setInternal] = useState(defaultValue)
  const current = controlledValue ?? internal ?? items[0]?.value
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const select = (v: string) => {
    if (controlledValue === undefined) setInternal(v)
    onChange?.(v)
  }

  const w = collapsed ? collapsedWidth : expandedWidth

  return (
    <LiquidGlass
      radius={16}
      bezelWidth={22}
      glassThickness={80}
      refractionScale={0.618}
      blur={0.4}
      tint={tints.card}
      style={{
        width: w,
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: fontStack,
        padding: '8px 0',
        transition: `width 0.32s ${spring.default}`,
        overflow: 'hidden',
      }}
    >
      {/* 折叠切换 */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        style={{
          border: 'none',
          background: 'none',
          color: textColors.primary,
          cursor: 'pointer',
          padding: '10px 0',
          opacity: 0.4,
          transition: `opacity 0.2s ${spring.default}`,
          fontFamily: fontStack,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4' }}
      >
        <span style={{
          display: 'inline-flex',
          transform: collapsed ? (side === 'left' ? 'rotate(0deg)' : 'rotate(180deg)') : (side === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'),
          transition: `transform 0.25s ${spring.default}`,
        }}>
          <GlassIcon name="chevron_right" size="small" color={textColors.secondary} />
        </span>
      </button>

      {/* 菜单项 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 6px' }}>
        {items.map((item) => {
          const active = item.value === current
          return (
            <button
              key={item.value}
              onClick={() => select(item.value)}
              style={{
                border: 'none',
                background: active ? tints.selected : 'none',
                borderRadius: 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: active ? textColors.primary : textColors.secondary,
                fontFamily: fontStack,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                letterSpacing: -0.2,
                transition: `all 0.2s ${spring.default}`,
                width: '100%',
                textAlign: 'left',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              aria-label={item.label}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'none' }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && (
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span style={{
                  background: 'rgba(255,69,58,0.7)',
                  borderRadius: 9,
                  padding: '0 6px',
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: '18px',
                  color: '#fff',
                  minWidth: 18,
                  textAlign: 'center',
                }}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 底部插槽 */}
      {footer && (
        <div style={{
          padding: collapsed ? '8px 0' : '8px 12px',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderTop: `0.5px solid ${borderColors.separator}`,
        }}>
          {footer}
        </div>
      )}
    </LiquidGlass>
  )
}
