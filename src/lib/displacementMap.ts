/**
 * 液态玻璃贴图生成器 —— 按 kube.io 文章描述的物理实现
 *
 * 文章只给了概念,折射的 JS 没公开,这里按其物理补全:
 *  1. 截面高度函数 f(t):描述棱镜从外边缘(t=0)到内沿(t=1)的隆起形状
 *  2. 由 f 的导数得表面法线
 *  3. 垂直入射光线经 Snell 定律折射(空气 n=1 → 玻璃 n=1.5)
 *  4. 折射光穿过"玻璃厚度"后的水平落点偏移 = 该处位移量
 *  5. 位移沿半径预计算一次,绕中心旋转铺满整圈,归一化后编码进 RGBA
 *
 * 同时生成镜面高光贴图(rim light),供 feImage + feBlend 叠加。
 */

export type BezelProfile = 'convex' | 'squircle' | 'lip'

export interface LiquidGlassMapOptions {
  width: number
  height: number
  radius: number
  /** 棱镜宽度(px):折射区厚度 */
  bezel: number
  /** 玻璃厚度(px):折射光穿过的深度,越大折射越强 */
  thickness?: number
  /** 玻璃折射率,文章用 1.5 */
  refractiveIndex?: number
  profile?: BezelProfile
  /** 镜面高光强度 0..1 */
  specularOpacity?: number
  /** 光源方向角(度),0 = 右,逆时针;文章示例 -60 */
  specularAngle?: number
}

export interface LiquidGlassMaps {
  /** 位移贴图 data URL */
  displacementUrl: string
  /** 镜面高光贴图 data URL */
  specularUrl: string
  /** feDisplacementMap 的 scale = 最大像素位移 */
  maxDisplacement: number
  width: number
  height: number
}

/** 截面高度函数:t∈[0,1],0=外缘,1=内沿;返回高度 0..1 */
function heightFn(t: number, profile: BezelProfile): number {
  const x = Math.min(Math.max(t, 0), 1)
  switch (profile) {
    case 'convex':
      return Math.sqrt(1 - (1 - x) * (1 - x)) // 圆弧
    case 'lip':
      return x * x * (3 - 2 * x) // 平滑 S(带唇边)
    case 'squircle':
    default:
      return Math.pow(1 - Math.pow(1 - x, 4), 0.5) // 超椭圆,Apple 偏好
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
  return -(Math.sqrt(ax * ax + ay * ay) + Math.min(Math.max(qx, qy), 0))
}

/** 边缘外法线方向(单位向量,指向形状外):对 SDF 求数值梯度 */
function gradientDir(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
): { x: number; y: number } {
  const e = 1
  const gx =
    signedDistance(px + e, py, w, h, r) - signedDistance(px - e, py, w, h, r)
  const gy =
    signedDistance(px, py + e, w, h, r) - signedDistance(px, py - e, w, h, r)
  const len = Math.hypot(gx, gy) || 1
  // SDF 内部为正,梯度指向内部;取反得到指向外部的法线
  return { x: -gx / len, y: -gy / len }
}

/**
 * 折射位移大小:给定棱镜内归一化位置 t,返回水平像素偏移。
 * 物理:垂直光线 I=(0,-1) 打在斜率为 slope 的表面,经 Snell 折射,
 * 穿过 thickness 深度后水平移动多少。
 */
function refractionShift(
  t: number,
  profile: BezelProfile,
  bezel: number,
  thickness: number,
  eta: number, // n_air / n_glass
): number {
  const delta = 0.001
  const h1 = heightFn(t - delta, profile)
  const h2 = heightFn(t + delta, profile)
  // 真实斜率 = dz/dx,高度按 bezel 量级缩放,水平按 bezel 像素
  const slope = ((h2 - h1) / (2 * delta)) * (thickness / bezel)

  // 表面法线(指向空气,y 向上):(-slope, 1) 归一化
  const nlen = Math.hypot(slope, 1)
  const nx = -slope / nlen
  const ny = 1 / nlen

  // 入射光垂直向下 I=(0,-1);Snell 矢量形式
  const cosI = ny // = -dot(N, I) = -(0*nx + (-1)*ny) = ny
  const k = 1 - eta * eta * (1 - cosI * cosI)
  if (k < 0) return 0 // 全反射(此处不会发生)
  const f = eta * cosI - Math.sqrt(k)
  // 折射光 T = eta*I + f*N
  const tx = eta * 0 + f * nx
  const ty = eta * -1 + f * ny // 向下,ty<0

  // 穿过 thickness 深度的水平偏移
  return (tx / -ty) * thickness
}

export function generateLiquidGlassMaps(
  opts: LiquidGlassMapOptions,
): LiquidGlassMaps {
  const {
    width,
    height,
    radius,
    bezel,
    thickness = bezel * 1.2,
    refractiveIndex = 1.5,
    profile = 'squircle',
    specularOpacity = 0.5,
    specularAngle = -60,
  } = opts

  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))
  const r = Math.min(radius, Math.min(w, h) / 2)
  const eta = 1 / refractiveIndex

  // 光源方向(单位向量)
  const la = (specularAngle * Math.PI) / 180
  const lx = Math.cos(la)
  const ly = Math.sin(la)

  // ---- 位移贴图 ----
  const dispCanvas = document.createElement('canvas')
  dispCanvas.width = w
  dispCanvas.height = h
  const dctx = dispCanvas.getContext('2d')!
  const dimg = dctx.createImageData(w, h)
  const dd = dimg.data

  // ---- 高光贴图 ----
  const specCanvas = document.createElement('canvas')
  specCanvas.width = w
  specCanvas.height = h
  const sctx = specCanvas.getContext('2d')!
  const simg = sctx.createImageData(w, h)
  const sd = simg.data

  const vx = new Float32Array(w * h)
  const vy = new Float32Array(w * h)
  let maxMag = 0

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x
      const dist = signedDistance(x + 0.5, y + 0.5, w, h, r)
      const o = idx * 4

      // 高光默认透明
      sd[o] = 255
      sd[o + 1] = 255
      sd[o + 2] = 255
      sd[o + 3] = 0

      if (dist <= 0 || dist >= bezel) continue

      const t = dist / bezel
      const grad = gradientDir(x + 0.5, y + 0.5, w, h, r) // 指向外
      const shift = refractionShift(t, profile, bezel, thickness, eta)

      // 位移指向形状内部(把外侧背景吸入,产生放大折射)
      vx[idx] = -grad.x * shift
      vy[idx] = -grad.y * shift
      const m = Math.hypot(vx[idx], vy[idx])
      if (m > maxMag) maxMag = m

      // 镜面高光:法线朝向光源时最亮,集中在棱镜外缘
      const facing = Math.max(0, grad.x * lx + grad.y * ly)
      const edge = Math.pow(1 - t, 1.5) // 越靠外缘越亮
      const intensity = Math.pow(facing, 2) * edge * specularOpacity
      sd[o + 3] = clamp8(intensity * 255)
    }
  }

  if (maxMag === 0) maxMag = 1

  for (let i = 0; i < w * h; i++) {
    const o = i * 4
    dd[o] = clamp8(128 + (vx[i] / maxMag) * 127) // R = X
    dd[o + 1] = clamp8(128 + (vy[i] / maxMag) * 127) // G = Y
    dd[o + 2] = 128
    dd[o + 3] = 255
  }

  dctx.putImageData(dimg, 0, 0)
  sctx.putImageData(simg, 0, 0)

  return {
    displacementUrl: dispCanvas.toDataURL(),
    specularUrl: specCanvas.toDataURL(),
    maxDisplacement: maxMag,
    width: w,
    height: h,
  }
}

function clamp8(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)))
}
