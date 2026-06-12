import { useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSplitViewProps {
  sidebar: ReactNode
  children: ReactNode
  sidebarWidth?: number
  side?: 'left' | 'right'
  collapsible?: boolean
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (open: boolean) => void
  className?: string
  style?: CSSProperties
}

export function GlassSplitView({ sidebar, children, sidebarWidth = 260, side = 'left', collapsible = true, defaultOpen = true, open: controlledOpen, onToggle, className = '', style }: GlassSplitViewProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = controlledOpen ?? internalOpen
  const reducedMotion = useReducedMotion()
  const toggle = () => { const newState = !isOpen; if (controlledOpen === undefined) setInternalOpen(newState); onToggle?.(newState) }
  const transition = reducedMotion ? 'none' : `all 0.35s ${spring.gentle}`

  return (
    <div className={className} style={{ display: 'flex', flexDirection: side === 'left' ? 'row' : 'row-reverse', width: '100%', height: '100%', overflow: 'hidden', ...style }}>
      <div style={{ width: isOpen ? sidebarWidth : 0, minWidth: isOpen ? sidebarWidth : 0, overflow: 'hidden', transition, flexShrink: 0 }}>
        <LiquidGlass radius={0} bezelWidth={20} glassThickness={80} refractionScale={0.618} blur={0.35} tint={tints.card}
          style={{ width: sidebarWidth, height: '100%', flexDirection: 'column', fontFamily: fontStack, borderRadius: 0 }}>
          {sidebar}
        </LiquidGlass>
      </div>
      {collapsible && (
        <div style={{ width: 1, position: 'relative', flexShrink: 0, background: borderColors.separator }}>
          <button onClick={toggle} aria-label={isOpen ? '折叠侧边栏' : '展开侧边栏'}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 24, height: 44, border: 'none', borderRadius: 10, background: 'rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: textColors.tertiary, fontSize: 10, transition: `background 0.2s ease` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}>
            {side === 'left' ? (isOpen ? '‹' : '›') : (isOpen ? '›' : '‹')}
          </button>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>{children}</div>
    </div>
  )
}
