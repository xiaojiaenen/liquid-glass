import { useEffect, useMemo, useRef, useState } from 'react'
import {
  generateDisplacementMap,
  type BezelProfile,
  type DisplacementMapResult,
} from './displacementMap'
import { supportsSvgBackdrop } from './capabilities'

export interface UseLiquidGlassOptions {
  radius: number
  bezel: number
  profile?: BezelProfile
  /** 折射强度倍率,作用于 feDisplacementMap 的 scale */
  strength?: number
}

export interface LiquidGlassState {
  ref: React.RefObject<HTMLDivElement>
  map: DisplacementMapResult | null
  /** 实际用于滤镜的 scale */
  scale: number
  supported: boolean
  size: { width: number; height: number }
}

/**
 * 观测元素尺寸,按需(防抖)重建位移贴图。
 * 尺寸/圆角/棱镜变化都会触发重建,因此任意大小都能正确折射。
 */
export function useLiquidGlass(opts: UseLiquidGlassOptions): LiquidGlassState {
  const { radius, bezel, profile = 'squircle', strength = 1 } = opts
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [map, setMap] = useState<DisplacementMapResult | null>(null)
  const supported = useMemo(() => supportsSvgBackdrop(), [])

  // 用 ResizeObserver 跟踪尺寸,rAF 防抖避免抖动期间疯狂重算
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

  // 尺寸或参数变化时重建贴图
  useEffect(() => {
    if (!supported || size.width === 0 || size.height === 0) return
    const result = generateDisplacementMap({
      width: size.width,
      height: size.height,
      radius,
      bezel,
      profile,
    })
    setMap(result)
  }, [supported, size.width, size.height, radius, bezel, profile])

  const scale = map ? map.maxDisplacement * strength : 0

  return { ref, map, scale, supported, size }
}
