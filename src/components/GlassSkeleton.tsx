import { type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassSkeletonProps {
  variant?: 'line' | 'circle' | 'rect'
  width?: number | string
  height?: number
  radius?: number
  className?: string
  style?: CSSProperties
}

export function GlassSkeleton({ variant = 'line', width, height: h, radius = 12, className = '', style }: GlassSkeletonProps) {
  const { tints } = useGlassTheme()
  const reducedMotion = useReducedMotion()
  const isCircle = variant === 'circle'
  const isRect = variant === 'rect'
  const finalHeight = h ?? (isCircle ? 48 : isRect ? 100 : 16)
  const finalWidth = width ?? (isCircle ? finalHeight : '100%')
  const shimmerAnimation = reducedMotion ? undefined : 'lg-shimmer 1.8s ease-in-out infinite'

  return (
    <>
      {!reducedMotion && <style>{`@keyframes lg-shimmer { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }`}</style>}
      <LiquidGlass radius={isCircle ? finalHeight / 2 : radius} bezelWidth={8} glassThickness={30} refractionScale={0.618} blur={0.15} tint={tints.muted} className={className}
        style={{ width: finalWidth, height: finalHeight, animation: shimmerAnimation, flexShrink: 0, ...style }}>
        <span style={{ display: 'none' }} />
      </LiquidGlass>
    </>
  )
}

export interface GlassSkeletonGroupProps {
  lines?: number
  avatar?: boolean
  title?: boolean
  className?: string
  style?: CSSProperties
}

export function GlassSkeletonGroup({ lines = 3, avatar = false, title = true, className = '', style }: GlassSkeletonGroupProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {avatar && <GlassSkeleton variant="circle" width={44} height={44} />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {title && <GlassSkeleton width="60%" height={18} />}
          {Array.from({ length: lines }).map((_, i) => (
            <GlassSkeleton key={i} width={i === lines - 1 ? '75%' : '100%'} height={14} />
          ))}
        </div>
      </div>
    </div>
  )
}
