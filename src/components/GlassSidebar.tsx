import { useState, type ReactNode } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface SidebarItem {
  icon: string
  label: string
  value: string
  badge?: number
}

export interface GlassSidebarProps {
  /** 菜单项 */
  items: SidebarItem[]
  /** 当前选中 */
  value?: string
  /** 默认选中 */
  defaultValue?: string
  /** 切换回调 */
  onChange?: (value: string) => void
  /** 侧边栏位置 */
  side?: 'left' | 'right'
  /** 默认展开 */
  defaultCollapsed?: boolean
  /** 展开宽度(px) */
  expandedWidth?: number
  /** 折叠宽度(px) */
  collapsedWidth?: number
  /** 底部区域（用户头像、设置等） */
  footer?: ReactNode
}

/**
 * GlassSidebar — 液态玻璃侧边栏。
 * 支持展开/折叠、图标+文字菜单、底部插槽。
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
      tint="rgba(30,30,40,0.75)"
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
      {/* 折叠切换按钮 */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        style={{
          border: 'none',
          background: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '10px 0',
          fontSize: 16,
          opacity: 0.4,
          transition: 'opacity 0.2s ease',
          fontFamily: fontStack,
          width: '100%',
        }}
        aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
      >
        {side === 'left' ? (collapsed ? '▶' : '◀') : (collapsed ? '◀' : '▶')}
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
                background: active ? 'rgba(255,255,255,0.08)' : 'none',
                borderRadius: 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                fontFamily: fontStack,
                fontSize: 14,
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
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
        }}>
          {footer}
        </div>
      )}
    </LiquidGlass>
  )
}
