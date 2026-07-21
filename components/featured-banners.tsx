'use client'

import { FileText, Calculator, Book } from 'lucide-react'
import Banner3DCard from './banner-3d-card'
import Animated3DBg from './animated-3d-bg'

export default function FeaturedBanners() {
  const banners = [
    {
      id: 1,
      title: 'Get Started with DigiLocker',
      description: 'Access your authentic digital documents anytime, anywhere',
      icon: FileText,
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      url: 'https://digilocker.gov.in',
      label: 'Open DigiLocker'
    },
    {
      id: 2,
      title: 'Financial Calculators',
      description: 'Get instant insights to make smarter money calculations',
      icon: Calculator,
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
      url: 'https://services.india.gov.in',
      label: 'Calculate Now'
    },
    {
      id: 3,
      title: 'Premium Services',
      description: 'Access exclusive digital solutions and services',
      icon: Book,
      gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
      url: 'https://pmkisan.gov.in',
      label: 'Explore Now'
    }
  ]

  return (
    <div className="relative space-y-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 p-6 backdrop-blur-sm border border-primary/20">
      <Animated3DBg />
      <div className="relative space-y-4">
        {banners.map((banner) => (
          <Banner3DCard
            key={banner.id}
            title={banner.title}
            description={banner.description}
            gradient={banner.gradient}
            url={banner.url}
            label={banner.label}
            icon={banner.icon}
          />
        ))}
      </div>
    </div>
  )
}
