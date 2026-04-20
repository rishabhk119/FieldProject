import { useEffect } from 'react'
import '../styles/home.css' // Reusing home styles for consistency

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section className="about-hero" style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Our Sacred Journey</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(40px, 8vw, 72px)', marginBottom: '24px' }}>
          Wisdom, Compassion <br /> & <span style={{ color: 'var(--saffron-500)' }}>Devotion</span>
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Established in 1995, Sai Tapovan Ashram is a sanctuary for spiritual seekers and a beacon of hope for the underprivileged.
        </p>
      </section>

      <section style={{ padding: 'var(--section-padding)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold-400)', marginBottom: '16px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              To provide a nurturing environment for spiritual growth while actively serving humanity through healthcare, education, and community support.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '40px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold-400)', marginBottom: '16px' }}>The Legacy</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Inspired by the teachings of peace and universal love, the Ashram has grown from a small meditation hut to a global foundation.
            </p>
          </div>
        </div>
      </section>
      
      <div className="ornament-divider" style={{ margin: '60px auto' }}>🪷</div>
    </div>
  )
}
