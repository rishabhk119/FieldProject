import { useState, useEffect, useRef } from 'react'
import '../styles/home.css'

function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      filter: visible ? 'blur(0px)' : 'blur(10px)',
      transform: visible ? 'none' : direction === 'up' ? 'translateY(40px)' : 'scale(0.95)',
      transition: `all 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`
    }}>{children}</div>
  )
}

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="contact-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding) 20px', textAlign: 'center' }}>
        <Reveal>
          <span className="section-eyebrow">Connect With Us</span>
          <h1 className="section-title">Get In <span className="shimmer-text">Touch</span></h1>
          <p className="section-subtitle" style={{ margin: '20px auto' }}>Reach out to us for enquiries, volunteer opportunities, or spiritual guidance.</p>
        </Reveal>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {/* Info Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <Reveal direction="left" delay={0.1}>
            <div className="glass-card cinematic-glow" style={{ padding: '40px' }}>
              <div style={{ color: 'var(--saffron-400)', fontSize: '24px', marginBottom: '20px' }}>📍 Ashram Address</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
                Sai Tapovan Ashram, <br />
                78CV+38, Asole, <br />
                Maharashtra 421401
              </p>
              <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--gold-400)', borderTop: '1px solid var(--border-subtle)', paddingTop: '15px' }}>
                 🕒 Daily: 5:00 AM - 9:00 PM
              </div>
            </div>
          </Reveal>
          
          <Reveal direction="left" delay={0.3}>
            <div className="glass-card cinematic-glow" style={{ padding: '40px' }}>
              <div style={{ color: 'var(--saffron-400)', fontSize: '24px', marginBottom: '20px' }}>📞 Contact Details</div>
              <div style={{ display: 'grid', gap: '12px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}><strong>General:</strong> +91 97636 49611</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}><strong>Seva Office:</strong> +91 83294 56722</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}><strong>Email:</strong> info@ubharifoundation.org</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact Form */}
        <Reveal direction="right" delay={0.2}>
          <div className="glass-card" style={{ padding: '50px', position: 'relative' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '30px', color: 'var(--text-primary)' }}>Send a Sacred Message</h3>
            <div style={{ display: 'grid', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>FULL NAME</label>
                <input type="text" placeholder="e.g. Rahul Sharma" className="form-input-premium" />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="rahul@example.com" className="form-input-premium" />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>MESSAGE / QUERY</label>
                <textarea placeholder="Describe your query or request..." rows="5" className="form-input-premium"></textarea>
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '56px', fontSize: '16px' }}>🌸 Send Message</button>
            </div>
            <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
               Our team typically responds within 24-48 hours.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
