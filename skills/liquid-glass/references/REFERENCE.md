# Liquid Glass 组件参考

## 核心容器

### `<LiquidGlass>`

所有组件的底层容器。基于 Snell 定律实时生成 SVG 位移贴图实现物理折射。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `radius` | `number` | `28` | 圆角 px |
| `bezelWidth` | `number` | `30` | 棱镜宽度，越大折射晕越宽 |
| `glassThickness` | `number` | `150` | 玻璃厚度，越大折射越强 |
| `refractiveIndex` | `number` | `1.5` | 折射率 |
| `refractionScale` | `number` | `1` | 折射强度倍率 |
| `blur` | `number` | `0.5` | 预模糊半径 |
| `saturate` | `number` | `1.3` | 饱和度增益 |
| `tint` | `string` | `rgba(255,255,255,0.02)` | 着色 |
| `parallax` | `boolean` | `false` | 鼠标视差，高光跟随光标 |
| `profile` | `BezelProfile` | `'convex_squircle'` | 表面轮廓（flat/concave/pill） |
| `as` | `'div' \| 'button'` | `'div'` | 渲染为 div 或 button |

---

## `<GlassProvider>`

全局主题上下文。包裹在应用根节点。

```tsx
import { GlassProvider } from '@xiaojiaenen/liquid-glass'

<GlassProvider tint="dark" accent="blue">
  <App />
</GlassProvider>
```

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `tint` | `'dark' \| 'light' \| 'auto'` | `'auto'` | 色调模式 |
| `accent` | `AccentColor` | `'blue'` | 强调色 |

`useGlassTheme()` hook 返回 `{ tints, textColors, colors }`。

---

## 导航

### `<GlassNavbar>`
顶部导航栏。

```tsx
<GlassNavbar title="标题" onBack={() => {}} right={<span>编辑</span>} />
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 标题 |
| `left` | `ReactNode` | 左侧插槽 |
| `right` | `ReactNode` | 右侧插槽 |
| `onBack` | `() => void` | 返回回调 |

### `<GlassTabBar>`
底部标签栏（图标+文字）。

```tsx
<GlassTabBar
  value={active}
  onChange={setActive}
  items={[
    { icon: '🏠', label: '首页', value: 'home' },
    { icon: '🔍', label: '探索', value: 'explore' },
  ]}
/>
```

### `<GlassTabs>`
顶部标签页，滑动液态玻璃指示器。

```tsx
<GlassTabs tabs={[{label:'选项一',value:'1'},{label:'选项二',value:'2'}]} />
```

### `<GlassSidebar>`
左右侧边栏，支持展开/折叠、菜单项 badge、底部插槽。

```tsx
<GlassSidebar side="left" defaultCollapsed={false}
  items={[{ icon: '📊', label: '概览', value: 'overview', badge: 5 }]}
  footer={<span>👤 用户</span>}
/>
```

### `<GlassBreadcrumb>`
面包屑导航。

```tsx
<GlassBreadcrumb items={[{label:'首页'},{label:'组件'},{label:'面包屑'}]} />
```

### `<GlassToolbar>`
工具栏容器。

---

## 表单

### `<GlassButton>`
```tsx
<GlassButton variant="prominent">主要操作</GlassButton>
<GlassButton size="small">次要</GlassButton>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `variant` | `'regular' \| 'prominent'` | 普通/蓝色强调 |
| `size` | `'default' \| 'small'` | 标准/小号 |

### `<GlassInput>`
```tsx
<GlassInput placeholder="输入内容" prefix="🔍" />
```

### `<GlassSearch>`
```tsx
<GlassSearch onSearch={(v) => console.log(v)} />
```

### `<GlassSelect>`
```tsx
<GlassSelect options={[{label:'选项A',value:'a'}]} onChange={(v) => {}} />
```

### `<GlassCheckbox>`
macOS 圆角方形复选框。

```tsx
<GlassCheckbox label="同意条款" checked={true} onChange={(c) => {}} />
```

### `<GlassRadio>`
```tsx
<GlassRadio options={[{label:'方案一',value:'1'}]} />
```

### `<GlassSwitch>`
iOS 风格液态玻璃开关。

```tsx
<GlassSwitch defaultOn />
```

### `<GlassSlider>`
滑块，轨道+填充全液态玻璃。

```tsx
<GlassSlider defaultValue={60} accent="#ff453a" />
```

### `<GlassSegmented>`
分段控制器。

```tsx
<GlassSegmented options={['日','周','月']} onChange={(i) => {}} />
```

### `<GlassStepper>`
± 步进器。

```tsx
<GlassStepper min={0} max={100} step={5} value={val} onChange={setVal} />
```

### `<GlassDatePicker>`
日历日期选择器。

```tsx
<GlassDatePicker value={date} onChange={setDate} />
```

### `<GlassColorPicker>`
取色器。

---

## 展示

### `<GlassCard>`
```tsx
<GlassCard title="标题" icon="🔮">内容</GlassCard>
```

### `<GlassList>`
```tsx
<GlassList items={[{icon:'📱',title:'iPhone',subtitle:'iOS 18'}]} />
```

### `<GlassAccordion>`
```tsx
<GlassAccordion items={[{title:'标题',content:'内容'}]} />
```

### `<GlassNotification>`
iOS 风格通知横幅。

```tsx
<GlassNotification icon="💬" app="信息" title="新消息" body="内容" />
```

### `<GlassProgress>`
```tsx
<GlassProgress percent={65} color="#30d158" showText />
```

### `<GlassBadge>`
```tsx
<GlassBadge count={5}><span>🔔</span></GlassBadge>
<GlassBadge dot><span>📧</span></GlassBadge>
```

### `<GlassAvatar>`
```tsx
<GlassAvatar src="url" size={44} alt="用户" />
```

### `<GlassTag>`
```tsx
<GlassTag color="rgba(10,132,255,0.35)">标签</GlassTag>
<GlassTag closable onClose={() => {}}>可关闭</GlassTag>
```

### `<GlassChip>`
标签芯片。

### `<GlassIcon>`
图标组件，可选液态玻璃包裹。

### `<GlassSpinner>`
```tsx
<GlassSpinner size="large" tint="#0a84ff" />
```

### `<GlassSkeleton>`
骨架屏占位。

### `<GlassEmptyState>`
```tsx
<GlassEmptyState icon="📦" title="暂无数据" subtitle="描述" actionLabel="添加" onAction={() => {}} />
```

### `<GlassPageControl>`
圆点页面指示器。

```tsx
<GlassPageControl count={5} current={2} onChange={setPage} />
```

### `<GlassDivider>`
分割线。

---

## 反馈

### `<GlassModal>`
```tsx
<GlassModal open={show} onClose={() => setShow(false)} title="标题">
  内容
</GlassModal>
```

### `<GlassSheet>`
底部弹出面板，支持 detent 切换、拖拽关闭。

```tsx
<GlassSheet open={show} onClose={() => setShow(false)} title="选择操作"
  actions={[{ label: '拍照', onClick: () => {} }, { label: '取消', onClick: () => {}, cancel: true }]}
/>
```

### `<GlassToast>`
```tsx
import { useToast, toast } from '@xiaojiaenen/liquid-glass'

const { show, ToastContainer } = useToast()
show('操作成功', '✓')
// 或
toast('操作成功')
```

### `<GlassTooltip>`
```tsx
<GlassTooltip content="提示文字" position="top">
  <GlassButton>Hover 我</GlassButton>
</GlassTooltip>
```

### `<GlassPopover>`
弹出浮层。

### `<GlassContextMenu>`
```tsx
<GlassContextMenu items={[
  { label: '复制', icon: '📋', onClick: () => {} },
  { label: '删除', icon: '🗑️', onClick: () => {}, destructive: true },
]}>
  <GlassButton>右键/长按</GlassButton>
</GlassContextMenu>
```

### `<GlassPagination>`
```tsx
<GlassPagination total={20} current={page} onChange={setPage} />
```

### `<GlassAlert>`
提示框。

---

## 高级

### `<GlassCodeBlock>`
代码高亮块（需要 `prism-react-renderer`）。

### `<GlassCommandPalette>`
命令面板。

### `<GlassOnboarding>`
引导页。

```tsx
<GlassOnboarding pages={[{icon:'🎉',title:'欢迎',description:'...'}]} onFinish={() => {}} />
```

### `<GlassPullToRefresh>`
下拉刷新。

### `<GlassSplitView>`
分栏布局。

### `<GlassTable>`
表格。

### `<GlassTimeline>`
时间线。

### `<GlassTreeView>`
树形视图。

### `<GlassMusicPlayer>`
音乐播放器 UI。

### `<Dock>`
macOS 风格 Dock。

### `<DragGlass>`
拖拽折射演示（调试用）。

---

## `withLiquidGlass(hoc)`

把任意组件包一层液态玻璃。

```tsx
import { withLiquidGlass } from '@xiaojiaenen/liquid-glass'

const GlassyCard = withLiquidGlass(MyComponent, {
  preset: 'card',
  tint: 'rgba(10,132,255,0.08)',
  radius: 16,
})

<GlassyCard title="Hello" />
```

---

## 设计令牌

```tsx
import { spring, systemColors, fontStack, radii, glassPresets } from '@xiaojiaenen/liquid-glass'

spring.default   // cubic-bezier(0.34, 1.56, 0.64, 1)
spring.gentle    // cubic-bezier(0.4, 0.8, 0.4, 1)
spring.snappy    // cubic-bezier(0.2, 0.9, 0.3, 1)

systemColors.blue   // '#0a84ff'
systemColors.green  // '#30d158'

glassPresets.pill     // bezelWidth:10, glassThickness:38, refractionScale:0.618
glassPresets.control  // bezelWidth:16, glassThickness:62
glassPresets.card     // bezelWidth:26, glassThickness:100

radii.control  // 12px
radii.card     // 22px
radii.sheet    // 38px
radii.pill     // 999px
```

## Hooks

| Hook | 说明 |
|------|------|
| `useLiquidGlass(opts)` | 底层引擎 hook，返回 ref/maps/supported |
| `useGlassParallax(enabled, onAngle)` | 鼠标视差 hook |
| `useGlassTheme()` | 主题上下文 |
| `useBackgroundLuminance(ref)` | 背景亮度感知 |
| `useReducedMotion()` | 是否开启减弱动效 |
| `useToast()` | Toast 管理器 |

## 浏览器兼容性

| 浏览器 | 效果 |
|--------|------|
| Chrome / Edge | SVG 物理折射 + 360° 镜面高光 |
| Safari / Firefox | 毛玻璃降级（blur + 噪声纹理 + 渐变高光） |

## 发布流程

```bash
npm run build:lib          # 构建
npm version patch          # 升级版本
npm publish --registry https://registry.npmjs.org/  # 发布
```
