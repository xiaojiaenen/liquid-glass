import { useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassTableColumn<T = Record<string, unknown>> {
  key: string
  title: string
  width?: number | string
  render?: (value: unknown, row: T, index: number) => ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

export interface GlassTableProps<T = Record<string, unknown>> {
  columns: GlassTableColumn<T>[]
  data: T[]
  striped?: boolean
  selectable?: boolean
  selectedRows?: number[]
  onRowSelect?: (indices: number[]) => void
  onRowClick?: (row: T, index: number) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  emptyText?: string
  className?: string
  style?: CSSProperties
}

export function GlassTable<T extends Record<string, unknown> = Record<string, unknown>>({ columns, data, striped = true, selectable = false, selectedRows = [], onRowSelect, onRowClick, onSort, emptyText = '暂无数据', className = '', style }: GlassTableProps<T>) {
  const { tints, textColors, borderColors, colors } = useGlassTheme()
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const handleSort = (key: string) => { const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'; setSortKey(key); setSortDir(newDir); onSort?.(key, newDir) }
  const handleRowClick = (index: number) => { if (selectable) { const newSelected = selectedRows.includes(index) ? selectedRows.filter((i) => i !== index) : [...selectedRows, index]; onRowSelect?.(newSelected) }; onRowClick?.(data[index], index) }

  return (
    <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
      style={{ width: '100%', flexDirection: 'column', overflow: 'hidden', ...style }} className={className}>
      <div style={{ fontFamily: fontStack, overflowX: 'auto' }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${borderColors.default}`, padding: '0 4px' }}>
          {columns.map((col) => (
            <div key={col.key} onClick={() => col.sortable && handleSort(col.key)}
              style={{ flex: col.width ? `0 0 ${col.width}` : 1, minWidth: col.width ? undefined : 80, padding: '10px 12px', fontSize: 13, fontWeight: 600, color: textColors.tertiary, letterSpacing: -0.1, textAlign: col.align ?? 'left', cursor: col.sortable ? 'pointer' : 'default', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: `color 0.2s ease` }}
              onMouseEnter={(e) => { if (col.sortable) e.currentTarget.style.color = textColors.secondary }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textColors.tertiary }}>
              {col.title}{col.sortable && sortKey === col.key && <span style={{ fontSize: 10 }}>{sortDir === 'asc' ? '▲' : '▼'}</span>}
            </div>
          ))}
        </div>
        {data.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', fontSize: 14, color: textColors.tertiary }}>{emptyText}</div>
        ) : data.map((row, rowIdx) => {
          const isSelected = selectedRows.includes(rowIdx)
          return (
            <div key={rowIdx} onClick={() => handleRowClick(rowIdx)}
              style={{
                display: 'flex', padding: '0 4px',
                borderBottom: rowIdx < data.length - 1 ? `0.5px solid ${borderColors.separator}` : 'none',
                background: isSelected ? `${colors.blue}26` : striped && rowIdx % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                cursor: onRowClick || selectable ? 'pointer' : 'default', transition: `background 0.2s ${spring.default}`,
              }}
              onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? `${colors.blue}26` : striped && rowIdx % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              {columns.map((col) => (
                <div key={col.key} style={{ flex: col.width ? `0 0 ${col.width}` : 1, minWidth: col.width ? undefined : 80, padding: '10px 12px', fontSize: 14, fontWeight: 400, color: textColors.primary, letterSpacing: -0.2, textAlign: col.align ?? 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {col.render ? col.render(row[col.key], row, rowIdx) : String(row[col.key] ?? '')}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
