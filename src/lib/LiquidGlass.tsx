import { useId, type CSSProperties, type ReactNode } from 'react'
import { useLiquidGlass } from './useLiquidGlass'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import './LiquidGlass.css'

export interface LiquidGlassProps {
  children?: ReactNode
  /** 圆角(px) */
  radius?: number
  /** 棱镜宽度(px),默认 30 */
  bezelWidth?: number
  /** 玻璃厚度(px),默认 150,越大折射越强 */
  glassThickness?: number
  /** 折射率,默认 1.5 */
  refractiveIndex?: number
  /** feDisplacementMap scale,默认 40 */
  scale?: number
  /** 预模糊半径 */
  blur?: number
  /** 折射后饱和度增益 */
  saturate?: number
  /** 着色:半透明背景 */
  tint?: string
  className?: string
  style?: CSSProperties
  as?: 'div' | 'button'
  onClick?: () => void
}

/**
 * 液态玻璃容器。
 * Chromium:backdrop-filter 调用内联 SVG 滤镜(折射 + 高光)。
 * 非 Chromium:自动降级为 blur 毛玻璃(.is-fallback)。
 */
export function LiquidGlass({
  children,
  radius = 28,
  bezelWidth = 30,
  glassThickness = 150,
  refractiveIndex = 1.5,
  scale = 40,
  blur = 0.5,
  saturate = 1.3,
  tint = 'rgba(255, 255, 255, 0.08)',
  className = '',
  style,
  as = 'div',
  onClick,
}: LiquidGlassProps) {
  const reactId = useId()
  const filterId = `lg-${reactId.replace(/[:]/g, '')}`
  const { ref, maps, supported } = useLiquidGlass({
    radius,
    bezelWidth,
    glassThickness,
    refractiveIndex,
  })

  const refractionStyle: CSSProperties =
    supported && maps
      ? {
          backdropFilter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId})`,
        }
      : {}

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      onClick={onClick}
      className={`liquid-glass ${supported ? 'is-glass' : 'is-fallback'} ${className}`}
      style={
        {
          borderRadius: radius,
          '--lg-tint': tint,
          ...style,
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="liquid-glass__refraction"
        style={{ borderRadius: radius, ...refractionStyle }}
      />
      <span
        aria-hidden
        className="liquid-glass__specular"
        style={{ borderRadius: radius }}
      />
      <span className="liquid-glass__content">{children}</span>

      {supported && maps && (
        <LiquidGlassFilter
          id={filterId}
          maps={maps}
          scale={scale}
          blur={blur}
          saturate={saturate}
        />
      )}
    </Tag>
  )
}
