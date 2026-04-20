import { useEffect } from 'react'
import '../styles/home.css'

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1544927231-10bc4ca44a7f?auto=format&fit=crop&q=80', title: 'Morning Prayers' },
  { url: 'https://images.unsplash.com/photo-1545633633-91b5c3b12365?auto=format&fit=crop&q=80', title: 'Vedic School' },
  { url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80', title: 'Annadan Seva' },
  { url: 'https://images.unsplash.com/photo-1517404212734-cd48350d4810?auto=format&fit=crop&q=80', title: 'Ashram Gardens' },
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80', title: 'Spiritual Retreat' },
  { url: 'https://images.unsplash.com/photo-1544927231-10bc4ca44a7f?auto=format&fit=crop&q=80', title: 'Community Life' }
]

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gallery-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Soulful Moments</span>
        <h1 className="section-title">Ashram Gallery</h1>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {IMAGES.map((img, i) => (
            <div key={i} className="glass-card" style={{ padding: '10px', overflow: 'hidden' }}>
              <div style={{ height: '240px', overflow: 'hidden', borderRadius: '8px', marginBottom: '15px' }}>
                <img 
                  src={img.url} 
                  alt={img.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <p style={{ textAlign: 'center', color: 'var(--gold-400)', fontFamily: 'var(--font-display)', fontSize: '18px' }}>{img.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
