import { useRef, useCallback, useEffect, type RefObject } from 'react'

export interface BorderGlowOptions {
  /** 启用边框发光效果 */
  enabled?: boolean
  /** 边缘敏感度 (0-100)，越小越靠近边缘才触发 */
  edgeSensitivity?: number
  /** 发光颜色 (HSL 空格分隔，如 "220 90 60") */
  glowColor?: string
  /** 发光强度倍率 (0-1+) */
  glowIntensity?: number
  /** 锥形扩散角度 (百分比) */
  coneSpread?: number
  /** 渐变颜色数组 */
  colors?: string[]
  /** 内部填充不透明度 */
  fillOpacity?: number
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

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) }
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const vars: Record<string, string> = {}
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`
  }
  return vars
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {}
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
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
 * 为液态玻璃组件添加鼠标跟随边框发光效果。
 * 基于 react-bits 的 BorderGlow 组件实现。
 */
export function useBorderGlow(options: BorderGlowOptions = {}): BorderGlowState {
  const {
    enabled = true,
    edgeSensitivity = 30,
    glowColor = '40 80 80',
    glowIntensity = 1.0,
    coneSpread = 25,
    colors = ['#c084fc', '#f472b6', '#38bdf8'],
    fillOpacity = 0.5,
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

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [getEdgeProximity, getCursorAngle])

  useEffect(() => {
    if (!animated || !ref.current || !enabled) return
    const card = ref.current
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('border-glow-sweep-active')
    card.style.setProperty('--cursor-angle', `${angleStart}deg`)

    animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', String(v)) })
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    }})
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    }})
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', String(v)),
      onEnd: () => card.classList.remove('border-glow-sweep-active'),
    })
  }, [animated, enabled])

  const glowVars = enabled ? buildGlowVars(glowColor, glowIntensity) : {}
  const gradientVars = enabled ? buildGradientVars(colors) : {}

  const borderGlowProps = {
    onPointerMove: enabled ? handlePointerMove : () => {},
    style: {
      '--edge-sensitivity': edgeSensitivity,
      '--cone-spread': coneSpread,
      '--fill-opacity': fillOpacity,
      ...glowVars,
      ...gradientVars,
    } as React.CSSProperties,
    className: enabled ? 'has-border-glow' : '',
  }

  return { ref, borderGlowProps }
}
