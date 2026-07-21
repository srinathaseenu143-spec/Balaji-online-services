'use client'

import { Grid, Search, Lightbulb, Settings, Download } from 'lucide-react'

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const tabs = [
    { id: 'nexus', label: 'Nexus', icon: Grid },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'suggest', label: 'Suggest', icon: Lightbulb },
    { id: 'download', label: 'Download', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav
      className="select-none fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-gradient-to-r from-card via-card to-secondary/5 backdrop-blur-md shadow-lg"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`select-none flex flex-col items-center gap-1 px-3 py-3 transition-all rounded-lg ${
                isActive
                  ? 'text-primary bg-primary/10 ring-1 ring-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
              }`}
              aria-label={tab.label}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
