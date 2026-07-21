'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { BUTTON_STYLES, BADGE_STYLES, ANIMATION_DELAYS } from '@/lib/constants'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface CategoryModalFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryClick: (category: string) => void
}

export default function CategoryModalFilter({
  categories,
  selectedCategory,
  onCategoryClick,
}: CategoryModalFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (category: string) => {
    onCategoryClick(category)
    setIsOpen(false)
  }

  const handleClear = () => {
    onCategoryClick(selectedCategory || '')
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className={`${BUTTON_STYLES.baseButton} gap-2 border border-primary/20 px-4 py-2 text-sm font-medium ${BUTTON_STYLES.gradientButton} ring-1 ring-primary/10`}>
          <span>{selectedCategory || 'All Categories'}</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Select Category</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a service category to filter results
          </AlertDialogDescription>
        </AlertDialogHeader>

        <motion.div
          className="space-y-2 max-h-96 overflow-y-auto py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleSelect(category)}
                className={`select-none w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all active:scale-95 ${
                  selectedCategory === category
                    ? `${BADGE_STYLES.selectedBadge}`
                    : 'bg-card/50 text-foreground hover:bg-card/80 hover:border-primary/30 border border-border/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * ANIMATION_DELAYS.stagger }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex gap-3 pt-4">
          {selectedCategory && (
            <AlertDialogAction
              onClick={() => {
                onCategoryClick('')
                setIsOpen(false)
              }}
              className="flex-1 bg-secondary/20 text-secondary hover:bg-secondary/30"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filter
            </AlertDialogAction>
          )}
          <AlertDialogCancel className="flex-1">Close</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
