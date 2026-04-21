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

const IMAGES = [
  { url: '/aarti_spiritual_scene_1776636979610.png', title: 'Sacred Morning Aarti' },
  { url: '/meditation_sacred_hall_1776636979610.png', title: 'The Meditation Sanctuary' },
  { url: '/bhajan_sandhya_1776636979610.png', title: 'Soulful Bhajan Sandhya' },
  { url: '/temple_flowers_vibrant_1776636979610.png', title: 'Vibrant Temple Offerings' },
  { url: '/annadan_service_scene_1776636979610.png', title: 'Compassionate Annadan' },
]

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gallery-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding) 20px', textAlign: 'center' }}>
        <Reveal>
          <span className="section-eyebrow">Soulful Moments</span>
          <h1 className="section-title">The <span className="shimmer-text">Ashram</span> Gallery</h1>
          <p className="section-subtitle" style={{ margin: '20px auto' }}>Visual glimpses of everyday grace, devotion, and collective service.</p>
        </Reveal>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '32px' 
        }}>
          {IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <div className="glass-card" style={{ padding: '16px', overflow: 'hidden', borderBottom: '2px solid var(--gold-500)' }}>
                <div style={{ height: '280px', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px', position: 'relative' }} className="gallery-image-container">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.15)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
                </div>
                <p style={{ textAlign: 'center', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.05em' }}>{img.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
