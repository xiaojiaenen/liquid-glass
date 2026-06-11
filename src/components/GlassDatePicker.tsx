import { useState } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface GlassDatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  width?: number
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function GlassDatePicker({ value, onChange, width = 280 }: GlassDatePickerProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())
  const [selected, setSelected] = useState(value ?? today)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const pickDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    setSelected(d)
    onChange?.(d)
  }

  const isSameDay = (d: Date, day: number) =>
    d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day

  return (
    <LiquidGlass
      radius={16}
      bezelWidth={18}
      glassThickness={90}
      refractionScale={0.9}
      blur={0.3}
      tint="rgba(255,255,255,0.06)"
      style={{ width, padding: 16, flexDirection: 'column' }}
    >
      {/* 头部 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button
          onClick={prevMonth}
          style={{ border: 'none', background: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', padding: '4px 8px', opacity: 0.5 }}
        >
          ‹
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, fontFamily: fontStack, letterSpacing: -0.3 }}>
          {viewYear}年{viewMonth + 1}月
        </span>
        <button
          onClick={nextMonth}
          style={{ border: 'none', background: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', padding: '4px 8px', opacity: 0.5 }}
        >
          ›
        </button>
      </div>

      {/* 星期头 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, opacity: 0.35, fontFamily: fontStack, padding: '4px 0', fontWeight: 500 }}>
            {d}
          </div>
        ))}
      </div>

      {/* 日期格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const active = isSameDay(selected, day)
          const isToday = isSameDay(today, day)
          return (
            <div
              key={day}
              onClick={() => pickDay(day)}
              style={{
                textAlign: 'center',
                padding: '6px 0',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: 15,
                fontFamily: fontStack,
                fontWeight: active ? 600 : 400,
                background: active ? 'rgba(10,132,255,0.5)' : 'transparent',
                border: isToday && !active ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                transition: `background 0.15s ${spring.default}`,
                letterSpacing: -0.3,
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              {day}
            </div>
          )
        })}
      </div>
    </LiquidGlass>
  )
}
