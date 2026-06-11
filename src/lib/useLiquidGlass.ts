import { useEffect, useMemo, useRef, useState } from 'react'
import {
  generateLiquidGlassMaps,
  type BezelProfile,
  type LiquidGlassMaps,
} from './displacementMap'
import { supportsSvgBackdrop } from './capabilities'

export interface UseLiquidGlassOptions {
  radius: number
  bezel: number
  thickness?: number
  refractiveIndex?: number
  profile?: BezelProfile
  /** 折射强度倍率,作用于 scale */
  strength?: number
  specularOpacity?: number
  specularAngle?: number
}

export interface LiquidGlassState {
  ref: React.RefObject<HTMLDivElement>
  maps: LiquidGlassMaps | null
  /** feDisplacementMap 的 scale */
  scale: number
  supported: boolean
  size: { width: number; height: number }
}

/**
 * 观测元素尺寸,按需(rAF 防抖)重建位移 + 高光贴图。
 * 尺寸/参数变化都会触发重建,任意大小都正确折射。
 */
export function useLiquidGlass(opts: UseLiquidGlassOptions): LiquidGlassState {
  const {
    radius,
    bezel,
    thickness,
    refractiveIndex = 1.5,
    profile = 'squircle',
    strength = 1,
    specularOpacity = 0.5,
    specularAngle = -60,
  } = opts
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
    const result = generateLiquidGlassMaps({
      width: size.width,
      height: size.height,
      radius,
      bezel,
      thickness,
      refractiveIndex,
      profile,
      specularOpacity,
      specularAngle,
    })
    setMaps(result)
  }, [
    supported,
    size.width,
    size.height,
    radius,
    bezel,
    thickness,
    refractiveIndex,
    profile,
    specularOpacity,
    specularAngle,
  ])

  // 文章做法:scale 直接复用归一化时的最大位移量
  const scale = maps ? maps.maxDisplacement * strength : 0

  return { ref, maps, scale, supported, size }
}
