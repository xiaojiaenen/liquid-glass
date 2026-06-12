import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassIcon } from './GlassIcon'

export interface GlassDatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  width?: number
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const TOTAL_CELLS = 42 // 固定 6 行 × 7 列,保证每月高度一致

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

/**
 * GlassDatePicker — 液态玻璃日期选择器。
 * 固定 6 行网格,每月高度一致。
 */
export function GlassDatePicker({ value, onChange, width = 280 }: GlassDatePickerProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const today = new Date()
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())
  const [selected, setSelected] = useState(value ?? today)
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)
  const [animating, setAnimating] = useState(false)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (animating) return
    setSlideDir('right')
    setAnimating(true)
    setTimeout(() => {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
      else setViewMonth(viewMonth - 1)
      setSlideDir(null)
      setAnimating(false)
    }, 250)
  }

  const nextMonth = () => {
    if (animating) return
    setSlideDir('left')
    setAnimating(true)
    setTimeout(() => {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
      else setViewMonth(viewMonth + 1)
      setSlideDir(null)
      setAnimating(false)
    }, 250)
  }

  const pickDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    setSelected(d)
    onChange?.(d)
  }

  const isSameDay = (d: Date, day: number) =>
    d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day

  const slideOffset = slideDir === 'left' ? -30 : slideDir === 'right' ? 30 : 0

  // 构建固定 42 格:前面空格 + 日期 + 后面空格
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length < TOTAL_CELLS) cells.push(null)

  return (
    <LiquidGlass
      radius={16}
      bezelWidth={24}
      glassThickness={100}
      refractionScale={0.9}
      blur={0.5}
      tint={tints.control}
      style={{ width, padding: 16, flexDirection: 'column', overflow: 'hidden' }}
    >
      <style>{`
        .lg-day-cell {
          -webkit-tap-highlight-color: transparent;
          outline: none;
          user-select: none;
        }
        .lg-day-cell::-moz-focus-inner { border: 0; }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
        {/* 头部 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            style={{
              border: 'none', background: 'none', color: textColors.primary,
              cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
              transition: `background 0.15s ${spring.default}`,
              display: 'flex', alignItems: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            <GlassIcon name="chevron_left" size="small" color={textColors.secondary} />
          </button>
          <span style={{
            fontSize: 17, fontWeight: 600, fontFamily: fontStack, letterSpacing: -0.3,
            color: textColors.primary,
            transition: `opacity 0.2s ease`,
            opacity: animating ? 0.5 : 1,
          }}>
            {viewYear}年{viewMonth + 1}月
          </span>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              border: 'none', background: 'none', color: textColors.primary,
              cursor: 'pointer', padding: '4px 8px', borderRadius: 6,
              transition: `background 0.15s ${spring.default}`,
              display: 'flex', alignItems: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            <GlassIcon name="chevron_right" size="small" color={textColors.secondary} />
          </button>
        </div>

        {/* 星期头 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
          {WEEKDAYS.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, opacity: 0.35, fontFamily: fontStack, padding: '4px 0', fontWeight: 500, color: textColors.primary }}>
              {d}
            </div>
          ))}
        </div>

        {/* 日期格 — 固定 6 行,高度不变 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(6, 1fr)',
            gap: 3,
            transform: `translateX(${slideOffset}px)`,
            opacity: animating ? 0.6 : 1,
            transition: `transform 0.25s ${spring.gentle}, opacity 0.25s ease`,
          }}
        >
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`e${idx}`} style={{ height: 30 }} />
            }
            const active = isSameDay(selected, day)
            const isToday = isSameDay(today, day)
            return (
              <div
                key={`${viewYear}-${viewMonth}-${day}`}
                className="lg-day-cell"
                role="gridcell"
                aria-selected={active}
                onClick={() => pickDay(day)}
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  height: 30,
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontSize: 15,
                  fontFamily: fontStack,
                  fontWeight: isToday ? 700 : active ? 600 : 400,
                  color: active ? '#fff' : textColors.primary,
                  letterSpacing: -0.3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  transition: `background 0.15s ${spring.default}`,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent'
                }}
              >
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: `${colors.blue}`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{day}</span>
              </div>
            )
          })}
        </div>
      </div>
    </LiquidGlass>
  )
}
