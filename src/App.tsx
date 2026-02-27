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
    name: 'Projeto Placeholder',
    location: 'Lisboa, Portugal',
    type: 'Residencial',
    status: 'Em desenvolvimento',
    units: '--',
    area: '-- m\u00B2',
  },
  {
    id: 2,
    name: 'Projeto Placeholder',
    location: 'Porto, Portugal',
    type: 'Misto',
    status: 'Em planeamento',
    units: '--',
    area: '-- m\u00B2',
  },
  {
    id: 3,
    name: 'Projeto Placeholder',
    location: 'Algarve, Portugal',
    type: 'Resort & Residencial',
    status: 'Brevemente',
    units: '--',
    area: '-- m\u00B2',
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
          <span className="navbar-logo-accent">Torres</span> del Imperio
          <span className="navbar-logo-sub">Portugal</span>
        </a>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a onClick={() => scrollTo('inicio')}>Inicio</a></li>
          <li><a onClick={() => scrollTo('nosotros')}>Nosotros</a></li>
          <li><a onClick={() => scrollTo('proyectos')}>Proyectos</a></li>
          <li><a onClick={() => scrollTo('servicios')}>Servicios</a></li>
          <li><a onClick={() => scrollTo('vision')}>Visión</a></li>
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
          <div className="hero-badge">Filial de Torres del Imperio Hispania</div>
          <h1>
            <span className="hero-line1">Torres del Imperio</span>
            <span className="hero-line2">Portugal</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            Proyectos inmobiliarios de excelencia en el mercado portugués
          </p>
          <a className="hero-cta" onClick={() => scrollTo('proyectos')}>
            <span>Descubre nuestros proyectos</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo('nosotros')}>
          <div className="hero-scroll-line" />
          <span>Descubre más</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <StatCounter value={15} suffix="+" label="Años de experiencia" />
        <div className="stats-divider" />
        <StatCounter value={3} suffix="" label="Países" />
        <div className="stats-divider" />
        <StatCounter value={50} suffix="+" label="Proyectos realizados" />
        <div className="stats-divider" />
        <StatCounter value={2000} suffix="+" label="Unidades entregadas" />
      </section>

      {/* Nosotros */}
      <section className="section" id="nosotros">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Quiénes somos</div>
            <h2 className="section-title">Nosotros</h2>
            <div className="title-accent" />
          </FadeInSection>
          <div className="about-container">
            <FadeInSection delay={100}>
              <div className="about-image-wrapper">
                <div className="about-image">
                  <img src={logoTIP} alt="Torres del Imperio Portugal" className="about-logo" />
                </div>
                <div className="about-image-ring" />
                <div className="about-image-dots" />
              </div>
            </FadeInSection>
            <FadeInSection delay={250}>
              <div className="about-text">
                <h3><span className="text-accent">Torres del Imperio Portugal</span></h3>
                <p>
                  Somos la filial portuguesa del grupo Torres del Imperio Hispania,
                  una promotora inmobiliaria de referencia en la Península Ibérica.
                  Desarrollamos proyectos residenciales, comerciales y mixtos que
                  combinan diseño contemporáneo con calidad constructiva de primer nivel.
                </p>
                <p>
                  Nuestra presencia en Portugal responde a la visión de expansión
                  estratégica del grupo, aportando al mercado portugués la experiencia
                  y el rigor que nos caracterizan.
                </p>
                <div className="about-tags">
                  <span className="about-tag">Grupo Torres del Imperio</span>
                  <span className="about-tag">Promotora Inmobiliaria</span>
                  <span className="about-tag">Península Ibérica</span>
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
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">Proyectos</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Próximamente compartiremos los detalles de nuestros desarrollos en Portugal
            </p>
          </FadeInSection>
          <div className="projects-grid">
            {PLACEHOLDER_PROJECTS.map((project, idx) => (
              <FadeInSection key={project.id} delay={idx * 150}>
                <div className="project-card">
                  <div className="project-image">
                    <img src={logoTIP} alt="Torres del Imperio Portugal" className="project-logo" />
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
                        <span className="project-detail-label">Unidades</span>
                        <span className="project-detail-value">{project.units}</span>
                      </div>
                      <div className="project-detail">
                        <span className="project-detail-label">Superficie</span>
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
              <p>Más proyectos en preparación. Información detallada próximamente.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Servicios */}
      <section className="section" id="servicios">
        <div className="section-inner">
          <FadeInSection>
            <div className="section-label">Lo que hacemos</div>
            <h2 className="section-title">Servicios</h2>
            <div className="title-accent" />
            <p className="section-subtitle">
              Desarrollo inmobiliario integral, desde la concepción hasta la entrega
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
                <h3>Promoción Residencial</h3>
                <p>
                  Desarrollo de proyectos residenciales de alta calidad,
                  desde apartamentos urbanos hasta complejos residenciales
                  en las mejores ubicaciones de Portugal.
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
                    <path d="M4 42h40"/>
                    <rect x="8" y="22" width="14" height="20" rx="1"/>
                    <rect x="26" y="14" width="14" height="28" rx="1"/>
                    <path d="M15 8l-7 14"/>
                    <path d="M33 6l-7 8"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="33" cy="4" r="2"/>
                  </svg>
                </div>
                <h3>Proyectos Mixtos</h3>
                <p>
                  Desarrollo de complejos que integran uso residencial,
                  comercial y de servicios, creando comunidades vibrantes
                  y autosuficientes.
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
                <h3>Gestión Integral</h3>
                <p>
                  Acompañamiento completo del ciclo inmobiliario:
                  adquisición de suelo, licenciamiento, construcción,
                  comercialización y postventa.
                </p>
                <a className="service-link" onClick={() => scrollTo('contacto')}>
                  Saber más <span>&rarr;</span>
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
            <div className="section-label section-label-light">Nuestra esencia</div>
            <h2>Nuestra Visión</h2>
            <div className="title-accent title-accent-light" />
            <blockquote className="philosophy-quote">
              "Creamos espacios que transforman ciudades y mejoran la vida de las personas.
              Cada proyecto es una oportunidad para dejar una huella de calidad
              y excelencia en el paisaje urbano portugués."
            </blockquote>
            <p className="philosophy-text">
              Respaldados por la solidez y trayectoria de Torres del Imperio Hispania,
              llevamos al mercado portugués una visión innovadora del desarrollo inmobiliario.
            </p>
            <div className="philosophy-values">
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span>Excelencia</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span>Solidez</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <span>Innovación</span>
              </div>
              <div className="philosophy-value">
                <div className="pv-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                </div>
                <span>Visión Global</span>
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
                La expansión a Portugal representa un paso estratégico para
                Torres del Imperio Hispania. El mercado inmobiliario portugués
                ofrece oportunidades excepcionales y estamos comprometidos
                con aportar nuestra experiencia y estándares de calidad.
              </p>
              <div className="testimonial-author">
                <img src={logoTIP} alt="TI" className="testimonial-avatar-img" />
                <div>
                  <div className="testimonial-name">Torres del Imperio Hispania</div>
                  <div className="testimonial-role">Grupo Matriz</div>
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
              Consulte nuestros proyectos o explore oportunidades de inversión
            </p>
          </FadeInSection>
          <FadeInSection delay={150}>
            <div className="contact-container">
              <div className="contact-cards">
                <a className="contact-card" href="mailto:info@torresdelimperio.pt">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
                  </div>
                  <div className="contact-card-label">Email</div>
                  <div className="contact-card-value">info@torresdelimperio.pt</div>
                </a>
                <a className="contact-card" href="tel:+351000000000">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div className="contact-card-label">Teléfono</div>
                  <div className="contact-card-value">+351 000 000 000</div>
                </a>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="contact-card-label">Sede</div>
                  <div className="contact-card-value">Lisboa, Portugal</div>
                </div>
              </div>
              <a className="contact-main-cta" href="mailto:info@torresdelimperio.pt">
                <span>Solicitar información</span>
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
            <span className="footer-logo">Torres del Imperio Portugal</span>
            <p>Filial de Torres del Imperio Hispania</p>
          </div>
          <div className="footer-links">
            <a onClick={() => scrollTo('nosotros')}>Nosotros</a>
            <a onClick={() => scrollTo('proyectos')}>Proyectos</a>
            <a onClick={() => scrollTo('servicios')}>Servicios</a>
            <a onClick={() => scrollTo('contacto')}>Contacto</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Torres del Imperio Portugal &mdash; Todos los derechos reservados
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
