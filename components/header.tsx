'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header
      className="select-none sticky top-0 z-40 border-b border-primary/10 bg-gradient-to-r from-primary via-primary to-secondary shadow-lg"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm ring-2 ring-white/20">
            <Image
              src="/balaji-logo.png"
              alt="Balaji Online Service"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-3xl">Balaji Online</h1>
            <p className="text-sm text-white/90 font-medium">
              Premium digital services & solutions
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
