'use client'

import { useRef, useEffect } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let isMobile = window.innerWidth < 768

    const resize = () => {
      isMobile = window.innerWidth < 768
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (isMobile ? 0.8 : 1.2) + 0.3
        this.speedX = (Math.random() - 0.5) * 0.1
        this.speedY = (Math.random() - 0.5) * 0.08 - 0.02
        this.opacity = Math.random() * 0.2 + 0.03
        this.fadeSpeed = Math.random() * 0.001 + 0.0005
        this.growing = Math.random() > 0.5
        this.hue = Math.random() > 0.7 ? 42 : 45
        this.saturation = Math.random() * 20 + 30
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.growing) {
          this.opacity += this.fadeSpeed
          if (this.opacity >= (isMobile ? 0.2 : 0.28)) this.growing = false
        } else {
          this.opacity -= this.fadeSpeed
          if (this.opacity <= 0.01) this.reset()
        }

        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset()
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, 70%, ${this.opacity})`
        ctx.fill()
      }
    }

    const particleCount = isMobile ? 25 : 50
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}
