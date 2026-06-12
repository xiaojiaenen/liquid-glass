import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'

export interface GlassPageControlProps {
  count: number
  current?: number
  onChange?: (page: number) => void
}

/**
 * GlassPageControl — 页面指示器。
 * 当前页为液态玻璃胶囊形，其余为半透明小圆。
 */
export function GlassPageControl({
  count,
  current = 0,
  onChange,
}: GlassPageControlProps) {
  if (count <= 1) return null

  return (
    <LiquidGlass
      radius={14}
      bezelWidth={12}
      glassThickness={40}
      refractionScale={0.5}
      blur={0.2}
      tint="rgba(0,0,0,0.25)"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === current
        return (
          <button
            key={i}
            onClick={() => onChange?.(i)}
            aria-label={`第 ${i + 1} 页`}
            aria-current={isActive ? 'page' : undefined}
            style={{
              width: isActive ? 20 : 6,
              height: 6,
              borderRadius: 3,
              border: 'none',
              padding: 0,
              cursor: onChange ? 'pointer' : 'default',
              background: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
              transition: `all 0.35s ${spring.default}`,
            }}
          />
        )
      })}
    </LiquidGlass>
  )
}
