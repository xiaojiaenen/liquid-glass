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
  /** 截面轮廓 */
  profile?: BezelProfile
  /** 折射强度 */
  strength?: number
  /** 磨砂模糊半径 */
  blur?: number
  /** 着色:浅色玻璃用半透明白,深色玻璃用半透明黑 */
  tint?: string
  className?: string
  style?: CSSProperties
  as?: 'div' | 'button'
  onClick?: () => void
}

/**
 * 液态玻璃容器:三层叠加
 *  1. 折射层  backdrop-filter: url(#filter)  —— 弯曲背后内容
 *  2. 着色层  半透明背景色
 *  3. 高光层  inset box-shadow + 渐变,模拟边缘反光
 *
 * 非 Chromium 浏览器自动降级为 blur 毛玻璃(.is-fallback)。
 */
export function LiquidGlass({
  children,
  radius = 28,
  bezel = 16,
  profile = 'squircle',
  strength = 1,
  blur = 0,
  tint = 'rgba(255, 255, 255, 0.12)',
  className = '',
  style,
  as = 'div',
  onClick,
}: LiquidGlassProps) {
  const reactId = useId()
  const filterId = `lg-${reactId.replace(/[:]/g, '')}`
  const { ref, map, scale, supported } = useLiquidGlass({
    radius,
    bezel,
    profile,
    strength,
  })

  const refractionStyle: CSSProperties =
    supported && map
      ? { backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` }
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
      {/* 折射层:实际产生扭曲的伪元素由 CSS 绘制,这里只贴 backdrop-filter */}
      <span
        aria-hidden
        className="liquid-glass__refraction"
        style={{ borderRadius: radius, ...refractionStyle }}
      />
      {/* 高光描边层 */}
      <span
        aria-hidden
        className="liquid-glass__specular"
        style={{ borderRadius: radius }}
      />
      {/* 内容 */}
      <span className="liquid-glass__content">{children}</span>

      {supported && map && (
        <LiquidGlassFilter
          id={filterId}
          map={map}
          scale={scale}
          blur={blur}
        />
      )}
    </Tag>
  )
}
