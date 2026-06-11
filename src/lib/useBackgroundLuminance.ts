import { useEffect, useState, useCallback } from 'react'

/**
 * useBackgroundLuminance — 背景亮度感知。
 * 在元素背后采样像素，计算平均亮度，返回 0（纯黑）~ 1（纯白）。
 * 用于动态决定玻璃 tint 和文字颜色。
 *
 * 返回 { luminance, isDark, tint, textColor }
 * - isDark: luminance < 0.5
 * - tint: 适合该背景的玻璃着色
 * - textColor: 适合该背景的文字颜色
 */
export function useBackgroundLuminance(
  elRef: React.RefObject<HTMLElement | null>,
  /** 采样点数（网格），越大越准但越慢，默认 3×3 */
  sampleSize = 3,
) {
  const [luminance, setLuminance] = useState(0.5)
  const [ready, setReady] = useState(false)

  const sample = useCallback(() => {
    const el = elRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    // 在元素背后用 elementFromPoint 采样网格点
    const stepX = rect.width / (sampleSize + 1)
    const stepY = rect.height / (sampleSize + 1)
    let totalL = 0
    let count = 0

    for (let i = 1; i <= sampleSize; i++) {
      for (let j = 1; j <= sampleSize; j++) {
        const x = rect.left + stepX * i
        const y = rect.top + stepY * j
        const elAt = document.elementFromPoint(x, y)
        // 跳过玻璃自身
        if (!elAt || el.contains(elAt)) continue

        // 读取元素的背景色（如果可获取）
        const style = getComputedStyle(elAt)
        const bg = style.backgroundColor || style.backgroundImage
        // 从 background-color 解析亮度
        const rgb = parseRgb(bg)
        if (rgb) {
          // 相对亮度公式: 0.299R + 0.587G + 0.114B
          totalL += (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255
          count++
        }
      }
    }

    if (count > 0) {
      setLuminance(totalL / count)
      setReady(true)
    }
  }, [elRef, sampleSize])

  useEffect(() => {
    // 延迟采样，等渲染稳定
    const timer = setTimeout(sample, 100)
    return () => clearTimeout(timer)
  }, [sample])

  const isDark = luminance < 0.5
  const isLight = luminance > 0.65

  return {
    luminance,
    isDark,
    isLight,
    /** 适合背景的玻璃 tint */
    tint: isLight
      ? 'rgba(30,30,40,0.25)'
      : isDark
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(255,255,255,0.06)',
    /** 适合背景的文字颜色 */
    textColor: isLight ? '#1a1a1a' : '#ffffff',
    /** 手动触发重新采样 */
    resample: sample,
    ready,
  }
}

/** 从 CSS 颜色字符串解析 rgb 值 */
function parseRgb(color: string): [number, number, number] | null {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])]
  // 支持 rgb/rgba 简短
  const m2 = color.match(/(\d+)\s+(\d+)\s+(\d+)/)
  if (m2) return [Number(m2[1]), Number(m2[2]), Number(m2[3])]
  return null
}
