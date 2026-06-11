import { useCallback, useEffect, useRef } from 'react'

/**
 * useGlassParallax — 鼠标视差交互 (macOS 风格 360° rim light)。
 * 监听容器上的 pointermove，计算鼠标相对容器中心的偏移，
 * 通过回调输出当前光源角度（度），供 displacementMap 的 specular 用。
 *
 * 鼠标在左侧 → 角度 180°（左侧亮）、在右侧 → 0°（右侧亮）、
 * 在下方 → 90°（底部亮）、在上方 → 270°（顶部亮）。
 * 全覆盖 0°~360° 圆周。
 */
export function useGlassParallax(
  enabled: boolean,
  onAngleChange: (angleDeg: number) => void,
) {
  const elRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef(0)
  const angleRef = useRef(60)
  const cleanupRef = useRef<(() => void) | null>(null)
  const onAngleChangeRef = useRef(onAngleChange)
  onAngleChangeRef.current = onAngleChange

  const bind = useCallback(
    (el: HTMLElement | null) => {
      elRef.current = el
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
      cancelAnimationFrame(rafRef.current)

      if (!el || !enabled) return

      const onPointerMove = (e: PointerEvent) => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          // atan2 返回 -180~180，转为 0~360
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI
          angle = ((angle % 360) + 360) % 360
          if (Math.abs(angle - angleRef.current) > 2) {
            angleRef.current = angle
            onAngleChangeRef.current(angle)
          }
        })
      }

      el.addEventListener('pointermove', onPointerMove, { passive: true })
      cleanupRef.current = () => {
        el.removeEventListener('pointermove', onPointerMove)
      }
    },
    [enabled],
  )

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  return bind
}
