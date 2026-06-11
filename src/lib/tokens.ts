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

/** 黄金分割(φ≈1.618)液态玻璃参数预设。
 *  refractionScale 固定为 1/φ ≈ 0.618,
 *  glassThickness ≈ bezelWidth × φ²
 *  圆角遵循 radii 令牌
 */
export const glassPresets = {
  /** 小胶囊/指示器: 分段控制选中块、标签、开关 knob */
  pill: {
    bezelWidth: 10,
    glassThickness: 38,
    refractionScale: 0.618,
    blur: 0.2,
  } as const,
  /** 控件: 按钮、输入框、复选框、分段控制容器 */
  control: {
    bezelWidth: 16,
    glassThickness: 62,
    refractionScale: 0.618,
    blur: 0.35,
  } as const,
  /** 卡片/面板: 模态框、卡片、列表 */
  card: {
    bezelWidth: 26,
    glassThickness: 100,
    refractionScale: 0.618,
    blur: 0.5,
  } as const,
}
