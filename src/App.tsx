import { useState, useEffect } from 'react'
import HeroScene from './components/HeroScene'
import ParticlesScene from './components/ParticlesScene'
import FadeInSection from './components/FadeInSection'
import './App.css'

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
        <span className="navbar-logo">Leila Lima</span>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a onClick={() => scrollTo('inicio')}>Inicio</a></li>
          <li><a onClick={() => scrollTo('sobre-mi')}>Sobre Mí</a></li>
          <li><a onClick={() => scrollTo('servicios')}>Servicios</a></li>
          <li><a onClick={() => scrollTo('filosofia')}>Filosofía</a></li>
          <li><a onClick={() => scrollTo('contacto')}>Contacto</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="inicio">
        <div className="hero-canvas">
          <HeroScene />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-slogan">Construyendo tu futuro</p>
          <h1>Leila Lima</h1>
          <p className="hero-subtitle">
            Coaching para el Crecimiento Personal y Profesional
          </p>
          <a className="hero-cta" onClick={() => scrollTo('contacto')}>
            Comienza tu transformación
          </a>
        </div>
      </section>

      {/* Sobre Mí */}
      <section className="section" id="sobre-mi">
        <FadeInSection>
          <h2 className="section-title">Sobre Mí</h2>
          <p className="section-subtitle">
            Acompañándote en tu camino de crecimiento
          </p>
          <div className="about-container">
            <div className="about-image">
              <span className="about-image-placeholder">LL</span>
            </div>
            <div className="about-text">
              <h3>Leila Lima</h3>
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
              <div className="about-since">
                ✦ Coach Profesional desde 2020
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Servicios */}
      <section className="section section-alt" id="servicios">
        <FadeInSection>
          <h2 className="section-title">Servicios</h2>
          <p className="section-subtitle">
            Soluciones de coaching adaptadas a tus necesidades
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Coaching de Equipos</h3>
              <p>
                Potencia la colaboración, comunicación y rendimiento de tu equipo.
                Desarrollo de dinámicas grupales que generan resultados extraordinarios.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌱</div>
              <h3>Coaching Personal</h3>
              <p>
                Sesiones individuales enfocadas en tu crecimiento personal y profesional.
                Descubre tu potencial y supera los obstáculos que te limitan.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Formación y Talleres</h3>
              <p>
                Programas formativos y talleres prácticos diseñados para desarrollar
                habilidades de liderazgo, comunicación y gestión emocional.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Filosofía */}
      <section className="philosophy" id="filosofia">
        <div className="philosophy-canvas">
          <ParticlesScene />
        </div>
        <FadeInSection>
          <div className="philosophy-content">
            <h2>Mi Filosofía</h2>
            <p>
              El coaching es un viaje de autodescubrimiento. Juntos exploraremos tus
              fortalezas, desafiaremos tus creencias limitantes y construiremos un
              camino claro hacia tus objetivos. Cada sesión es un paso hacia la
              versión más auténtica de ti mismo.
            </p>
            <div className="philosophy-values">
              <span className="philosophy-value">Autenticidad</span>
              <span className="philosophy-value">Compromiso</span>
              <span className="philosophy-value">Transformación</span>
              <span className="philosophy-value">Empatía</span>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Contacto */}
      <section className="section" id="contacto">
        <FadeInSection>
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">
            Da el primer paso hacia tu transformación
          </p>
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">✉</div>
                <span>hola@leilalima.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">☎</div>
                <span>+34 600 000 000</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">◎</div>
                <span>Madrid, España</span>
              </div>
            </div>
            <a className="contact-cta" href="mailto:hola@leilalima.com">
              Agenda tu primera sesión
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Leila Lima — Coaching Profesional. Construyendo tu futuro.</p>
      </footer>
    </>
  )
}

export default App
