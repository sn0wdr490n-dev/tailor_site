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

export default function SectionConstruction() {
  const [ref, isInView, p] = useInView({ threshold: 0.1 })

  const fadeUp = (delay) => {
    const local = Math.max(0, Math.min(1, (p - delay * 0.12) / (0.55 - delay * 0.12)))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 35}px)`,
    }
  }

  const details = [
    { label: 'Fabric', value: 'Super 150s Merino Wool', desc: 'Sourced from Italian mills' },
    { label: 'Construction', value: 'Half-Canvas', desc: 'Natural drape and breathability' },
    { label: 'Stitching', value: 'Hand-Finished', desc: 'Over 200 hours of craftsmanship' },
  ]

  return (
    <section
      ref={ref}
      id="tailoring"
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
      <div style={{ ...fadeUp(0), textAlign: 'center', marginBottom: '40px' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(182, 138, 53, 0.7)',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          02 — The Construction
        </span>
        <h2
          style={{
            fontSize: 'clamp(28px, 8vw, 80px)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          Precision in
          <br />
          <span style={{ color: 'rgba(214, 194, 154, 0.8)' }}>every detail.</span>
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '100%',
          width: '100%',
        }}
      >
        {details.map((detail, i) => (
          <div
            key={detail.label}
            style={{
              ...fadeUp(0.15 + i * 0.12),
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '4px',
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(182, 138, 53, 0.4), transparent)',
              }}
            />
            <span
              style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(182, 138, 53, 0.6)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {detail.label}
            </span>
            <h3
              style={{
                fontSize: 'clamp(16px, 4vw, 22px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '6px',
              }}
            >
              {detail.value}
            </h3>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.02em',
                color: 'rgba(255, 255, 255, 0.35)',
                lineHeight: 1.5,
              }}
            >
              {detail.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ ...fadeUp(0.5), marginTop: '40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '1px', background: 'rgba(182, 138, 53, 0.3)' }} />
          <span
            style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.25)',
              textTransform: 'uppercase',
            }}
          >
            Luxury engineering meets fashion artistry
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(182, 138, 53, 0.3)' }} />
        </div>
      </div>
    </section>
  )
}
