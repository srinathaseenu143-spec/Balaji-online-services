'use client'

import { useEffect, useRef } from 'react'

export default function Animated3DBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient circles with new teal/cyan palette
      const particles = 5
      for (let i = 0; i < particles; i++) {
        const x = (Math.sin(time + i) * canvas.width) / 4 + canvas.width / 2
        const y = (Math.cos(time + i * 0.7) * canvas.height) / 4 + canvas.height / 2
        const size = 30 + Math.sin(time + i * 1.3) * 20

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        // Teal (#06B6D4) and Cyan (#0891B2) gradient
        gradient.addColorStop(0, `rgba(6, 182, 212, ${0.4 + Math.sin(time + i) * 0.2})`)
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(x - size, y - size, size * 2, size * 2)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{ display: 'block' }}
    />
  )
}
