import { useEffect, useState, useRef, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  group?: string
  disabled?: boolean
  onSelect: () => void
}

export interface GlassCommandPaletteProps {
  open: boolean
  onClose: () => void
  commands: CommandItem[]
  placeholder?: string
}

export function GlassCommandPalette({ open, onClose, commands, placeholder = '搜索命令…' }: GlassCommandPaletteProps) {
  const { tints, textColors, borderColors, colors } = useGlassTheme()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = commands.filter((cmd) => {
    if (cmd.disabled) return false
    if (!query) return true
    const q = query.toLowerCase()
    return cmd.label.toLowerCase().includes(q) || cmd.description?.toLowerCase().includes(q) || cmd.group?.toLowerCase().includes(q)
  })

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => { const group = cmd.group ?? ''; if (!acc[group]) acc[group] = []; acc[group].push(cmd); return acc }, {})
  const flatItems = filtered

  useEffect(() => { if (open) { setQuery(''); setActiveIndex(0); setTimeout(() => inputRef.current?.focus(), 50) } }, [open])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1)); break
      case 'ArrowUp': e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); break
      case 'Enter': e.preventDefault(); if (flatItems[activeIndex]) { flatItems[activeIndex].onSelect(); onClose() }; break
      case 'Escape': e.preventDefault(); onClose(); break
    }
  }, [flatItems, activeIndex, onClose])

  useEffect(() => { if (!listRef.current) return; const activeEl = listRef.current.querySelector('[data-active="true"]'); activeEl?.scrollIntoView({ block: 'nearest' }) }, [activeIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); if (open) onClose() } }
    if (open) { document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  if (!open) return null

  let flatIdx = 0

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', animation: 'lg-cmd-fade-in 0.15s ease' }} onClick={onClose}>
      <style>{`@keyframes lg-cmd-fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: '90vw' }}>
        <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.modal}
          style={{ flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: `1px solid ${borderColors.default}` }}>
            <GlassIcon name="search" size="medium" color={textColors.tertiary} />
            <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }} onKeyDown={handleKeyDown} placeholder={placeholder}
              style={{ flex: 1, border: 'none', background: 'none', color: textColors.primary, fontSize: 17, fontFamily: fontStack, letterSpacing: -0.4, outline: 'none' }} />
            {query && (
              <button onClick={() => setQuery('')} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 6, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textColors.secondary, fontSize: 12 }}>✕</button>
            )}
          </div>
          <div ref={listRef} style={{ maxHeight: 380, overflowY: 'auto', padding: '6px 0' }}>
            {flatItems.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', fontSize: 14, color: textColors.tertiary, fontFamily: fontStack }}>没有匹配的命令</div>
            ) : Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                {group && <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, color: textColors.tertiary, fontFamily: fontStack, letterSpacing: 0.5, textTransform: 'uppercase' }}>{group}</div>}
                {items.map((cmd) => {
                  const idx = flatIdx++
                  const isActive = idx === activeIndex
                  return (
                    <div key={cmd.id} data-active={isActive} onClick={() => { cmd.onSelect(); onClose() }} onMouseEnter={() => setActiveIndex(idx)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', cursor: 'pointer', background: isActive ? `${colors.blue}33` : 'transparent', borderRadius: 8, margin: '0 6px', transition: `background 0.1s ease` }}>
                      {cmd.icon && <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: 'center' }}>{cmd.icon}</span>}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: textColors.primary, fontFamily: fontStack, letterSpacing: -0.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cmd.label}</div>
                        {cmd.description && <div style={{ fontSize: 13, color: textColors.tertiary, fontFamily: fontStack, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cmd.description}</div>}
                      </div>
                      {cmd.shortcut && <span style={{ fontSize: 11, color: textColors.tertiary, fontFamily: fontStack, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>{cmd.shortcut}</span>}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, padding: '8px 16px', borderTop: `1px solid ${borderColors.separator}`, fontSize: 11, color: textColors.tertiary, fontFamily: fontStack }}>
            <span>↑↓ 导航</span><span>↵ 选择</span><span>esc 关闭</span>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
