import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'

export interface GlassTabBarItem {
  icon: string
  label: string
  value: string
}

export interface GlassTabBarProps {
  items: GlassTabBarItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

/**
 * GlassTabBar — 底部标签栏。
 * 选中项用液态玻璃滑块指示。
 */
export function GlassTabBar({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
}: GlassTabBarProps) {
  const current = controlledValue ?? defaultValue ?? items[0]?.value
  const activeIdx = items.findIndex((i) => i.value === current)

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
      <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
        {/* 选中指示器 */}
        <div
          style={{
            position: 'absolute', top: 0,
            left: `calc(${activeIdx} * (60px + 0px))`,
            width: 60, height: '100%',
            borderRadius: radii.control,
            background: 'rgba(255,255,255,0.1)',
            transition: `left 0.35s ${spring.default}`,
            pointerEvents: 'none',
          }}
        />
        {items.map((item) => {
          const active = item.value === current
          return (
            <button
              key={item.value}
              onClick={() => onChange?.(item.value)}
              style={{
                position: 'relative',
                border: 'none',
                background: 'none',
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
                  position: 'relative',
                  zIndex: 1,
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
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
