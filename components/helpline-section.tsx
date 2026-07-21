'use client'

import { Phone } from 'lucide-react'
import { HELPLINE_LOGOS } from '@/lib/service-logos'

export default function HelplineSection() {
  const helplines = [
    {
      id: 1,
      name: 'Farmers Support',
      url: 'https://pmkisan.gov.in',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #a68a2c 100%)'
    },
    {
      id: 2,
      name: 'Senior Citizens',
      url: 'https://services.india.gov.in',
      gradient: 'linear-gradient(135deg, #d1c4e9 0%, #b8a6d1 100%)'
    },
    {
      id: 3,
      name: 'Student Schemes',
      url: 'https://swayam.gov.in',
      gradient: 'linear-gradient(135deg, #c5e1a5 0%, #aed581 100%)'
    },
    {
      id: 4,
      name: 'Women & Child',
      url: 'https://services.india.gov.in',
      gradient: 'linear-gradient(135deg, #ffccbc 0%, #ff9575 100%)'
    },
    {
      id: 5,
      name: 'Health Services',
      url: 'https://beneficiary.nha.gov.in',
      gradient: 'linear-gradient(135deg, #b2dfdb 0%, #80cbc4 100%)'
    },
    {
      id: 6,
      name: 'Police Helpline',
      url: 'https://services.india.gov.in',
      gradient: 'linear-gradient(135deg, #bbdefb 0%, #64b5f6 100%)'
    },
    {
      id: 7,
      name: 'Indian Railways',
      url: 'https://irctc.co.in',
      gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)'
    },
    {
      id: 8,
      name: 'Employment',
      url: 'https://ncs.gov.in',
      gradient: 'linear-gradient(135deg, #cfd8dc 0%, #b0bec5 100%)'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5 text-primary" />
        <h2 className="select-none text-fluid-heading font-semibold text-foreground">Essential Helplines</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {helplines.map((helpline) => (
          <a
            key={helpline.id}
            href={helpline.url}
            target="_blank"
            rel="noopener noreferrer"
            className="select-none group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:shadow-md active:scale-95"
            style={{
              background: helpline.gradient
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/50 transition-all group-hover:scale-110">
              {(() => {
                const Icon = HELPLINE_LOGOS[helpline.name] || HELPLINE_LOGOS['default']
                return <Icon className="h-7 w-7 text-foreground" />
              })()}
            </div>
            <p className="text-fluid-small text-center font-medium text-foreground/90 line-clamp-2">{helpline.name}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
