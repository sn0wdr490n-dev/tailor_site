'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import CinematicCanvas from '../components/CinematicCanvas'
import ScrollProgress from '../components/ScrollProgress'
import ParticleField from '../components/ParticleField'
import SectionCraftsman from '../components/SectionCraftsman'
import SectionConstruction from '../components/SectionConstruction'
import SectionFormation from '../components/SectionFormation'
import SectionHeroReveal from '../components/SectionHeroReveal'
import SectionCTA from '../components/SectionCTA'
import Footer from '../components/Footer'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let timeout
    let fallback

    const hideLoading = () => {
      clearTimeout(fallback)
      setFadeOut(true)
      timeout = setTimeout(() => setLoading(false), 800)
    }

    if (document.readyState === 'complete') {
      hideLoading()
    } else {
      window.addEventListener('load', hideLoading)
    }

    fallback = setTimeout(hideLoading, 20000)

    return () => {
      window.removeEventListener('load', hideLoading)
      clearTimeout(timeout)
      clearTimeout(fallback)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, transparent, rgba(182, 138, 53, 0.6), transparent)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '10px',
            fontWeight: 300,
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.25)',
            textTransform: 'uppercase',
          }}
        >
          Atelier Noir
        </span>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <main ref={containerRef} className="relative">
      <ScrollProgress />
      <Navbar scrollProgress={scrollProgress} />
      <ParticleField />
      <CinematicCanvas scrollProgress={scrollProgress} />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 3,
          pointerEvents: 'none',
          background: 'rgba(5, 5, 5, 0.85)',
        }}
      />

      <div className="relative z-10">
        <SectionCraftsman />
        <SectionConstruction />
        <SectionFormation />
        <SectionHeroReveal />
        <SectionCTA />
      </div>

      <Footer />
    </main>
  )
}
