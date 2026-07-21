'use client'

import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const whatsappNumber = '917892052540' // Balaji Online Service
  const whatsappMessage = encodeURIComponent(
    'Hello Balaji Online Service! I need help with government services and digital utilities.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="select-none fixed bottom-6 right-6 flex items-center justify-center rounded-full bg-green-500 p-4 shadow-lg transition-transform hover:scale-110 hover:shadow-xl md:bottom-8"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm text-background shadow-lg">
            Chat with us on WhatsApp
            <div className="absolute -bottom-1 right-4 h-2 w-2 bg-foreground" />
          </div>
        )}
      </a>

      {/* Mobile-specific safe area padding */}
      <style>{`
        @media (max-width: 640px) {
          a[aria-label="Contact us on WhatsApp"] {
            bottom: calc(5rem + max(0.5rem, env(safe-area-inset-bottom)));
          }
        }
      `}</style>
    </>
  )
}
