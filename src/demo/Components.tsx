import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { GlassProvider } from '../lib/GlassProvider'
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
import { GlassSidebar } from '../components/GlassSidebar'
import { GlassPagination } from '../components/GlassPagination'
import { GlassAlert } from '../components/GlassAlert'
import { GlassChipGroup } from '../components/GlassChip'
import { GlassTreeView } from '../components/GlassTreeView'
import { GlassTable } from '../components/GlassTable'
import { GlassCommandPalette } from '../components/GlassCommandPalette'
import { GlassTimeline } from '../components/GlassTimeline'
import { GlassColorPicker } from '../components/GlassColorPicker'
import { GlassIcon } from '../components/GlassIcon'
import { GlassDivider } from '../components/GlassDivider'
import { GlassToolbar, GlassToolbarButton } from '../components/GlassToolbar'
import { GlassSkeleton, GlassSkeletonGroup } from '../components/GlassSkeleton'
import { GlassPopover } from '../components/GlassPopover'
import { GlassSplitView } from '../components/GlassSplitView'
import { GlassOnboarding } from '../components/GlassOnboarding'
import { GlassCodeBlock } from '../components/GlassCodeBlock'
import { withLiquidGlass } from '../lib/withLiquidGlass'

const backgrounds = [
  { name: '渐变', css: 'radial-gradient(circle at 18% 22%, #ff6ec7 0%, transparent 38%), radial-gradient(circle at 82% 18%, #ffd86b 0%, transparent 36%), radial-gradient(circle at 70% 78%, #4facfe 0%, transparent 44%), radial-gradient(circle at 28% 82%, #43e97b 0%, transparent 42%), linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)' },
  { name: '风景', css: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80) center/cover' },
  { name: '城市', css: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80) center/cover' },
  { name: '格纹', css: 'repeating-linear-gradient(45deg, #1e293b 0 28px, #334155 28px 56px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0 28px, transparent 28px 56px)' },
]

export function Components() {
  const [bg, setBg] = useState(0)
  const supported = supportsSvgBackdrop()
  const { show: showToast, ToastContainer } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [stepperVal, setStepperVal] = useState(5)
  const [tabBarVal, setTabBarVal] = useState('home')
  const [pageIdx, setPageIdx] = useState(0)
  const [sidebarVal, setSidebarVal] = useState('overview')
  const [paginationPage, setPaginationPage] = useState(1)
  const [colorVal, setColorVal] = useState('#0a84ff')
  const [chipSelected, setChipSelected] = useState<string[]>(['pop'])
  const [menuItems] = useState([
    { label: '复制', icon: '📋', onClick: () => showToast('已复制') },
    { label: '重命名', icon: '✏️', onClick: () => showToast('重命名') },
    { label: '分享', icon: '🔗', onClick: () => showToast('分享') },
    { label: '删除', icon: '🗑️', onClick: () => showToast('已删除'), destructive: true },
  ])
  const sheetActions: GlassSheetAction[] = [
    { label: '拍照', onClick: () => {} },
    { label: '从相册选择', onClick: () => {} },
    { label: '取消', onClick: () => {}, cancel: true },
  ]
  const cmdItems = [
    { id: '1', label: '打开设置', icon: '⚙️', group: '通用', onSelect: () => showToast('设置') },
    { id: '2', label: '搜索文件', icon: '📁', group: '通用', onSelect: () => showToast('搜索') },
    { id: '3', label: '新建文档', icon: '📄', group: '文件', onSelect: () => showToast('新建') },
    { id: '4', label: '导出 PDF', icon: '📤', group: '文件', onSelect: () => showToast('导出') },
    { id: '5', label: '切换主题', icon: '🎨', group: '外观', onSelect: () => showToast('主题') },
  ]

  return (
    <GlassProvider defaultMode="dark">
      <div className="stage">
        <div className="stage__bg" style={{ background: backgrounds[bg].css }} />
        <ToastContainer />

        {/* 顶栏 */}
        <header className="topbar">
          <LiquidGlass radius={44} bezelWidth={28} glassThickness={130} refractionScale={1} blur={0.5} style={{ padding: '16px 32px' }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Liquid Glass 组件库</h1>
          </LiquidGlass>
          <LiquidGlass radius={22} bezelWidth={14} glassThickness={70} refractionScale={1} blur={0.5} style={{ padding: 6 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {backgrounds.map((b, i) => (
                <button key={b.name} onClick={() => setBg(i)} style={{ border: 'none', borderRadius: 16, padding: '8px 16px', fontSize: 14, cursor: 'pointer', color: '#fff', background: bg === i ? 'rgba(255,255,255,0.25)' : 'transparent', fontWeight: bg === i ? 700 : 500 }}>
                  {b.name}
                </button>
              ))}
            </div>
          </LiquidGlass>
        </header>

        <p className="mode-hint">渲染模式: {supported ? 'SVG 折射(Chromium)' : '毛玻璃降级(Safari/Firefox)'}</p>

        {/* ───── 导航 ───── */}
        <Section title="导航栏 GlassNavbar">
          <GlassNavbar title="液态玻璃" onBack={() => {}} right={<span style={{ fontSize: 13, opacity: 0.6 }}>编辑</span>} />
        </Section>

        <Section title="面包屑 GlassBreadcrumb">
          <GlassBreadcrumb items={[{ label: '首页' }, { label: '组件' }, { label: '面包屑' }]} />
        </Section>

        <Section title="标签页 GlassTabs">
          <GlassTabs tabs={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]} />
        </Section>

        <Section title="底部标签栏 GlassTabBar">
          <GlassTabBar value={tabBarVal} onChange={setTabBarVal} items={[
            { icon: '🏠', label: '首页', value: 'home' },
            { icon: '🔍', label: '探索', value: 'explore' },
            { icon: '💬', label: '消息', value: 'chat' },
            { icon: '👤', label: '我的', value: 'profile' },
          ]} />
        </Section>

        <Section title="侧边栏 GlassSidebar">
          <div className="row" style={{ alignItems: 'stretch' }}>
            <GlassSidebar value={sidebarVal} onChange={setSidebarVal} items={[
              { icon: '📊', label: '概览', value: 'overview' },
              { icon: '📁', label: '项目', value: 'projects', badge: 5 },
              { icon: '💬', label: '消息', value: 'messages', badge: 12 },
              { icon: '⚙️', label: '设置', value: 'settings' },
            ]} footer={<span style={{ fontSize: 13, opacity: 0.4 }}>👤 用户</span>} />
            <GlassSidebar value={sidebarVal} onChange={setSidebarVal} side="right" defaultCollapsed items={[
              { icon: '📊', label: '概览', value: 'overview' },
              { icon: '⚙️', label: '设置', value: 'settings' },
            ]} />
          </div>
        </Section>

        <Section title="工具栏 GlassToolbar">
          <GlassToolbar
            left={<><GlassToolbarButton icon="⬅️" /><GlassToolbarButton icon="➡️" /></>}
            center={<span style={{ fontSize: 15, fontWeight: 600 }}>标题</span>}
            right={<GlassToolbarButton icon="⚙️" />}
          />
        </Section>

        <Section title="分栏视图 GlassSplitView">
          <div style={{ height: 200 }}>
            <GlassSplitView
              sidebar={
                <div style={{ padding: 12, fontSize: 13 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>侧边栏</div>
                  <div style={{ opacity: 0.6 }}>菜单项 1</div>
                  <div style={{ opacity: 0.6 }}>菜单项 2</div>
                </div>
              }
            >
              <div style={{ padding: 16, fontSize: 14, opacity: 0.7 }}>主内容区域</div>
            </GlassSplitView>
          </div>
        </Section>

        {/* ───── 表单 ───── */}
        <Section title="表单">
          <div className="control-grid">
            <Labeled label="输入框 GlassInput"><GlassInput placeholder="请输入内容" /></Labeled>
            <Labeled label="搜索框 GlassSearch"><GlassSearch /></Labeled>
            <Labeled label="下拉选择 GlassSelect"><GlassSelect options={[{ label: '选项 A', value: 'a' }, { label: '选项 B', value: 'b' }, { label: '选项 C', value: 'c' }]} /></Labeled>
          </div>
          <div className="control-grid" style={{ marginTop: 16 }}>
            <Labeled label="开关 GlassSwitch"><GlassSwitch defaultOn /></Labeled>
            <Labeled label="滑块 GlassSlider"><GlassSlider defaultValue={60} /></Labeled>
            <Labeled label="分段控制 GlassSegmented"><GlassSegmented /></Labeled>
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
            <Labeled label="步进器 GlassStepper">
              <GlassStepper value={stepperVal} onChange={setStepperVal} min={0} max={20} />
            </Labeled>
          </div>
          <div className="control-grid" style={{ marginTop: 16 }}>
            <Labeled label="日期选择 GlassDatePicker"><GlassDatePicker /></Labeled>
            <Labeled label="颜色选择 GlassColorPicker"><GlassColorPicker value={colorVal} onChange={setColorVal} /></Labeled>
          </div>
        </Section>

        {/* ───── 按钮 ───── */}
        <Section title="按钮 GlassButton">
          <div className="row">
            <GlassButton variant="prominent">主要操作</GlassButton>
            <GlassButton>次要按钮</GlassButton>
            <GlassButton disabled>禁用状态</GlassButton>
            <GlassButton size="small">小号按钮</GlassButton>
          </div>
        </Section>

        {/* ───── 展示 ───── */}
        <Section title="展示组件">
          <div className="row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Labeled label="徽标 GlassBadge">
                <div style={{ display: 'flex', gap: 20 }}>
                  <GlassBadge count={5}><span style={{ fontSize: 22 }}>🔔</span></GlassBadge>
                  <GlassBadge count={128}><span style={{ fontSize: 22 }}>💬</span></GlassBadge>
                  <GlassBadge dot><span style={{ fontSize: 22 }}>📧</span></GlassBadge>
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
                  <GlassTag closable onClose={() => showToast('关闭')}>可关闭</GlassTag>
                </div>
              </Labeled>
              <Labeled label="筛选标签 GlassChip">
                <GlassChipGroup
                  chips={[
                    { label: '全部', value: 'all' },
                    { label: '流行', value: 'pop' },
                    { label: '摇滚', value: 'rock' },
                    { label: '电子', value: 'elec' },
                  ]}
                  selected={chipSelected}
                  onChange={setChipSelected}
                />
              </Labeled>
              <Labeled label="图标 GlassIcon">
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {['heart', 'star', 'bell', 'settings', 'search', 'user', 'mail', 'camera', 'lock', 'globe'].map(name => (
                    <GlassIcon key={name} name={name} size="medium" glass />
                  ))}
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
                <GlassList items={[
                  { icon: '📱', title: 'iPhone', subtitle: 'iOS 18' },
                  { icon: '💻', title: 'MacBook', subtitle: 'macOS Sequoia' },
                  { icon: '⌚', title: 'Apple Watch', subtitle: 'watchOS 11' },
                ]} />
              </Labeled>
              <Labeled label="活动指示器 GlassSpinner">
                <div className="row"><GlassSpinner size="small" /><GlassSpinner size="medium" /><GlassSpinner size="large" /></div>
              </Labeled>
              <Labeled label="分隔线 GlassDivider">
                <div style={{ width: '100%' }}><GlassDivider /><div style={{ height: 8 }} /><GlassDivider inset /></div>
              </Labeled>
            </div>
          </div>
        </Section>

        {/* ───── 数据展示 ───── */}
        <Section title="数据展示">
          <Labeled label="数据表格 GlassTable">
            <GlassTable
              columns={[
                { key: 'name', title: '名称', width: 120 },
                { key: 'type', title: '类型' },
                { key: 'size', title: '大小', align: 'right' as const },
              ]}
              data={[
                { name: 'index.ts', type: 'TypeScript', size: '2.4 KB' },
                { name: 'style.css', type: 'CSS', size: '1.8 KB' },
                { name: 'README.md', type: 'Markdown', size: '4.2 KB' },
              ]}
            />
          </Labeled>
          <Labeled label="树形视图 GlassTreeView" style={{ marginTop: 16 }}>
            <GlassTreeView
              items={[
                { id: '1', label: 'src', icon: '📁', children: [
                  { id: '1-1', label: 'components', icon: '📁', children: [
                    { id: '1-1-1', label: 'Button.tsx', icon: '📄' },
                    { id: '1-1-2', label: 'Card.tsx', icon: '📄' },
                  ]},
                  { id: '1-2', label: 'lib', icon: '📁' },
                ]},
                { id: '2', label: 'package.json', icon: '📄' },
              ]}
            />
          </Labeled>
          <Labeled label="时间线 GlassTimeline" style={{ marginTop: 16 }}>
            <GlassTimeline items={[
              { id: '1', title: '项目创建', description: '初始化液态玻璃组件库', time: '09:00', icon: '🚀' },
              { id: '2', title: '核心引擎', description: 'SVG 位移贴图 + Snell 折射', time: '10:30', icon: '⚡' },
              { id: '3', title: '组件开发', description: '49 个组件全部完成', time: '14:00', icon: '🎨' },
            ]} />
          </Labeled>
        </Section>

        {/* ───── 骨架屏 ───── */}
        <Section title="骨架屏 GlassSkeleton">
          <div className="row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <GlassSkeleton width={200} height={20} variant="line" />
              <GlassSkeleton width={160} height={14} variant="line" />
              <GlassSkeleton width={180} height={14} variant="line" />
            </div>
            <GlassSkeletonGroup avatar title lines={3} />
          </div>
        </Section>

        {/* ───── 反馈 ───── */}
        <Section title="反馈">
          <div className="row">
            <GlassButton onClick={() => showToast('操作成功', '✓')}>Toast</GlassButton>
            <GlassButton onClick={() => setModalOpen(true)}>弹窗 Modal</GlassButton>
            <GlassButton onClick={() => setAlertOpen(true)}>确认 Alert</GlassButton>
            <GlassButton onClick={() => setSheetOpen(true)}>底部面板 Sheet</GlassButton>
            <GlassButton onClick={() => setCmdOpen(true)}>命令面板 ⌘K</GlassButton>
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <GlassTooltip content="这是一个提示"><GlassButton>Tooltip</GlassButton></GlassTooltip>
            <GlassContextMenu items={menuItems}><GlassButton>右键菜单</GlassButton></GlassContextMenu>
            <GlassPopover open={popoverOpen} onClose={() => setPopoverOpen(false)} content={<div style={{ padding: 8, fontSize: 14 }}>弹出层内容</div>}>
              <GlassButton onClick={() => setPopoverOpen(true)}>Popover</GlassButton>
            </GlassPopover>
          </div>
        </Section>

        {/* ───── 折叠面板 ───── */}
        <Section title="折叠面板 GlassAccordion">
          <GlassAccordion items={[
            { title: '什么是液态玻璃？', content: 'Apple 在 WWDC25 推出的全新设计语言，模拟真实玻璃的折射和高光。' },
            { title: '如何使用？', content: '引入 LiquidGlass 组件，设置参数即可。' },
            { title: '兼容性？', content: 'Chromium 用 SVG 折射，Safari/Firefox 降级为毛玻璃。' },
          ]} />
        </Section>

        {/* ───── 页面指示器 + 分页 ───── */}
        <Section title="指示器">
          <div className="row">
            <Labeled label="GlassPageControl"><GlassPageControl count={5} current={pageIdx} onChange={setPageIdx} /></Labeled>
            <Labeled label="GlassPagination"><GlassPagination total={20} current={paginationPage} onChange={setPaginationPage} /></Labeled>
          </div>
        </Section>

        {/* ───── 空状态 ───── */}
        <Section title="空状态 GlassEmptyState">
          <GlassEmptyState icon="📦" title="暂无数据" subtitle="当前列表为空" actionLabel="添加内容" onAction={() => showToast('添加')} />
        </Section>

        {/* ───── 边框发光 BorderGlow ───── */}
        <Section title="边框发光 BorderGlow">
          <p style={{ margin: '0 0 16px', fontSize: 14, opacity: 0.6 }}>鼠标悬停查看边框发光效果，光效跟随鼠标移动</p>
          <div className="row">
            <LiquidGlass borderGlow style={{ padding: '24px 32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>默认发光</div>
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>悬停查看效果</div>
              </div>
            </LiquidGlass>
            <LiquidGlass
              borderGlow={{
                colors: ['#22d3ee', '#a78bfa', '#fb923c'],
                glowColor: '200 90 60',
                edgeSensitivity: 50,
              }}
              style={{ padding: '24px 32px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🎨</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>自定义颜色</div>
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>青紫橙渐变</div>
              </div>
            </LiquidGlass>
            <LiquidGlass
              borderGlow={{
                animated: true,
                colors: ['#f43f5e', '#3b82f6', '#10b981'],
              }}
              style={{ padding: '24px 32px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>💫</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>自动扫光</div>
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>页面加载时自动播放</div>
              </div>
            </LiquidGlass>
          </div>
        </Section>

        {/* ───── 拖动折射 ───── */}
        <Section title="拖动折射 DragGlass"><DragGlass /></Section>

        {/* ───── 卡片 ───── */}
        <Section title="卡片 GlassCard">
          <div className="row">
            <GlassCard title="真实折射" icon="🔮">边缘像棱镜一样弯曲背后的内容。</GlassCard>
            <GlassCard title="自适应" icon="📐">ResizeObserver 跟踪尺寸，实时重建贴图。</GlassCard>
          </div>
        </Section>

        {/* ───── 音乐播放器 ───── */}
        <Section title="音乐播放器 GlassMusicPlayer"><GlassMusicPlayer /></Section>

        {/* ───── 通知 ───── */}
        <Section title="通知 GlassNotification">
          <div className="row">
            <GlassNotification icon="💬" iconBg="linear-gradient(160deg,#30d158,#34c759)" app="信息" title="新消息" body="液态玻璃的边缘正在折射你身后的世界。" />
            <GlassNotification icon="📅" iconBg="linear-gradient(160deg,#ff453a,#ff9f0a)" app="日历" time="10:30" title="设计评审" body="30 分钟后在会议室 A。" />
          </div>
        </Section>

        {/* ───── 代码块 ───── */}
        <Section title="代码块 GlassCodeBlock">
          <GlassCodeBlock
            title="GlassButton.tsx"
            language="tsx"
            code={`import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export function GlassButton({ children, onClick, variant = 'regular', size = 'default', disabled = false }) {
  const prominent = variant === 'prominent'
  const h = size === 'small' ? 34 : 50

  return (
    <LiquidGlass
      as="button"
      onClick={onClick}
      disabled={disabled}
      radius={h / 2}
      bezelWidth={prominent ? 14 : 16}
      glassThickness={prominent ? 50 : 62}
      refractionScale={0.618}
      blur={0.35}
      tint={prominent ? 'rgba(10,132,255,0.45)' : 'rgba(255,255,255,0.04)'}
      style={{
        height: h,
        padding: '0 24px',
        fontFamily: fontStack,
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: '#fff',
      }}
    >
      {children}
    </LiquidGlass>
  )
}`}
          />
        </Section>

        {/* ───── 引导页 ───── */}
        <Section title="引导页 GlassOnboarding">
          <GlassButton onClick={() => setOnboardingOpen(true)}>打开引导页</GlassButton>
        </Section>

        {/* ───── 二开工具 ───── */}
        <Section title="二开工具 withLiquidGlass">
          <CustomGlassComponent />
        </Section>

        <footer className="dock-wrap"><Dock /></footer>

        {/* ──── 弹出层 ──── */}
        <GlassModal open={modalOpen} onClose={() => setModalOpen(false)} title="液态玻璃弹窗">
          <p style={{ margin: 0 }}>这是一个模态对话框，按 ESC 或点击遮罩关闭。</p>
        </GlassModal>

        <GlassAlert open={alertOpen} onClose={() => setAlertOpen(false)} title="确认删除" message="此操作不可撤销，确定要删除吗？" actions={[
          { label: '取消', onClick: () => {} },
          { label: '删除', onClick: () => showToast('已删除'), destructive: true, bold: true },
        ]} />

        <GlassSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="选择操作" actions={sheetActions} />

        <GlassCommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={cmdItems} />

        {onboardingOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
            <GlassOnboarding
              pages={[
                { icon: '🔮', title: '液态玻璃', description: '基于物理的实时折射效果' },
                { icon: '⚡', title: '高性能', description: 'SVG 位移贴图，GPU 加速' },
                { icon: '🎨', title: '49 个组件', description: '覆盖导航、表单、展示、反馈' },
              ]}
              onFinish={() => setOnboardingOpen(false)}
              onSkip={() => setOnboardingOpen(false)}
            />
          </div>
        )}
      </div>
    </GlassProvider>
  )
}

const CustomGlassComponent = withLiquidGlass(
  ({ label }: { label?: string }) => (
    <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, textAlign: 'center' }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{label || '任何 React 组件'}</span>
    </div>
  ),
  { preset: 'card', tint: 'rgba(10,132,255,0.08)', radius: 16 },
)

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  )
}

function Labeled({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="labeled" style={style}>
      <span className="labeled__text">{label}</span>
      {children}
    </div>
  )
}
