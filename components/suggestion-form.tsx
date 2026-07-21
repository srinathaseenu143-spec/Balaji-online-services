'use client'

import { useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SuggestionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
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
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
        <div className="mb-4 rounded-full bg-secondary/20 p-3">
          <Send className="h-6 w-6 text-secondary-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">Thank You!</h3>
        <p className="text-sm text-muted-foreground">
          Your suggestion has been submitted. We&apos;ll review it soon.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Suggest a Service</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Help us improve by suggesting new services or providing feedback.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-foreground">
            Category
          </label>
          <Select value={formData.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you think..."
            rows={4}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          className="select-none w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Submit Suggestion
        </button>
      </form>
    </div>
  )
}
