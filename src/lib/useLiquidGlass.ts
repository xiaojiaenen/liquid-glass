import { useEffect, useMemo, useRef, useState } from 'react'
import {
  generateLiquidGlassMaps,
  type LiquidGlassMaps,
  type BezelProfile,
} from './displacementMap'
import { supportsSvgBackdrop } from './capabilities'

export interface UseLiquidGlassOptions {
  radius: number
  bezelWidth?: number
  glassThickness?: number
  refractiveIndex?: number
  profile?: BezelProfile
  /** 动态光源角度(度)，用于鼠标视差，默认 60 */
  specularAngleDeg?: number
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
  const { radius, bezelWidth, glassThickness, refractiveIndex, profile, specularAngleDeg = 60 } = opts
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [maps, setMaps] = useState<LiquidGlassMaps | null>(null)
  const supported = useMemo(() => supportsSvgBackdrop(), [])

  useEffect(() => {
    const el = ref.current
    if (!el || !supported) return
    let raf = 0
    let debounceTimer: ReturnType<typeof setTimeout> | undefined
    const ro = new ResizeObserver((_entries) => {
      // 用 getBoundingClientRect 获取 border-box 尺寸，
      // 保证位移贴图与 backdrop-filter 作用的表面完全对齐。
      // contentRect 不含 padding，会导致卡片等有 padding 的组件
      // 贴图偏小，bezel 折射区向内偏移，形成「双层容器」错觉。
      const rect = el.getBoundingClientRect()
      cancelAnimationFrame(raf)
      clearTimeout(debounceTimer)
      // 100ms 防抖:拖拽窗口边缘时不频繁重建贴图
      debounceTimer = setTimeout(() => {
        raf = requestAnimationFrame(() => {
          setSize({
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          })
        })
      }, 100)
    })
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(debounceTimer)
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
        specularAngleDeg,
        profile,
      }),
    )
  }, [supported, size.width, size.height, radius, bezelWidth, glassThickness, refractiveIndex, specularAngleDeg, profile])

  return { ref, maps, supported, size }
}
