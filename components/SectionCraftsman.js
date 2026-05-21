'use client'

import { useRef, useEffect, useState } from 'react'

function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: options.threshold || 0.1 }
    )

    observer.observe(el)

    const handleScroll = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const p = 1 - Math.max(0, Math.min(1, rect.top / viewH))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [ref, isInView, progress]
}

export default function SectionCraftsman() {
  const [ref, isInView, p] = useInView({ threshold: 0.1 })

  const fadeUp = (delay) => {
    const local = Math.max(0, Math.min(1, (p - delay * 0.15) / (0.6 - delay * 0.15)))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 40}px)`,
    }
  }

  return (
    <section
      ref={ref}
      id="craftsmanship"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 20px 60px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '100%' }}>
        <div style={fadeUp(0)}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(182, 138, 53, 0.7)',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            01 — The Craft
          </span>
        </div>

        <div style={fadeUp(0.1)}>
          <h1
            style={{
              fontSize: 'clamp(36px, 10vw, 120px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '24px',
            }}
          >
            Crafted
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(214, 194, 154, 0.85)' }}>
              by hand.
            </span>
          </h1>
        </div>

        <div
          style={{
            height: '1px',
            background: 'rgba(182, 138, 53, 0.3)',
            marginBottom: '24px',
            width: `${Math.max(0, Math.min(100, p * 120))}%`,
            transition: 'width 0.3s ease',
          }}
        />

        <div style={fadeUp(0.2)}>
          <p
            style={{
              fontSize: 'clamp(14px, 4vw, 20px)',
              fontWeight: 300,
              letterSpacing: '0.01em',
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: 1.7,
              maxWidth: '100%',
              marginBottom: '16px',
            }}
          >
            Every stitch carries intention. Every thread tells a story of patience, precision, and an unwavering commitment to the art of tailoring.
          </p>
        </div>

        <div style={fadeUp(0.3)}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              color: 'rgba(191, 195, 201, 0.35)',
              textTransform: 'uppercase',
            }}
          >
            True tailoring begins long before the suit is worn.
          </p>
        </div>
      </div>
    </section>
  )
}
