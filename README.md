# Liquid Glass

<div align="center">

**Apple 液态玻璃设计语言 — React 组件库**

[![npm version](https://img.shields.io/npm/v/liquid-glass.svg)](https://www.npmjs.com/package/liquid-glass)
[![license](https://img.shields.io/npm/l/liquid-glass.svg)](./LICENSE)

*基于 SVG 滤镜的实时物理折射 | 36 个组件 | 黄金分割参数系统 | macOS 风格交互*

</div>

---

## 特性

- 🔮 **物理折射引擎** — 基于 Snell 定律的实时位移贴图 + 镜面高光，不是简单的 blur 毛玻璃
- 🎯 **Apple HIG 对齐** — 对标 iOS / macOS 设计规范，36 个组件覆盖导航、表单、反馈、展示
- 🖱️ **鼠标视差反光** — 光标移动时对应边缘自动亮起弧形高光（macOS rim light）
- 📐 **黄金分割参数** — 折射强度统一 φ (1.618)，pill / control / card 三档预设
- 🌐 **自动降级** — Chromium 用 SVG 折射，Safari/Firefox 自动切换毛玻璃 + 噪声纹理
- 🧩 **按需导入** — 支持 deep import `liquid-glass/components/GlassButton`，tree-shaking 友好
- 🛠️ **零运行时依赖** — 只 peer 依赖 React 18+

---

## 安装

```bash
npm install liquid-glass
```

## 快速开始

```tsx
import { LiquidGlass } from 'liquid-glass'
import 'liquid-glass/styles'

function App() {
  return (
    <LiquidGlass
      radius={28}
      bezelWidth={26}
      glassThickness={100}
      refractionScale={0.618}
      tint="rgba(255,255,255,0.04)"
      style={{ width: 300, padding: 24 }}
    >
      <h2>Hello Liquid Glass</h2>
      <p>你的内容已经被液态玻璃包裹</p>
    </LiquidGlass>
  )
}
```

## 组件

### 导航

| 组件 | 说明 |
|---|---|
| `GlassNavbar` | 顶部导航栏（标题 + 左右按钮） |
| `GlassTabBar` | 底部标签栏（图标 + 文字） |
| `GlassTabs` | 顶部标签页 |
| `GlassSidebar` | 左右侧边栏（展开/折叠 + 菜单项 + badge） |
| `GlassBreadcrumb` | 面包屑 |

### 表单

| 组件 | 说明 |
|---|---|
| `GlassButton` | 玻璃按钮（regular / prominent） |
| `GlassInput` | 文本输入框 |
| `GlassSearch` | 搜索框 |
| `GlassSelect` | 下拉选择 |
| `GlassCheckbox` | macOS 圆角方形复选框 |
| `GlassRadio` | 单选组 |
| `GlassSwitch` | iOS 风格液态玻璃开关 |
| `GlassSlider` | 滑块（轨道 + 填充全液态玻璃） |
| `GlassSegmented` | 分段控制器 |
| `GlassStepper` | 步进器 |
| `GlassDatePicker` | 日历日期选择 |

### 展示

| 组件 | 说明 |
|---|---|
| `GlassCard` | 玻璃卡片 |
| `GlassList` | 列表视图 |
| `GlassAccordion` | 折叠面板 |
| `GlassNotification` | iOS 风格通知横幅 |
| `GlassProgress` | 进度条 |
| `GlassBadge` | 徽标 |
| `GlassAvatar` | 头像 |
| `GlassTag` | 标签/芯片 |
| `GlassPageControl` | 页面圆点指示器 |
| `GlassEmptyState` | 空状态视图 |
| `GlassSpinner` | 活动指示器 |
| `GlassMusicPlayer` | 音乐播放器 |

### 反馈

| 组件 | 说明 |
|---|---|
| `GlassModal` | 模态对话框 |
| `GlassSheet` | 底部弹出面板 / Action Sheet |
| `GlassToast` | Toast 通知（含 `useToast` hook） |
| `GlassTooltip` | 悬浮提示 |
| `GlassContextMenu` | 右键/长按上下文菜单 |
| `GlassPagination` | 分页器 |

### 实验性

| 组件 | 说明 |
|---|---|
| `Dock` | macOS 风格 Dock |
| `DragGlass` | 拖动折射演示 |

---

## 把任意组件转液态玻璃

```tsx
import { withLiquidGlass } from 'liquid-glass'

const MyCard = ({ title }: { title: string }) => (
  <div style={{ padding: 20 }}>{title}</div>
)

// 一行变玻璃
const GlassCard = withLiquidGlass(MyCard, { preset: 'card' })
```

---

## 设计令牌

```tsx
import { spring, systemColors, fontStack, radii, glassPresets } from 'liquid-glass'

// 弹簧曲线
spring.default   // cubic-bezier(0.34, 1.56, 0.64, 1)
spring.gentle    // cubic-bezier(0.4, 0.8, 0.4, 1)
spring.snappy    // cubic-bezier(0.2, 0.9, 0.3, 1)

// 黄金分割参数预设
glassPresets.pill     // bezelWidth:10, glassThickness:38, refractionScale:0.618
glassPresets.control  // bezelWidth:16, glassThickness:62, refractionScale:0.618
glassPresets.card     // bezelWidth:26, glassThickness:100, refractionScale:0.618

// iOS 系统色
systemColors.blue    // '#0a84ff'
systemColors.green   // '#30d158'

// 圆角
radii.control  // 12px
radii.card     // 22px
radii.sheet    // 38px
radii.pill     // 999px
```

---

## `<LiquidGlass>` API

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `radius` | `number` | `28` | 圆角（px） |
| `bezelWidth` | `number` | `30` | 棱镜宽度（越大折射晕越宽） |
| `glassThickness` | `number` | `150` | 玻璃厚度（越大折射越强） |
| `refractiveIndex` | `number` | `1.5` | 折射率 |
| `refractionScale` | `number` | `1` | 折射强度倍率 |
| `blur` | `number` | `0.5` | 预模糊半径 |
| `saturate` | `number` | `1.3` | 饱和度增益 |
| `tint` | `string` | `rgba(255,255,255,0.02)` | 着色 |
| `parallax` | `boolean` | `false` | 鼠标视差（高光跟随光标） |
| `profile` | `BezelProfile` | `'convex_squircle'` | 表面轮廓（flat/concave/pill） |
| `backdropBlur` | `number` | `0` | 背景模糊（px） |

---

## 浏览器兼容性

| 浏览器 | 效果 |
|---|---|
| Chrome / Edge | SVG 物理折射 + 360° 镜面高光 |
| Safari / Firefox | 毛玻璃降级（blur + 噪声纹理 + 渐变高光） |

---

## NPM 发布

```bash
# 1. 更新版本号
npm version patch   # 0.1.0 → 0.1.1

# 2. 构建库
npm run build:lib

# 3. 登录 npm（首次需要）
npm login

# 4. 发布
npm publish
```

发布前确保 `package.json` 的 `repository.url` 指向你的 GitHub 仓库。

---

## License

MIT
