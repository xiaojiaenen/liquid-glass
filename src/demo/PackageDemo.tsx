import { LiquidGlass, LiquidGlassButton } from 'liquid-glass-backdrop-react'
import 'liquid-glass-backdrop-react/style.css'
import { useState } from 'react'
import './pkg.css'

const backgrounds = [
  'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80) center/cover',
  'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80) center/cover',
  'radial-gradient(circle at 20% 20%, #ff6ec7 0%, transparent 40%), radial-gradient(circle at 80% 30%, #ffd86b 0%, transparent 38%), radial-gradient(circle at 60% 80%, #4facfe 0%, transparent 46%), linear-gradient(135deg, #1e1b4b, #0f172a)',
]

/** 用 npm 包 liquid-glass-backdrop-react 搭的独立测试页 */
export function PackageDemo() {
  const [bg, setBg] = useState(0)
  const [count, setCount] = useState(0)

  return (
    <div className="pkg-stage">
      <div className="pkg-bg" style={{ background: backgrounds[bg] }} />

      <div className="pkg-switch">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            className={bg === i ? 'active' : ''}
            onClick={() => setBg(i)}
          >
            背景 {i + 1}
          </button>
        ))}
      </div>

      <h1 className="pkg-title">liquid-glass-backdrop-react</h1>
      <p className="pkg-sub">npm 包实测 · 在 Chrome 里查看完整折射</p>

      {/* 卡片 */}
      <LiquidGlass
        variant="surface"
        className="pkg-card"
        glassThickness={200}
        refractionScale={0.8}
      >
        <h2>液态玻璃卡片</h2>
        <p>玻璃后的内容会被边缘折射,并叠加镜面高光。拖动背景按钮换图看效果。</p>
      </LiquidGlass>

      {/* 按钮组 */}
      <div className="pkg-row">
        <LiquidGlassButton
          type="button"
          glassThickness={400}
          uiScale={1.2}
          onClick={() => setCount((c) => c + 1)}
        >
          点击 {count}
        </LiquidGlassButton>
        <LiquidGlassButton type="button" glassThickness={300}>
          次要按钮
        </LiquidGlassButton>
      </div>

      {/* 不同表面方程对比 */}
      <div className="pkg-row">
        {(['convex_circle', 'convex_squircle', 'concave', 'lip'] as const).map(
          (s) => (
            <LiquidGlass
              key={s}
              variant="surface"
              className="pkg-chip"
              surface={s}
              glassThickness={250}
            >
              {s}
            </LiquidGlass>
          ),
        )}
      </div>
    </div>
  )
}
