import { useState, useEffect, useRef } from 'react'
import '../styles/home.css'

function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  const transforms = {
    up: 'translateY(60px) rotateX(15deg) scale(0.95)',
    left: 'translateX(-60px) rotateY(-15deg)',
    right: 'translateX(60px) rotateY(15deg)',
    scale: 'scale(0.9) translateY(40px)',
  }

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      filter: visible ? 'blur(0px)' : 'blur(15px)',
      transform: visible ? 'none' : transforms[direction],
      transition: `all 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      perspective: '1200px'
    }}>{children}</div>
  )
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding) 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <span className="section-eyebrow">Our Legacy</span>
          <h1 className="section-title">The Heart of <span className="shimmer-text">Sai Tapovan</span></h1>
          <p className="section-subtitle" style={{ margin: '20px auto', maxWidth: '700px' }}>
            Built on the eternal principles of Love, Service, and Unity, Sai Tapovan remains a lighthouse for seekers of truth and instruments of seva.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <Reveal direction="left" delay={0.2}>
            <div className="glass-card cinematic-glow" style={{ padding: '50px', height: '100%' }}>
              <div style={{ fontSize: '40px', marginBottom: '24px' }}>🎯</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold-400)', marginBottom: '24px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '16px' }}>
                To provide a nurturing environment for spiritual growth while actively serving humanity through healthcare, education, and community support. 
                Our endeavor is to bridge the gap between material existence and spiritual fulfillment.
              </p>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={0.4}>
            <div className="glass-card cinematic-glow" style={{ padding: '50px', height: '100%' }}>
              <div style={{ fontSize: '40px', marginBottom: '24px' }}>🏺</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold-400)', marginBottom: '24px' }}>The Legacy</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '16px' }}>
                Inspired by the profound teachings of Shirdi Sai Baba, the Ashram has evolved from a silent meditation retreat into a vibrant center for the Ubhari Foundation, 
                now impacting over 50,000 lives across the region.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership / Founders */}
      <section style={{ padding: '100px 20px', background: 'var(--dark-900)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span className="section-eyebrow">The Visionaries</span>
              <h2 className="section-title">Rooted in <span className="shimmer-text">Wisdom</span></h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { label: '80G Registered', value: 'Tax Exempt Seva', desc: 'Authorized trust compliant with IT Act Section 80G for donation benefits.' },
              { label: '12A Certified', value: 'Charitable Intent', desc: 'Legally recognized instrument for high-impact social and spiritual welfare.' },
              { label: 'Annual Audits', value: 'Radiant Transparency', desc: 'Financial accounts are meticulously vetted by independent professionals.' },
              { label: 'Patron Support', value: 'Global Community', desc: 'Powered by thousands of devotees across 12 countries.' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.15} direction="scale">
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', borderBottom: '4px solid var(--gold-500)', transition: 'transform 0.5s ease' }}>
                  <div style={{ color: 'var(--gold-400)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{item.label}</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: 'bold', margin: '16px 0', fontFamily: 'var(--font-display)' }}>{item.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      <Reveal delay={0.3}>
        <div className="ornament-divider" style={{ margin: '120px auto' }}>🪷</div>
      </Reveal>
    </div>
  )
}
