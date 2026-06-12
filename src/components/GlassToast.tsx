import { useState, useEffect, useCallback } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface ToastProps {
  message: string
  icon?: string
  duration?: number
  onClose?: () => void
}

export function GlassToast({ message, icon = '✓', duration = 2000, onClose }: ToastProps) {
  const { tints, textColors } = useGlassTheme()
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  useEffect(() => {
    const timer = setTimeout(() => { setExiting(true); setTimeout(() => onClose?.(), 300) }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div role="alert" aria-live="polite"
      style={{ position: 'fixed', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 9999, pointerEvents: exiting ? 'none' : 'auto' }}>
      <div style={{ opacity: visible && !exiting ? 1 : 0, transform: visible && !exiting ? 'translateY(0)' : 'translateY(-20px)', transition: `all 0.3s ${spring.default}` }}>
        <LiquidGlass radius={20} bezelWidth={10} glassThickness={38} refractionScale={0.618} blur={0.2} tint={tints.modal} style={{ padding: '12px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontStack }}>
            {icon && <span aria-hidden="true" style={{ fontSize: 18 }}>{icon}</span>}
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.3, color: textColors.primary }}>{message}</span>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}

let toastFn: ((msg: string, icon?: string) => void) | null = null

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; icon: string }>>([])
  const show = useCallback((message: string, icon = '✓') => { setToasts((prev) => [...prev, { id: Date.now(), message, icon }]) }, [])
  const remove = useCallback((id: number) => { setToasts((prev) => prev.filter((t) => t.id !== id)) }, [])
  useEffect(() => { toastFn = show; return () => { toastFn = null } }, [show])
  const ToastContainer = () => <>{toasts.map((t) => <GlassToast key={t.id} message={t.message} icon={t.icon} onClose={() => remove(t.id)} />)}</>
  return { show, ToastContainer }
}

export function toast(message: string, icon?: string) { toastFn?.(message, icon) }
