'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/header'
import SearchBar from '@/components/search-bar'
import CategoryModalFilter from '@/components/category-modal-filter'
import ServiceGrid from '@/components/service-grid'
import WhatsAppButton from '@/components/whatsapp-button'
import MobileNav from '@/components/mobile-nav'
import MobileLayoutWrapper from '@/components/mobile-layout-wrapper'
import SuggestionFormModal from '@/components/suggestion-form-modal'
import SettingsView from '@/components/settings-view'
import FeaturedBanners from '@/components/featured-banners'
import HelplineSection from '@/components/helpline-section'
import APKDownloadSection from '@/components/apk-download-section'
import { services, CATEGORIES } from '@/lib/services'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('nexus')

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      const matchesCategory = !selectedCategory || service.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'nexus':
        return (
          <div className="space-y-6 px-4 py-5 pb-24">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {!searchQuery && !selectedCategory && (
              <>
                <FeaturedBanners />
                <HelplineSection />
              </>
            )}

            <div className="space-y-3">
              <h3 className="select-none text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">Filter by Category</h3>
              <CategoryModalFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
              />
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/40 p-3.5">
              <p className="text-xs text-muted-foreground/85">
                <span className="font-semibold text-foreground">{filteredServices.length}</span> of{' '}
                <span className="font-semibold text-foreground">{services.length}</span> services
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="select-none whitespace-nowrap text-xs font-medium text-primary/90 transition-all hover:text-primary"
                >
                  Clear
                </button>
              )}
            </div>

            {filteredServices.length > 0 ? (
              <ServiceGrid services={filteredServices} />
            ) : (
              <div className="rounded-2xl border border-border/50 bg-card/30 p-10 text-center">
                <div className="mb-3 text-5xl opacity-40">🔍</div>
                <p className="text-sm font-semibold text-foreground">No services found</p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  No results for &quot;{searchQuery}&quot;
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                  }}
                  className="select-none mt-4 text-xs font-medium text-primary/90 transition-colors hover:text-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )

      case 'search':
        return (
          <div className="space-y-6 px-4 py-6 pb-24">
            <div className="space-y-2">
              <h2 className="select-none text-2xl font-bold tracking-tight text-foreground">Search Services</h2>
              <p className="text-xs text-muted-foreground">Find the service you need instantly</p>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {searchQuery && (
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 px-4 py-3 ring-1 ring-primary/10">
                  <p className="text-xs font-medium text-foreground">
                    Found <span className="font-semibold text-primary">{filteredServices.length}</span> result{filteredServices.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ServiceGrid services={filteredServices.slice(0, 10)} />
                {filteredServices.length > 10 && (
                  <p className="text-center text-xs font-medium text-muted-foreground">
                    Showing 10 of {filteredServices.length} results
                  </p>
                )}
              </div>
            )}

            {!searchQuery && (
              <div className="rounded-xl border border-dashed border-border/60 bg-gradient-to-br from-card/50 to-card/30 p-8 text-center ring-1 ring-primary/5">
                <p className="text-sm text-muted-foreground">🔎 Enter a service name or keyword to begin searching</p>
              </div>
            )}
          </div>
        )

      case 'suggest':
        return (
          <div className="space-y-6 px-4 py-6 pb-24">
            <div className="space-y-2">
              <h2 className="select-none text-2xl font-bold tracking-tight text-foreground">Feedback & Suggestions</h2>
              <p className="text-xs text-muted-foreground">Help us improve the service</p>
            </div>
            <SuggestionFormModal />
          </div>
        )

      case 'settings':
        return <SettingsView />

      case 'download':
        return <APKDownloadSection />

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {!searchQuery && !selectedCategory && (
            <div className="mb-10 space-y-8">
              <div>
                <h2 className="select-none mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground/70">Featured Services</h2>
                <FeaturedBanners />
              </div>
              <HelplineSection />
            </div>
          )}

          <div className="mb-9 space-y-3">
            <h3 className="select-none text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              {searchQuery || selectedCategory ? 'Search Results' : 'All Services'}
            </h3>
            <CategoryModalFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          <div className="mb-8 flex items-center justify-between gap-6 rounded-xl border border-border/50 bg-card/40 p-4">
            <p className="text-sm text-muted-foreground/85">
              <span className="font-semibold text-foreground">{filteredServices.length}</span> of{' '}
              <span className="font-semibold text-foreground">{services.length}</span> services
            </p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="select-none whitespace-nowrap text-xs font-medium text-primary/90 transition-all hover:text-primary"
              >
                Clear Filter
              </button>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <ServiceGrid services={filteredServices} />
          ) : (
            <div className="rounded-2xl border border-border/50 bg-card/30 p-12 text-center">
              <div className="mb-4 text-5xl opacity-40">🔍</div>
              <p className="text-base font-semibold text-foreground">No services found</p>
              <p className="mt-2 text-sm text-muted-foreground/80">
                No results for &quot;{searchQuery}&quot;
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
                className="select-none mt-6 inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary/90 transition-all hover:bg-primary/15 hover:text-primary active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - Visible on mobile */}
      <div className="md:hidden">
        <MobileLayoutWrapper activeTab={activeTab}>
          {renderContent()}
        </MobileLayoutWrapper>
      </div>

      {/* Mobile Navigation - Hidden on desktop */}
      <div className="md:hidden">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* WhatsApp Support Button */}
      <WhatsAppButton />
    </main>
  )
}
