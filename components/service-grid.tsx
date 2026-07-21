'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Service } from '@/lib/services'
import { getServiceIcon } from '@/lib/service-logos'
import { CARD_STYLES, ANIMATION_DELAYS } from '@/lib/constants'

interface ServiceGridProps {
  services: Service[]
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <motion.a
          key={service.id}
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${CARD_STYLES.hoverCard}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * ANIMATION_DELAYS.stagger, duration: ANIMATION_DELAYS.normal }}
          whileHover={{
            y: -8,
            boxShadow: '0 24px 48px rgba(6, 182, 212, 0.15)',
            rotateZ: 1
          }}
          style={{
            perspective: '1200px'
          }}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-1 ring-primary/30">
                  {(() => {
                    const Icon = getServiceIcon(service.name)
                    return <Icon className="h-4 w-4 text-primary" />
                  })()}
                </div>
              </div>
              <motion.h3
                className="text-fluid-subtitle font-semibold text-foreground transition-colors group-hover:text-primary"
              >
                {service.name}
              </motion.h3>
              {service.description && (
                <p className="text-fluid-body mt-1.5 text-muted-foreground/80">{service.description}</p>
              )}
            </div>
            <motion.div
              whileHover={{ x: 4, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <ExternalLink className="h-4.5 w-4.5 flex-shrink-0 text-muted-foreground/60 transition-all group-hover:text-primary" />
            </motion.div>
          </div>

          <div className="mt-auto space-y-2.5 border-t border-primary/15 pt-3">
            <motion.span
              className="text-fluid-small inline-block rounded-full bg-gradient-to-r from-primary/15 to-accent/15 px-3 py-1 font-medium text-primary ring-1 ring-primary/20 hover:from-primary/25 hover:to-accent/25 transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {service.category}
            </motion.span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
