'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getServiceIcon } from '@/lib/service-logos'

interface Banner3DCardProps {
  title: string
  description: string
  gradient: string
  url: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export default function Banner3DCard({
  title,
  description,
  gradient,
  url,
  label,
  icon: Icon
}: Banner3DCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = (y - centerY) / 10
    const rotY = (centerX - x) / 10

    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-40 cursor-pointer perspective"
      style={{
        perspective: '1200px'
      }}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ rotateX: 0, rotateY: 0 }}
        animate={{
          rotateX,
          rotateY,
          z: 50
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        onClick={(e) => {
          if (isFlipped) {
            e.preventDefault()
            setIsFlipped(false)
          }
        }}
        onDoubleClick={(e) => {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }}
        className="select-none group flex h-full items-center justify-between rounded-2xl p-5 text-white shadow-xl transition-all duration-300 active:scale-95 hover:shadow-2xl border border-white/20"
        style={{
          background: gradient,
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'none'
        }}
      >
        {!isFlipped ? (
          <>
            <div className="flex items-center gap-4 flex-1">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                animate={{
                  rotateZ: isFlipped ? 360 : 0
                }}
                transition={{ duration: 0.6 }}
              >
                {(() => {
                  const Icon = getServiceIcon(title)
                  return <Icon className="h-6 w-6 text-white" />
                })()}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-fluid-title font-semibold text-white">{title}</h3>
                <p className="text-fluid-body text-white/90">{description}</p>
              </div>
            </div>
            <motion.div
              className="ml-4 flex-shrink-0 rounded-lg bg-white/25 px-4 py-2.5 text-fluid-body font-semibold text-white transition-all group-hover:bg-white/40 backdrop-blur-sm ring-1 ring-white/30"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
              <ArrowRight className="ml-1.5 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center" style={{ transform: 'rotateY(180deg)' }}>
            <p className="text-fluid-body font-medium text-white/90">Double-click to flip back</p>
            <p className="mt-2 text-fluid-small text-white/70">or click the button to open</p>
          </div>
        )}
      </motion.a>
    </div>
  )
}
