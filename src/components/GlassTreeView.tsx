import { useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface TreeViewItem {
  id: string
  label: string
  icon?: string
  children?: TreeViewItem[]
  disabled?: boolean
  right?: ReactNode
}

export interface GlassTreeViewProps {
  items: TreeViewItem[]
  selectedId?: string
  onSelect?: (item: TreeViewItem) => void
  expandedIds?: string[]
  onExpand?: (ids: string[]) => void
  indent?: number
  className?: string
  style?: CSSProperties
}

export function GlassTreeView({ items, selectedId, onSelect, expandedIds: controlledExpanded, onExpand, indent = 20, className = '', style }: GlassTreeViewProps) {
  const { tints, textColors, colors, borderColors } = useGlassTheme()
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set())
  const expanded = controlledExpanded ? new Set(controlledExpanded) : internalExpanded
  const toggleExpand = (id: string) => { const newSet = new Set(expanded); if (newSet.has(id)) newSet.delete(id); else newSet.add(id); if (controlledExpanded === undefined) setInternalExpanded(newSet); onExpand?.(Array.from(newSet)) }

  const renderItem = (item: TreeViewItem, depth: number) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expanded.has(item.id)
    const isSelected = selectedId === item.id
    return (
      <div key={item.id}>
        <div onClick={() => { if (item.disabled) return; if (hasChildren) toggleExpand(item.id); onSelect?.(item) }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 + depth * indent, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
            cursor: item.disabled ? 'default' : 'pointer', borderRadius: 8, margin: '0 4px',
            background: isSelected ? `${colors.blue}33` : 'transparent', transition: `background 0.2s ${spring.default}`, opacity: item.disabled ? 0.4 : 1,
          }}
          onMouseEnter={(e) => { if (!isSelected && !item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? `${colors.blue}33` : 'transparent' }}>
          {hasChildren ? (
            <span style={{ fontSize: 10, color: textColors.tertiary, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: `transform 0.2s ${spring.default}`, width: 14, display: 'inline-flex', justifyContent: 'center', flexShrink: 0 }}>
              <GlassIcon name="chevron_right" size="small" color={textColors.tertiary} />
            </span>
          ) : <span style={{ width: 14, flexShrink: 0 }} />}
          {item.icon && <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>}
          <span style={{ flex: 1, fontSize: 13, fontWeight: isSelected ? 600 : 400, fontFamily: fontStack, color: textColors.primary, letterSpacing: -0.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
          {item.right && <span style={{ flexShrink: 0 }}>{item.right}</span>}
        </div>
        {hasChildren && isExpanded && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 12 + depth * indent + 7, top: 0, bottom: 0, width: 0.5, background: borderColors.separator }} />
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <LiquidGlass radius={radii.card} bezelWidth={20} glassThickness={80} refractionScale={0.618} blur={0.35} tint={tints.card}
      style={{ flexDirection: 'column', padding: '4px 0', fontFamily: fontStack, ...style }} className={className}>
      {items.map((item) => renderItem(item, 0))}
    </LiquidGlass>
  )
}
