// ── 核心引擎 ──
export { LiquidGlass } from './LiquidGlass'
export type { LiquidGlassProps } from './LiquidGlass'
export { useLiquidGlass } from './useLiquidGlass'
export { useGlassParallax } from './useGlassParallax'
export { useBackgroundLuminance } from './useBackgroundLuminance'
export { useBorderGlow } from './useBorderGlow'
export type { BorderGlowOptions } from './useBorderGlow'
export { generateLiquidGlassMaps } from './displacementMap'
export type {
  LiquidGlassMapOptions,
  LiquidGlassMaps,
  BezelProfile,
} from './displacementMap'
export { supportsSvgBackdrop } from './capabilities'

// ── 设计令牌 ──
export {
  spring,
  systemColors,
  lightSystemColors,
  fontStack,
  radii,
  glassPresets,
  getGlassTints,
  getTextColors,
  getBorderColors,
  getSystemColors,
} from './tokens'

// ── 主题系统 ──
export { GlassProvider, useGlassTheme } from './GlassProvider'
export type { GlassProviderProps, GlassThemeMode, GlassThemeContextValue } from './GlassProvider'

// ── Hooks ──
export { useReducedMotion } from './useReducedMotion'

// ── 组件 ──
export { GlassAccordion } from '../components/GlassAccordion'
export type { GlassAccordionItem, GlassAccordionProps } from '../components/GlassAccordion'

export { GlassAvatar } from '../components/GlassAvatar'
export type { GlassAvatarProps } from '../components/GlassAvatar'

export { GlassBadge } from '../components/GlassBadge'
export type { GlassBadgeProps } from '../components/GlassBadge'

export { GlassBreadcrumb } from '../components/GlassBreadcrumb'
export type { GlassBreadcrumbProps, BreadcrumbItem } from '../components/GlassBreadcrumb'

export { GlassButton } from '../components/GlassButton'
export type { GlassButtonProps } from '../components/GlassButton'

export { GlassCard } from '../components/GlassCard'
export type { GlassCardProps } from '../components/GlassCard'

export { GlassCheckbox } from '../components/GlassCheckbox'
export type { GlassCheckboxProps } from '../components/GlassCheckbox'

export { GlassDatePicker } from '../components/GlassDatePicker'
export type { GlassDatePickerProps } from '../components/GlassDatePicker'

export { GlassInput } from '../components/GlassInput'
export type { GlassInputProps } from '../components/GlassInput'

export { GlassList } from '../components/GlassList'
export type { GlassListProps, GlassListItem } from '../components/GlassList'

export { GlassModal } from '../components/GlassModal'
export type { GlassModalProps } from '../components/GlassModal'

export { GlassNavbar } from '../components/GlassNavbar'
export type { GlassNavbarProps } from '../components/GlassNavbar'

export { GlassNotification } from '../components/GlassNotification'
export type { GlassNotificationProps } from '../components/GlassNotification'

export { GlassProgress } from '../components/GlassProgress'
export type { GlassProgressProps } from '../components/GlassProgress'

export { GlassRadio } from '../components/GlassRadio'
export type { GlassRadioProps, GlassRadioOption } from '../components/GlassRadio'

export { GlassSearch } from '../components/GlassSearch'

export { GlassSegmented } from '../components/GlassSegmented'

export { GlassSelect } from '../components/GlassSelect'
export type { GlassSelectProps, GlassSelectOption } from '../components/GlassSelect'

export { GlassSlider } from '../components/GlassSlider'
export type { GlassSliderProps } from '../components/GlassSlider'

export { GlassSwitch } from '../components/GlassSwitch'
export type { GlassSwitchProps } from '../components/GlassSwitch'

export { GlassTabs } from '../components/GlassTabs'
export type { GlassTabsProps, GlassTab } from '../components/GlassTabs'

export { GlassTag } from '../components/GlassTag'
export type { GlassTagProps } from '../components/GlassTag'

export { GlassToast, useToast, toast } from '../components/GlassToast'
export type { ToastProps } from '../components/GlassToast'

export { GlassTooltip } from '../components/GlassTooltip'
export type { GlassTooltipProps } from '../components/GlassTooltip'

export { DragGlass } from '../components/DragGlass'
export { Dock } from '../components/Dock'
export { GlassMusicPlayer } from '../components/GlassMusicPlayer'

// ── 新增组件 ──
export { GlassSpinner } from '../components/GlassSpinner'
export type { GlassSpinnerProps } from '../components/GlassSpinner'

export { GlassStepper } from '../components/GlassStepper'
export type { GlassStepperProps } from '../components/GlassStepper'

export { GlassPageControl } from '../components/GlassPageControl'
export type { GlassPageControlProps } from '../components/GlassPageControl'

export { GlassEmptyState } from '../components/GlassEmptyState'
export type { GlassEmptyStateProps } from '../components/GlassEmptyState'

export { GlassSheet } from '../components/GlassSheet'
export type { GlassSheetProps, GlassSheetAction } from '../components/GlassSheet'

export { GlassContextMenu } from '../components/GlassContextMenu'
export type { GlassContextMenuProps, ContextMenuItem } from '../components/GlassContextMenu'

export { GlassTabBar } from '../components/GlassTabBar'
export type { GlassTabBarProps, GlassTabBarItem } from '../components/GlassTabBar'

// ── 新增工具 ──
export { withLiquidGlass } from './withLiquidGlass'
export type { WithLiquidGlassOptions } from './withLiquidGlass'

export { GlassSidebar } from '../components/GlassSidebar'
export type { GlassSidebarProps, SidebarItem } from '../components/GlassSidebar'

export { GlassPagination } from '../components/GlassPagination'
export type { GlassPaginationProps } from '../components/GlassPagination'

// ── 新增组件: Phase 1 基础设施 ──
export { GlassIcon } from '../components/GlassIcon'
export type { GlassIconProps } from '../components/GlassIcon'

export { GlassDivider } from '../components/GlassDivider'
export type { GlassDividerProps } from '../components/GlassDivider'

// ── 新增组件: Phase 1 高优先级 ──
export { GlassAlert } from '../components/GlassAlert'
export type { GlassAlertProps, GlassAlertAction } from '../components/GlassAlert'

export { GlassPopover } from '../components/GlassPopover'
export type { GlassPopoverProps, PopoverPlacement } from '../components/GlassPopover'

export { GlassSkeleton, GlassSkeletonGroup } from '../components/GlassSkeleton'
export type { GlassSkeletonProps, GlassSkeletonGroupProps } from '../components/GlassSkeleton'

export { GlassToolbar, GlassToolbarButton } from '../components/GlassToolbar'
export type { GlassToolbarProps, GlassToolbarButtonProps } from '../components/GlassToolbar'

// ── 新增组件: Phase 2 中优先级 ──
export { GlassTable } from '../components/GlassTable'
export type { GlassTableProps, GlassTableColumn } from '../components/GlassTable'

export { GlassTreeView } from '../components/GlassTreeView'
export type { GlassTreeViewProps, TreeViewItem } from '../components/GlassTreeView'

export { GlassChip, GlassChipGroup } from '../components/GlassChip'
export type { GlassChipProps, GlassChipGroupProps } from '../components/GlassChip'

export { GlassSplitView } from '../components/GlassSplitView'
export type { GlassSplitViewProps } from '../components/GlassSplitView'

export { GlassCommandPalette } from '../components/GlassCommandPalette'
export type { GlassCommandPaletteProps, CommandItem } from '../components/GlassCommandPalette'

// ── 新增组件: Phase 3 低优先级 ──
export { GlassPullToRefresh } from '../components/GlassPullToRefresh'
export type { GlassPullToRefreshProps } from '../components/GlassPullToRefresh'

export { GlassTimeline } from '../components/GlassTimeline'
export type { GlassTimelineProps, TimelineItem } from '../components/GlassTimeline'

export { GlassColorPicker } from '../components/GlassColorPicker'
export type { GlassColorPickerProps } from '../components/GlassColorPicker'

export { GlassOnboarding } from '../components/GlassOnboarding'
export type { GlassOnboardingProps, OnboardingPage } from '../components/GlassOnboarding'

export { GlassCodeBlock } from '../components/GlassCodeBlock'
export type { GlassCodeBlockProps } from '../components/GlassCodeBlock'
