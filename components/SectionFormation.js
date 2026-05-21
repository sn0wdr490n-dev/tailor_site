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

export default function SectionFormation() {
  const [ref, isInView, p] = useInView()

  const fadeUp = (delay) => {
    const local = Math.max(0, Math.min(1, (p - delay * 0.12) / (0.55 - delay * 0.12)))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 35}px)`,
    }
  }

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 20px 60px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '100%', textAlign: 'center' }}>
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
            03 — The Formation
          </span>
        </div>

        <div style={fadeUp(0.1)}>
          <h2
            style={{
              fontSize: 'clamp(32px, 9vw, 90px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '32px',
            }}
          >
            Elegance
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
              takes shape.
            </span>
          </h2>
        </div>

        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(182, 138, 53, 0.4), transparent)',
            margin: '0 auto 32px',
            width: '80px',
            opacity: p > 0.2 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          {['Balanced proportions.', 'Timeless silhouette.', 'Modern sophistication.'].map((text, i) => (
            <div key={text} style={fadeUp(0.2 + i * 0.12)}>
              <p
                style={{
                  fontSize: 'clamp(13px, 3.5vw, 18px)',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                  color: 'rgba(255, 255, 255, 0.45)',
                  textTransform: 'uppercase',
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        <div style={fadeUp(0.55)}>
          <div
            style={{
              marginTop: '40px',
              padding: '16px 20px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: 'rgba(191, 195, 201, 0.35)',
                fontStyle: 'italic',
              }}
            >
              "The suit does not make the man. The man makes the suit."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
