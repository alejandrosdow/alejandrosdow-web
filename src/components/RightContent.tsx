'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* ── Reveal on scroll ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  const ref = useReveal()
  return (
    <div id={id} ref={ref} className="reveal" style={{ borderTop: '1px solid var(--border)', padding: '44px 0' }}>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--green)', marginBottom: 24 }}>
      {children}
    </p>
  )
}

/* ── Trayectoria data ── */
const rolesAhora = [
  { logo: '/logo-heretics.png', role: 'CMO', company: 'Team Heretics', period: '2018 — Presente', desc: 'Lidero la marca y comunidad global de Team Heretics.' },
  { logo: '/logo-genlayer.png', role: 'Brand & Marketing Advisor', company: 'GenLayer', period: '2025 — Presente', desc: 'IA + Blockchain. Estrategia de marca.' },
  { logo: '/logo-freelance.png', role: 'Freelance', company: 'Creadores y empresas', period: '2018 — Presente', desc: 'Narrativa, estrategia, construcción de marca, comunidad y monetización de audiencias.' },
]

const rolesEmpresa = [
  { role: 'CMO', company: 'Cooler Master Iberia', period: '2017–2019', desc: 'Estrategia, plan y ejecución de marca en España y Portugal para una de las marcas de hardware más reconocidas del sector gaming.' },
  { role: 'Productor & Presentador', company: 'Movistar / GAME TV', period: '2016–2017', desc: 'Producción, guión y cara del primer canal de gaming/esports en televisión.' },
  { role: 'Head of Publishers, Talents & Esports', company: 'GAME Stores', period: '2015–2016', desc: "Gestioné relaciones con publishers internacionales, creadores y equipos. Parte del equipo de Madrid Gaming Experience (+120K asistentes), Barcelona Games World y Fun'n'Serious Bilbao." },
  { role: 'Marketing Manager', company: 'SocialNAT', period: '2013–2015', desc: 'Gestión de campañas y comunidades digitales. Narrador y cara de la compañía.' },
  { role: 'Creador de contenido', company: 'Machinima / LVP / ESL', period: '2008–2013', desc: 'Todo empieza aquí. Uno de los primeros contratos de Machinima en España y colaborador habitual de LVPes y ESL.' },
  { role: 'Jugador profesional', company: 'Call of Duty · Pain Gaming', period: '2008–2013', desc: 'Campeón nacional. 9º en el Mundial de Los Ángeles 2011. Uno de los primeros contratos firmados en España como jugador.' },
]

const proyectos = [
  { name: 'JULIO', period: '2025', desc: 'Primera memebrand hispanohablante. Filosofía mediterránea, sold out en 30 min del único drop lanzado.' },
  { name: 'SCALELAB', period: '2024', desc: 'Ciclo completo para creadores: producto, plataforma, marketing y equipos de ventas.' },
  { name: 'Zhander App', period: '2020–2023', desc: "App de ocio nocturno para digitalizar el rol del PR. Evento propio 'Algodón' con Antídoto." },
  { name: 'OLAGG', period: '2020', desc: 'Inversor minoritario. Apuesta early en blockchain, gaming y esports.' },
  { name: 'XYON Agency', period: '2015–2016', desc: 'Agencia gaming y management de creadores en España.' },
]

const schools = ['ISDI', 'ESADE', 'Nebrija', 'The Core', 'UNIE', 'Mondragon']

const bibCovers = ['/book-cover-1.jpg', '/book-cover-2.jpg', '/book-cover-3.jpg', '/book-cover-4.jpg', '/book-cover-5.jpg', '/book-cover-6.jpg']
const bibColors = ['#C4BDB4', '#B8B0A6', '#CABFB7', '#C0B9B0', '#BAB3AA', '#C8C1B8']
const bibEmojis = ['📖', '🧠', '🌍', '⚡', '🎯', '🔥']

/* ── BookForm ── */
function BookForm({ formId }: { formId: string }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const endpoints: Record<string, string> = {
    libro: 'https://formspree.io/f/xaqldllk',
    bib: 'https://formspree.io/f/mlgowooy',
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(endpoints[formId], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: emailRef.current?.value }),
      })
      if (res.ok) setSent(true)
    } finally { setLoading(false) }
  }
  if (sent) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>✓</div>
      <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>¡Perfecto! Te lo enviamos ahora mismo.</p>
    </div>
  )
  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <input ref={emailRef} type="email" placeholder="tu@email.com" required
        style={{ flex: 1, minWidth: 160, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 100, padding: '9px 18px', fontSize: 14, color: 'var(--text)', fontFamily: 'inherit', outline: 'none' }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--green)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
      <button type="submit" disabled={loading}
        style={{ background: 'var(--green)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '9px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', opacity: loading ? 0.6 : 1 }}
      >{loading ? 'Enviando…' : formId === 'libro' ? 'Descargar gratis →' : 'Recibir biblioteca →'}</button>
    </form>
  )
}

/* ── Fila trayectoria ── */
function TrajectoryRow({ role, company, period, desc, logo }: { role: string; company: string; period: string; desc: string; logo?: string }) {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: logo ? '40px 1fr auto' : '1fr auto', gap: '0 14px', padding: '14px 0', borderBottom: '1px solid var(--border)', alignItems: 'start', transition: 'padding-left 0.2s', cursor: 'default' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '6px' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0' }}
    >
      {logo && (
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0, marginTop: 2 }}>
          <Image src={logo} alt={company} fill style={{ objectFit: 'contain', padding: 4 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{role}</span>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>— {company}</span>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 3 }}>{desc}</p>
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap', paddingTop: 2 }}>{period}</span>
    </div>
  )
}

/* ── Galería carousel ── */
function Gallery() {
  const [current, setCurrent] = useState(0)
  // Añade tus fotos en /public/ con estos nombres
  const photos = [
    { src: '/gallery-1.jpg', alt: 'Foto 1' },
    { src: '/gallery-2.jpg', alt: 'Foto 2' },
    { src: '/gallery-3.jpg', alt: 'Foto 3' },
    { src: '/gallery-4.jpg', alt: 'Foto 4' },
    { src: '/gallery-5.jpg', alt: 'Foto 5' },
  ]
  const prev = () => setCurrent(c => (c - 1 + photos.length) % photos.length)
  const next = () => setCurrent(c => (c + 1) % photos.length)

  return (
    <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--border)', aspectRatio: '16/9' }}>
      {photos.map((p, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, transition: 'opacity 0.5s ease', opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}>
          <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          {/* Placeholder si no hay foto */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: -1 }}>
            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>{p.alt}</span>
          </div>
        </div>
      ))}
      <button onClick={prev} aria-label="Anterior"
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, backdropFilter: 'blur(4px)' }}
      >←</button>
      <button onClick={next} aria-label="Siguiente"
        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, backdropFilter: 'blur(4px)' }}
      >→</button>
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
        {photos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Foto ${i + 1}`}
            style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 100, background: i === current ? 'var(--green)' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
          />
        ))}
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function RightContent() {
  return (
    <div style={{ flex: 1, minWidth: 0, padding: '0 clamp(20px, 4vw, 56px)' }}>

      {/* ── HERO ── */}
      <div style={{ padding: 'clamp(40px,8vh,80px) 0 48px', borderBottom: '1px solid var(--border)' }}>
        {/* Foto mobile */}
        <div className="md:hidden" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', position: 'relative', flexShrink: 0 }}>
            <Image src="/foto-alejandro.jpg" alt="Alejandro Marcos" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'block', width: 16, height: 1, background: 'var(--green)' }} />
            @AlejandroSdOw
          </span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#libro" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >Libro</a>
            <a href="#sesion"
              style={{ fontSize: 14, fontWeight: 600, padding: '7px 16px', borderRadius: 100, background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(0,184,72,0.25)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--green-dim)'; e.currentTarget.style.color = 'var(--green)' }}
            >Agendar sesión</a>
          </div>
        </div>

        <h1 className="font-syne" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--text)', marginBottom: 24 }}>
          <span style={{ color: 'var(--green)' }}>Conectar</span><br />para llegar.
        </h1>
        <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 480, marginBottom: 8, fontWeight: 300 }}>
          Construyo marcas culturales en internet.<br />
          Convierto narrativa en comunidad, comunidad en distribución y distribución en negocio.
        </p>
        <p style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: 480, marginBottom: 32, fontWeight: 300 }}>
          Entendiendo el zeitgeist para crear proyectos que conectan de verdad. CMO en Team Heretics.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="#sesion"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 28px', borderRadius: 100, background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,184,72,0.25)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
          >Reservar sesión de 30 min →</a>
          <a href="#libro"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 28px', borderRadius: 100, border: '1.5px solid var(--border-accent)', color: 'var(--text-muted)', fontSize: 15, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'none' }}
          >Descarga el libro gratis</a>
        </div>
      </div>

      {/* ── BIO + UNIVERSO ── */}
      <Section>
        <Label>// Bio</Label>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 14 }}>
          Nací en Colmenarejo, Madrid, entre el campo e internet. Mi carrera comenzó en los primeros años de la cultura digital, como jugador profesional de Call of Duty y creador de contenido.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 14 }}>
          Hoy construyo y escalo marcas y proyectos en internet, en la <span style={{ color: 'var(--green)', fontWeight: 500 }}>intersección entre entretenimiento, tecnología y cultura digital</span>. Desde 2018 soy CMO de Team Heretics, donde he ayudado a transformar una marca de nicho en una referencia global.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 16 }}>
          Creo en las marcas capaces de generar pertenencia, convertir comunidad en distribución y distribución en negocio.
        </p>

      </Section>

      {/* ── EN QUÉ TRABAJO ── */}
      <Section>
        <Label>// En qué trabajo</Label>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 28 }}>
          La mayoría de las marcas no fallan por falta de producto o contenido. Fallan por falta de narrativa clara. Confunden seguidores con comunidad y recurren al paid media para compensar lo que no logran construir de forma orgánica. Creen que el problema es llegar. Pero el problema no es la visibilidad. <strong style={{ color: 'var(--green)', fontWeight: 600 }}>El problema es construir algo que la gente entienda, recuerde y quiera hacer suyo.</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, marginBottom: 20, scrollSnapType: 'x mandatory' }}>
          {[
            { n: '01', t: 'Narrativa', d: 'Tu posición en el mundo y cómo articularla. Sin narrativa, todo lo demás es ruido.' },
            { n: '02', t: 'Comunidad', d: 'Pertenencia, no seguidores. Audiencia que entiende, comparte y defiende tu proyecto.' },
            { n: '03', t: 'Sistemas', d: 'Dirección creativa, distribución y crecimiento con estructura para escalar con criterio sin perder el alma.' },
          ].map(b => (
            <div key={b.n} style={{ minWidth: 220, flexShrink: 0, scrollSnapAlign: 'start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 20px', transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,184,72,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >
              <div className="font-syne" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{b.t}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{b.d}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, padding: '14px 18px', borderRadius: 10, background: 'var(--surface)', borderLeft: '3px solid var(--green)' }}>
          Podemos trabajar de tres formas: sesiones individuales, integrándome part-time en tu proyecto o formando un equipo a medida. Por mi rol como CMO en Team Heretics, cojo muy pocos proyectos al año.
        </div>
      </Section>

      {/* ── SESIÓN ── */}
      <Section id="sesion">
        <Label>// Sesión gratuita</Label>
        <h2 className="font-syne" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 10, lineHeight: 1.1 }}>
          Hablemos 30 minutos.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 6, fontWeight: 300 }}>No es una llamada genérica. Es una sesión de trabajo real.</p>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>En 30 minutos identificamos dónde estás, qué no está funcionando y cuáles son los primeros pasos concretos.</p>
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 24 }}>
          {[
            'Para creadores que quieren escalar y monetizar su comunidad.',
            'Para empresas que necesitan construir relevancia en internet.',
            'Para profesionales que quieren construir marca personal.',
            'Para founders que necesitan convertir su visión en narrativa y estructura.',
            'Para proyectos que buscan estrategia antes de escalar.',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border)', transition: 'padding-left 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.paddingLeft = '6px')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.paddingLeft = '0')}
            >
              <span style={{ color: 'var(--green)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <a
          href="https://calendly.com/alejandro-marcos-teamheretics/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 100, background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,184,72,0.25)', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
        >
          Agendar sesión gratuita →
        </a>
      </Section>

      {/* ── LIBRO ── */}
      {/* Imagen: /libro-cover.jpg */}
      <Section id="libro">
        <Label>// Libro</Label>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, borderLeft: '3px solid var(--green)' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 140, flexShrink: 0, aspectRatio: '2/3', background: 'linear-gradient(135deg,#1e1e1e,#111)', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--green)', zIndex: 2 }} />
              <span style={{ fontSize: 28, position: 'absolute', zIndex: 0 }}>📖</span>
              <Image src="/libro-cover.jpg" alt="Internet Surfer" fill style={{ objectFit: 'cover', borderRadius: 8, zIndex: 1 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <h2 className="font-syne" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>Internet Surfer</h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 4 }}>El arte de crear comunidades en la era digital.</p>
              <p style={{ fontSize: 10, color: 'var(--green)', marginBottom: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>PDF gratuito · Descarga directa</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 20 }}>
                {['Cómo construir comunidades que sobreviven al algoritmo', 'Narrativa, posicionamiento y zeitgeist', 'Los 10 mandamientos del creador moderno', 'Cases reales de Team Heretics y el mercado hispano'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--green)', marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <BookForm formId="libro" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── BIBLIOTECA ── */}
      {/* Imágenes: /book-cover-1.jpg … /book-cover-6.jpg */}
      <Section>
        <Label>// Biblioteca recomendada</Label>
        <h3 className="font-syne" style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 20 }}>Para crear y pensar mejor</h3>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }}>
          {bibCovers.map((src, i) => (
            <div key={i}
              style={{ width: 100, height: 150, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: bibColors[i], border: '1px solid var(--border)', position: 'relative', transition: 'transform 0.3s', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-8px) rotate(-1deg)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'none')}
            >
              <span style={{ fontSize: 26, position: 'absolute', zIndex: 0 }}>{bibEmojis[i]}</span>
              <Image src={src} alt={`Libro ${i + 1}`} fill style={{ objectFit: 'cover', zIndex: 1 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 20 }}>
          Una pequeña biblioteca de libros, recursos y referencias que han formado mi manera de pensar sobre marcas, comunidades e internet. Se actualiza constantemente.
        </p>
        <BookForm formId="bib" />
      </Section>

      {/* ── TRAYECTORIA ── */}
      <Section>
        <Label>// Trayectoria</Label>

        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 0 }}>Ahora</p>
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 28 }}>
          {rolesAhora.map(r => <TrajectoryRow key={r.company} {...r} />)}
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 0 }}>Empresa</p>
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 28 }}>
          {rolesEmpresa.map(r => <TrajectoryRow key={r.company} {...r} />)}
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 0 }}>Fundador & Inversor</p>
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 28 }}>
          {proyectos.map(p => (
            <div key={p.name}
              style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2px 16px', padding: '12px 0', borderBottom: '1px solid var(--border)', alignItems: 'start', transition: 'padding-left 0.2s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '6px' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0' }}
            >
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{p.name}</span>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 3 }}>{p.desc}</p>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap', paddingTop: 2 }}>{p.period}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 12 }}>Docencia</p>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 24 }}>
          Llevo años trasladando al aula todo lo que aprendo en la calle y en internet. Marketing digital, construcción de comunidades, estrategia de marca y cultura de internet en algunas de las escuelas más importantes de España.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
          {schools.map(s => (
            <Image key={s}
              src={`/logo-${s.toLowerCase().replace(/\s/g, '')}.png`}
              alt={s} width={90} height={32}
              style={{ height: 26, width: 'auto', objectFit: 'contain', filter: 'grayscale(1) opacity(0.4)', transition: 'filter 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) opacity(0.7)')}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) opacity(0.4)')}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          ))}
        </div>
        <div style={{ marginTop: 24, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', aspectRatio: '16/9' }}>
          <Image src="/foto-recursos.jpg" alt="Recursos" fill style={{ objectFit: 'cover' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </Section>

      {/* ── CTA FINAL ── */}
      <Section>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--green)', display: 'block', marginBottom: 16 }}>¿Empezamos?</span>
        <h2 className="font-syne" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05, marginBottom: 12 }}>
          Si quieres construir algo<br />que de verdad <span style={{ color: 'var(--green)' }}>conecte.</span>
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: 400, marginBottom: 32 }}>
          Una sesión de 30 minutos puede darte más claridad que meses dando vueltas solo.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#sesion"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 32px', borderRadius: 100, background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,184,72,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
          >Reservar sesión gratuita →</a>
          <a href="#libro"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 32px', borderRadius: 100, border: '1.5px solid var(--border-accent)', color: 'var(--text-muted)', fontSize: 16, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'none' }}
          >O empieza con el libro →</a>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '28px 0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', fontWeight: 500 }}>@AlejandroSdOw</p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'X / Twitter', href: 'https://x.com/alejandrosdow' },
            { label: 'Instagram', href: 'https://www.instagram.com/alejandrosdow' },
            { label: 'Substack', href: 'https://substack.com/@alejandrosdow' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alejandromarcosmoraga/' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >{l.label}</a>
          ))}
        </div>
      </div>

    </div>
  )
}
