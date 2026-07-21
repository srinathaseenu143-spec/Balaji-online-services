// Style constants - reusable across components
export const BUTTON_STYLES = {
  baseButton: 'select-none inline-flex items-center rounded-full transition-all active:scale-95',
  primaryButton: 'bg-primary text-primary-foreground shadow-sm hover:shadow-md',
  secondaryButton: 'border border-border/70 bg-card/40 text-foreground hover:border-primary/50 hover:bg-card/60',
  gradientButton: 'bg-gradient-to-r from-card/60 to-card/40 hover:from-primary/10 hover:to-card/60',
} as const

export const INPUT_STYLES = {
  baseInput: 'w-full rounded-xl border text-sm text-foreground placeholder-muted-foreground/70 transition-all backdrop-blur-sm',
  defaultInput: 'border-primary/20 bg-card/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
} as const

export const CARD_STYLES = {
  baseCard: 'rounded-2xl border transition-all duration-300 backdrop-blur-sm',
  serviceCard: 'border-primary/20 bg-card/60 hover:border-primary/50 hover:bg-card hover:shadow-xl',
  hoverCard: 'group flex flex-col rounded-2xl border border-primary/20 bg-card/60 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl active:scale-95',
} as const

export const BADGE_STYLES = {
  badge: 'inline-block rounded-full px-3 py-1 text-sm font-medium ring-1',
  primaryBadge: 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary ring-primary/20',
  selectedBadge: 'bg-gradient-to-r from-primary to-accent text-white ring-primary/50',
} as const

export const ANIMATION_DELAYS = {
  stagger: 0.05,
  fast: 0.2,
  normal: 0.3,
} as const
