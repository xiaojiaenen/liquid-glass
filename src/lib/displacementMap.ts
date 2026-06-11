/**
 * 位移贴图生成器
 *
 * 原理(参考 kube.io/blog/liquid-glass-css-svg):
 * 玻璃边缘像一圈凸起的"棱镜",光线穿过时发生折射并偏移。
 * 我们用一个高度函数 f(d) 描述从外边缘(d=0)到棱镜内沿(d=1)的截面形状,
 * 其导数给出表面法线,法线决定光线偏移方向与大小。
 *
 * 把每个像素的偏移量(x, y)编码进一张 RGBA 图:
 *   R = 128 + x * 127   (X 方向位移)
 *   G = 128 + y * 127   (Y 方向位移)
 *   B = 128, A = 255    (未使用)
 * 浏览器的 feDisplacementMap 读这张图,把背景按偏移量推开,
 * 中心区域偏移为 0(透明直通),边缘偏移最大(产生弯曲、放大的折射感)。
 */

export type BezelProfile = 'convex' | 'squircle' | 'lip'

export interface DisplacementMapOptions {
  /** 元素宽度(px) */
  width: number
  /** 元素高度(px) */
  height: number
  /** 圆角半径(px) */
  radius: number
  /** 棱镜宽度:折射发生在距边缘多少 px 范围内 */
  bezel: number
  /** 截面轮廓 */
  profile?: BezelProfile
}

export interface DisplacementMapResult {
  /** 可直接喂给 feImage 的 data URL */
  dataUrl: string
  /** 归一化后最大位移量,用作 feDisplacementMap 的 scale */
  maxDisplacement: number
  width: number
  height: number
}

/** 高度函数:输入 0..1(0=外边缘,1=棱镜内沿),输出截面高度 0..1 */
function heightFn(t: number, profile: BezelProfile): number {
  const x = Math.min(Math.max(t, 0), 1)
  switch (profile) {
    case 'convex':
      // 圆弧:外缘陡、内沿平
      return Math.sqrt(1 - (1 - x) * (1 - x))
    case 'lip':
      // 平滑 S 曲线,模拟带"唇边"的玻璃
      return x * x * (3 - 2 * x)
    case 'squircle':
    default:
      // 超椭圆,Apple 偏好的平滑过渡
      return Math.pow(1 - Math.pow(1 - x, 4), 0.5)
  }
}

/** 圆角矩形有符号距离:内部为正,外部为负 */
function signedDistance(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
): number {
  const qx = Math.abs(px - w / 2) - (w / 2 - r)
  const qy = Math.abs(py - h / 2) - (h / 2 - r)
  const ax = Math.max(qx, 0)
  const ay = Math.max(qy, 0)
  const outDist = Math.sqrt(ax * ax + ay * ay) + Math.min(Math.max(qx, qy), 0)
  return -outDist // 内部为正
}

/** 边缘外法线方向(单位向量):对 SDF 求数值梯度 */
function gradientDir(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
): { x: number; y: number } {
  const e = 1
  const gx =
    signedDistance(px - e, py, w, h, r) - signedDistance(px + e, py, w, h, r)
  const gy =
    signedDistance(px, py - e, w, h, r) - signedDistance(px, py + e, w, h, r)
  const len = Math.hypot(gx, gy) || 1
  return { x: gx / len, y: gy / len }
}

function clamp8(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)))
}

export function generateDisplacementMap(
  opts: DisplacementMapOptions,
): DisplacementMapResult {
  const { width, height, radius, bezel, profile = 'squircle' } = opts
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const data = img.data

  const r = Math.min(radius, Math.min(w, h) / 2)
  const delta = 0.001

  // 第一遍:计算每个像素的原始位移向量,记录最大模长用于归一化
  const vx = new Float32Array(w * h)
  const vy = new Float32Array(w * h)
  let maxMag = 0

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x
      const distInside = signedDistance(x + 0.5, y + 0.5, w, h, r)

      if (distInside <= 0 || distInside >= bezel) {
        // 形状外 或 棱镜内沿之外(平直区) → 无位移
        continue
      }

      // 在棱镜区内:t 从边缘(0)到内沿(1)
      const t = distInside / bezel

      // 高度函数导数 = 表面斜率,越靠边缘越陡 → 位移越大
      const y1 = heightFn(t - delta, profile)
      const y2 = heightFn(t + delta, profile)
      // 边缘处导数趋于无穷,会形成单像素尖峰压制其余区域;封顶让折射均匀铺满棱镜带
      const slope = Math.min((y2 - y1) / (2 * delta), 6)

      // 位移沿边缘法线方向,指向形状内部(把外侧背景"吸"进来产生放大折射)
      const grad = gradientDir(x + 0.5, y + 0.5, w, h, r)
      vx[idx] = -grad.x * slope
      vy[idx] = -grad.y * slope

      const m = Math.hypot(vx[idx], vy[idx])
      if (m > maxMag) maxMag = m
    }
  }

  if (maxMag === 0) maxMag = 1

  // 第二遍:归一化并编码进 RGBA
  for (let i = 0; i < w * h; i++) {
    const nx = vx[i] / maxMag
    const ny = vy[i] / maxMag
    const o = i * 4
    data[o] = clamp8(128 + nx * 127) // R = X
    data[o + 1] = clamp8(128 + ny * 127) // G = Y
    data[o + 2] = 128 // B 未用
    data[o + 3] = 255 // A 不透明
  }

  ctx.putImageData(img, 0, 0)

  return {
    dataUrl: canvas.toDataURL(),
    maxDisplacement: maxMag,
    width: w,
    height: h,
  }
}
