import { useRef, useCallback, useEffect, type RefObject } from 'react'

export interface BorderGlowOptions {
  /** 启用边框反光效果 */
  enabled?: boolean
  /** 边缘敏感度 (0-100)，越小越靠近边缘才触发 */
  edgeSensitivity?: number
  /** 反光强度 (0-1+) */
  intensity?: number
  /** 自动扫光动画 */
  animated?: boolean
}

export interface BorderGlowState {
  /** 绑定到目标元素的 ref */
  ref: RefObject<HTMLElement | null>
  /** 绑定到目标元素的事件处理器和样式 */
  borderGlowProps: {
    onPointerMove: (e: React.PointerEvent) => void
    style: React.CSSProperties
    className: string
  }
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3) }
function easeInCubic(x: number) { return x * x * x }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: {
  start?: number
  end?: number
  duration?: number
  delay?: number
  ease?: (x: number) => number
  onUpdate: (value: number) => void
  onEnd?: () => void
}) {
  const t0 = performance.now() + delay
  function tick() {
    const elapsed = performance.now() - t0
    const t = Math.min(elapsed / duration, 1)
    onUpdate(start + (end - start) * ease(t))
    if (t < 1) requestAnimationFrame(tick)
    else if (onEnd) onEnd()
  }
  setTimeout(() => requestAnimationFrame(tick), delay)
}

/**
 * 为液态玻璃组件添加鼠标跟随边框反光效果。
 * 模拟真实玻璃边缘的反光。
 */
export function useBorderGlow(options: BorderGlowOptions = {}): BorderGlowState {
  const {
    enabled = true,
    edgeSensitivity = 40,
    intensity = 1.0,
    animated = false,
  } = options

  const ref = useRef<HTMLElement | null>(null)

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    let kx = Infinity
    let ky = Infinity
    if (dx !== 0) kx = cx / Math.abs(dx)
    if (dy !== 0) ky = cy / Math.abs(dy)
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
  }, [getCenterOfElement])

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    if (dx === 0 && dy === 0) return 0
    const radians = Math.atan2(dy, dx)
    let degrees = radians * (180 / Math.PI) + 90
    if (degrees < 0) degrees += 360
    return degrees
  }, [getCenterOfElement])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const edge = getEdgeProximity(card, x, y)
    const angle = getCursorAngle(card, x, y)

    card.style.setProperty('--border-glow-proximity', `${(edge * 100).toFixed(3)}`)
    card.style.setProperty('--border-glow-angle', `${angle.toFixed(3)}deg`)
  }, [getEdgeProximity, getCursorAngle])

  useEffect(() => {
    if (!animated || !ref.current || !enabled) return
    const card = ref.current
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('border-glow-sweep-active')
    card.style.setProperty('--border-glow-angle', `${angleStart}deg`)

    animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--border-glow-proximity', String(v)) })
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--border-glow-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    }})
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--border-glow-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    }})
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--border-glow-proximity', String(v)),
      onEnd: () => card.classList.remove('border-glow-sweep-active'),
    })
  }, [animated, enabled])

  const borderGlowProps = {
    onPointerMove: enabled ? handlePointerMove : () => {},
    style: {
      '--border-glow-sensitivity': edgeSensitivity,
      '--border-glow-intensity': intensity,
    } as React.CSSProperties,
    className: enabled ? 'has-border-glow' : '',
  }

  return { ref, borderGlowProps }
}
