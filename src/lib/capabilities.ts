/** 能力检测:浏览器是否支持把 SVG 滤镜用作 backdrop-filter(目前仅 Chromium) */
let cached: boolean | null = null

export function supportsSvgBackdrop(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined' || typeof CSS === 'undefined') {
    cached = false
    return cached
  }
  // backdrop-filter 基本支持(含 -webkit- 前缀)
  const hasBackdrop =
    CSS.supports('backdrop-filter', 'url(#x)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')

  // 仅 Chromium 内核允许 SVG 滤镜作为 backdrop。用 UA 粗判排除 Safari/Firefox。
  const ua = navigator.userAgent
  const isChromium = /Chrome|Chromium|Edg/.test(ua) && !/OPR/.test(ua)
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)

  cached = hasBackdrop && isChromium && !isSafari
  return cached
}
