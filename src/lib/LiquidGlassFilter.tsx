import type { DisplacementMapResult } from './displacementMap'

interface LiquidGlassFilterProps {
  id: string
  map: DisplacementMapResult
  scale: number
  /** 高斯模糊半径,模拟磨砂厚度 */
  blur?: number
}

/**
 * 内联 SVG 滤镜定义。
 * feImage 载入位移贴图 → feDisplacementMap 按 R/G 通道推开背景 →
 * feGaussianBlur 增加磨砂厚度感。
 *
 * 注意:backdrop-filter 不会自动贴合元素尺寸,因此 feImage 必须用元素实际宽高。
 */
export function LiquidGlassFilter({
  id,
  map,
  scale,
  blur = 1,
}: LiquidGlassFilterProps) {
  return (
    <svg
      aria-hidden
      width={map.width}
      height={map.height}
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id={id}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={map.dataUrl}
            x="0"
            y="0"
            width={map.width}
            height={map.height}
            result="dispMap"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="dispMap"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation={blur} />
        </filter>
      </defs>
    </svg>
  )
}
