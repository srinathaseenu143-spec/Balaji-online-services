'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, ChevronDown } from 'lucide-react'
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

export default function SuggestionFormModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const categories = [
    'Bug Report',
    'Feature Request',
    'Service Missing',
    'Design Feedback',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }))
    setIsCategoryOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Suggestion submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', category: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-green-200/50 bg-green-50/50 px-6 py-8 text-center backdrop-blur-sm"
      >
        <p className="text-lg font-semibold text-green-900">Thank you!</p>
        <p className="mt-1 text-sm text-green-800">Your suggestion has been received.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="space-y-3">
        <label className="select-none block text-sm font-semibold text-foreground">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full rounded-xl border border-border/60 bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/70 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="space-y-3">
        <label className="select-none block text-sm font-semibold text-foreground">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full rounded-xl border border-border/60 bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/70 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="space-y-3">
        <label className="select-none block text-sm font-semibold text-foreground">Category</label>
        <AlertDialog open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <AlertDialogTrigger asChild>
            <button className="select-none w-full rounded-xl border border-border/60 bg-card/50 px-4 py-2.5 text-left text-sm text-foreground transition-all hover:border-primary/50 hover:bg-card/60 active:scale-95 flex items-center justify-between">
              <span>{formData.category || 'Select a category...'}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Select Category</AlertDialogTitle>
              <AlertDialogDescription>
                Choose the category that best describes your suggestion
              </AlertDialogDescription>
            </AlertDialogHeader>

            <motion.div
              className="space-y-2 max-h-96 overflow-y-auto py-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`select-none w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all active:scale-95 ${
                    formData.category === category
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card/50 text-foreground hover:bg-card/80 border border-border/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            <div className="flex gap-3 pt-4">
              <AlertDialogCancel className="flex-1">Close</AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-3">
        <label className="select-none block text-sm font-semibold text-foreground">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Share your feedback or suggestion..."
          rows={5}
          className="w-full rounded-xl border border-border/60 bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/70 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 resize-none"
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={!formData.name || !formData.email || !formData.message}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="select-none w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:scale-100 flex items-center justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        Submit Suggestion
      </motion.button>
    </motion.div>
  )
}
