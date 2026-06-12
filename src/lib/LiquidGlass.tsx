import { useId, useState, useCallback, forwardRef, type CSSProperties, type ReactNode, type ElementType } from 'react'
import { useLiquidGlass } from './useLiquidGlass'
import { useGlassParallax } from './useGlassParallax'
import { useBorderGlow, type BorderGlowOptions } from './useBorderGlow'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import type { BezelProfile } from './displacementMap'
import './LiquidGlass.css'
import './BorderGlow.css'

// ── Props 类型：继承原生 HTML 属性 ──

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
  /** 渲染为指定 HTML 元素或自定义组件,默认 'div' */
  as?: ElementType
  /** 表面轮廓,默认 'convex_squircle' */
  profile?: BezelProfile
  /** 启用鼠标视差:高光跟随指针方向,默认 false */
  parallax?: boolean
  /** 背景模糊(px):与折射合并在同一个 backdrop-filter 中,避免嵌套冲突。默认 0 = 无 */
  backdropBlur?: number
  /** 禁用状态 */
  disabled?: boolean
  /** 样式（覆盖优先级最高） */
  style?: CSSProperties
  /** 类名 */
  className?: string
  /** 点击事件 */
  onClick?: (e: React.MouseEvent) => void
  /** ARIA role */
  role?: string
  /** tabIndex */
  tabIndex?: number
  /** 边框发光效果配置，true 使用默认配置 */
  borderGlow?: boolean | BorderGlowOptions
  /** 透传所有 data-* / aria-* / id 等原生属性 */
  [key: string]: any
}

/**
 * 液态玻璃容器。
 * Chromium:backdrop-filter 调用内联 SVG 滤镜(折射 + 高光)。
 * 非 Chromium:自动降级为 blur 毛玻璃(.is-fallback)。
 *
 * 支持任意 HTML 元素：<LiquidGlass as="aside" className="...">
 * 支持 ref 转发：<LiquidGlass ref={someRef}>
 * 所有原生 HTML 属性自动透传：className, id, onClick, aria-*, data-*, ...
 */
export const LiquidGlass = forwardRef<HTMLElement, LiquidGlassProps>(function LiquidGlass(
  {
    children,
    radius = 28,
    bezelWidth = 30,
    glassThickness = 150,
    refractiveIndex = 1.5,
    refractionScale = 1,
    blur = 0.5,
    saturate = 1.3,
    tint = 'rgba(255, 255, 255, 0.03)',
    as,
    profile,
    parallax = false,
    backdropBlur = 0,
    borderGlow = false,
    disabled = false,
    className = '',
    style,
    onClick,
    role,
    tabIndex,
    ...restProps
  },
  ref,
) {
  const reactId = useId()
  const filterId = `lg-${reactId.replace(/[:]/g, '')}`
  const [specularAngle, setSpecularAngle] = useState(60)
  const { ref: internalRef, maps, supported } = useLiquidGlass({
    radius,
    bezelWidth,
    glassThickness,
    refractiveIndex,
    profile,
    specularAngleDeg: specularAngle,
  })

  // BorderGlow 配置
  const borderGlowEnabled = borderGlow !== false
  const borderGlowOptions = typeof borderGlow === 'object' ? borderGlow : {}
  const { ref: borderGlowRef, borderGlowProps } = useBorderGlow({
    enabled: borderGlowEnabled && !disabled,
    ...borderGlowOptions,
  })

  const handleAngleChange = useCallback((angle: number) => {
    setSpecularAngle(angle)
  }, [])

  const bindParallax = useGlassParallax(parallax && supported && !disabled, handleAngleChange)

  const combinedRef = useCallback(
    (el: HTMLElement | null) => {
      ;(internalRef as React.MutableRefObject<HTMLElement | null>).current = el
      ;(borderGlowRef as React.MutableRefObject<HTMLElement | null>).current = el
      bindParallax(el)
      // 转发 ref
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
      }
    },
    [internalRef, borderGlowRef, bindParallax, ref],
  )

  const refractionStyle: CSSProperties =
    supported && maps
      ? {
          backdropFilter: `${backdropBlur > 0 ? `blur(${backdropBlur}px) ` : ''}url(#${filterId})`,
          WebkitBackdropFilter: `${backdropBlur > 0 ? `blur(${backdropBlur}px) ` : ''}url(#${filterId})`,
        }
      : {}

  const Tag: ElementType = as ?? 'div'

  return (
    <Tag
      ref={combinedRef}
      onClick={disabled ? undefined : onClick}
      onPointerMove={borderGlowProps.onPointerMove}
      role={role}
      tabIndex={tabIndex}
      aria-disabled={disabled || restProps['aria-disabled']}
      className={`liquid-glass ${supported ? 'is-glass' : 'is-fallback'} ${disabled ? 'is-disabled' : ''} ${borderGlowProps.className} ${className}`}
      style={
        {
          borderRadius: radius,
          '--lg-tint': tint,
          ...refractionStyle,
          ...borderGlowProps.style,
          ...style,
        } as CSSProperties
      }
      {...(Tag === 'button' ? { type: 'button' } : {})}
      {...restProps}
    >
      <span className="liquid-glass__content">{children}</span>

      {borderGlowEnabled && <span className="border-glow-edge" />}

      {supported && maps && (
        <LiquidGlassFilter
          id={filterId}
          maps={maps}
          scale={2 * bezelWidth * refractionScale}
          blur={blur}
          saturate={saturate}
        />
      )}
    </Tag>
  )
})
