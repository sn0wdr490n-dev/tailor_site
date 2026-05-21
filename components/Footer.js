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

export default function Footer() {
  const [ref, isInView, p] = useInView()

  const fadeUp = (delay) => {
    const local = Math.max(0, Math.min(1, (p - delay * 0.08) / (0.4 - delay * 0.08)))
    return {
      opacity: local,
      transform: `translateY(${(1 - local) * 30}px)`,
    }
  }

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 1))',
        borderTop: '1px solid rgba(182, 138, 53, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(32px, 4vw, 48px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            marginBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <div style={fadeUp(0)}>
            <h3
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '20px',
              }}
            >
              Atelier Noir
            </h3>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.02em',
                color: 'rgba(255, 255, 255, 0.35)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Bespoke tailoring for the modern gentleman. Every garment crafted with intention, precision, and timeless elegance.
            </p>
          </div>

          <div style={fadeUp(0.1)}>
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(182, 138, 53, 0.6)',
                marginBottom: '16px',
              }}
            >
              Visit Us
            </h4>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.02em',
                color: 'rgba(255, 255, 255, 0.4)',
                lineHeight: 1.8,
              }}
            >
              18 Fort Kochi Road
              <br />
              Fort Kochi, Kochi, Kerala 682001
              <br />
              India
            </p>
          </div>

          <div style={fadeUp(0.2)}>
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(182, 138, 53, 0.6)',
                marginBottom: '16px',
              }}
            >
              Contact
            </h4>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.02em',
                color: 'rgba(255, 255, 255, 0.4)',
                lineHeight: 1.8,
              }}
            >
              +91 484 123 4567
              <br />
              appointments@ateliernoir.com
              <br />
              Mon — Sat: 10am — 7pm
            </p>
          </div>

          <div style={fadeUp(0.3)}>
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(182, 138, 53, 0.6)',
                marginBottom: '16px',
              }}
            >
              Follow
            </h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: 'rgba(255, 255, 255, 0.35)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'rgba(214, 194, 154, 0.8)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.35)')}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(182, 138, 53, 0.15), transparent)',
            marginBottom: 'clamp(24px, 4vw, 40px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            ...fadeUp(0.4),
          }}
        >
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '11px',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.25)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.25)')}
              >
                {link}
              </a>
            ))}
          </div>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            © 2026 Atelier Noir. All rights reserved. Handcrafted with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}
