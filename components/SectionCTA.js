'use client'

import { useRef, useEffect, useState } from 'react'

function useInView() {
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
      { threshold: 0.1 }
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

export default function SectionCTA() {
  const [ref, isInView, p] = useInView()

  const fadeUp = (delay) => {
    const local = Math.max(0, Math.min(1, (p - delay * 0.1) / (0.5 - delay * 0.1)))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 35}px)`,
    }
  }

  return (
    <section
      ref={ref}
      id="experience"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
            05 — Your Experience
          </span>
        </div>

        <div style={fadeUp(0.1)}>
          <h2
            style={{
              fontSize: 'clamp(36px, 10vw, 100px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '16px',
            }}
          >
            Wear
            <br />
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                background: 'linear-gradient(135deg, rgba(214, 194, 154, 0.9), rgba(182, 138, 53, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              confidence.
            </span>
          </h2>
        </div>

        <div style={fadeUp(0.2)}>
          <p
            style={{
              fontSize: 'clamp(14px, 3.5vw, 19px)',
              fontWeight: 300,
              letterSpacing: '0.01em',
              color: 'rgba(255, 255, 255, 0.45)',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            Bespoke tailoring redefined. Every garment is a testament to the art of precision, crafted exclusively for you.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', ...fadeUp(0.3) }}>
          <button
            style={{
              width: '100%',
              maxWidth: '280px',
              padding: '16px 32px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.95)',
              background: 'linear-gradient(135deg, rgba(182, 138, 53, 0.2), rgba(182, 138, 53, 0.05))',
              border: '1px solid rgba(182, 138, 53, 0.5)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          >
            Schedule Your Fitting
          </button>

          <button
            style={{
              width: '100%',
              maxWidth: '280px',
              padding: '16px 32px',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          >
            Explore Collection
          </button>
        </div>

        <div style={{ ...fadeUp(0.5), marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.2)',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Handcrafted for modern gentlemen
          </p>
          <p
            style={{
              fontSize: '9px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            Atelier Noir — Est. 2026
          </p>
        </div>
      </div>
    </section>
  )
}
