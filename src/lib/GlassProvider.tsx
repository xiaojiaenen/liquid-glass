import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import { getGlassTints, getTextColors, getBorderColors, getSystemColors } from './tokens'

export type GlassThemeMode = 'light' | 'dark' | 'system'

export interface GlassThemeContextValue {
  /** 当前解析后的模式 */
  mode: 'light' | 'dark'
  /** 原始输入模式 */
  modeInput: GlassThemeMode
  /** 是否减少动效 */
  reduceMotion: boolean
  /** 设置模式 */
  setMode: (mode: GlassThemeMode) => void
  /** 设置减少动效 */
  setReduceMotion: (v: boolean) => void
  /** 玻璃 tint 预设 */
  tints: ReturnType<typeof getGlassTints>
  /** 文字颜色 */
  textColors: ReturnType<typeof getTextColors>
  /** 边框颜色 */
  borderColors: ReturnType<typeof getBorderColors>
  /** 系统色 */
  colors: ReturnType<typeof getSystemColors>
}

const GlassThemeContext = createContext<GlassThemeContextValue | null>(null)

export interface GlassProviderProps {
  children: ReactNode
  /** 初始模式,默认 'system' */
  defaultMode?: GlassThemeMode
}

/**
 * GlassProvider — 全局主题上下文。
 * 对标 Apple UITraitCollection / NSAppearance。
 * 所有组件通过 useGlassTheme() 获取模式感知的 token。
 */
export function GlassProvider({
  children,
  defaultMode = 'system',
}: GlassProviderProps) {
  const [modeInput, setModeInput] = useState<GlassThemeMode>(defaultMode)
  const [systemDark, setSystemDark] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // 监听系统主题
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(mq.matches)
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // 监听系统减少动效偏好
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const resolvedMode = modeInput === 'system' ? (systemDark ? 'dark' : 'light') : modeInput

  const tints = useMemo(() => getGlassTints(resolvedMode), [resolvedMode])
  const textColors = useMemo(() => getTextColors(resolvedMode), [resolvedMode])
  const borderColors = useMemo(() => getBorderColors(resolvedMode), [resolvedMode])
  const colors = useMemo(() => getSystemColors(resolvedMode), [resolvedMode])

  const contextValue: GlassThemeContextValue = useMemo(() => ({
    mode: resolvedMode,
    modeInput,
    reduceMotion,
    setMode: setModeInput,
    setReduceMotion,
    tints,
    textColors,
    borderColors,
    colors,
  }), [resolvedMode, modeInput, reduceMotion, tints, textColors, borderColors, colors])

  return (
    <GlassThemeContext.Provider value={contextValue}>
      {children}
    </GlassThemeContext.Provider>
  )
}

/**
 * 读取当前 Glass 主题上下文。
 * 在 GlassProvider 外使用时返回默认 dark 主题值。
 */
export function useGlassTheme(): GlassThemeContextValue {
  return useContext(GlassThemeContext) ?? {
    mode: 'dark',
    modeInput: 'dark',
    reduceMotion: false,
    setMode: () => {},
    setReduceMotion: () => {},
    tints: getGlassTints('dark'),
    textColors: getTextColors('dark'),
    borderColors: getBorderColors('dark'),
    colors: getSystemColors('dark'),
  }
}
