/**
 * 液态玻璃贴图生成器
 * 移植自 github.com/Bhavya-Goswami/liquid-glass(已验证可跑的实现)
 *
 * 思路:
 *  1. calculateDisplacementMap1D —— 沿半径预计算一维折射位移曲线
 *     (Snell 折射:垂直光线穿过 squircle 表面,经玻璃厚度后的水平偏移)
 *  2. calculateDisplacementMap2D —— 把一维曲线按圆角距离场铺成二维 RGBA 贴图
 *  3. calculateSpecularHighlight —— 生成镜面高光贴图(rim light)
 */

export type BezelProfile = 'convex_squircle'

/** 表面方程:x∈[0,1],返回高度 */
const SurfaceEquations = {
  convex_squircle: (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 1 / 4),
}

export interface LiquidGlassMapOptions {
  /** 元素宽 */
  width: number
  /** 元素高 */
  height: number
  /** 圆角 */
  radius: number
  /** 棱镜宽度,默认 30 */
  bezelWidth?: number
  /** 玻璃厚度,默认 150(越大折射越强) */
  glassThickness?: number
  /** 折射率,默认 1.5 */
  refractiveIndex?: number
}

export interface LiquidGlassMaps {
  displacementUrl: string
  specularUrl: string
  /** 一维曲线的最大位移量,用作归一化除数 & feDisplacementMap 的 scale 基准 */
  maxDisplacement: number
  width: number
  height: number
}

/**
 * 一维折射位移曲线:gt=玻璃厚度, bw=棱镜宽, sf=表面方程, ri=折射率
 * 返回沿半径 s 个采样点的位移量(像素)
 */
function calculateDisplacementMap1D(
  gt: number,
  bw: number,
  sf: (x: number) => number,
  ri: number,
  s = 128,
): number[] {
  const e = 1 / ri
  const r: number[] = []
  for (let i = 0; i < s; i++) {
    const x = i / s
    const y = sf(x)
    const dx = x < 1 ? 0.0001 : -0.0001
    const d = (sf(Math.max(0, Math.min(1, x + dx))) - y) / dx
    const m = Math.sqrt(d * d + 1)
    const n = [-d / m, -1 / m] // 表面法线
    const dt = n[1]
    const k = 1 - e * e * (1 - dt * dt)
    if (k < 0) {
      r.push(0) // 全反射
    } else {
      // 折射光向量
      const rf = [
        -(e * dt + Math.sqrt(k)) * n[0],
        e - (e * dt + Math.sqrt(k)) * n[1],
      ]
      // 穿过深度 (y*bw + gt) 后的水平偏移
      r.push(rf[0] * ((y * bw + gt) / rf[1]))
    }
  }
  return r
}

/** 把一维位移曲线铺成二维 RGBA 位移贴图 */
function calculateDisplacementMap2D(
  cw: number,
  ch: number,
  ow: number,
  oh: number,
  rad: number,
  bw: number,
  md: number,
  pMap: number[],
): ImageData {
  const img = new ImageData(cw, ch)
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] = 128
    img.data[i + 1] = 128
    img.data[i + 3] = 255
  }
  const rSq = rad * rad
  const rp1Sq = (rad + 1) ** 2
  const rmBwSq = Math.max(0, rad - bw) ** 2
  const wB = ow - rad * 2
  const hB = oh - rad * 2
  const oX = (cw - ow) / 2
  const oY = (ch - oh) / 2

  for (let y1 = 0; y1 < oh; y1++) {
    for (let x1 = 0; x1 < ow; x1++) {
      const idx = ((oY + y1) * cw + oX + x1) * 4
      // 折算到最近圆角中心的坐标(圆角矩形距离场)
      const x = x1 < rad ? x1 - rad : x1 >= ow - rad ? x1 - rad - wB : 0
      const y = y1 < rad ? y1 - rad : y1 >= oh - rad ? y1 - rad - hB : 0
      const dSq = x * x + y * y

      if (dSq <= rp1Sq && dSq >= rmBwSq) {
        const dist = Math.sqrt(dSq)
        // 边缘抗锯齿透明度
        const op = dSq < rSq ? 1 : 1 - (dist - rad) / (Math.sqrt(rp1Sq) - rad)
        const bIdx = Math.floor(
          Math.max(0, Math.min(1, (rad - dist) / bw)) * pMap.length,
        )
        const dVal = pMap[Math.max(0, Math.min(bIdx, pMap.length - 1))] || 0
        const dX = md > 0 ? (-(dist > 0 ? x / dist : 0) * dVal) / md : 0
        const dY = md > 0 ? (-(dist > 0 ? y / dist : 0) * dVal) / md : 0

        img.data[idx] = Math.max(0, Math.min(255, 128 + dX * 127 * op))
        img.data[idx + 1] = Math.max(0, Math.min(255, 128 + dY * 127 * op))
      }
    }
  }
  return img
}

/** 镜面高光贴图(rim light) */
function calculateSpecularHighlight(
  ow: number,
  oh: number,
  rad: number,
  _bw: number,
): ImageData {
  const img = new ImageData(ow, oh)
  const sVec = [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)] // 光源方向 60°
  const rSq = rad * rad
  const rp1Sq = (rad + 1) ** 2
  const rmSSq = Math.max(0, (rad - 1.5) ** 2)

  for (let y1 = 0; y1 < oh; y1++) {
    for (let x1 = 0; x1 < ow; x1++) {
      const x = x1 < rad ? x1 - rad : x1 >= ow - rad ? x1 - rad - (ow - rad * 2) : 0
      const y = y1 < rad ? y1 - rad : y1 >= oh - rad ? y1 - rad - (oh - rad * 2) : 0
      const dSq = x * x + y * y

      if (dSq <= rp1Sq && dSq >= rmSSq) {
        const dist = Math.sqrt(dSq)
        const op = dSq < rSq ? 1 : 1 - (dist - rad) / (Math.sqrt(rp1Sq) - rad)
        const dp = Math.abs(
          (dist > 0 ? x / dist : 0) * sVec[0] +
            (dist > 0 ? -y / dist : 0) * sVec[1],
        )
        const cf =
          dp * Math.sqrt(1 - (1 - Math.max(0, Math.min(1, (rad - dist) / 1.5))) ** 2)
        const c = Math.min(255, 255 * cf)
        const idx = (y1 * ow + x1) * 4

        img.data[idx] = img.data[idx + 1] = img.data[idx + 2] = c
        img.data[idx + 3] = Math.min(255, c * cf * op)
      }
    }
  }
  return img
}

function imageDataToDataURL(img: ImageData): string {
  const c = document.createElement('canvas')
  c.width = img.width
  c.height = img.height
  c.getContext('2d')!.putImageData(img, 0, 0)
  return c.toDataURL()
}

export function generateLiquidGlassMaps(
  opts: LiquidGlassMapOptions,
): LiquidGlassMaps {
  const {
    width,
    height,
    radius,
    bezelWidth = 30,
    glassThickness = 150,
    refractiveIndex = 1.5,
  } = opts
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))
  const rad = Math.min(radius, Math.min(w, h) / 2)

  const pMap = calculateDisplacementMap1D(
    glassThickness,
    bezelWidth,
    SurfaceEquations.convex_squircle,
    refractiveIndex,
  )

  // 归一化除数:一维曲线的最大绝对位移(参考实现的 md)
  const maxDisplacement = Math.max(...pMap.map(Math.abs)) || 1

  const dispImg = calculateDisplacementMap2D(
    w,
    h,
    w,
    h,
    rad,
    bezelWidth,
    maxDisplacement,
    pMap,
  )
  const specImg = calculateSpecularHighlight(w, h, rad, bezelWidth)

  return {
    displacementUrl: imageDataToDataURL(dispImg),
    specularUrl: imageDataToDataURL(specImg),
    maxDisplacement,
    width: w,
    height: h,
  }
}
