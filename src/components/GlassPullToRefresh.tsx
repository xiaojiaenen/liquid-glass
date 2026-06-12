import { useState, useRef, useCallback, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { spring } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassSpinner } from './GlassSpinner'

export interface GlassPullToRefreshProps {
  children: ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  refreshing?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassPullToRefresh({ children, onRefresh, threshold = 80, refreshing: controlledRefreshing, className = '', style }: GlassPullToRefreshProps) {
  const { tints } = useGlassTheme()
  const [pullDistance, setPullDistance] = useState(0)
  const [internalRefreshing, setInternalRefreshing] = useState(false)
  const refreshing = controlledRefreshing ?? internalRefreshing
  const startYRef = useRef(0)
  const pullingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const container = containerRef.current; if (!container || container.scrollTop > 0 || refreshing) return
    startYRef.current = e.touches[0].clientY; pullingRef.current = true
  }, [refreshing])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pullingRef.current) return; const dy = e.touches[0].clientY - startYRef.current
    if (dy > 0) { const dampened = Math.min(dy * 0.5, threshold * 1.5); setPullDistance(dampened) }
  }, [threshold])

  const handleTouchEnd = useCallback(async () => {
    if (!pullingRef.current) return; pullingRef.current = false
    if (pullDistance >= threshold) {
      setPullDistance(threshold * 0.6)
      if (controlledRefreshing === undefined) setInternalRefreshing(true)
      try { await onRefresh() } finally { if (controlledRefreshing === undefined) setInternalRefreshing(false); setPullDistance(0) }
    } else { setPullDistance(0) }
  }, [pullDistance, threshold, onRefresh, controlledRefreshing])

  const progress = Math.min(pullDistance / threshold, 1)
  const showIndicator = pullDistance > 10

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', overflow: 'auto', ...style }}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `translateY(${showIndicator ? pullDistance - 40 : -40}px)`, transition: pullingRef.current ? 'none' : `transform 0.3s ${spring.gentle}`, zIndex: 10, paddingTop: 8 }}>
        <div style={{ transform: `scale(${progress}) rotate(${progress * 360}deg)`, opacity: progress, transition: pullingRef.current ? 'none' : `all 0.3s ${spring.default}` }}>
          {refreshing ? <GlassSpinner size="small" /> : (
            <LiquidGlass radius={16} bezelWidth={8} glassThickness={28} refractionScale={0.618} blur={0.15} tint={tints.muted}
              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 16, transform: `rotate(${progress * 180}deg)` }}>↓</span>
            </LiquidGlass>
          )}
        </div>
      </div>
      <div style={{ transform: `translateY(${pullDistance}px)`, transition: pullingRef.current ? 'none' : `transform 0.3s ${spring.gentle}` }}>{children}</div>
    </div>
  )
}
