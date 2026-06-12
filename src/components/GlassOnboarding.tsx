import { useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'
import { GlassPageControl } from './GlassPageControl'
import { useReducedMotion } from '../lib/useReducedMotion'

export interface OnboardingPage {
  icon: string
  title: string
  description: string
  content?: ReactNode
}

export interface GlassOnboardingProps {
  pages: OnboardingPage[]
  onFinish: () => void
  onSkip?: () => void
  finishLabel?: string
  nextLabel?: string
  skipLabel?: string
  className?: string
  style?: CSSProperties
}

export function GlassOnboarding({ pages, onFinish, onSkip, finishLabel = '开始使用', nextLabel = '继续', skipLabel = '跳过', className = '', style }: GlassOnboardingProps) {
  const { tints, textColors, colors } = useGlassTheme()
  const [currentPage, setCurrentPage] = useState(0)
  const reducedMotion = useReducedMotion()
  const isLast = currentPage === pages.length - 1
  const goNext = () => { if (isLast) onFinish(); else setCurrentPage((p) => p + 1) }
  const page = pages[currentPage]
  if (!page) return null

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 32, fontFamily: fontStack, ...style }}>
      {onSkip && !isLast && (
        <button onClick={onSkip} style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', color: colors.blue, fontSize: 15, fontWeight: 500, fontFamily: fontStack, cursor: 'pointer', padding: '8px 12px', borderRadius: 8, letterSpacing: -0.2 }}>{skipLabel}</button>
      )}
      <div style={{ opacity: 1, transform: reducedMotion ? 'none' : 'translateY(0)', transition: reducedMotion ? 'none' : `all 0.4s ${spring.gentle}` }}>
        <LiquidGlass radius={radii.card} bezelWidth={26} glassThickness={100} refractionScale={0.618} blur={0.5} tint={tints.card}
          style={{ width: 340, maxWidth: '90vw', padding: '40px 28px 32px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24, lineHeight: 1 }}>{page.icon}</div>
          <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700, color: textColors.primary, letterSpacing: -0.5 }}>{page.title}</h2>
          <p style={{ margin: '0 0 32px', fontSize: 15, lineHeight: 1.6, color: textColors.secondary, letterSpacing: -0.2 }}>{page.description}</p>
          {page.content}
          <LiquidGlass as="button" onClick={goNext} radius={25} bezelWidth={14} glassThickness={50} refractionScale={0.618} blur={0.35} tint={isLast ? `${colors.blue}80` : tints.control}
            style={{ width: '100%', height: 50, fontSize: 17, fontWeight: 600, color: textColors.primary, fontFamily: fontStack, letterSpacing: -0.3 }}>
            {isLast ? finishLabel : nextLabel}
          </LiquidGlass>
        </LiquidGlass>
      </div>
      <div style={{ marginTop: 24 }}><GlassPageControl count={pages.length} current={currentPage} onChange={setCurrentPage} /></div>
    </div>
  )
}
