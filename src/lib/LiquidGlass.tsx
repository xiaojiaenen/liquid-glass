import { useId, useState, useCallback, type CSSProperties, type ReactNode } from 'react'
import { useLiquidGlass } from './useLiquidGlass'
import { useGlassParallax } from './useGlassParallax'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import type { BezelProfile } from './displacementMap'
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
  /** 折射强度倍率,最终 scale = maxDisplacement × refractionScale,默认 1 */
  refractionScale?: number
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
  /** 表面轮廓,默认 'convex_squircle' */
  profile?: BezelProfile
  /** 启用鼠标视差:高光跟随指针方向,默认 false */
  parallax?: boolean
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
  refractionScale = 1,
  blur = 0.5,
  saturate = 1.3,
  tint = 'rgba(255, 255, 255, 0.03)',
  className = '',
  style,
  as = 'div',
  onClick,
  profile,
  parallax = false,
}: LiquidGlassProps) {
  const reactId = useId()
  const filterId = `lg-${reactId.replace(/[:]/g, '')}`
  const [specularAngle, setSpecularAngle] = useState(60)
  const { ref, maps, supported } = useLiquidGlass({
    radius,
    bezelWidth,
    glassThickness,
    refractiveIndex,
    profile,
    specularAngleDeg: specularAngle,
  })

  const handleAngleChange = useCallback((angle: number) => {
    setSpecularAngle(angle)
  }, [])

  const bindParallax = useGlassParallax(parallax && supported, handleAngleChange)

  // 将 parallax bind 和 ref 组合
  const combinedRef = useCallback(
    (el: HTMLDivElement | null) => {
      // 给父组件的 ref（via useLiquidGlass）
      ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      // 给 parallax 的 ref
      bindParallax(el as unknown as HTMLElement | null)
    },
    [ref, bindParallax],
  )

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
      ref={combinedRef as never}
      onClick={onClick}
      className={`liquid-glass ${supported ? 'is-glass' : 'is-fallback'} ${className}`}
      style={
        {
          borderRadius: radius,
          '--lg-tint': tint,
          ...refractionStyle,
          ...style,
        } as CSSProperties
      }
    >
      <span className="liquid-glass__content">{children}</span>

      {supported && maps && (
        <LiquidGlassFilter
          id={filterId}
          maps={maps}
          /* 边缘位移≈一个 bezel 宽:scale=2×bezel(feDisplacementMap 位移=scale×0.5)。
             用 bezel 而非失控的 maxDisplacement,使折射带宽与位移量匹配,避免窄边被撕扯 */
          scale={2 * bezelWidth * refractionScale}
          blur={blur}
          saturate={saturate}
        />
      )}
    </Tag>
  )
}
