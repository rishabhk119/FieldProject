import { useState, useEffect, useRef } from 'react'
import { X, ZoomIn } from 'lucide-react'
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
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (selectedImg) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [selectedImg])

  return (
    <div className="gallery-page" style={{ paddingTop: '116px', background: 'var(--dark-950)', minHeight: '100vh' }}>
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
              <div 
                className="glass-card" 
                style={{ padding: '16px', overflow: 'hidden', borderBottom: '2px solid var(--gold-500)', cursor: 'pointer' }}
                onClick={() => setSelectedImg(img)}
              >
                <div style={{ height: '280px', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px', position: 'relative' }} className="gallery-image-container">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                    className="gallery-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.4))', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.3s ease' }} className="gallery-overlay">
                    <ZoomIn size={32} color="white" />
                  </div>
                </div>
                <p style={{ textAlign: 'center', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.05em' }}>{img.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImg && (
        <div 
          style={{ 
            position: 'fixed', inset: 0, zIndex: 10000, 
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '40px', animation: 'fade-in 0.4s ease'
          }}
          onClick={() => setSelectedImg(null)}
        >
          <button 
            style={{ position: 'absolute', top: 40, right: 40, background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10001 }}
            onClick={() => setSelectedImg(null)}
          >
            <X size={40} />
          </button>
          
          <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', animation: 'scale-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
            <img 
              src={selectedImg.url} 
              alt={selectedImg.title} 
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} 
            />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '28px', marginTop: '24px', letterSpacing: '0.05em' }}>
              {selectedImg.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}
