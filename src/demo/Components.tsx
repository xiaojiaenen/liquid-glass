import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { GlassButton } from '../components/GlassButton'
import { GlassCard } from '../components/GlassCard'
import { GlassSearch } from '../components/GlassSearch'
import { GlassSwitch } from '../components/GlassSwitch'
import { GlassSlider } from '../components/GlassSlider'
import { GlassSegmented } from '../components/GlassSegmented'
import { GlassMusicPlayer } from '../components/GlassMusicPlayer'
import { GlassNotification } from '../components/GlassNotification'
import { Dock } from '../components/Dock'
import { DragGlass } from '../components/DragGlass'
import { useToast } from '../components/GlassToast'
import { GlassModal } from '../components/GlassModal'
import { GlassTooltip } from '../components/GlassTooltip'
import { GlassInput } from '../components/GlassInput'
import { GlassCheckbox } from '../components/GlassCheckbox'
import { GlassRadio } from '../components/GlassRadio'
import { GlassSelect } from '../components/GlassSelect'
import { GlassDatePicker } from '../components/GlassDatePicker'
import { GlassTabs } from '../components/GlassTabs'
import { GlassNavbar } from '../components/GlassNavbar'
import { GlassBreadcrumb } from '../components/GlassBreadcrumb'
import { GlassBadge } from '../components/GlassBadge'
import { GlassAvatar } from '../components/GlassAvatar'
import { GlassTag } from '../components/GlassTag'
import { GlassProgress } from '../components/GlassProgress'
import { GlassList } from '../components/GlassList'
import { GlassAccordion } from '../components/GlassAccordion'
import { supportsSvgBackdrop } from '../lib/capabilities'
import { GlassSpinner } from '../components/GlassSpinner'
import { GlassStepper } from '../components/GlassStepper'
import { GlassPageControl } from '../components/GlassPageControl'
import { GlassEmptyState } from '../components/GlassEmptyState'
import { GlassSheet, type GlassSheetAction } from '../components/GlassSheet'
import { GlassContextMenu } from '../components/GlassContextMenu'
import { GlassTabBar } from '../components/GlassTabBar'

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

export function Components() {
  const [bg, setBg] = useState(0)
  const supported = supportsSvgBackdrop()
  const { show: showToast, ToastContainer } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [stepperVal, setStepperVal] = useState(5)
  const [tabBarVal, setTabBarVal] = useState('home')
  const [pageIdx, setPageIdx] = useState(0)
  const [menuItems] = useState([
    { label: '复制', icon: '📋', onClick: () => alert('已复制') },
    { label: '重命名', icon: '✏️', onClick: () => alert('重命名') },
    { label: '分享', icon: '🔗', onClick: () => alert('分享') },
    { label: '删除', icon: '🗑️', onClick: () => alert('已删除'), destructive: true },
  ])
  const sheetActions: GlassSheetAction[] = [
    { label: '拍照', onClick: () => {} },
    { label: '从相册选择', onClick: () => {} },
    { label: '从文件选择', onClick: () => {} },
    { label: '取消', onClick: () => {}, cancel: true },
  ]

  return (
    <div className="stage">
      <div className="stage__bg" style={{ background: backgrounds[bg].css }} />
      <ToastContainer />

      {/* 顶栏 */}
      <header className="topbar">
        <LiquidGlass radius={44} bezelWidth={28} glassThickness={130} refractionScale={1} blur={0.5} style={{ padding: '16px 32px' }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
            Liquid Glass 组件库
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

      {/* 导航 */}
      <Section title="导航栏 GlassNavbar">
        <GlassNavbar title="液态玻璃" onBack={() => {}} right={<span style={{ fontSize: 13, opacity: 0.6 }}>编辑</span>} />
      </Section>

      <Section title="面包屑 GlassBreadcrumb">
        <GlassBreadcrumb items={[{ label: '首页' }, { label: '组件' }, { label: '面包屑' }]} />
      </Section>

      <Section title="标签页 GlassTabs">
        <GlassTabs tabs={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]} />
      </Section>

      {/* 拖动折射 */}
      <Section title="拖动折射 DragGlass">
        <DragGlass />
      </Section>

      {/* 按钮 */}
      <Section title="按钮 GlassButton">
        <div className="row">
          <GlassButton variant="prominent">主要操作</GlassButton>
          <GlassButton>次要按钮</GlassButton>
        </div>
      </Section>

      {/* 表单 */}
      <Section title="表单">
        <div className="control-grid">
          <Labeled label="输入框 GlassInput">
            <GlassInput placeholder="请输入内容" />
          </Labeled>
          <Labeled label="搜索框 GlassSearch">
            <GlassSearch />
          </Labeled>
          <Labeled label="下拉选择 GlassSelect">
            <GlassSelect options={[{ label: '选项 A', value: 'a' }, { label: '选项 B', value: 'b' }, { label: '选项 C', value: 'c' }]} />
          </Labeled>
        </div>
        <div className="control-grid" style={{ marginTop: 16 }}>
          <Labeled label="开关 GlassSwitch">
            <GlassSwitch defaultOn />
          </Labeled>
          <Labeled label="滑块 GlassSlider">
            <GlassSlider defaultValue={60} />
          </Labeled>
          <Labeled label="分段控制 GlassSegmented">
            <GlassSegmented />
          </Labeled>
        </div>
        <div className="control-grid" style={{ marginTop: 16 }}>
          <Labeled label="复选框 GlassCheckbox">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <GlassCheckbox label="选项 A" checked />
              <GlassCheckbox label="选项 B" />
            </div>
          </Labeled>
          <Labeled label="单选框 GlassRadio">
            <GlassRadio options={[{ label: '方案一', value: '1' }, { label: '方案二', value: '2' }, { label: '方案三', value: '3' }]} />
          </Labeled>
          <Labeled label="日期选择 GlassDatePicker">
            <GlassDatePicker />
          </Labeled>
        </div>
        <div className="control-grid" style={{ marginTop: 16 }}>
          <Labeled label="步进器 GlassStepper">
            <GlassStepper value={stepperVal} onChange={setStepperVal} min={0} max={20} />
          </Labeled>
        </div>
      </Section>

      {/* 展示 */}
      <Section title="展示组件">
        <div className="row">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Labeled label="徽标 GlassBadge">
              <div style={{ display: 'flex', gap: 20 }}>
                <GlassBadge count={5}>
                  <span style={{ fontSize: 22 }}>🔔</span>
                </GlassBadge>
                <GlassBadge count={128}>
                  <span style={{ fontSize: 22 }}>💬</span>
                </GlassBadge>
                <GlassBadge dot>
                  <span style={{ fontSize: 22 }}>📧</span>
                </GlassBadge>
              </div>
            </Labeled>
            <Labeled label="头像 GlassAvatar">
              <div style={{ display: 'flex', gap: 12 }}>
                <GlassAvatar size={36} alt="A" />
                <GlassAvatar size={44} alt="B" />
                <GlassAvatar size={52} alt="C" />
              </div>
            </Labeled>
            <Labeled label="标签 GlassTag">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <GlassTag>默认</GlassTag>
                <GlassTag color="rgba(10,132,255,0.35)">蓝色</GlassTag>
                <GlassTag color="rgba(48,209,88,0.35)">绿色</GlassTag>
                <GlassTag closable onClose={() => {}}>可关闭</GlassTag>
              </div>
            </Labeled>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            <Labeled label="进度条 GlassProgress">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                <GlassProgress percent={25} />
                <GlassProgress percent={60} color="rgba(48,209,88,0.85)" />
                <GlassProgress percent={90} color="rgba(255,69,58,0.85)" showText />
              </div>
            </Labeled>
            <Labeled label="列表 GlassList">
              <GlassList
                items={[
                  { icon: '📱', title: 'iPhone', subtitle: 'iOS 18' },
                  { icon: '💻', title: 'MacBook', subtitle: 'macOS Sequoia' },
                  { icon: '⌚', title: 'Apple Watch', subtitle: 'watchOS 11' },
                ]}
              />
            </Labeled>
          </div>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <Labeled label="活动指示器 GlassSpinner">
            <div className="row">
              <GlassSpinner size="small" />
              <GlassSpinner size="medium" />
              <GlassSpinner size="large" />
            </div>
          </Labeled>
        </div>
      </Section>

      {/* 反馈 */}
      <Section title="反馈">
        <div className="row">
          <GlassButton onClick={() => showToast('操作成功', '✓')}>显示 Toast</GlassButton>
          <GlassButton onClick={() => setModalOpen(true)}>打开弹窗</GlassButton>
          <GlassTooltip content="这是一个提示">
            <GlassButton>Hover 提示</GlassButton>
          </GlassTooltip>
          <GlassButton onClick={() => setSheetOpen(true)}>底部面板</GlassButton>
          <GlassContextMenu items={menuItems}>
            <GlassButton>右键/长按菜单</GlassButton>
          </GlassContextMenu>
        </div>
      </Section>

      {/* 折叠面板 */}
      <Section title="折叠面板 GlassAccordion">
        <GlassAccordion
          items={[
            { title: '什么是液态玻璃？', content: '液态玻璃是 Apple 在 WWDC25 推出的全新设计语言，模拟真实玻璃的折射、高光和透明效果。' },
            { title: '如何使用？', content: '引入 LiquidGlass 组件，设置圆角、棱镜宽度、玻璃厚度等参数即可。' },
            { title: '兼容性？', content: 'Chromium 浏览器使用 SVG 折射滤镜，Safari/Firefox 自动降级为毛玻璃效果。' },
          ]}
        />
      </Section>

      {/* 页面指示器 */}
      <Section title="页面指示器 GlassPageControl">
        <div className="row">
          <GlassPageControl count={5} current={pageIdx} onChange={setPageIdx} />
        </div>
      </Section>

      {/* 空状态 */}
      <Section title="空状态 GlassEmptyState">
        <div className="row">
          <GlassEmptyState
            icon="📦"
            title="暂无数据"
            subtitle="当前列表为空，点击下方按钮开始添加内容。"
            actionLabel="添加内容"
            onAction={() => alert('添加内容')}
          />
        </div>
      </Section>

      {/* 底部标签栏 */}
      <Section title="底部标签栏 GlassTabBar">
        <GlassTabBar
          value={tabBarVal}
          onChange={setTabBarVal}
          items={[
            { icon: '🏠', label: '首页', value: 'home' },
            { icon: '🔍', label: '探索', value: 'explore' },
            { icon: '💬', label: '消息', value: 'chat' },
            { icon: '👤', label: '我的', value: 'profile' },
          ]}
        />
      </Section>

      {/* 卡片 */}
      <Section title="卡片 GlassCard">
        <div className="row">
          <GlassCard title="真实折射" icon="🔮">
            边缘像棱镜一样弯曲背后的内容,中心保持通透。位移贴图按元素尺寸实时生成。
          </GlassCard>
          <GlassCard title="自适应" icon="📐">
            ResizeObserver 跟踪尺寸,改圆角、棱镜宽度、玻璃厚度都会重建贴图。
          </GlassCard>
        </div>
      </Section>

      {/* 音乐播放器 */}
      <Section title="音乐播放器 GlassMusicPlayer">
        <GlassMusicPlayer />
      </Section>

      {/* 通知 */}
      <Section title="通知 GlassNotification">
        <div className="row">
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
      </Section>

      <footer className="dock-wrap">
        <Dock />
      </footer>

      {/* Modal */}
      <GlassModal open={modalOpen} onClose={() => setModalOpen(false)} title="液态玻璃弹窗">
        <p style={{ margin: 0 }}>这是一个模态对话框，按 ESC 或点击遮罩关闭。</p>
      </GlassModal>

      {/* Sheet */}
      <GlassSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="选择操作" actions={sheetActions} />
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
