import React from 'react'
import { LiquidGlass, type LiquidGlassProps } from './LiquidGlass'
import { glassPresets } from './tokens'

type GlassPresetKey = keyof typeof glassPresets

export interface WithLiquidGlassOptions extends Partial<LiquidGlassProps> {
  preset?: GlassPresetKey
}

export function withLiquidGlass<P extends Record<string, unknown>>(
  Wrapped: React.ComponentType<P>,
  options: WithLiquidGlassOptions = {},
): React.ComponentType<P & Partial<LiquidGlassProps>> {
  const displayName = Wrapped.displayName || Wrapped.name || 'Component'

  const Result: React.FC<P & Partial<LiquidGlassProps>> = (props) => {
    const { preset, ...glassOpts } = options
    const p = preset ? glassPresets[preset] : undefined

    const merged: Partial<LiquidGlassProps> = {
      bezelWidth: p?.bezelWidth,
      glassThickness: p?.glassThickness,
      refractionScale: p?.refractionScale,
      blur: p?.blur,
      ...glassOpts,
    }

    return (
      <LiquidGlass {...merged} {...(props as Record<string, unknown>)}>
        <Wrapped {...props} />
      </LiquidGlass>
    )
  }

  Result.displayName = 'withLiquidGlass(' + displayName + ')'
  return Result
}
