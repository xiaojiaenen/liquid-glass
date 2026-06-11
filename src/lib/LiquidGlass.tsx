import { useId, type CSSProperties, type ReactNode } from 'react'
import { useLiquidGlass } from './useLiquidGlass'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import type { BezelProfile } from './displacementMap'
import './LiquidGlass.css'

export interface LiquidGlassProps {
  children?: ReactNode
  /** 圆角(px) */
  radius?: number
  /** 棱镜宽度(px):边缘折射区厚度 */
  bezel?: number
  /** 玻璃厚度(px):折射光穿过深度,越大折射越强 */
  thickness?: number
  /** 折射率,文章用 1.5 */
  refractiveIndex?: number
  /** 截面轮廓 */
  profile?: BezelProfile
  /** 折射强度倍率 */
  strength?: number
  /** 磨砂模糊半径 */
  blur?: number
  /** 镜面高光强度 0..1 */
  specularOpacity?: number
  /** 光源方向角(度) */
  specularAngle?: number
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
  bezel = 16,
  thickness,
  refractiveIndex = 1.5,
  profile = 'squircle',
  strength = 1,
  blur = 0,
  specularOpacity = 0.5,
  specularAngle = -60,
  tint = 'rgba(255, 255, 255, 0.1)',
  className = '',
  style,
  as = 'div',
  onClick,
}: LiquidGlassProps) {
  const reactId = useId()
  const filterId = `lg-${reactId.replace(/[:]/g, '')}`
  const { ref, maps, scale, supported } = useLiquidGlass({
    radius,
    bezel,
    thickness,
    refractiveIndex,
    profile,
    strength,
    specularOpacity,
    specularAngle,
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
        <LiquidGlassFilter id={filterId} maps={maps} scale={scale} blur={blur} />
      )}
    </Tag>
  )
}
