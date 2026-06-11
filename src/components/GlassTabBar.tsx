import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'

export interface GlassTabBarItem {
  icon: string
  label: string
  value: string
}

export interface GlassTabBarProps {
  /** 标签项列表 */
  items: GlassTabBarItem[]
  /** 当前选中值 */
  value?: string
  /** 默认选中值 */
  defaultValue?: string
  /** 切换回调 */
  onChange?: (value: string) => void
}

/**
 * GlassTabBar — 底部标签栏。
 * 对标 UITabBar / SwiftUI TabView。
 * 图标 + 文字，选中态高亮，放在液态玻璃容器中。
 * 注意：与 GlassTabs（顶部标签）区分。
 */
export function GlassTabBar({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
}: GlassTabBarProps) {
  const current = controlledValue ?? defaultValue ?? items[0]?.value

  if (items.length === 0) return null

  return (
    <LiquidGlass
      radius={radii.card}
      bezelWidth={22}
      glassThickness={100}
      refractionScale={0.8}
      blur={0.4}
      tint="rgba(255,255,255,0.04)"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
        padding: '6px 4px',
        fontFamily: fontStack,
      }}
    >
      {items.map((item) => {
        const active = item.value === current
        return (
          <button
            key={item.value}
            onClick={() => onChange?.(item.value)}
            style={{
              border: 'none',
              background: active ? 'rgba(255,255,255,0.08)' : 'none',
              borderRadius: radii.control,
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minWidth: 60,
              transition: `all 0.3s ${spring.default}`,
              fontFamily: fontStack,
            }}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            <span
              style={{
                fontSize: 20,
                lineHeight: 1.2,
                filter: active ? 'none' : 'saturate(0.5) brightness(0.7)',
                transition: `filter 0.3s ${spring.gentle}`,
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                letterSpacing: 0.05,
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                transition: `color 0.3s ${spring.gentle}`,
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </LiquidGlass>
  )
}
