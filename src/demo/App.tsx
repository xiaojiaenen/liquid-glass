import { useState } from 'react'
import { Dock } from '../components/Dock'
import { GlassCard } from '../components/GlassCard'
import { GlassButton } from '../components/GlassButton'
import { GlassSwitch } from '../components/GlassSwitch'
import { GlassSlider } from '../components/GlassSlider'
import { GlassSearch } from '../components/GlassSearch'
import { GlassSegmented } from '../components/GlassSegmented'
import { GlassMusicPlayer } from '../components/GlassMusicPlayer'
import { GlassNotification } from '../components/GlassNotification'
import { DragGlass } from '../components/DragGlass'
import { LiquidGlass } from '../lib/LiquidGlass'
import { supportsSvgBackdrop } from '../lib/capabilities'

const backgrounds = [
  {
    name: '渐变',
    css: 'radial-gradient(circle at 18% 22%, #ff6ec7 0%, transparent 38%), radial-gradient(circle at 82% 18%, #ffd86b 0%, transparent 36%), radial-gradient(circle at 70% 78%, #4facfe 0%, transparent 44%), radial-gradient(circle at 28% 82%, #43e97b 0%, transparent 42%), linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
  },
  {
    name: '风景',
    css: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80) center/cover',
  },
  {
    name: '城市',
    css: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80) center/cover',
  },
  {
    name: '格纹',
    css: 'repeating-linear-gradient(45deg, #1e293b 0 28px, #334155 28px 56px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0 28px, transparent 28px 56px)',
  },
]

export function App() {
  const [bg, setBg] = useState(0)
  const supported = supportsSvgBackdrop()

  return (
    <div className="stage">
      <div className="stage__bg" style={{ background: backgrounds[bg].css }} />

      {/* 顶栏:标题 + 背景切换 */}
      <header className="topbar">
        <LiquidGlass radius={44} bezelWidth={28} glassThickness={130} refractionScale={1} blur={0.5} style={{ padding: '16px 32px' }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
            Liquid Glass
          </h1>
        </LiquidGlass>

        <LiquidGlass radius={22} bezelWidth={14} glassThickness={70} refractionScale={1} blur={0.5} style={{ padding: 6 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {backgrounds.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setBg(i)}
                style={{
                  border: 'none',
                  borderRadius: 16,
                  padding: '8px 16px',
                  fontSize: 14,
                  cursor: 'pointer',
                  color: '#fff',
                  background: bg === i ? 'rgba(255,255,255,0.25)' : 'transparent',
                  fontWeight: bg === i ? 700 : 500,
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </LiquidGlass>
      </header>

      <p className="mode-hint">
        渲染模式:{supported ? 'SVG 折射(Chromium)' : '毛玻璃降级(Safari/Firefox)'}
      </p>

      {/* 控件区 */}
      <Section title="拖动折射测试">
        <DragGlass />
      </Section>

      {/* 控件区 */}
      <Section title="控件">
        <div className="control-grid">
          <Labeled label="开关">
            <GlassSwitch defaultOn />
          </Labeled>
          <Labeled label="滑块">
            <GlassSlider defaultValue={60} />
          </Labeled>
          <Labeled label="分段控制">
            <GlassSegmented />
          </Labeled>
          <Labeled label="搜索框">
            <GlassSearch />
          </Labeled>
        </div>
      </Section>

      {/* 按钮 */}
      <Section title="按钮">
        <div className="row">
          <GlassButton variant="prominent">主要操作</GlassButton>
          <GlassButton>次要</GlassButton>
        </div>
      </Section>

      {/* 卡片 / 播放器 / 通知 */}
      <Section title="卡片与面板">
        <div className="row">
          <GlassMusicPlayer />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <GlassNotification
              icon="💬"
              iconBg="linear-gradient(160deg,#30d158,#34c759)"
              app="信息"
              title="新消息"
              body="液态玻璃的边缘正在折射你身后的世界。"
            />
            <GlassNotification
              icon="📅"
              iconBg="linear-gradient(160deg,#ff453a,#ff9f0a)"
              app="日历"
              time="10:30"
              title="设计评审"
              body="30 分钟后在会议室 A,记得带上原型。"
            />
          </div>
        </div>
      </Section>

      <Section title="信息卡">
        <div className="row">
          <GlassCard title="真实折射" icon="🔮">
            边缘像棱镜一样弯曲背后的内容,中心保持通透。位移贴图按元素尺寸实时生成。
          </GlassCard>
          <GlassCard title="自适应" icon="📐">
            ResizeObserver 跟踪尺寸,改圆角、棱镜宽度、玻璃厚度都会重建贴图。
          </GlassCard>
        </div>
      </Section>

      <footer className="dock-wrap">
        <Dock />
      </footer>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  )
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="labeled">
      <span className="labeled__text">{label}</span>
      {children}
    </div>
  )
}
