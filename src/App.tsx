import { useState, useEffect, useRef } from 'react'
import HeroScene from './components/HeroScene'
import ParticlesScene from './components/ParticlesScene'
import FadeInSection from './components/FadeInSection'
import logoTIP from './logoTIP.png'
import './App.css'

function useCountUp(target: number, duration: number, visible: boolean) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const steps = 40
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [visible, target, duration])
  return count
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const count = useCountUp(value, 1500, visible)
  return (
    <div className="stat" ref={ref}>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    name: '???',
    location: 'The Sunken Parish',
    type: 'Region',
    status: 'Sealed',
    units: '--',
    area: '??',
  },
  {
    id: 2,
    name: '???',
    location: 'The Velvet Corridor',
    type: 'Region',
    status: 'Sealed',
    units: '--',
    area: '??',
  },
  {
    id: 3,
    name: '???',
    location: 'The Last Garden',
    type: 'Region',
    status: 'Sealed',
    units: '--',
    area: '??',
  },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="navbar-logo" onClick={() => scrollTo('inicio')}>
          <span className="navbar-logo-accent">Magdalena</span>
          <span className="navbar-logo-sub">A world that remembers</span>
        </a>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a onClick={() => scrollTo('inicio')}>Home</a></li>
          <li><a onClick={() => scrollTo('nosotros')}>The World</a></li>
          <li><a onClick={() => scrollTo('proyectos')}>Regions</a></li>
          <li><a onClick={() => scrollTo('servicios')}>Pillars</a></li>
          <li><a onClick={() => scrollTo('vision')}>Lore</a></li>
          <li><a onClick={() => scrollTo('contacto')} className="navbar-cta">Wishlist</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="inicio">
        <div className="hero-canvas">
          <HeroScene />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">An indie RPG experience</div>
          <h1>
            <span className="hero-line1">Magdalena</span>
            <span className="hero-line2">She never forgot. Neither will you.</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            Every choice leaves a scar. Every silence hides a truth.
          </p>
          <a className="hero-cta" onClick={() => scrollTo('proyectos')}>
            <span>Enter the world</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo('nosotros')}>
          <div className="hero-scroll-line" />
          <span>Descend</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <StatCounter value={7} suffix="" label="Fractured regions" />
        <div className="stats-divider" />
        <StatCounter value={100} suffix="+" label="Hours of lore" />
        <div className="stats-divider" />
        <StatCounter value={3} suffix="" label="Endings you won't expect" />
        <div className="stats-divider" />
        <StatCounter value={1} suffix="" label="Chance to get it right" />
      </section>

      {/* Nosotros */}
      <section className="section" id="nosotros">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">What lies beneath</div>
            <h2 className="section-title">The World</h2>
            <div className="title-accent" />
          </FadeInSection>
          <div className="about-container">
            <FadeInSection delay={100}>
              <div className="about-image-wrapper">
                <div className="about-image">
                  <img src={logoTIP} alt="Magdalena" className="about-logo" />
                </div>
                <div className="about-image-ring" />
                <div className="about-image-dots" />
              </div>
            </FadeInSection>
            <FadeInSection delay={250}>
              <div className="about-text">
                <h3><span className="text-accent">A world built on memory</span></h3>
                <p>
                  Magdalena is set in a place that shouldn't exist anymore.
                  A place shaped by what its inhabitants chose to remember — and
                  what they were forced to forget. You arrive with nothing.
                  The world already knows your name.
                </p>
                <p>
                  We can't tell you more. Not yet.
                </p>
                <div className="about-tags">
                  <span className="about-tag">Indie RPG</span>
                  <span className="about-tag">Narrative-driven</span>
                  <span className="about-tag">Choice matters</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="section section-alt" id="proyectos">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Uncharted</div>
            <h2 className="section-title">Regions</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Seven regions. Each one remembers something different. None of them remember you.
            </p>
          </FadeInSection>
          <div className="projects-grid">
            {PLACEHOLDER_PROJECTS.map((project, idx) => (
              <FadeInSection key={project.id} delay={idx * 150}>
                <div className="project-card">
                  <div className="project-image">
                    <img src={logoTIP} alt="Magdalena" className="project-logo" />
                    <div className="project-status">{project.status}</div>
                  </div>
                  <div className="project-info">
                    <div className="project-type">{project.type}</div>
                    <h3>{project.name}</h3>
                    <div className="project-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {project.location}
                    </div>
                    <div className="project-details">
                      <div className="project-detail">
                        <span className="project-detail-label">Secrets</span>
                        <span className="project-detail-value">{project.units}</span>
                      </div>
                      <div className="project-detail">
                        <span className="project-detail-label">Threat</span>
                        <span className="project-detail-value">{project.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={500}>
            <div className="projects-coming">
              <div className="projects-coming-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <p>More regions will be revealed. Some are better left forgotten.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Servicios */}
      <section className="section" id="servicios">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">What defines Magdalena</div>
            <h2 className="section-title">Pillars</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Three things you should know before you step inside
            </p>
          </FadeInSection>
          <div className="services-grid">
            <FadeInSection delay={0}>
              <div className="service-card">
                <div className="service-number">01</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="20" width="18" height="22" rx="1"/>
                    <rect x="26" y="10" width="18" height="32" rx="1"/>
                    <path d="M8 28h6M8 34h6"/>
                    <path d="M30 18h6M30 24h6M30 30h6"/>
                    <line x1="0" y1="42" x2="48" y2="42"/>
                  </svg>
                </div>
                <h3>Consequence</h3>
                <p>
                  Nothing is forgiven. The world shifts around the weight
                  of what you've done. NPCs remember. The land remembers.
                  There is no reloading your way out.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Learn more <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="service-card service-card-featured">
                <div className="service-number">02</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 42h40"/>
                    <rect x="8" y="22" width="14" height="20" rx="1"/>
                    <rect x="26" y="14" width="14" height="28" rx="1"/>
                    <path d="M15 8l-7 14"/>
                    <path d="M33 6l-7 8"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="33" cy="4" r="2"/>
                  </svg>
                </div>
                <h3>Atmosphere</h3>
                <p>
                  Hand-painted environments. A soundtrack that follows
                  you home. Every room tells a story if you're paying
                  attention. Most players won't be.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Learn more <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
            <FadeInSection delay={300}>
              <div className="service-card">
                <div className="service-number">03</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 4v8"/>
                    <path d="M4 24h8"/>
                    <path d="M36 24h8"/>
                    <path d="M24 36v8"/>
                    <circle cx="24" cy="24" r="8"/>
                    <circle cx="24" cy="24" r="16"/>
                    <path d="M10.1 10.1l5.66 5.66M32.24 32.24l5.66 5.66"/>
                    <path d="M10.1 37.9l5.66-5.66M32.24 15.76l5.66-5.66"/>
                  </svg>
                </div>
                <h3>The Unknown</h3>
                <p>
                  There's a third pillar. We're not ready
                  to talk about it yet. You'll understand
                  why when you play.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Learn more <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Visión */}
      <section className="philosophy" id="vision">
        <div className="philosophy-canvas">
          <ParticlesScene />
        </div>
        <div className="philosophy-overlay" />
        <FadeInSection>
          <div className="philosophy-content">
            <div className="section-label section-label-light">From the archives</div>
            <h2>Lore Fragment</h2>
            <div className="title-accent title-accent-light" />
            <blockquote className="philosophy-quote">
              "She built the town from a single memory. When they asked her which one,
              she smiled and said: 'The one that hurt the most.'
              No one asked again."
            </blockquote>
            <p className="philosophy-text">
              — Recovered from a journal found beneath the Chapel of Still Water.
              Author unknown. Pages 1 through 47 are missing.
            </p>
            <div className="philosophy-values">
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span>Memory</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span>Guilt</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <span>Light</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                </div>
                <span>[ REDACTED ]</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Grupo / Testimonial */}
      <section className="section">
        <div className="section-inner">
          <FadeInSection>
            <div className="testimonial-block">
              <div className="testimonial-mark">"</div>
              <p className="testimonial-text">
                I played the demo at 2 AM. I finished it at 6 AM.
                I haven't stopped thinking about the ending.
                I don't think the ending has stopped thinking about me.
              </p>
              <div className="testimonial-author">
                <img src={logoTIP} alt="Playtester" className="testimonial-avatar-img" />
                <div>
                  <div className="testimonial-name">Anonymous Playtester</div>
                  <div className="testimonial-role">"I need to play it again."</div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Contacto */}
      <section className="section section-alt" id="contacto">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Don't miss it</div>
            <h2 className="section-title">Stay Close</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Wishlist now. The world is almost ready for you.
            </p>
          </FadeInSection>
          <FadeInSection delay={150}>
            <div className="contact-container">
              <div className="contact-cards">
                <a className="contact-card" href="#">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
                  </div>
                  <div className="contact-card-label">Steam</div>
                  <div className="contact-card-value">Wishlist on Steam</div>
                </a>
                <a className="contact-card" href="#">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div className="contact-card-label">Discord</div>
                  <div className="contact-card-value">Join the community</div>
                </a>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="contact-card-label">Release</div>
                  <div className="contact-card-value">When it's ready.</div>
                </div>
              </div>
              <a className="contact-main-cta" href="#">
                <span>Wishlist on Steam</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Magdalena</span>
            <p>A world that remembers</p>
          </div>
          <div className="footer-links">
            <a onClick={() => scrollTo('nosotros')}>The World</a>
            <a onClick={() => scrollTo('proyectos')}>Regions</a>
            <a onClick={() => scrollTo('servicios')}>Pillars</a>
            <a onClick={() => scrollTo('contacto')}>Wishlist</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Magdalena &mdash; All rights reserved
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
