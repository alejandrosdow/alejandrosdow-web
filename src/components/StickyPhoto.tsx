'use client'

import { useEffect, useRef } from "react"

type Tile = {
  ampX: number
  ampY: number
  speed: number
  phase: number
}

const COLS = 10
const ROWS = 14
const IMAGE_SRC = "/foto-alejandro.jpg"
const BASE_SPEED = 0.6
const HOVER_SPEED = 2.2

function buildTileMap(): (Tile | null)[][] {
  const map: (Tile | null)[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => null)
  )

  const set = (row: number, col: number, t: Tile) => {
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) map[row][col] = t
  }

  // Solo tiles con ampX/Y moderados — sin offset estático que cause blancos
  // Zona móvil/cara: ~rows 4-7, cols 3-6
  set(4, 3, { ampX: 4, ampY: 0, speed: 0.55, phase: 0.4 })
  set(4, 4, { ampX: 5, ampY: 1, speed: 0.50, phase: 1.2 })
  set(4, 5, { ampX: 4, ampY: 0, speed: 0.52, phase: 2.1 })
  set(4, 6, { ampX: 3, ampY: 0, speed: 0.46, phase: 2.7 })

  set(5, 3, { ampX: 4, ampY: 1, speed: 0.44, phase: 0.8 })
  set(5, 4, { ampX: 6, ampY: 1, speed: 0.48, phase: 1.8 })
  set(5, 5, { ampX: 5, ampY: 0, speed: 0.42, phase: 2.4 })
  set(5, 6, { ampX: 4, ampY: 0, speed: 0.45, phase: 3.0 })

  set(6, 4, { ampX: 3, ampY: 0, speed: 0.38, phase: 0.6 })
  set(6, 5, { ampX: 3, ampY: 0, speed: 0.36, phase: 1.9 })

  // Zona mano/brazo: ~rows 5-8, cols 2-3
  set(5, 2, { ampX: 3, ampY: 0, speed: 0.40, phase: 0.3 })
  set(6, 2, { ampX: 2, ampY: 0, speed: 0.37, phase: 1.5 })
  set(7, 2, { ampX: 2, ampY: 0, speed: 0.34, phase: 2.2 })

  // Zona torso/bolso: ~rows 8-11, cols 3-6
  set(8,  4, { ampX: 2, ampY: 0, speed: 0.30, phase: 0.7 })
  set(8,  5, { ampX: 2, ampY: 0, speed: 0.29, phase: 1.4 })
  set(9,  3, { ampX: 2, ampY: 0, speed: 0.32, phase: 0.5 })
  set(9,  4, { ampX: 3, ampY: 0, speed: 0.33, phase: 1.6 })
  set(9,  5, { ampX: 3, ampY: 0, speed: 0.35, phase: 2.2 })
  set(9,  6, { ampX: 2, ampY: 0, speed: 0.31, phase: 3.0 })

  return map
}

const TILE_MAP = buildTileMap()

export default function StickyPhoto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const hoverRef = useRef(false)
  const speedRef = useRef(BASE_SPEED)
  const runningRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const img = new Image()
    img.src = IMAGE_SRC

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
    }

    const onEnter = () => { hoverRef.current = true }
    const onLeave = () => { hoverRef.current = false }

    const draw = (time: number) => {
      if (!runningRef.current) return

      const target = hoverRef.current ? HOVER_SPEED : BASE_SPEED
      speedRef.current += (target - speedRef.current) * 0.04

      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      ctx.clearRect(0, 0, cw, ch)
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, cw, ch)

      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!iw || !ih) { rafRef.current = requestAnimationFrame(draw); return }

      const scale = Math.max(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const ox = (cw - dw) / 2
      const oy = (ch - dh) / 2

      // Dibujar imagen base completa
      ctx.drawImage(img, ox, oy, dw, dh)

      const tileW = cw / COLS
      const tileH = ch / ROWS
      const t = time * 0.001 * speedRef.current

      // Solo redibujar tiles activos encima con desplazamiento
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cfg = TILE_MAP[row][col]
          if (!cfg) continue

          const destX = col * tileW
          const destY = row * tileH

          const dx = Math.sin(t * cfg.speed + cfg.phase) * cfg.ampX
          const dy = Math.cos(t * cfg.speed + cfg.phase) * cfg.ampY

          // Source clampeado para evitar salir fuera de la imagen
          const rawSrcX = (destX - ox - dx) / scale
          const rawSrcY = (destY - oy - dy) / scale
          const srcW = tileW / scale
          const srcH = tileH / scale
          const srcX = Math.max(0, Math.min(iw - srcW, rawSrcX))
          const srcY = Math.max(0, Math.min(ih - srcH, rawSrcY))

          ctx.save()
          ctx.beginPath()
          ctx.rect(destX, destY, tileW + 0.5, tileH + 0.5)
          ctx.clip()
          ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, tileW, tileH)
          ctx.restore()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    img.onload = () => { resize(); rafRef.current = requestAnimationFrame(draw) }
    if (img.complete && img.naturalWidth) { resize(); rafRef.current = requestAnimationFrame(draw) }

    window.addEventListener("resize", resize)
    canvas.addEventListener("pointerenter", onEnter)
    canvas.addEventListener("pointerleave", onLeave)

    return () => {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointerenter", onEnter)
      canvas.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      className="hidden md:block"
      style={{
        width: "50%",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
        overflow: "hidden",
        background: "#0a0a0a",
        borderRight: "1px solid var(--border)",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      {/* Socials centrados */}
      <div style={{
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 20,
        zIndex: 10,
      }}>
        <a href="https://x.com/alejandrosdow" target="_blank" rel="noreferrer"
          style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s", display: "flex" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/alejandrosdow" target="_blank" rel="noreferrer"
          style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s", display: "flex" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/alejandromarcosmoraga/" target="_blank" rel="noreferrer"
          style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s", display: "flex" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
