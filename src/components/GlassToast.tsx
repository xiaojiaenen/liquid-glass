import { useState, useEffect, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'

export interface ToastProps {
  message: string
  icon?: string
  duration?: number
  onClose?: () => void
}

export function GlassToast({ message, icon = '✓', duration = 2000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          marginTop: visible ? 0 : -20,
          transition: `opacity 0.3s ${spring.default}, margin-top 0.3s ${spring.default}`,
        }}
      >
      <LiquidGlass
        radius={20}
        bezelWidth={20}
        glassThickness={70}
        refractionScale={0.85}
        blur={0.5}
        tint="rgba(255,255,255,0.08)"
        style={{ padding: '12px 20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontStack }}>
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.3 }}>{message}</span>
        </div>
      </LiquidGlass>
      </div>
    </div>
  )
}

// 全局 Toast 管理器
let toastFn: ((msg: string, icon?: string) => void) | null = null

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; icon: string }>>([])

  const show = useCallback((message: string, icon = '✓') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, icon }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    toastFn = show
    return () => { toastFn = null }
  }, [show])

  const ToastContainer = () => (
    <>
      {toasts.map((t) => (
        <GlassToast key={t.id} message={t.message} icon={t.icon} onClose={() => remove(t.id)} />
      ))}
    </>
  )

  return { show, ToastContainer }
}

export function toast(message: string, icon?: string) {
  toastFn?.(message, icon)
}
