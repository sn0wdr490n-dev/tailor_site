'use client'

import { useRef, useEffect } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        zIndex: 1001,
        background: 'rgba(182, 138, 53, 0.15)',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(182, 138, 53, 0.8), rgba(214, 194, 154, 0.6))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
