import { useCallback, useEffect, useRef } from 'react'

/**
 * useGlassParallax — 鼠标视差交互。
 * 监听容器上的 pointermove，计算鼠标相对容器中心的偏移，
 * 通过回调输出当前光源角度（度），供 displacementMap 的 specular 用。
 *
 * 仅在 supported=true（Chromium）时激活。
 */
export function useGlassParallax(
  supported: boolean,
  onAngleChange: (angleDeg: number) => void,
) {
  const elRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef(0)
  const angleRef = useRef(60) // 默认 60°
  const cleanupRef = useRef<(() => void) | null>(null)

  const bind = useCallback(
    (el: HTMLElement | null) => {
      elRef.current = el
      // 清理旧的 listener
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
      cancelAnimationFrame(rafRef.current)

      if (!el || !supported) return

      const onPointerMove = (e: PointerEvent) => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          // 根据指针方向计算光源角度（度），0°=右侧，90°=底部，180°=左侧
          // 限制范围 0~180，使高光始终在玻璃上半部分可见
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI
          // 将角度映射到 0~180 范围（镜像反转使高光始终来自上方）
          const normAngle = ((angle % 360) + 360) % 360
          // 只使用上半球角度（20°~160°），使高光自然
          let finalAngle = normAngle
          if (normAngle > 180) {
            finalAngle = 360 - normAngle
          }
          finalAngle = Math.max(20, Math.min(160, finalAngle))
          if (Math.abs(finalAngle - angleRef.current) > 1) {
            angleRef.current = finalAngle
            onAngleChange(finalAngle)
          }
        })
      }

      el.addEventListener('pointermove', onPointerMove, { passive: true })
      cleanupRef.current = () => {
        el.removeEventListener('pointermove', onPointerMove)
      }
    },
    [supported, onAngleChange],
  )

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  return bind
}
