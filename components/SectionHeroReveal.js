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

export default function SectionHeroReveal() {
  const [ref, isInView, p] = useInView()

  const titleReveal = () => {
    const local = Math.max(0, Math.min(1, p / 0.4))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 50}px) scale(${0.92 + local * 0.08})`,
    }
  }

  const subtitleReveal = () => {
    const local = Math.max(0, Math.min(1, (p - 0.15) / 0.35))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 25}px)`,
    }
  }

  const supportReveal = () => {
    const local = Math.max(0, Math.min(1, (p - 0.3) / 0.3))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 15}px)`,
    }
  }

  const statsReveal = () => {
    const local = Math.max(0, Math.min(1, (p - 0.45) / 0.3))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 15}px)`,
    }
  }

  return (
    <section
      ref={ref}
      id="collection"
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
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(182, 138, 53, 0.06) 0%, transparent 70%)',
          opacity: p > 0.2 ? Math.min(1, (p - 0.2) / 0.3) : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={titleReveal()}>
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
            04 — The Masterpiece
          </span>
          <h2
            style={{
              fontSize: 'clamp(44px, 12vw, 140px)',
              fontWeight: 100,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'rgba(255, 255, 255, 0.97)',
              marginBottom: '20px',
            }}
          >
            The
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(214, 194, 154, 0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Black Suit.
            </span>
          </h2>
        </div>

        <div style={subtitleReveal()}>
          <p
            style={{
              fontSize: 'clamp(14px, 4vw, 28px)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              color: 'rgba(214, 194, 154, 0.75)',
              marginBottom: '12px',
            }}
          >
            Timeless. Tailored. Unforgettable.
          </p>
        </div>

        <div style={supportReveal()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(182, 138, 53, 0.3)' }} />
            <p
              style={{
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: 'rgba(255, 255, 255, 0.35)',
              }}
            >
              For the moments that define presence.
            </p>
            <div style={{ width: '32px', height: '1px', background: 'rgba(182, 138, 53, 0.3)' }} />
          </div>
        </div>

        <div style={statsReveal()}>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
            {[
              { value: '200+', label: 'Hours of Craft' },
              { value: '150s', label: 'Super Wool' },
              { value: '100%', label: 'Hand Finished' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: 'clamp(20px, 6vw, 32px)',
                    fontWeight: 200,
                    letterSpacing: '-0.02em',
                    color: 'rgba(214, 194, 154, 0.8)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 400,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.25)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
