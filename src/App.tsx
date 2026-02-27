import { useState, useEffect, useRef } from 'react'
import HeroScene from './components/HeroScene'
import ParticlesScene from './components/ParticlesScene'
import FadeInSection from './components/FadeInSection'
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
          <span className="navbar-logo-accent">L</span>eila
          <span className="navbar-logo-accent"> L</span>ima
        </a>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a onClick={() => scrollTo('inicio')}>Inicio</a></li>
          <li><a onClick={() => scrollTo('sobre-mi')}>Sobre Mí</a></li>
          <li><a onClick={() => scrollTo('servicios')}>Servicios</a></li>
          <li><a onClick={() => scrollTo('filosofia')}>Filosofía</a></li>
          <li><a onClick={() => scrollTo('contacto')} className="navbar-cta">Contacto</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="inicio">
        <div className="hero-canvas">
          <HeroScene />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">Coaching Profesional</div>
          <h1>
            <span className="hero-line1">Construyendo</span>
            <span className="hero-line2">tu futuro</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            Coaching para el Crecimiento Personal y Profesional
          </p>
          <a className="hero-cta" onClick={() => scrollTo('contacto')}>
            <span>Comienza tu transformación</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo('sobre-mi')}>
          <div className="hero-scroll-line" />
          <span>Descubre más</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <StatCounter value={5} suffix="+" label="Años de experiencia" />
        <div className="stats-divider" />
        <StatCounter value={200} suffix="+" label="Personas acompañadas" />
        <div className="stats-divider" />
        <StatCounter value={50} suffix="+" label="Equipos transformados" />
        <div className="stats-divider" />
        <StatCounter value={100} suffix="%" label="Compromiso" />
      </section>

      {/* Sobre Mí */}
      <section className="section" id="sobre-mi">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Conóceme</div>
            <h2 className="section-title">Sobre Mí</h2>
            <div className="title-accent" />
          </FadeInSection>
          <div className="about-container">
            <FadeInSection delay={100}>
              <div className="about-image-wrapper">
                <div className="about-image">
                  <span className="about-image-initials">LL</span>
                </div>
                <div className="about-image-ring" />
                <div className="about-image-dots" />
              </div>
            </FadeInSection>
            <FadeInSection delay={250}>
              <div className="about-text">
                <h3>Hola, soy <span className="text-accent">Leila Lima</span></h3>
                <p>
                  Soy coach profesional certificada, apasionada por acompañar a personas
                  y equipos en su proceso de transformación. Mi enfoque combina herramientas
                  de coaching con una profunda comprensión del desarrollo humano.
                </p>
                <p>
                  Creo firmemente que cada persona tiene el potencial de alcanzar sus
                  metas y construir la vida que desea. Mi rol es ser tu guía en ese
                  camino de descubrimiento y crecimiento.
                </p>
                <div className="about-tags">
                  <span className="about-tag">Coach Certificada</span>
                  <span className="about-tag">Desde 2020</span>
                  <span className="about-tag">Desarrollo Humano</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="section section-alt" id="servicios">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Lo que ofrezco</div>
            <h2 className="section-title">Servicios</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Soluciones de coaching adaptadas a cada etapa de tu camino
            </p>
          </FadeInSection>
          <div className="services-grid">
            <FadeInSection delay={0}>
              <div className="service-card">
                <div className="service-number">01</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="24" cy="14" r="6"/>
                    <circle cx="10" cy="28" r="5"/>
                    <circle cx="38" cy="28" r="5"/>
                    <path d="M18 17c-3 2-6 6-6 9"/>
                    <path d="M30 17c3 2 6 6 6 9"/>
                    <path d="M16 38c2-3 5-5 8-5s6 2 8 5"/>
                  </svg>
                </div>
                <h3>Coaching de Equipos</h3>
                <p>
                  Potencia la colaboración, comunicación y rendimiento de tu equipo.
                  Desarrollo de dinámicas grupales que generan resultados extraordinarios.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Saber más <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="service-card service-card-featured">
                <div className="service-number">02</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="24" cy="16" r="7"/>
                    <path d="M12 40c0-7 5-12 12-12s12 5 12 12"/>
                    <path d="M24 9V4"/>
                    <path d="M30 10l3-3"/>
                    <path d="M18 10l-3-3"/>
                  </svg>
                </div>
                <h3>Coaching Personal</h3>
                <p>
                  Sesiones individuales enfocadas en tu crecimiento personal y profesional.
                  Descubre tu potencial y supera los obstáculos que te limitan.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Saber más <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
            <FadeInSection delay={300}>
              <div className="service-card">
                <div className="service-number">03</div>
                <div className="service-icon-wrap">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="6" width="32" height="26" rx="3"/>
                    <path d="M16 40h16"/>
                    <path d="M24 32v8"/>
                    <path d="M16 16l4 4 8-8"/>
                  </svg>
                </div>
                <h3>Formación y Talleres</h3>
                <p>
                  Programas formativos y talleres prácticos diseñados para desarrollar
                  habilidades de liderazgo, comunicación y gestión emocional.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Saber más <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="philosophy" id="filosofia">
        <div className="philosophy-canvas">
          <ParticlesScene />
        </div>
        <div className="philosophy-overlay" />
        <FadeInSection>
          <div className="philosophy-content">
            <div className="section-label section-label-light">Mi enfoque</div>
            <h2>Mi Filosofía</h2>
            <div className="title-accent title-accent-light" />
            <blockquote className="philosophy-quote">
              "El coaching es un viaje de autodescubrimiento. Juntos exploraremos tus
              fortalezas, desafiaremos tus creencias limitantes y construiremos un
              camino claro hacia tus objetivos."
            </blockquote>
            <p className="philosophy-text">
              Cada sesión es un paso hacia la versión más auténtica de ti mismo.
              Mi compromiso es crear un espacio seguro donde puedas crecer sin límites.
            </p>
            <div className="philosophy-values">
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span>Autenticidad</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </div>
                <span>Compromiso</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <span>Transformación</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <span>Empatía</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Testimonial / Quote */}
      <section className="section">
        <div className="section-inner">
          <FadeInSection>
            <div className="testimonial-block">
              <div className="testimonial-mark">"</div>
              <p className="testimonial-text">
                Trabajar con Leila fue un antes y un después en mi carrera.
                Su capacidad de escuchar y guiar es extraordinaria. Me ayudó a
                ver posibilidades donde antes solo veía obstáculos.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">M</div>
                <div>
                  <div className="testimonial-name">María G.</div>
                  <div className="testimonial-role">Directora de Marketing</div>
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
            <div className="section-label">Hablemos</div>
            <h2 className="section-title">Contacto</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Da el primer paso hacia tu transformación
            </p>
          </FadeInSection>
          <FadeInSection delay={150}>
            <div className="contact-container">
              <div className="contact-cards">
                <a className="contact-card" href="mailto:hola@leilalima.com">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
                  </div>
                  <div className="contact-card-label">Email</div>
                  <div className="contact-card-value">hola@leilalima.com</div>
                </a>
                <a className="contact-card" href="tel:+34600000000">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div className="contact-card-label">Teléfono</div>
                  <div className="contact-card-value">+34 600 000 000</div>
                </a>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="contact-card-label">Ubicación</div>
                  <div className="contact-card-value">Madrid, España</div>
                </div>
              </div>
              <a className="contact-main-cta" href="mailto:hola@leilalima.com">
                <span>Agenda tu primera sesión gratuita</span>
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
            <span className="footer-logo">Leila Lima</span>
            <p>Coaching Profesional</p>
          </div>
          <div className="footer-links">
            <a onClick={() => scrollTo('sobre-mi')}>Sobre Mí</a>
            <a onClick={() => scrollTo('servicios')}>Servicios</a>
            <a onClick={() => scrollTo('contacto')}>Contacto</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Leila Lima &mdash; Construyendo tu futuro
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
