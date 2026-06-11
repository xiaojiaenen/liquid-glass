import { useEffect, useMemo, useRef, useState } from 'react'
import {
  generateLiquidGlassMaps,
  type LiquidGlassMaps,
} from './displacementMap'
import { supportsSvgBackdrop } from './capabilities'

export interface UseLiquidGlassOptions {
  radius: number
  bezelWidth?: number
  glassThickness?: number
  refractiveIndex?: number
}

export interface LiquidGlassState {
  ref: React.RefObject<HTMLDivElement>
  maps: LiquidGlassMaps | null
  supported: boolean
  size: { width: number; height: number }
}

/**
 * 观测元素尺寸,rAF 防抖后重建位移 + 高光贴图。
 * 尺寸/参数变化都会触发重建,任意大小都正确折射。
 */
export function useLiquidGlass(opts: UseLiquidGlassOptions): LiquidGlassState {
  const { radius, bezelWidth, glassThickness, refractiveIndex } = opts
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [maps, setMaps] = useState<LiquidGlassMaps | null>(null)
  const supported = useMemo(() => supportsSvgBackdrop(), [])

  useEffect(() => {
    const el = ref.current
    if (!el || !supported) return
    let raf = 0
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setSize({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        })
      })
    })
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [supported])

  useEffect(() => {
    if (!supported || size.width === 0 || size.height === 0) return
    setMaps(
      generateLiquidGlassMaps({
        width: size.width,
        height: size.height,
        radius,
        bezelWidth,
        glassThickness,
        refractiveIndex,
      }),
    )
  }, [supported, size.width, size.height, radius, bezelWidth, glassThickness, refractiveIndex])

  return { ref, maps, supported, size }
}
