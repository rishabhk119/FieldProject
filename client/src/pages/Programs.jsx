import { useEffect } from 'react'
import '../styles/home.css'

const PROGRAMS = [
  {
    title: 'Vedic Education',
    desc: 'Preserving ancient wisdom through modern educational frameworks for the youth.',
    icon: '📖'
  },
  {
    title: 'Healthcare Seva',
    desc: 'Mobile clinics and medical camps providing essential care to remote villages.',
    icon: '🏥'
  },
  {
    title: 'Sustainable Living',
    desc: 'Organic farming and eco-conscious initiatives within the Ashram premises.',
    icon: '🌿'
  }
]

export default function Programs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="programs-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Service to Humanity</span>
        <h1 className="section-title">Our Initiatives</h1>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '60px' }}>Featured Seva</h2>
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '10px', overflow: 'hidden' }}>
          <div style={{ height: '400px', overflow: 'hidden', borderRadius: '12px' }}>
            <img src="/annadan_service_scene_1776636979610.png" alt="Annadan Seva" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-eyebrow" style={{ textAlign: 'left' }}>Daily Annadan</span>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '28px', marginBottom: '20px' }}>Feeding the Soul</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px' }}>
              Our daily Annadan program serves over 500 sanctified meals to devotees and those in need, embodying the principle of "Sabka Malik Ek."
            </p>
            <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Sponsor a Meal</button>
          </div>
        </div>
      </section>
    </div>
  )
}
