import { useState } from 'react'
import { Dock } from '../components/Dock'
import { GlassCard } from '../components/GlassCard'
import { GlassButton } from '../components/GlassButton'
import { LiquidGlass } from '../lib/LiquidGlass'
import { supportsSvgBackdrop } from '../lib/capabilities'

export function App() {
  const [count, setCount] = useState(0)
  const supported = supportsSvgBackdrop()

  return (
    <div className="stage">
      <div className="stage__bg" />

      <header className="hero">
        <LiquidGlass radius={40} bezel={24} strength={1} blur={2} style={{ padding: '20px 40px' }}>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
            Liquid Glass
          </h1>
        </LiquidGlass>
        <p className="hero__sub">
          macOS 26 风格 · SVG 折射 + 自适应位移贴图
          <br />
          <span style={{ opacity: 0.7, fontSize: 13 }}>
            当前渲染模式:{supported ? 'SVG 折射(Chromium)' : '毛玻璃降级(Safari/Firefox)'}
          </span>
        </p>
      </header>

      <section className="row">
        <GlassCard title="真实折射">
          边缘像棱镜一样弯曲背后的内容,中心保持通透。位移贴图按元素尺寸实时生成,任意大小都正确。
        </GlassCard>
        <GlassCard title="自适应">
          ResizeObserver 跟踪尺寸变化,改圆角、改棱镜宽度都会重建贴图,不依赖预烤静态图。
        </GlassCard>
      </section>

      <section className="row">
        <GlassButton onClick={() => setCount((c) => c + 1)}>
          点击计数:{count}
        </GlassButton>
        <GlassButton onClick={() => setCount(0)}>重置</GlassButton>
      </section>

      <footer className="dock-wrap">
        <Dock />
      </footer>
    </div>
  )
}
