'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const TOTAL_FRAMES = 123
const INITIAL_LOAD = 15
const PRELOAD_AHEAD = 8

function getFrameUrl(i) {
  return `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
}

export default function CinematicCanvas({ scrollProgress }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef(new Map())
  const [ready, setReady] = useState(false)
  const scrollRef = useRef(0)
  const currentFrameRef = useRef(0)
  const smoothFrameRef = useRef(0)
  const animationFrameRef = useRef(null)
  const ctxRef = useRef(null)
  const dimsRef = useRef({ width: 0, height: 0 })
  const loadedCountRef = useRef(0)
  const loadedFramesRef = useRef(new Set())

  scrollRef.current = scrollProgress

  const loadFrame = useCallback((index) => {
    if (loadedFramesRef.current.has(index)) return
    loadedFramesRef.current.add(index)

    const img = new Image()
    img.decoding = 'async'
    img.src = getFrameUrl(index)

    img.onload = () => {
      loadedCountRef.current++
      imagesRef.current.set(index, img)
    }
    img.onerror = () => {
      loadedCountRef.current++
    }
  }, [])

  const preloadAround = useCallback((frameIndex) => {
    for (let i = Math.max(0, frameIndex - PRELOAD_AHEAD); i <= Math.min(TOTAL_FRAMES - 1, frameIndex + PRELOAD_AHEAD); i++) {
      loadFrame(i)
    }
  }, [loadFrame])

  useEffect(() => {
    let count = 0
    for (let i = 0; i < INITIAL_LOAD; i++) {
      loadFrame(i)
    }

    const checkReady = setInterval(() => {
      if (loadedCountRef.current >= INITIAL_LOAD) {
        setReady(true)
        clearInterval(checkReady)
      }
    }, 50)

    return () => clearInterval(checkReady)
  }, [loadFrame])

  const drawFrame = useCallback((frameIndex) => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    const img = imagesRef.current.get(frameIndex)
    if (!img || !img.complete || img.naturalWidth === 0) return

    const { width, height } = dimsRef.current

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'low'

    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = width / height

    let drawWidth, drawHeight, drawX, drawY

    if (imgRatio > canvasRatio) {
      drawHeight = height
      drawWidth = drawHeight * imgRatio
      drawX = (width - drawWidth) / 2
      drawY = 0
    } else {
      drawWidth = width
      drawHeight = drawWidth / imgRatio
      drawX = 0
      drawY = (height - drawHeight) / 2
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false })
    ctxRef.current = ctx

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w
      canvas.height = h
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      dimsRef.current = { width: w, height: h }

      const frameIndex = Math.round(smoothFrameRef.current)
      drawFrame(Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex)))
    }

    resize()
    window.addEventListener('resize', resize)

    let lastFrameTime = 0
    const TARGET_FPS = 30
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    const render = (timestamp) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }
      lastFrameTime = timestamp

      const targetFrame = scrollRef.current * (TOTAL_FRAMES - 1)
      const clampedTarget = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame))

      smoothFrameRef.current += (clampedTarget - smoothFrameRef.current) * 0.15

      const roundedFrame = Math.round(smoothFrameRef.current)
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, roundedFrame))

      if (clampedFrame !== currentFrameRef.current) {
        currentFrameRef.current = clampedFrame
        preloadAround(clampedFrame)
        drawFrame(clampedFrame)
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render(0)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [drawFrame, preloadAround])

  const loadProgress = Math.min(100, Math.round((loadedCountRef.current / INITIAL_LOAD) * 100))

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background: '#050505',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {!ready && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(182, 138, 53, 0.6), transparent)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.3)',
              textTransform: 'uppercase',
            }}
          >
            Loading...
          </span>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
              50% { opacity: 1; transform: scaleY(1); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
