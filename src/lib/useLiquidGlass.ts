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
    const ro = new ResizeObserver((_entries) => {
      // 用 getBoundingClientRect 获取 border-box 尺寸，
      // 保证位移贴图与 backdrop-filter 作用的表面完全对齐。
      // contentRect 不含 padding，会导致卡片等有 padding 的组件
      // 贴图偏小，bezel 折射区向内偏移，形成「双层容器」错觉。
      const rect = el.getBoundingClientRect()
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
