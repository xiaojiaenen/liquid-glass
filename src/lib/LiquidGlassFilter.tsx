import type { LiquidGlassMaps } from './displacementMap'

interface LiquidGlassFilterProps {
  id: string
  maps: LiquidGlassMaps
  scale: number
  /** 高斯模糊半径,模拟磨砂厚度 */
  blur?: number
}

/**
 * 按文章描述的滤镜管线:
 *  feImage(位移贴图) → feDisplacementMap 折射背景
 *  feImage(高光贴图) → feBlend(screen) 叠加 rim light
 *  feGaussianBlur 增加磨砂厚度感(默认接近 0,保持玻璃清晰)
 *
 * backdrop-filter 不会自动贴合尺寸,feImage 必须用元素实际宽高。
 */
export function LiquidGlassFilter({
  id,
  maps,
  scale,
  blur = 0,
}: LiquidGlassFilterProps) {
  return (
    <svg
      aria-hidden
      width={maps.width}
      height={maps.height}
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
          {/* 位移贴图 */}
          <feImage
            href={maps.displacementUrl}
            x="0"
            y="0"
            width={maps.width}
            height={maps.height}
            result="dispMap"
            preserveAspectRatio="none"
          />
          {/* 折射背景 */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="dispMap"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />
          {/* 磨砂模糊 */}
          <feGaussianBlur in="refracted" stdDeviation={blur} result="blurred" />
          {/* 高光贴图 */}
          <feImage
            href={maps.specularUrl}
            x="0"
            y="0"
            width={maps.width}
            height={maps.height}
            result="specMap"
            preserveAspectRatio="none"
          />
          {/* 叠加 rim light */}
          <feBlend in="blurred" in2="specMap" mode="screen" />
        </filter>
      </defs>
    </svg>
  )
}
