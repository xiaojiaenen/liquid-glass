---
name: liquid-glass
description: Guide for installing and using @xiaojiaenen/liquid-glass — Apple-style glassmorphism React component library with 52 components, SVG-based Snell refraction, golden ratio presets, and GlassProvider theming. Use when working with liquid-glass UI, glassmorphism design, Apple-style interfaces, or any project needing frosted glass React components.
---

# Liquid Glass — Apple 液态玻璃 React 组件库

## 快速安装

```bash
npm install @xiaojiaenen/liquid-glass
```

## 最小可用示例

```tsx
import { LiquidGlass } from '@xiaojiaenen/liquid-glass'
import '@xiaojiaenen/liquid-glass/styles'

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
    </LiquidGlass>
  )
}
```

## 三大入口

| 入口 | 用途 |
|------|------|
| `@xiaojiaenen/liquid-glass` | 核心引擎 + 所有组件 |
| `@xiaojiaenen/liquid-glass/components/GlassButton` | 按需导入单个组件 |
| `@xiaojiaenen/liquid-glass/styles` | CSS 文件 |

## 黄金分割预设

所有组件参数基于 φ=1.618。三档预设：`pill`（胶囊/标签）、`control`（按钮/输入框）、`card`（卡片/面板）。

```tsx
import { glassPresets } from '@xiaojiaenen/liquid-glass'
// glassPresets.pill.bezelWidth    → 10
// glassPresets.control.refractionScale → 0.618
```

## GlassProvider 主题

包裹应用根节点，统一控制所有液态玻璃的色调：

```tsx
import { GlassProvider } from '@xiaojiaenen/liquid-glass'

<GlassProvider tint="dark" accent="blue">
  <App />
</GlassProvider>
```

## 把任意组件变玻璃

```tsx
import { withLiquidGlass } from '@xiaojiaenen/liquid-glass'
const GlassCard = withLiquidGlass(MyCard, { preset: 'card' })
```

## 完整组件列表和 API

详见 [REFERENCE.md](REFERENCE.md) — 所有 52 个组件的分类、Props 表格和代码示例。
