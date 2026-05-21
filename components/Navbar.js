'use client'

import { useState, useEffect } from 'react'

export default function Navbar({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setScrolled(scrollProgress > 0.02)
  }, [scrollProgress])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Tailoring', href: '#tailoring' },
    { label: 'Collection', href: '#collection' },
    { label: 'Experience', href: '#experience' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isMobile ? '0 20px' : '0 48px',
          height: isMobile ? '56px' : '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease, background 0.3s ease',
          background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(182, 138, 53, 0.06)' : '1px solid transparent',
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            scrollToTop()
          }}
          style={{
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.9)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Atelier Noir
        </a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.85)')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.4)')}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a
            href="#experience"
            style={{
              padding: '8px 20px',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.9)',
              background: 'transparent',
              border: '1px solid rgba(182, 138, 53, 0.4)',
              borderRadius: '1px',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(182, 138, 53, 0.12)'
              e.target.style.borderColor = 'rgba(182, 138, 53, 0.7)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.borderColor = 'rgba(182, 138, 53, 0.4)'
            }}
          >
            Book Appointment
          </a>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '36px',
              height: '36px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(5, 5, 5, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'rgba(182, 138, 53, 0.7)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Atelier Noir
          </a>

          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.65)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#experience"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '12px',
              padding: '14px 36px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.9)',
              background: 'linear-gradient(135deg, rgba(182, 138, 53, 0.2), rgba(182, 138, 53, 0.05))',
              border: '1px solid rgba(182, 138, 53, 0.5)',
              borderRadius: '1px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Book Appointment
          </a>
        </div>
      )}
    </>
  )
}
