import type { LiquidGlassMaps } from './displacementMap'

interface LiquidGlassFilterProps {
  id: string
  maps: LiquidGlassMaps
  /** feDisplacementMap 的 scale,参考实现用 30~50 */
  scale?: number
  /** 预模糊 */
  blur?: number
  /** 饱和度增益 */
  saturate?: number
}

/**
 * 滤镜链(移植自参考实现):
 *  feGaussianBlur 预模糊
 *  → feImage(位移贴图) → feDisplacementMap 折射背景
 *  → feColorMatrix 提升饱和度
 *  → feImage(高光贴图) → feComponentTransfer 控制高光强度
 *  → feBlend(screen) 叠加 rim light
 */
export function LiquidGlassFilter({
  id,
  maps,
  scale = 40,
  blur = 0.5,
  saturate = 1.3,
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
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blurred" />
          <feImage
            href={maps.displacementUrl}
            x="0"
            y="0"
            width={maps.width}
            height={maps.height}
            result="displacement_map"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="blurred"
            in2="displacement_map"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values={String(saturate)}
            result="displaced_saturated"
          />
          <feImage
            href={maps.specularUrl}
            x="0"
            y="0"
            width={maps.width}
            height={maps.height}
            result="specular_layer"
            preserveAspectRatio="none"
          />
          <feComponentTransfer in="specular_layer" result="specular_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend in="specular_faded" in2="displaced_saturated" mode="screen" />
        </filter>
      </defs>
    </svg>
  )
}
