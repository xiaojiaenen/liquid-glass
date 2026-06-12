/**
 * 苹果设计令牌 —— 对齐 iOS / macOS 视觉语言
 */

/** 弹簧动效曲线(苹果常用的过冲回弹) */
export const spring = {
  /** 标准弹簧:控件状态切换 */
  default: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** 柔和:大面积位移 */
  gentle: 'cubic-bezier(0.4, 0.8, 0.4, 1)',
  /** 快速:点击反馈 */
  snappy: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
}

/** iOS 系统色(深色背景下的鲜亮版) */
export const systemColors = {
  blue: '#0a84ff',
  green: '#30d158',
  indigo: '#5e5ce6',
  orange: '#ff9f0a',
  pink: '#ff375f',
  purple: '#bf5af2',
  red: '#ff453a',
  teal: '#40c8e0',
  yellow: '#ffd60a',
}

/** 浅色模式系统色 */
export const lightSystemColors = {
  blue: '#007aff',
  green: '#34c759',
  indigo: '#5856d6',
  orange: '#ff9500',
  pink: '#ff2d55',
  purple: '#af52de',
  red: '#ff3b30',
  teal: '#5ac8fa',
  yellow: '#ffcc00',
}

/** SF Pro 字体栈 */
export const fontStack =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif"

/** 连续圆角的视觉半径(iOS 控件标准) */
export const radii = {
  control: 12,
  card: 22,
  sheet: 38,
  pill: 999,
}

/** 黄金分割(φ≈1.618)液态玻璃参数预设 */
export const glassPresets = {
  pill: {
    bezelWidth: 10,
    glassThickness: 38,
    refractionScale: 0.618,
    blur: 0.2,
  } as const,
  control: {
    bezelWidth: 16,
    glassThickness: 62,
    refractionScale: 0.618,
    blur: 0.35,
  } as const,
  card: {
    bezelWidth: 26,
    glassThickness: 100,
    refractionScale: 0.618,
    blur: 0.5,
  } as const,
}

/**
 * 根据模式返回玻璃 tint 预设。
 * 所有组件应使用此函数获取 tint,而非硬编码。
 */
export function getGlassTints(mode: 'light' | 'dark') {
  if (mode === 'light') {
    return {
      default: 'rgba(255,255,255,0.25)',
      control: 'rgba(255,255,255,0.35)',
      card: 'rgba(255,255,255,0.45)',
      /** 弪窗:半透明,靠 blur 分离层次 */
      modal: 'rgba(255,255,255,0.35)',
      accent: 'rgba(0,122,255,0.3)',
      overlay: 'rgba(0,0,0,0.25)',
      muted: 'rgba(0,0,0,0.04)',
      selected: 'rgba(0,122,255,0.2)',
    }
  }
  return {
    default: 'rgba(255,255,255,0.03)',
    control: 'rgba(255,255,255,0.06)',
    card: 'rgba(255,255,255,0.05)',
    /** 弹窗:半透明,靠 blur 分离层次 */
    modal: 'rgba(30,30,40,0.55)',
    accent: 'rgba(10,132,255,0.45)',
    overlay: 'rgba(0,0,0,0.45)',
    muted: 'rgba(255,255,255,0.04)',
    selected: 'rgba(10,132,255,0.2)',
  }
}

/**
 * 根据模式返回文字颜色。
 */
export function getTextColors(mode: 'light' | 'dark') {
  if (mode === 'light') {
    return {
      primary: '#000',
      secondary: 'rgba(0,0,0,0.55)',
      tertiary: 'rgba(0,0,0,0.3)',
      inverse: '#fff',
      link: '#007aff',
      destructive: '#ff3b30',
    }
  }
  return {
    primary: '#fff',
    secondary: 'rgba(255,255,255,0.55)',
    tertiary: 'rgba(255,255,255,0.3)',
    inverse: '#000',
    link: '#0a84ff',
    destructive: '#ff453a',
  }
}

/**
 * 根据模式返回边框颜色。
 */
export function getBorderColors(mode: 'light' | 'dark') {
  if (mode === 'light') {
    return {
      default: 'rgba(0,0,0,0.1)',
      separator: 'rgba(0,0,0,0.08)',
    }
  }
  return {
    default: 'rgba(255,255,255,0.18)',
    separator: 'rgba(255,255,255,0.06)',
  }
}

/**
 * 根据模式返回系统色。
 */
export function getSystemColors(mode: 'light' | 'dark') {
  return mode === 'light' ? lightSystemColors : systemColors
}
