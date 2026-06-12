import { useState, type CSSProperties } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { LiquidGlass } from '../lib/LiquidGlass'
import { fontStack, spring, radii } from '../lib/tokens'
import { useGlassTheme } from '../lib/GlassProvider'

export interface GlassCodeBlockProps {
  /** 代码内容 */
  code: string
  /** 语言 */
  language?: string
  /** 是否显示行号 */
  showLineNumbers?: boolean
  /** 最大可见行数(超出可折叠),默认 20 */
  maxLines?: number
  /** 是否默认展开 */
  defaultExpanded?: boolean
  /** 标题(文件名) */
  title?: string
  className?: string
  style?: CSSProperties
}

/**
 * GlassCodeBlock — 液态玻璃代码块。
 * Prism 语法高亮 + macOS 窗口风格(红绿灯按钮) + 长文本折叠。
 */
export function GlassCodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = true,
  maxLines = 20,
  defaultExpanded = false,
  title,
  className = '',
  style,
}: GlassCodeBlockProps) {
  const { tints, textColors, borderColors } = useGlassTheme()
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [copied, setCopied] = useState(false)

  const lines = code.split('\n')
  const isLong = lines.length > maxLines
  const displayCode = isLong && !expanded ? lines.slice(0, maxLines).join('\n') : code
  const hiddenLines = isLong ? lines.length - maxLines : 0

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }

  return (
    <LiquidGlass
      radius={radii.card}
      bezelWidth={22}
      glassThickness={80}
      refractionScale={0.618}
      blur={0.4}
      tint={tints.modal}
      style={{ flexDirection: 'column', overflow: 'hidden', ...style }}
      className={className}
    >
      {/* macOS 窗口标题栏 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: `1px solid ${borderColors.separator}`,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* 红绿灯按钮 */}
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f57', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }} />
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#febc2e', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }} />
          <span style={{ width: 12, height: 12, borderRadius: 6, background: '#28c840', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }} />
        </div>

        {/* 标题 */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          {title && (
            <span style={{ fontSize: 13, fontWeight: 500, color: textColors.secondary, fontFamily: fontStack, letterSpacing: -0.1 }}>
              {title}
            </span>
          )}
        </div>

        {/* 语言标签 + 复制 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {language && (
            <span style={{ fontSize: 11, color: textColors.tertiary, fontFamily: fontStack, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            style={{
              border: 'none', background: 'none', color: copied ? '#28c840' : textColors.tertiary,
              fontSize: 12, cursor: 'pointer', padding: '2px 6px', borderRadius: 4,
              fontFamily: fontStack, transition: `all 0.2s ${spring.default}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* 代码区域 */}
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <Highlight theme={themes.nightOwl} code={displayCode} language={language as any}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <div style={{ display: 'flex', overflow: 'auto' }}>
              {/* 行号 */}
              {showLineNumbers && (
                <div
                  style={{ padding: '14px 0', textAlign: 'right', userSelect: 'none', flexShrink: 0, borderRight: `1px solid ${borderColors.separator}` }}
                  aria-hidden="true"
                >
                  {tokens.map((_line, i) => (
                    <div key={i} style={{ padding: '0 12px 0 14px', fontSize: 13, lineHeight: 1.65, color: textColors.tertiary, fontVariantNumeric: 'tabular-nums', fontFamily: 'SF Mono, Menlo, Consolas, monospace' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* 代码 */}
              <pre style={{ margin: 0, padding: '14px 16px', fontSize: 13, lineHeight: 1.65, fontFamily: 'SF Mono, Menlo, Consolas, monospace', overflow: 'auto', flex: 1, whiteSpace: 'pre', tabSize: 2 }}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line })
                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, j) => {
                        const tokenProps = getTokenProps({ token })
                        return <span key={j} {...tokenProps} />
                      })}
                    </div>
                  )
                })}
              </pre>
            </div>
          )}
        </Highlight>

        {/* 折叠渐变遮罩 */}
        {isLong && !expanded && (
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
              background: `linear-gradient(transparent, ${tints.modal})`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* 展开/折叠按钮 */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            border: 'none', borderTop: `1px solid ${borderColors.separator}`, background: 'none',
            color: textColors.secondary, fontSize: 13, fontWeight: 500, padding: '8px 14px',
            cursor: 'pointer', fontFamily: fontStack, textAlign: 'center', width: '100%', boxSizing: 'border-box',
            transition: `background 0.2s ${spring.default}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
        >
          {expanded ? '收起代码' : `展开剩余 ${hiddenLines} 行`}
          <span style={{ display: 'inline-flex', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: `transform 0.25s ${spring.default}`, fontSize: 10 }}>▼</span>
        </button>
      )}
    </LiquidGlass>
  )
}
