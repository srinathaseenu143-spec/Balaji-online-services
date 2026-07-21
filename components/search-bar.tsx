'use client'

import { Search, X } from 'lucide-react'
import { INPUT_STYLES } from '@/lib/constants'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search services..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT_STYLES.baseInput} ${INPUT_STYLES.defaultInput} py-3 pl-11 pr-10 shadow-sm`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="select-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
